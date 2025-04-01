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
    <HeroUINavbar maxWidth="xl" position="sticky">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <Image alt="BRS Logo" height={32} src="/logo.png" width={32} />
            <p className="font-bold text-inherit">BRS</p>
            <p className="text-sm text-default-500">Blender Render Suite</p>
          </NextLink>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden sm:flex gap-2">
          <Button
            isExternal
            aria-label="Github"
            as={Link}
            href={siteConfig.links.github}
            startContent={<Github className="text-default-500" />}
            variant="bordered"
          >
            GitHub
          </Button>
        </NavbarItem>
        <NavbarItem className="hidden md:flex">
          <Button
            isExternal
            as={Link}
            color="primary"
            href={siteConfig.links.download}
            startContent={<Download />}
            variant="shadow"
          >
            Download
          </Button>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <Link isExternal aria-label="Github" href={siteConfig.links.github}>
          <Github className="text-default-500" />
        </Link>
      </NavbarContent>
    </HeroUINavbar>
  );
};
