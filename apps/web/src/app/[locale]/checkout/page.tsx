"use client";

import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";

export default function CheckoutPage() {
  const t = useTranslations();
  const params = useSearchParams();
  const priceId = params.get("priceId");

  async function startCheckout() {
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ priceId }),
    });

    const data = await res.json();
    window.location.href = data.url;
  }

  return (
    <div>
      <h1>{t("CHECKOUT")}</h1>

      <button onClick={startCheckout}>{t("PAY_NOW")}</button>
    </div>
  );
}
