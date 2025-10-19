import { LoginForm } from "@/features/auth/components/login-form";
import { requireUnauth } from "@/lib/auth-util";

export default async function Page() {
  await requireUnauth();
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  );
}
