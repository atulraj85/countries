import Link from "next/link";
import { useTranslations } from "next-intl";

import { buttonVariants } from "@/components/ui/button";

import { CenteredMenu } from "./CenteredMenu";
import { Section } from "./Section";

const navbar = [
  {
    name: "Features",
    link: "/",
  },
  {
    name: "Features",
    link: "/",
  },
  {
    name: "Features",
    link: "/",
  },
  {
    name: "Features",
    link: "/",
  },
];

const Navbar = () => {
  // const t = useTranslations("Navbar");

  return (
    <Section className="px-3 py-6">
      <CenteredMenu
        logo={<div>Global Biz</div>}
        rightMenu={
          <>
            <li>
              {/* <Link href="/sign-in">{t("sign_in")}</Link> */}
              <Link href="/sign-in">Sign In</Link>
            </li>
            <li>
              <Link className={buttonVariants()} href="/sign-up">
                Sign Up
              </Link>
            </li>
          </>
        }
      >
        {navbar.map((nav) => (
          <li>
            <Link href={nav.link}>{nav.name}</Link>
          </li>
        ))}
      </CenteredMenu>
    </Section>
  );
};

export { Navbar };
