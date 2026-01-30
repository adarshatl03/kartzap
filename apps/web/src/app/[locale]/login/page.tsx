"use client";

import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

type FormData = z.infer<typeof schema>;

export default function LoginPage() {
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
    const res = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    if (res?.ok) {
      router.push("/");
    } else {
      alert(t("INVALID_INPUT"));
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>{t("LOGIN")}</h1>

      <input placeholder={t("EMAIL")} {...register("email")} />
      {errors.email && <p>{t("INVALID_EMAIL")}</p>}

      <input
        type="password"
        placeholder={t("PASSWORD")}
        {...register("password")}
      />
      {errors.password && <p>{t("PASSWORD_TOO_SHORT")}</p>}

      <button disabled={isSubmitting}>
        {isSubmitting ? t("LOADING") : t("LOGIN")}
      </button>
    </form>
  );
}
