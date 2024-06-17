"use server";
import prisma from "../../prisma/client";
import { getCurrentUser } from "@/lib/session";

import BadWordsNext from 'bad-words-next';
const en = require('bad-words-next/data/en.json')
const badwords = new BadWordsNext({ data: en })

const user = getCurrentUser().then((res) => res);

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

export async function getPosts() {
  const posts = await prisma.post.findMany({
    include: {
      author: true,
      reports: true,
    },
  });
  return posts;
}

export async function checkVulgarity(sentence: string) {
  let result =  badwords.check(sentence);

  return result;
}

export async function reportPost(postId: string, reporterId: string) {
  await prisma.report.create({
    data: {
      postId: postId,
      reporterId: reporterId,
    },
  });
}
