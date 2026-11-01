import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAdminRole } from '@/lib/auth';
import { Prisma } from '@prisma/client';

export async function GET() {
  try {
    await requireAdminRole();
    const products = await prisma.product.findMany({
      include: {
        category: true,
        variants: true,
        images: true,
      },
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(products);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Unauthorized access' }, { status: 401 });
  }
}

export async function POST(request: Request) {
  try {
    await requireAdminRole();
    const body = await request.json();

    const newProduct = await prisma.product.create({
      data: {
        sku: body.sku,
        slug: body.slug || body.sku.toLowerCase(),
        titleBn: body.titleBn,
        titleEn: body.titleEn,
        descriptionBn: body.descriptionBn,
        descriptionEn: body.descriptionEn,
        fabricDetailsBn: body.fabricDetailsBn || null,
        fabricDetailsEn: body.fabricDetailsEn || null,
        careInfoBn: body.careInfoBn || null,
        careInfoEn: body.careInfoEn || null,
        basePrice: new Prisma.Decimal(body.basePrice),
        salePrice: body.salePrice ? new Prisma.Decimal(body.salePrice) : null,
        isFeatured: Boolean(body.isFeatured),
        isHandPainted: Boolean(body.isHandPainted),
        isPublished: Boolean(body.isPublished),
        categoryId: body.categoryId,
        images: {
          create: body.images ? body.images.map((img: string, idx: number) => ({ url: img, isPrimary: idx === 0 })) : [],
        },
        variants: {
          create: body.variants ? body.variants.map((v: any) => ({
            colorBn: v.colorBn,
            colorEn: v.colorEn,
            size: v.size,
            stock: Number(v.stock),
            skuVariant: `${body.sku}-${v.size || 'STD'}-${v.colorEn || 'DEF'}`.toUpperCase(),
            priceAdjustment: new Prisma.Decimal(v.priceAdjustment || 0),
          })) : [],
        },
      },
      include: { variants: true, images: true },
    });

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to create product' }, { status: 500 });
  }
}