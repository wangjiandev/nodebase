import { AppHeader } from "@/components/app-header";

const Layout = ({ children }: { children: React.ReactNode }) => (
  <div className="flex h-full flex-col">
    <AppHeader />
    <main className="flex-1">{children}</main>
  </div>
);

export default Layout;
