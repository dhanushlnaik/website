"use client";
import { Card, CardTitle, CardHeader, CardContent } from "@/components/ui/card";
import { Check } from "lucide-react";
import { getCurrentUser } from "@/lib/session";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CldUploadButton, CldUploadWidgetResults } from "next-cloudinary";
import Image from "next/image";
import { useToast } from "@/components/ui/use-toast";
import { updateProfile } from "../_action";

export default function Profile() {
  const [user, setUser] = useState<any>(null);
  const { toast } = useToast();
  useEffect(() => {
    async function fetchUser() {
      const user = await getCurrentUser();
      setUser(user);
    }
    fetchUser();
  }, []);

  const handleUpload = (result: CldUploadWidgetResults) => {
    const info = result.info as object;
    if ("secure_url" in info && "public_id" in info) {
      setUser({ ...user, image: info.secure_url });
    }
  };

  async function handleSave() {
    try {
      await updateProfile(user);
      toast({ title: "Profile updated successfully" });
    } catch (e) {
      toast({ title: "Error updating profile" });
    }
  }
  return (
    <div className="flex min-h-screen w-full justify-center items-center">
      <Card className="md:w-[30rem] w-[95vw]">
        <CardHeader>
          <CardTitle>Edit Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-5">
            <span className="flex justify-center w-full">
              <CldUploadButton
                uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
                onUpload={handleUpload}
              >
                <Image
                  src={user?.image}
                  alt={user?.name}
                  className="w-24 justify-center rounded-full"
                  width={500}
                  height={500}
                />
              </CldUploadButton>
            </span>
            <span>
              <Input
                name="name"
                onChange={(e) => {
                  setUser({ ...user, name: e.target.value });
                }}
                placeholder="Name"
                value={user?.name}
              />
            </span>
            <span>
              <Input name="email" value={user?.email} disabled />
            </span>

            {!user?.kycVerified ? (
              <span className="flex text-red-600">
                Please complete your KYC to be able to add new events
              </span>
            ) : (
              <span className="flex text-green-600">
                <Check /> KYC Verified
              </span>
            )}

            <Button onClick={handleSave}>Save</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
