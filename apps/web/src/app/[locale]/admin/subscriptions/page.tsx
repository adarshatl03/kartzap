"use client";

import { useEffect, useState } from "react";

type Subscription = {
  id: string;
  status: string;
  customer: {
    email: string;
  };
};

export default function AdminSubscriptionsPage() {
  const [subs, setSubs] = useState<Subscription[]>([]);

  useEffect(() => {
    fetch("/api/admin/subscriptions", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then(setSubs);
  }, []);

  return (
    <div>
      <h1>Subscriptions</h1>

      <ul>
        {subs.map((s) => (
          <li key={s.id}>
            {s.customer.email} — {s.status}
          </li>
        ))}
      </ul>
    </div>
  );
}
