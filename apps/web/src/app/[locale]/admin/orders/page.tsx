"use client";

import { useEffect, useState } from "react";

type Order = {
  id: string;
  totalAmount: number;
  currency: string;
};

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    fetch("/api/admin/orders", { credentials: "include" })
      .then((res) => res.json())
      .then(setOrders);
  }, []);

  return (
    <div>
      <h1>Orders</h1>

      <ul>
        {orders.map((o) => (
          <li key={o.id}>
            {o.totalAmount / 100} {o.currency}
          </li>
        ))}
      </ul>
    </div>
  );
}
