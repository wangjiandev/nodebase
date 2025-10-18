import { Button } from "@/components/ui/button";
import prisma from "@/lib/db";

const Page = async () => {
  const users = await prisma.user.findMany();
  return (
    <div className="flex min-h-screen min-w-screen flex-col items-center justify-center">
      <Button variant="outline">Click me</Button>
      <code>{JSON.stringify(users)}</code>
    </div>
  );
};
export default Page;
