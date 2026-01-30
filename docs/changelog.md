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

## [0.6.0] - Payments (Stripe)

### 0.6.1 Stripe Integration

- Added Stripe SDK
- Configured environment keys

### 0.6.2 Checkout Flow

- Create checkout session API
- Generate Stripe hosted checkout

### 0.6.3 Webhooks

- Stripe webhook endpoint
- Create order, invoice, and payment on success

## [0.7.0] - Subscriptions & Customer Model

### 0.7.1 Customer Mapping

- Create Stripe customer on signup
- Store externalCustomerId in DB

### 0.7.2 Subscription Checkout

- Subscription checkout session API
- Use existing Stripe customer

### 0.7.3 Subscription Webhooks

- Store subscription on checkout completion

## [0.8.0] - Customer Portal & Billing

### 0.8.1 Subscription Retrieval

- Active subscription API

### 0.8.2 Cancel Subscription

- Cancel subscription API
- Update DB status

### 0.8.3 Change Plan

- New subscription checkout for plan change

## [0.9.0] - Admin Dashboard APIs

### 0.9.1 Customers

- Admin list customers API

### 0.9.2 Orders

- Admin list orders API

### 0.9.3 Subscriptions

- Admin list subscriptions API

### 0.9.4 Revenue

- Admin revenue totals API

## [1.0.0] - Frontend MVP

### 1.0.1 Auth Pages

- Signup page
- Login page

### 1.0.2 Storefront

- Product listing page
- Checkout page

### 1.0.3 i18n

- Locale routing (en, ar)
- RTL support

## [1.1.0] - Hardening & SEO

### 1.1.1 Forms

- React Hook Form + Zod validation
- Internationalized error messages

### 1.1.2 SEO

- Metadata on homepage
- Server-rendered product listing

### 1.1.3 Stability

- Global loading UI
- Global error boundary

## [1.2.0] - Admin & Customer UI

### 1.2.1 Admin
- Product management
- Price management
- Orders list
- Subscriptions list
- Revenue page

### 1.2.2 Customer
- Billing portal page
