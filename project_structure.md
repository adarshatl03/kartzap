# Project Structure

```text
kartzap
├── apps
│   └── web
│       ├── messages
│       │   ├── ar.json
│       │   └── en.json
│       ├── prisma
│       │   ├── migrations
│       │   │   ├── 20260128192609_init
│       │   │   │   └── migration.sql
│       │   │   └── migration_lock.toml
│       │   └── schema.prisma
│       ├── public
│       │   ├── file.svg
│       │   ├── globe.svg
│       │   ├── next.svg
│       │   ├── vercel.svg
│       │   └── window.svg
│       ├── src
│       │   ├── app
│       │   │   ├── [locale]
│       │   │   │   ├── admin
│       │   │   │   │   ├── orders
│       │   │   │   │   │   └── page.tsx
│       │   │   │   │   ├── products
│       │   │   │   │   │   ├── [id]
│       │   │   │   │   │   │   └── page.tsx
│       │   │   │   │   │   └── page.tsx
│       │   │   │   │   ├── revenue
│       │   │   │   │   │   └── page.tsx
│       │   │   │   │   ├── subscriptions
│       │   │   │   │   │   └── page.tsx
│       │   │   │   │   └── page.tsx
│       │   │   │   ├── billing
│       │   │   │   │   └── page.tsx
│       │   │   │   ├── checkout
│       │   │   │   │   └── page.tsx
│       │   │   │   ├── login
│       │   │   │   │   └── page.tsx
│       │   │   │   ├── signup
│       │   │   │   │   └── page.tsx
│       │   │   │   ├── layout.tsx
│       │   │   │   └── page.tsx
│       │   │   ├── api
│       │   │   │   ├── admin
│       │   │   │   │   ├── customers
│       │   │   │   │   │   └── route.ts
│       │   │   │   │   ├── orders
│       │   │   │   │   │   └── route.ts
│       │   │   │   │   ├── revenue
│       │   │   │   │   │   └── route.ts
│       │   │   │   │   ├── subscriptions
│       │   │   │   │   │   └── route.ts
│       │   │   │   │   └── test
│       │   │   │   │       └── route.ts
│       │   │   │   ├── auth
│       │   │   │   │   ├── [...nextauth]
│       │   │   │   │   │   └── route.ts
│       │   │   │   │   └── signup
│       │   │   │   │       └── route.ts
│       │   │   │   ├── billing
│       │   │   │   │   ├── cancel
│       │   │   │   │   │   └── route.ts
│       │   │   │   │   ├── change-plan
│       │   │   │   │   │   └── route.ts
│       │   │   │   │   └── subscription
│       │   │   │   │       └── route.ts
│       │   │   │   ├── checkout
│       │   │   │   │   └── route.ts
│       │   │   │   ├── prices
│       │   │   │   │   └── route.ts
│       │   │   │   ├── products
│       │   │   │   │   ├── list
│       │   │   │   │   │   └── route.ts
│       │   │   │   │   └── route.ts
│       │   │   │   ├── public
│       │   │   │   │   └── products
│       │   │   │   │       └── route.ts
│       │   │   │   ├── subscriptions
│       │   │   │   │   └── checkout
│       │   │   │   │       └── route.ts
│       │   │   │   └── webhooks
│       │   │   │       └── stripe
│       │   │   │           └── route.ts
│       │   │   ├── error.tsx
│       │   │   ├── favicon.ico
│       │   │   ├── globals.css
│       │   │   ├── layout.tsx
│       │   │   └── loading.tsx
│       │   ├── components
│       │   │   └── providers.tsx
│       │   ├── features
│       │   ├── lib
│       │   ├── server
│       │   │   ├── auth
│       │   │   │   ├── config.ts
│       │   │   │   ├── current-user.ts
│       │   │   │   ├── organization.ts
│       │   │   │   ├── require-admin.ts
│       │   │   │   └── session.ts
│       │   │   └── db.ts
│       │   ├── i18n.ts
│       │   └── proxy.ts
│       ├── .env
│       ├── .gitignore
│       ├── eslint.config.mjs
│       ├── next-env.d.ts
│       ├── next.config.ts
│       ├── package-lock.json
│       ├── package.json
│       ├── postcss.config.mjs
│       ├── prisma.config.ts
│       ├── README.md
│       ├── tsconfig.json
│       └── tsconfig.tsbuildinfo
├── docs
│   └── changelog.md
└── .gitignore

```
