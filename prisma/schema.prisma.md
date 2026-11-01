// Prisma Schema for Sui Sutar Golpo (সুঁই সুতার গল্প)
// Traditional Bangladeshi Fashion E-commerce Platform

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

enum Role {
  SUPER_ADMIN
  ADMIN
  STAFF
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
  PENDING
  PAID
  FAILED
  REFUNDED
}

enum PaymentMethod {
  COD // Cash on Delivery
  ONLINE_BKASH // Disabled until real verification
  ONLINE_NAGAD // Disabled until real verification
}

model User {
  id            String     @id @default(uuid())
  name          String
  email         String     @unique
  passwordHash  String
  role          Role       @default(ADMIN)
  isActive      Boolean    @default(true)
  createdAt     DateTime   @default(now())
  updatedAt     DateTime   @updatedAt

  auditLogs     AuditLog[]

  @@map("users")
}

model Category {
  id          String    @id @default(uuid())
  nameBn      String    // Bengali Category Name
  nameEn      String    // English Category Name
  slug        String    @unique
  description String?
  imageUrl    String?
  isActive    Boolean   @default(true)
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt

  products    Product[]

  @@map("categories")
}

model Product {
  id            String           @id @default(uuid())
  titleBn       String           // Bengali Name (e.g., হস্তশিল্প শাড়ি)
  titleEn       String           // English Name
  slug          String           @unique
  descriptionBn String?
  descriptionEn String?
  basePrice     Decimal          @db.Decimal(10, 2)
  salePrice     Decimal?         @db.Decimal(10, 2)
  isFeatured    Boolean          @default(false)
  isActive      Boolean          @default(true)
  images        String[]         // Array of image URLs
  categoryId    String
  createdAt     DateTime         @default(now())
  updatedAt     DateTime         @updatedAt

  category      Category         @relation(fields: [categoryId], references: [id], onDelete: Cascade)
  variants      ProductVariant[]
  orderItems    OrderItem[]

  @@map("products")
}

model ProductVariant {
  id         String      @id @default(uuid())
  productId  String
  sku        String      @unique
  colorBn    String?     // e.g., লাল, নীল
  colorEn    String?     // e.g., Red, Blue
  size       String?     // e.g., M, L, XL, Free Size
  price      Decimal     @db.Decimal(10, 2)
  stockQty   Int         @default(0) // Inventory count
  createdAt  DateTime    @default(now())
  updatedAt  DateTime    @updatedAt

  product    Product     @relation(fields: [productId], references: [id], onDelete: Cascade)
  orderItems OrderItem[]

  @@map("product_variants")
}

model Customer {
  id         String   @id @default(uuid())
  name       String
  phone      String   @unique
  email      String?
  district   String   // Bangladesh District (e.g., Feni, Dhaka)
  address    String   // Full Address
  createdAt  DateTime @default(now())
  updatedAt  DateTime @updatedAt

  orders     Order[]

  @@map("customers")
}

model Order {
  id              String        @id @default(uuid())
  orderNumber     String        @unique // e.g., SSG-2026-1001
  customerId      String
  status          OrderStatus   @default(PENDING)
  paymentMethod   PaymentMethod @default(COD)
  paymentStatus   PaymentStatus @default(PENDING)
  subTotal        Decimal       @db.Decimal(10, 2)
  shippingCost    Decimal       @db.Decimal(10, 2)
  totalAmount     Decimal       @db.Decimal(10, 2)
  deliveryAddress String
  district        String
  phone           String
  customerNotes   String?
  adminNotes      String?
  createdAt       DateTime      @default(now())
  updatedAt       DateTime      @updatedAt

  customer        Customer      @relation(fields: [customerId], references: [id])
  items           OrderItem[]

  @@map("orders")
}

model OrderItem {
  id              String          @id @default(uuid())
  orderId         String
  productId       String
  variantId       String?
  unitPrice       Decimal         @db.Decimal(10, 2)
  quantity        Int
  totalPrice      Decimal         @db.Decimal(10, 2)
  productTitleBn  String          // Snapshot of product title at purchase time
  productTitleEn  String

  order           Order           @relation(fields: [orderId], references: [id], onDelete: Cascade)
  product         Product         @relation(fields: [productId], references: [id])
  variant         ProductVariant? @relation(fields: [variantId], references: [id])

  @@map("order_items")
}

model AuditLog {
  id        String   @id @default(uuid())
  userId    String
  action    String   // e.g., "PRODUCT_CREATED", "ORDER_STATUS_UPDATED"
  details   String?  // JSON details of action
  ipAddress String?
  createdAt DateTime @default(now())

  user      User     @relation(fields: [userId], references: [id])

  @@map("audit_logs")
}