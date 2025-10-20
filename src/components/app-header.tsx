import { SidebarTrigger } from "./ui/sidebar";

export const AppHeader = () => (
  <header className="flex h-14 w-full shrink-0 items-center border-b bg-background px-4">
    <SidebarTrigger />
  </header>
);
