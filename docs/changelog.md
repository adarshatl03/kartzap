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

## [0.3.0] - Authentication & Identity

### 0.3.1 Auth Core
- Configured NextAuth with Credentials provider
- Integrated Prisma adapter
- Enabled JWT-based sessions
- Added secure password hashing with bcrypt

### 0.3.2 Signup & Tenant Bootstrap
- Implemented signup API
- Auto-create organization on signup
- Assign creator as ADMIN via membership

### 0.3.3 Login & Session Validation
- Verified credentials login
- Verified session endpoint

## [0.4.0] - Authorization & RBAC

### 0.4.1 Session & User Helpers
- Added getSession helper
- Added getCurrentUser helper

### 0.4.2 Organization Context
- Added getActiveOrganization helper

### 0.4.3 Role-Based Access Control
- Added requireAdmin helper
- Added protected admin test API

## [0.5.0] - Product & Pricing Core

### 0.5.1 Products
- Admin-only product creation API
- Organization-scoped product listing

### 0.5.2 Prices
- Admin-only price creation
- Support for recurring and one-time prices

### 0.5.3 Public Catalog
- Public products API with prices and organization info
