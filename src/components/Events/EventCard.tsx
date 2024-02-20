import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ThumbsDown } from "lucide-react";
import { reportPost } from "@/app/_action";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
interface CardProps {
  id: string;
  category: string;
  description: string;
  image: string;
  createdAt: Date;
  expectedCompletion: Date;
  expiresAt: Date;
  reports: number;
  author: any;
}

const EventCard: React.FC<CardProps> = ({
  id,
  category,
  description,
  image,
  createdAt,
  expectedCompletion,
  expiresAt,
  reports,
  author,
}) => {
  return (
    <Card className="max-w-[30rem] h-[30rem] flex flex-col justify-between hover:scale-105 duration-300">
      <CardHeader className="space-y-4">
        <div className="flex w-full justify-between items-center">
          <span className="flex md:flex-row flex-col gap-2 items-center text-sm">
            <Image
              src={author.image}
              alt={author.name}
              width={200}
              height={200}
              className="w-8 h-8 rounded-full"
            />
            {author.name}
          </span>
          <Badge variant={"destructive"}>{category.replaceAll("_", " ")}</Badge>
        </div>
        <Image
          src={image}
          alt={category}
          width={500}
          height={200}
          className="w-full h-full rounded-lg"
        />
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <span className="text-xl">{description}</span>
      </CardContent>

      <CardFooter>
        <div className="flex flex-col w-full gap-y-4">
          <div className="flex justify-between w-full text-xs text-slate-400">
            <div className="flex flex-col justify-center items-center">
              <span className="font-bold text-center">Posted at</span>
              <span>
                {createdAt.getDate() < 10
                  ? "0" + createdAt.getDate()
                  : createdAt.getDate()}
                -
                {createdAt.getMonth() + 1 < 10
                  ? "0" + (createdAt.getMonth() + 1)
                  : createdAt.getMonth() + 1}
                -{createdAt.getFullYear()}
              </span>
              <span>
                {createdAt.getHours() < 10
                  ? "0" + createdAt.getHours()
                  : createdAt.getHours()}
                :
                {createdAt.getMinutes() < 10
                  ? "0" + createdAt.getMinutes()
                  : createdAt.getMinutes() < 10
                  ? "0" + createdAt.getMinutes()
                  : createdAt.getMinutes()}
              </span>
            </div>

            <div className="flex flex-col justify-center items-center">
              <span className="font-bold text-center">Ends at</span>
              <span>
                {expectedCompletion.getDate() < 10
                  ? "0" + expectedCompletion.getDate()
                  : expectedCompletion.getDate()}
                -
                {expectedCompletion.getMonth() + 1 < 10
                  ? "0" + (expectedCompletion.getMonth() + 1)
                  : expectedCompletion.getMonth() + 1}
                -{expectedCompletion.getFullYear()}
              </span>

              <span>
                {expectedCompletion.getHours() < 10
                  ? "0" + expectedCompletion.getHours()
                  : expectedCompletion.getHours()}
                :
                {expectedCompletion.getMinutes() < 10
                  ? "0" + expectedCompletion.getMinutes()
                  : expectedCompletion.getMinutes() < 10
                  ? "0" + expectedCompletion.getMinutes()
                  : expectedCompletion.getMinutes()}
              </span>
            </div>
          </div>
          <div className="flex w-full justify-end">
            <span
              className="cursor-pointer"
              onClick={() => {
                reportPost(id, author.id);
              }}
            >
              <ThumbsDown color="red" className="h-4 w-4" />
            </span>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default EventCard;
