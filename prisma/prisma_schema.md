datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

enum Role {
  CUSTOMER
  ADMIN
  MANAGER
}

enum OrderStatus {
  PENDING
  CONFIRMED
  PROCESSING
  SHIPPED
  DELIVERED
  CANCELLED
  RETURNED
}

enum PaymentStatus {
  UNPAID
  PENDING_VERIFICATION
  PAID
  FAILED
  REFUNDED
}

enum PaymentMethod {
  COD
  SSLCOMMERZ
  BKASH_DIRECT
  NAGAD_DIRECT
}

model User {
  id            String     @id @default(cuid())
  name          String?
  email         String?    @unique
  phone         String?    @unique
  passwordHash  String
  role          Role       @default(CUSTOMER)
  createdAt     DateTime   @default(now())
  updatedAt     DateTime   @updatedAt

  addresses     Address[]
  orders        Order[]
  auditLogs     AuditLog[]
}

model Address {
  id           String   @id @default(cuid())
  userId       String
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  fullAddress  String
  division     String   // e.g. Chattogram
  district     String   // e.g. Feni
  upazila      String   // e.g. Feni Sadar
  postalCode   String?
  phone        String
  isDefault    Boolean  @default(false)
  orders       Order[]
}

model Category {
  id            String    @id @default(cuid())
  slug          String    @unique
  nameBn        String    // e.g. শাড়ি
  nameEn        String    // e.g. Sarees
  descriptionBn String?
  descriptionEn String?
  image         String?
  parentId      String?
  parent        Category? @relation("CategoryToSub", fields: [parentId], references: [id])
  children      Category[] @relation("CategoryToSub")
  products      Product[]
  createdAt     DateTime  @default(now())
}

model Product {
  id              String           @id @default(cuid())
  sku             String           @unique
  slug            String           @unique
  titleBn         String
  titleEn         String
  descriptionBn   String           @db.Text
  descriptionEn   String           @db.Text
  fabricDetailsBn String?
  fabricDetailsEn String?
  careInfoBn      String?
  careInfoEn      String?
  basePrice       Decimal          @db.Decimal(12, 2)
  salePrice       Decimal?         @db.Decimal(12, 2)
  isFeatured      Boolean          @default(false)
  isHandPainted   Boolean          @default(false)
  isPublished     Boolean          @default(true)
  categoryId      String
  category        Category         @relation(fields: [categoryId], references: [id])
  
  images          ProductImage[]
  variants        ProductVariant[]
  orderItems      OrderItem[]
  createdAt       DateTime         @default(now())
  updatedAt       DateTime         @updatedAt
}

model ProductImage {
  id        String   @id @default(cuid())
  productId String
  product   Product  @relation(fields: [productId], references: [id], onDelete: Cascade)
  url       String
  altText   String?
  isPrimary Boolean  @default(false)
  sortOrder Int      @default(0)
}

model ProductVariant {
  id              String   @id @default(cuid())
  productId       String
  product         Product  @relation(fields: [productId], references: [id], onDelete: Cascade)
  colorBn         String?
  colorEn         String?
  size            String?
  stock           Int      @default(0)
  priceAdjustment Decimal  @default(0.00) @db.Decimal(12, 2)
  skuVariant      String   @unique
  
  orderItems      OrderItem[]
}

model Order {
  id              String        @id @default(cuid())
  orderNumber     String        @unique // Format: SUTAR-YYYYMMDD-XXXX
  userId          String?
  user            User?         @relation(fields: [userId], references: [id])
  customerName    String
  customerPhone   String
  customerEmail   String?
  
  addressId       String?
  address         Address?      @relation(fields: [addressId], references: [id])
  shippingAddress Json          // Full Address Snapshot

  subtotal        Decimal       @db.Decimal(12, 2)
  deliveryFee     Decimal       @db.Decimal(12, 2)
  discountTotal   Decimal       @default(0.00) @db.Decimal(12, 2)
  grandTotal      Decimal       @db.Decimal(12, 2)

  paymentMethod   PaymentMethod @default(COD)
  paymentStatus   PaymentStatus @default(UNPAID)
  orderStatus     OrderStatus   @default(PENDING)
  
  paymentTxnId    String?
  couponCode      String?
  adminNotes      String?       @db.Text
  
  items           OrderItem[]
  createdAt       DateTime      @default(now())
  updatedAt       DateTime      @updatedAt
}

model OrderItem {
  id         String          @id @default(cuid())
  orderId    String
  order      Order           @relation(fields: [orderId], references: [id], onDelete: Cascade)
  productId  String
  product    Product         @relation(fields: [productId], references: [id])
  variantId  String?
  variant    ProductVariant? @relation(fields: [variantId], references: [id])
  quantity   Int
  unitPrice  Decimal         @db.Decimal(12, 2)
  totalPrice Decimal         @db.Decimal(12, 2)
}

model Coupon {
  id             String    @id @default(cuid())
  code           String    @unique
  discountPercent Decimal? @db.Decimal(5, 2)
  discountFixed   Decimal? @db.Decimal(12, 2)
  minOrderAmount Decimal?  @db.Decimal(12, 2)
  usageLimit     Int?
  usageCount     Int       @default(0)
  expiresAt      DateTime?
  isActive       Boolean   @default(true)
}

model StoreSetting {
  key   String @id
  value String @db.Text
}

model AuditLog {
  id        String   @id @default(cuid())
  userId    String
  user      User     @relation(fields: [userId], references: [id])
  action    String
  details   Json?
  ipAddress String?
  createdAt DateTime @default(now())
}