import { NextResponse } from "next/server";
import { requireAdmin } from "@/server/auth/require-admin";

export async function GET() {
  try {
    await requireAdmin();

    return NextResponse.json({
      message: "You are admin. Access granted.",
    });
  } catch (err) {
    return NextResponse.json(
      { error: "Forbidden" },
      { status: 403 }
    );
  }
}
