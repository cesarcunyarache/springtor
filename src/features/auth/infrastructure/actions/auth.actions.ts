"use server";

import { prisma } from "@/prisma";

export async function getUserFromDb(email: string) {
  try {
    return await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        password: true,
        name: true,
        imageUrl: true,
        emailVerified: true,
      },
    });
  } catch {
    return null;
  }
}
