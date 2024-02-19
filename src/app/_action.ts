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

export async function addPost(newPost: any) {
  let expiresAt = new Date(newPost.expectedCompletion);
  expiresAt = new Date(expiresAt.getTime() + 24 * 60 * 60 * 1000);
  await prisma.post.create({
    data: {
      category: newPost.category,
      description: newPost.description,
      latitude: newPost.latitude,
      longitude: newPost.longitude,
      image: newPost.image,
      expectedCompletion: newPost.expectedCompletion,
      expiresAt: expiresAt,
      userId: newPost.userId,
    },
  });
}
