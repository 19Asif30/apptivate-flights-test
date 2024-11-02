"use client";

import Link from "next/link";
import { LayoutGrid, LogOut, User } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import { useEffect, useState } from "react";
import Image from "next/image";

const getAvatarText = (text?: string) => {
  return (
    text
      ?.split(" ")
      .map((word) => word.at(0)?.toUpperCase())
      .slice(0, 2)
      .join("") || ""
  );
};

export function UserNav() {
  const { data: userData } = useSession();
  const [providers, setProviders] = useState(null);

  useEffect(() => {
    const setProvidersValue = async () => {
      const response = await getProviders();
      setProviders(response);
    };

    setProvidersValue();
  }, []);

  return (
    <>
      {userData ? (
        <DropdownMenu>
          <TooltipProvider disableHoverableContent>
            <Tooltip delayDuration={100}>
              <TooltipTrigger asChild>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="relative h-8 w-8 rounded-full"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="#" alt="Avatar" />
                      <AvatarFallback className="bg-transparent">
                        {/* {getAvatarText(userData?.user?.name || undefined)} */}
                        <Image
                          src={userData?.user?.image}
                          // alt="profile-image"
                          width={37}
                          height={37}
                          // className="rounded-full"
                        />
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
              </TooltipTrigger>
              <TooltipContent side="bottom">Profile</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">
                  {userData?.user?.name}
                  {userData?.user?.role && (
                    <span className="uppercase">{` (${userData?.user?.role})`}</span>
                  )}
                </p>
                <p className="text-xs leading-none text-muted-foreground">
                  {userData?.user?.email}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
             
              {/* <DropdownMenuItem className="hover:cursor-pointer" asChild>
            <Link href="/account" className="flex items-center">
              <User className="w-4 h-4 mr-3 text-muted-foreground" />
              Account
            </Link>
          </DropdownMenuItem> */}
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="hover:cursor-pointer"
              onClick={() => signOut()}
            >
              <LogOut className="w-4 h-4 mr-3 text-muted-foreground" />
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        providers &&
        Object.values(providers).map((provider) => (
          <Button
            key={provider?.id}
            variant="outline"
            onClick={() => signIn(provider?.id)}
          >
            Log in
          </Button>
        ))
      )}
    </>
  );
}
