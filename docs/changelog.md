## [0.1.0] - Foundation Setup

### 0.1.1 Project Bootstrap

- Initialized Kartzap repository
- Created Next.js app with App Router, TypeScript, Tailwind, ESLint
- Installed core dependencies (Prisma, NextAuth, Zod, bcrypt, dotenv)
- Initialized Prisma with base schema file
- Added src-based folder structure
- Created base documentation files

### 0.1.2 Database Design

- Designed multi-tenant SaaS schema
- Added models: User, Organization, Product, Order, Subscription, etc.
- Configured relationships for tenancy and billing

## [0.2.0] - Database Foundation

### 0.2.1 Core Schema
- Designed multi-tenant Prisma schema
- Added organizations, memberships, products, prices, customers
- Added subscriptions, orders, invoices, payments, audit logs
- Added external provider ID fields
- Added soft-delete flags and currency support

### 0.2.2 Database Initialization
- Configured Prisma v7 datasource via prisma.config.ts
- Connected Supabase PostgreSQL using session pooler
- Ran initial migration
- Generated Prisma Client

