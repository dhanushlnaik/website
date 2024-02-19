"use client";
import { useMemberStore } from "@/store";
import { X } from "lucide-react";
import { getCurrentUser } from "@/lib/session";
import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
export default function AddPost() {
  const { addEventOpen } = useMemberStore();
  const setAddEventOpen = useMemberStore((state) => state.setAddEventOpen);
  const [user, setUser] = useState<any>(null);
  useEffect(() => {
    async function fetchUser() {
      const user = await getCurrentUser();
      setUser(user);
    }
    fetchUser();
  });
  return (
    <>
      {user && (
        <>
          <span
            className={`text-white bg-black md:text-2xl sm:text-xl text-lg px-4 py-2 rounded-xl cursor-pointer w-fit flex justify-center items-center space-x-4 z-50`}
            onClick={() => {
              setAddEventOpen();
            }}
          >
            <Plus /> Add Post
          </span>

          {addEventOpen && (
            <div className="fixed inset-0 z-50 bg-black/80">
              <div className="fixed left-[50%] top-[50%] z-50 grid w-full rounded-md max-w-lg translate-x-[-50%] p-4 translate-y-[-50%] gap-4 border bg-white">
                <span
                  className="absolute top-4 right-4 text-lightGray cursor-pointer hover:border border-darkGray rounded-md duration-300 p-[0.1rem]"
                  onClick={() => {
                    setAddEventOpen();
                  }}
                >
                  <X />
                </span>
                <div className="flex flex-col gap-6">
                  <h3 className="text-lg font-semibold leading-none tracking-tight text-white"></h3>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}
