import Image from "next/image";
import Link from "next/link";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-svh w-full flex-col items-center justify-center gap-6 p-6 md:p-10">
      <Link
        className="flex items-end gap-2 font-bold text-2xl text-[#1b3340]"
        href="/"
      >
        <Image alt="Logo" height={55} src="/logo.svg" width={71} />
        Nodebase
      </Link>
      <div className="w-full max-w-sm">{children}</div>
    </div>
  );
}
