import LogoutButton from "@/components/logout";
import { requireAuth } from "@/lib/auth-util";
import Client from "./client";

const Page = async () => {
  const data = await requireAuth();
  return (
    <div className="flex min-h-screen min-w-screen flex-col items-center justify-center">
      <div className="w-xl">
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
      <LogoutButton />
      <Client />
    </div>
  );
};

export default Page;
