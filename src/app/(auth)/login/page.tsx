import { LoginForm } from "@/features/auth/components/login-form";
import { requireUnauth } from "@/lib/auth-util";

export default async function Page() {
  await requireUnauth();
  return <LoginForm />;
}
