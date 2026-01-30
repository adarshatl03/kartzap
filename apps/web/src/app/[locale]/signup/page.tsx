"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

export default function SignupPage() {
  const t = useTranslations();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [org, setOrg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        password,
        organizationName: org,
      }),
    });

    if (res.ok) {
      router.push("/login");
    } else {
      alert("Signup failed");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>{t("signup")}</h1>

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <input
        placeholder="Organization"
        value={org}
        onChange={(e) => setOrg(e.target.value)}
      />

      <button type="submit">
        {t("signup")}
      </button>
    </form>
  );
}
