import { prisma } from "../db";
import { getCurrentUser } from "./current-user";

export async function getActiveOrganization() {
  const user = await getCurrentUser();

  if (!user) {
    return null;
  }

  const membership = await prisma.membership.findFirst({
    where: {
      userId: user.id,
    },
    include: {
      organization: true,
    },
  });

  return membership?.organization ?? null;
}
