import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { validateBDPhoneNumber } from '@/lib/utils/formatters';
import { Prisma } from '@prisma/client';

interface CheckoutItemInput {
  productId: string;
  variantId?: string;
  quantity: number;
}

interface CheckoutBody {
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  division: string;
  district: string;
  upazila: string;
  address: string;
  items: CheckoutItemInput[];
  locationType: 'insideFeni' | 'outsideFeni';
  couponCode?: string;
}

export async function POST(request: Request) {
  try {
    const body: CheckoutBody = await request.json();

    // 1. Input Validation
    if (!body.customerName || !body.customerPhone || !body.address || !body.items || body.items.length === 0) {
      return NextResponse.json({ error: 'Missing required customer details or empty cart line items' }, { status: 400 });
    }

    if (!validateBDPhoneNumber(body.customerPhone)) {
      return NextResponse.json({ error: 'Invalid 11-digit Bangladesh mobile number provided' }, { status: 400 });
    }

    // 2. Dynamic Shipping Fee Calculation
    const insideFeniSetting = await prisma.storeSetting.findUnique({ where: { key: 'SHIPPING_INSIDE_FENI' } });
    const outsideFeniSetting = await prisma.storeSetting.findUnique({ where: { key: 'SHIPPING_OUTSIDE_FENI' } });

    const insideFee = insideFeniSetting ? parseFloat(insideFeniSetting.value) : 60;
    const outsideFee = outsideFeniSetting ? parseFloat(outsideFeniSetting.value) : 120;
    const deliveryFee = body.locationType === 'insideFeni' ? insideFee : outsideFee;

    // 3. Server-Side Price & Stock Verification inside DB Transaction
    const result = await prisma.$transaction(async (tx) => {
      let subtotal = 0;
      const verifiedItems: {
        productId: string;
        variantId?: string;
        quantity: number;
        unitPrice: Prisma.Decimal;
        totalPrice: Prisma.Decimal;
      }[] = [];

      for (const item of body.items) {
        const product = await tx.product.findUnique({
          where: { id: item.productId },
          include: { variants: true },
        });

        if (!product || !product.isPublished) {
          throw new Error(`Product unavailable or unlisted (ID: ${item.productId})`);
        }

        let unitPriceNum = product.salePrice ? parseFloat(product.salePrice.toString()) : parseFloat(product.basePrice.toString());
        let targetVariant = null;

        if (item.variantId) {
          targetVariant = product.variants.find((v) => v.id === item.variantId);
          if (!targetVariant) {
            throw new Error(`Specified variant not found (ID: ${item.variantId})`);
          }
          if (targetVariant.stock < item.quantity) {
            throw new Error(`Insufficient stock for ${product.titleBn} (${targetVariant.colorBn || ''} ${targetVariant.size || ''}). Available: ${targetVariant.stock}`);
          }
          unitPriceNum += parseFloat(targetVariant.priceAdjustment.toString());

          // Deduct stock atomically
          await tx.productVariant.update({
            where: { id: targetVariant.id },
            data: { stock: { decrement: item.quantity } },
          });
        }

        const lineTotalNum = unitPriceNum * item.quantity;
        subtotal += lineTotalNum;

        verifiedItems.push({
          productId: product.id,
          variantId: targetVariant ? targetVariant.id : undefined,
          quantity: item.quantity,
          unitPrice: new Prisma.Decimal(unitPriceNum),
          totalPrice: new Prisma.Decimal(lineTotalNum),
        });
      }

      // 4. Coupon Validation (if applicable)
      let discountTotalNum = 0;
      if (body.couponCode) {
        const coupon = await tx.coupon.findUnique({ where: { code: body.couponCode.toUpperCase() } });
        if (coupon && coupon.isActive) {
          const minOrder = coupon.minOrderAmount ? parseFloat(coupon.minOrderAmount.toString()) : 0;
          if (subtotal >= minOrder) {
            if (coupon.discountPercent) {
              discountTotalNum = (subtotal * parseFloat(coupon.discountPercent.toString())) / 100;
            } else if (coupon.discountFixed) {
              discountTotalNum = parseFloat(coupon.discountFixed.toString());
            }
            await tx.coupon.update({
              where: { id: coupon.id },
              data: { usageCount: { increment: 1 } },
            });
          }
        }
      }

      const grandTotalNum = subtotal - discountTotalNum + deliveryFee;
      const orderNumber = `SUTAR-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${Math.floor(1000 + Math.random() * 9000)}`;

      // 5. Create Order Record
      const newOrder = await tx.order.create({
        data: {
          orderNumber,
          customerName: body.customerName,
          customerPhone: body.customerPhone,
          customerEmail: body.customerEmail || null,
          shippingAddress: {
            division: body.division,
            district: body.district,
            upazila: body.upazila,
            address: body.address,
          },
          subtotal: new Prisma.Decimal(subtotal),
          deliveryFee: new Prisma.Decimal(deliveryFee),
          discountTotal: new Prisma.Decimal(discountTotalNum),
          grandTotal: new Prisma.Decimal(grandTotalNum),
          paymentMethod: 'COD',
          paymentStatus: 'UNPAID',
          orderStatus: 'PENDING',
          couponCode: body.couponCode || null,
          items: {
            create: verifiedItems,
          },
        },
        include: { items: true },
      });

      return newOrder;
    });

    return NextResponse.json({
      success: true,
      message: 'Order created successfully',
      orderNumber: result.orderNumber,
      grandTotal: result.grandTotal,
    }, { status: 201 });

  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to process checkout' }, { status: 500 });
  }
}