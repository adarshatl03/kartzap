"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  organizationName: z.string().min(2),
});

type FormData = z.infer<typeof schema>;

export default function SignupPage() {
  const t = useTranslations();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  async function onSubmit(data: FormData) {
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      router.push("/login");
    } else {
      alert(t("SIGNUP_FAILED"));
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>{t("SIGNUP")}</h1>

      <input placeholder={t("EMAIL")} {...register("email")} />
      {errors.email && <p>{t("ERRORS.INVALID_EMAIL")}</p>}

      <input
        type="password"
        placeholder={t("PASSWORD")}
        {...register("password")}
      />
      {errors.password && <p>{t("ERRORS.PASSWORD_SHORT")}</p>}

      <input
        placeholder={t("ORGANIZATION")}
        {...register("organizationName")}
      />
      {errors.organizationName && <p>{t("ERRORS.ORGANIZATION_REQUIRED")}</p>}

      <button disabled={isSubmitting}>
        {isSubmitting ? t("LOADING") : t("SIGNUP")}
      </button>
    </form>
  );
}
