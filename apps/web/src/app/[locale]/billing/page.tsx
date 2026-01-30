"use client";

export default function BillingPage() {
  async function openPortal() {
    const res = await fetch("/api/billing/subscription", {
      method: "POST",
      credentials: "include",
    });

    const data = await res.json();
    window.location.href = data.url;
  }

  return (
    <div>
      <h1>Billing</h1>

      <button onClick={openPortal}>
        Manage Subscription
      </button>
    </div>
  );
}
