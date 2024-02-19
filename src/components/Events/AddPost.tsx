"use client";
import { useStateStore } from "@/store";
import { X } from "lucide-react";
import { getCurrentUser } from "@/lib/session";
import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { format, set } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { TimePicker } from "@/components/DateTimePicker/timePicker";
import { Input } from "../ui/input";
import { CldUploadButton, CldUploadWidgetResults } from "next-cloudinary";
import Image from "next/image";
import { useToast } from "@/components/ui/use-toast";
import { addPost } from "@/app/_action";

export default function AddPost() {
  const { addEventOpen, longitude, latitude } = useStateStore();
  const setAddEventOpen = useStateStore((state) => state.setAddEventOpen);
  const [user, setUser] = useState<any>(null);
  const { toast } = useToast();
  const [newPost, setNewPost] = useState<any>({
    category: "MODERATE_TRAFFIC",
    description: "",
    latitude: 0,
    longitude: 0,
    image: "",
    expectedCompletion: "",
    expiresAt: "",
    userId: user?.id,
  });

  useEffect(() => {
    async function fetchUser() {
      const user = await getCurrentUser();
      setUser(user);
    }
    fetchUser();
  }, []);

  useEffect(() => {
    setNewPost({
      ...newPost,
      latitude: latitude,
      longitude: longitude,
    });
  }, [longitude, latitude]);

  const handleUpload = (result: CldUploadWidgetResults) => {
    const info = result.info as object;
    if ("secure_url" in info && "public_id" in info) {
      setUser({ ...newPost, image: info.secure_url });
    }
  };

  async function handleAddPost() {
    try {
      if (
        !newPost.image ||
        !newPost.expectedCompletion ||
        !newPost.description ||
        !newPost.latitude ||
        !newPost.longitude
      ) {
        await addPost(newPost);
        toast({
          title: "Post added successfully",
        });
        setAddEventOpen();
      } else {
        toast({
          title: "Please fill all the fields",
        });
      }
    } catch (error) {
      toast({
        title: "Failed to add post",
      });
    }
  }
  const [date, setDate] = useState<Date>();
  useEffect(() => {
    setNewPost((prev: any) => ({ ...prev, expectedCompletion: date }));
  }, [date]);

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
                  <h3 className="text-lg font-semibold leading-none tracking-tight text-black">
                    Add Event
                  </h3>

                  <select
                    value={newPost.category}
                    defaultValue={"Moderate Traffic"}
                    className="border p-2 rounded-lg"
                    onChange={(e) => {
                      setNewPost({ ...newPost, category: e.target.value });
                    }}
                  >
                    <option value="MODERATE_TRAFFIC">Moderate Traffic</option>
                    <option value="HEAVY_TRAFFIC">Heavy Traffic</option>
                    <option value="ACCIDENT">Accident</option>
                    <option value="ROAD_BLOCK">Road Block</option>
                    <option value="POLICE_CHECK">Police Check</option>
                    <option value="CONSTRUCTION">Construction</option>
                    <option value="OTHERS">Other</option>
                  </select>

                  <Input
                    type="text"
                    placeholder="Description"
                    value={newPost?.description}
                    onChange={(e) => {
                      setNewPost({ ...newPost, description: e.target.value });
                    }}
                  />

                  <div className="flex flex-col space-y-1 w-full">
                    <span className="flex justify-between w-full gap-4">
                      <Input
                        type="text"
                        placeholder="Longitude"
                        value={newPost?.longitude}
                        onChange={(e) => {
                          setNewPost({ ...newPost, longitude: e.target.value });
                        }}
                      />
                      <Input
                        type="text"
                        placeholder="Latitude"
                        value={newPost?.latitude}
                        onChange={(e) => {
                          setNewPost({ ...newPost, latitude: e.target.value });
                        }}
                      />
                    </span>
                    <span className="text-slate-500 text-xs">
                      *This will be auto fetched if you click anywhere on the
                      map
                    </span>
                  </div>

                  <span className="flex justify-center w-full">
                    <CldUploadButton
                      uploadPreset={
                        process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
                      }
                      onUpload={handleUpload}
                    >
                      {newPost?.image ? (
                        <Image
                          src={newPost?.image}
                          alt={user?.name}
                          className="w-full"
                          width={500}
                          height={500}
                        />
                      ) : (
                        <span className="bg-black text-white w-full px-4 py-2 rounded-lg">
                          Upload an Image
                        </span>
                      )}
                    </CldUploadButton>
                  </span>

                  <div className="flex flex-col space-y-2">
                    <span className="text-slate-500 text-xs">
                      *Please choose date and time of expected completion
                    </span>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !date && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {date ? (
                            format(date, "PPP HH:mm:ss")
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          initialFocus
                        />
                        <div className="p-3 border-t border-border">
                          <TimePicker setDate={setDate} date={date} />
                        </div>
                      </PopoverContent>
                    </Popover>
                  </div>

                  <Button>
                    <span onClick={handleAddPost}>Add Post</span>
                  </Button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}
