"use server";
import prisma from "../../prisma/client";

export async function updateProfile(user: any) {
  await prisma.user.update({
    where: {
      id: user?.id,
    },
    data: {
      name: user?.name,
      image: user?.image,
    },
  });
}
