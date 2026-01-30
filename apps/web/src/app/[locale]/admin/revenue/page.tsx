"use client";

import { useEffect, useState } from "react";

export default function AdminRevenuePage() {
  const [revenue, setRevenue] = useState(0);

  useEffect(() => {
    fetch("/api/admin/revenue", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setRevenue(data.total));
  }, []);

  return (
    <div>
      <h1>Revenue</h1>

      <p>Total: {revenue / 100}</p>
    </div>
  );
}
