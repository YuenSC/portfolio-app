import { memo, useMemo } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import Link from "next/link";
import { File, Mail } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { useTranslations } from "next-intl";

const NavBarContactDropdown = () => {
  const t = useTranslations();

  const contacts = useMemo(
    () => [
      {
        href: "mailto:scyuenab@gmail.com",
        label: t("NavBarContactDropdown.email"),
        icon: Mail,
      },
      {
        href: "https://www.linkedin.com/in/sing-chun-yuen-423a09185/",
        label: t("NavBarContactDropdown.linkedin"),
        icon: FaLinkedin,
      },
      {
        href: "https://github.com/YuenSC",
        label: t("NavBarContactDropdown.github"),
        icon: FaGithub,
      },
      {
        href: "/YUEN Sing Chun (Calvin)_Resume.pdf",
        label: t("NavBarContactDropdown.resume"),
        icon: File,
      },
    ],
    [t],
  );
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="bg-background-reversed">
          {t("NavBarContactDropdown.contact-me")}
          <span className="sr-only">
            Ways of Contact Calvin Yuen like Email, LinkedIn and Github
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {contacts.map(({ href, label, icon: Icon }) => (
          <DropdownMenuItem
            key={href}
            asChild
            className="cursor-pointer text-black dark:text-white"
          >
            <Link
              href={href}
              target="_blank"
              scroll={false}
              className="flex items-center gap-2"
            >
              <Icon size={16} />
              {label}
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default memo(NavBarContactDropdown);
