"use client";

import { useParams } from "next/navigation";
import { useState } from "react";

export default function ProductPricesPage() {
  const params = useParams();
  const productId = params.id as string;

  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("INR");
  const [interval, setInterval] = useState("month");

  async function createPrice() {
    await fetch("/api/prices", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        productId,
        amount: Number(amount),
        currency,
        interval,
      }),
    });

    alert("Price created");
  }

  return (
    <div>
      <h1>Create Price</h1>

      <input
        placeholder="Amount (cents)"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <input
        placeholder="Currency"
        value={currency}
        onChange={(e) => setCurrency(e.target.value)}
      />

      <input
        placeholder="Interval (month/year)"
        value={interval}
        onChange={(e) => setInterval(e.target.value)}
      />

      <button onClick={createPrice}>
        Create Price
      </button>
    </div>
  );
}
