import { prisma } from "../db";
import { getCurrentUser } from "./current-user";

export async function requireAdmin() {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  const membership = await prisma.membership.findFirst({
    where: {
      userId: user.id,
      role: "ADMIN",
    },
  });

  if (!membership) {
    throw new Error("Forbidden");
  }

  return true;
}
