"use client";

import { useEffect, useState } from "react";

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

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch("/api/public/products")
      .then((res) => res.json())
      .then(setProducts);
  }, []);

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

              <a href={`/checkout?priceId=${price.id}`}>
                Buy
              </a>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
