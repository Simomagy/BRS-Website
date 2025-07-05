import {
  Navbar as HeroUINavbar,
  NavbarContent,
  NavbarBrand,
  NavbarItem,
} from "@heroui/navbar";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import NextLink from "next/link";
import Image from "next/image";
import { Download, Github } from "lucide-react";

import { siteConfig } from "@/config/site";

export const Navbar = () => {
  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-4xl px-4">
      <div className=" border-2 border-neutral-700/50 rounded-2xl shadow-2xl">
        <HeroUINavbar
          maxWidth="full"
          className="rounded-2xl bg-neutral-900/80 backdrop-blur-md"
          classNames={{
            wrapper: "px-6",
            brand: "mr-4",
            content: "gap-6",
          }}
        >
          <NavbarContent className="basis-1/5 sm:basis-auto" justify="start">
            <NavbarBrand as="li" className="gap-3 max-w-fit">
              <NextLink
                className="flex justify-start items-center gap-3"
                href="/"
              >
                <Image
                  alt="BRS Logo"
                  height={32}
                  src="/logo.png"
                  width={32}
                  className="rounded-lg"
                />
                <div className="flex flex-col">
                  <p className="font-bold text-white text-lg">BRS</p>
                  <p className="text-xs text-neutral-400 hidden sm:block">
                    Blender Render Suite
                  </p>
                </div>
              </NextLink>
            </NavbarBrand>
          </NavbarContent>

          <NavbarContent className="hidden sm:flex gap-8" justify="center">
            <NavbarItem>
              <Link
                className="text-neutral-300 hover:text-white transition-colors font-medium"
                href="/"
              >
                Home
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Link
                className="text-neutral-300 hover:text-white transition-colors font-medium"
                href="#features"
              >
                Features
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Link
                className="text-neutral-300 hover:text-white transition-colors font-medium"
                href="#gallery"
              >
                Gallery
              </Link>
            </NavbarItem>
          </NavbarContent>

          <NavbarContent className="basis-1/5 sm:basis-auto" justify="end">
            <NavbarItem className="hidden sm:flex">
              <Button
                isExternal
                aria-label="Github"
                as={Link}
                href={siteConfig.links.github}
                startContent={<Github className="h-4 w-4" />}
                variant="bordered"
                className="border-neutral-600 text-neutral-300 hover:border-neutral-500 hover:text-white"
                size="sm"
              >
                GitHub
              </Button>
            </NavbarItem>
            <NavbarItem>
              <Button
                isExternal
                as={Link}
                color="primary"
                href={siteConfig.links.download}
                startContent={<Download className="h-4 w-4" />}
                variant="shadow"
                size="sm"
                className="bg-primary hover:bg-primary/90"
              >
                Download
              </Button>
            </NavbarItem>
          </NavbarContent>

          {/* Mobile GitHub link */}
          <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
            <Link isExternal aria-label="Github" href={siteConfig.links.github}>
              <Github className="text-neutral-400 hover:text-white h-5 w-5" />
            </Link>
          </NavbarContent>
        </HeroUINavbar>
      </div>
    </div>
  );
};
