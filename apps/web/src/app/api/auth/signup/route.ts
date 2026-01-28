import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { prisma } from "@/server/db";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password, name, organizationName } = body;

    if (!email || !password || !organizationName) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const existing = await prisma.user.findUnique({
      where: { email },
    });

    if (existing) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashed,
        name,
        memberships: {
          create: {
            role: "ADMIN",
            organization: {
              create: {
                name: organizationName,
              },
            },
          },
        },
      },
    });

    return NextResponse.json({
      id: user.id,
      email: user.email,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
