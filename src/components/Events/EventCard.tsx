import { BellIcon, CheckIcon } from "@radix-ui/react-icons"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"


interface CardProps {
    category:string,
    description: string,
    image: string,
    createdAt: Date,
    expectedCompletion: Date,
    expiresAt: Date,
    reports: number,
    author: string

} 

export const CardDemo: React.FC<CardProps> = ({ category, description, image, createdAt, expectedCompletion, expiresAt, reports, author  }) => {
  return (
    <Card className={cn("w-[300px]")}>
      <CardHeader>
        <CardTitle>{category.replace("_", " ")}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className=" flex items-center space-x-4 rounded-md border p-4">
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium leading-none">
                Expected Completion: 
            </p>
            <p className="text-sm text-muted-foreground">
              {author}
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">
          <CheckIcon className="mr-2 h-4 w-4" /> Expires At:{" "}
        </Button>
      </CardFooter>
    </Card>
  )
}
