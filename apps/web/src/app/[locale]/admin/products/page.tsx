"use client";

import { useEffect, useState } from "react";

type Product = {
  id: string;
  name: string;
};

export default function AdminProductsPage() {
  const [name, setName] = useState("");
  const [products, setProducts] = useState<Product[]>([]);

  async function loadProducts() {
    const res = await fetch("/api/products/list");
    const data = await res.json();
    setProducts(data);
  }

  async function createProduct() {
    await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });

    setName("");
    loadProducts();
  }

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <div>
      <h1>Products</h1>

      <input
        placeholder="Product name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <button onClick={createProduct}>Create</button>

      <ul>
        {products.map((p) => (
          <li key={p.id}>
            {p.name} – <a href={`/admin/products/${p.id}`}>Add Price</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
