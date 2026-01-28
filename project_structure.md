# Project Structure

```text
kartzap
├── apps
│   └── web
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
│       │   │   ├── api
│       │   │   │   ├── admin
│       │   │   │   │   └── test
│       │   │   │   │       └── route.ts
│       │   │   │   ├── auth
│       │   │   │   │   ├── [...nextauth]
│       │   │   │   │   │   └── route.ts
│       │   │   │   │   └── signup
│       │   │   │   │       └── route.ts
│       │   │   │   ├── prices
│       │   │   │   │   └── route.ts
│       │   │   │   ├── products
│       │   │   │   │   ├── list
│       │   │   │   │   │   └── route.ts
│       │   │   │   │   └── route.ts
│       │   │   │   └── public
│       │   │   │       └── products
│       │   │   │           └── route.ts
│       │   │   ├── favicon.ico
│       │   │   ├── globals.css
│       │   │   ├── layout.tsx
│       │   │   └── page.tsx
│       │   ├── components
│       │   ├── features
│       │   ├── lib
│       │   └── server
│       │       ├── auth
│       │       │   ├── config.ts
│       │       │   ├── current-user.ts
│       │       │   ├── organization.ts
│       │       │   ├── require-admin.ts
│       │       │   └── session.ts
│       │       └── db.ts
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
