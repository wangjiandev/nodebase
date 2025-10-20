import { AppHeader } from "@/components/app-header";

const Layout = ({ children }: { children: React.ReactNode }) => (
  <>
    <AppHeader />
    <main>{children}</main>
  </>
);

export default Layout;
