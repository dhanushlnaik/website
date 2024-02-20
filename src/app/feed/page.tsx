"use client";
import { useState, useEffect } from "react";
import { getCurrentUser } from "@/lib/session";
import { getPosts } from "../_action";
import EventCard from "@/components/Events/EventCard";
const EventPage = () => {
  const [posts, setPosts] = useState<any[]>([]);
  useEffect(() => {
    async function fetchPosts() {
      const posts = await getPosts();
      setPosts(posts);
    }
    fetchPosts();
  }, []);

  return (
    <>
      <div className="min-h-screen">
        <div className="grid 2xl:grid-cols-4 xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 pt-[15dvh] max-w-[80vw] mx-auto gap-5">
          {posts?.map((post, index) => {
            // console.log(
            //   index,
            //   new Date(post.createdAt),
            //   new Date(post.expiresAt),
            //   new Date()
            // );
            // if (new Date(post.expiresAt) < new Date())
            //   return (
            //     <section key={index}>
            //       <EventCard
            //         category={post.category}
            //         description={post.description}
            //         image={post.image}
            //         createdAt={post.createdAt}
            //         expectedCompletion={post.expectedCompletion}
            //         expiresAt={post.expiresAt}
            //         reports={post.reports}
            //         author={post.author}
            //       />
            //     </section>
            //   );
            return (
              <section key={index}>
                <EventCard
                  category={post.category}
                  description={post.description}
                  image={post.image}
                  createdAt={post.createdAt}
                  expectedCompletion={post.expectedCompletion}
                  expiresAt={post.expiresAt}
                  reports={post.reports}
                  author={post.author}
                />
              </section>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default EventPage;
