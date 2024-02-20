"use server";
import { getServerSession } from "next-auth";
import { authOptions } from "./authOptions";
import prisma from "../../prisma/client";

export async function getCurrentUser() {
  const session = await getServerSession(authOptions);
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: session?.user?.email,
      },
      include: {
        Report: true,
        Post: true,
      },
    });
    return user;
  } catch (error) {
    console.log("No user found");
    return null;
  }
}
