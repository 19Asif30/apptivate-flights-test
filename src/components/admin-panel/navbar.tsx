import { ModeToggle } from "@/components/mode-toggle";
import { UserNav } from "@/components/admin-panel/user-nav";
import { SheetMenu } from "@/components/admin-panel/sheet-menu";
import Link from "next/link";

interface NavbarProps {
  title: string;
}

export function Navbar({ title }: NavbarProps) {
  return (
    <header className="sticky top-0 z-10 w-full bg-background/95 shadow backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:shadow-secondary">
      <div className="mx-4 sm:mx-8 flex h-16 items-center">
        <div className="flex items-center space-x-4 lg:space-x-0">
          <SheetMenu />
          <Link href={"/"}>
            <h1 className="text-3xl md:text-4xl lg:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-red-500 drop-shadow-lg tracking-wide">
              {title}
            </h1>
          </Link>
        </div>
        <div className="flex flex-1 items-center space-x-2 justify-end">
          <ModeToggle />
          <UserNav />
        </div>
      </div>
    </header>
  );
}
