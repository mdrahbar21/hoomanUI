"use client"

import * as React from "react";
import Link from "next/link";
import { usePathname } from 'next/navigation';
import {Settings } from "lucide-react";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { sidebar } from "@/data/dummy";

const NavLink = ({ href, children, activeClass, inactiveClass }: { href: string, children: React.ReactNode, activeClass: string, inactiveClass: string }) => {
    const pathname = usePathname();

    const isActive = pathname === href;
    const className = isActive ? inactiveClass : activeClass;

    return (
        <Link href={href} passHref legacyBehavior>
            <a className={className}>
                {children}
            </a>
        </Link>
    );
};

const Sidebar = () => {
    const activeLink="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8";
    const normalLink="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-accent-foreground transition-colors hover:text-foreground md:h-8 md:w-8";
  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
      <nav className="flex flex-col items-center gap-4 px-2 sm:py-4">
        {sidebar.map((item, index) => (
            <Tooltip key={index}>
              <TooltipTrigger asChild>
                <NavLink
                    href={item.address}
                    activeClass={activeLink}
                    inactiveClass={normalLink}
                >
                    {item.icon}
                    <span className="sr-only">{item.title}</span>
                </NavLink>
                </TooltipTrigger>
                <TooltipContent side="right">{item.title}</TooltipContent>
            </Tooltip>
        ))}
      </nav>
      <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-4">
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href="#"
              className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
            >
              <Settings className="h-5 w-5" />
              <span className="sr-only">Settings</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">Settings</TooltipContent>
        </Tooltip>
      </nav>
    </aside>
  );
};

export default Sidebar;
