import { prisma } from "@/server/db";
type Product = {
  id: string;
  name: string;
  prices: {
    id: string;
    amount: number;
    currency: string;
    interval?: string | null;
  }[];
};
export const metadata = {
  title: "Kartzap – Sell Anything, Anywhere",
  description: "Multi-tenant eCommerce SaaS with subscriptions and payments",
};
export default async function HomePage() {
  const products = await prisma.product.findMany({
    where: { isActive: true },
    include: { prices: true },
  });

  return (
    <div>
      <h1>Products</h1>

      {products.map((p) => (
        <div key={p.id}>
          <h2>{p.name}</h2>

          {p.prices.map((price) => (
            <div key={price.id}>
              {price.amount / 100} {price.currency}
              {price.interval && ` / ${price.interval}`}
              <a href={`/checkout?priceId=${price.id}`}>Buy</a>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
