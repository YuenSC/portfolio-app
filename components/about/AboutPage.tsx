"use client";
import { Variants, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";
import HighlightText from "../HighlightText";
import { StickyScroll } from "../ui/sticky-scroll-reveal";

const container: Variants = {
  hidden: {
    y: 30,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.3,
    },
  },
};

const AboutPage = () => {
  const t = useTranslations();

  const content = [
    {
      title: "2024 JAN",
      subtitle: (
        <Link
          href="https://www.credly.com/badges/014f01d5-6241-4af3-9a65-df4163e9e342/linked_in?t=s82nvd"
          target="_blank"
          className="underline"
        >
          {t("AboutPage.aws-title")}
        </Link>
      ),
      description: (
        <span>
          {t.rich("AboutPage.aws-description", {
            HighlightText: (children) => (
              <HighlightText>{children}</HighlightText>
            ),
          })}
        </span>
      ),
      content: (
        <Link
          href="https://www.credly.com/badges/014f01d5-6241-4af3-9a65-df4163e9e342/linked_in?t=s82nvd"
          target="_blank"
          className="underline"
        >
          <Image
            fill
            src="/aws-ssa-tag.png"
            alt="Tag of AWS Certified Solutions Architect - Associate"
            className="object-contain"
          />
        </Link>
      ),
    },
    {
      title: "2022 OCT - 2024 JAN",
      subtitle: (
        <Link
          href="https://www.app-bar.com/"
          target="_blank"
          className="underline"
        >
          {t("AboutPage.app-bar-title")}
        </Link>
      ),
      description: (
        <span>
          {t.rich("AboutPage.app-bar-description", {
            HighlightText: (children) => (
              <HighlightText>{children}</HighlightText>
            ),
          })}
        </span>
      ),
      content: (
        <Link
          href="https://www.app-bar.com/"
          target="_blank"
          className="underline"
        >
          <Image
            fill
            src="app-bar.svg"
            alt="Tag of AWS Certified Solutions Architect - Associate"
            className="bg-white object-contain"
          />
        </Link>
      ),
    },
    {
      title: "2021 AUG - 2022 AUG",
      subtitle: (
        <Link href="https://talkbox.app/" target="_blank" className="underline">
          {t("AboutPage.talkbox-title")}
        </Link>
      ),
      description: (
        <span>
          {t.rich("AboutPage.talkbox-description", {
            HighlightText: (children) => (
              <HighlightText className="group-[.has-underline]:underline">
                {children}
              </HighlightText>
            ),
            Link: (children) => {
              return (
                <Link
                  href="https://www.airside.com.hk/en"
                  target="_blank"
                  className="has-underline group"
                >
                  {children}
                </Link>
              );
            },
          })}
        </span>
      ),
      content: (
        <Link href="https://talkbox.app/" target="_blank" className="underline">
          <Image
            fill
            src="talkbox.png"
            alt="Talkbox Logo"
            className="object-contain"
          />
        </Link>
      ),
    },
    {
      title: "2017 SEP - 2021 SEP",
      subtitle: (
        <Link
          href="https://hkust.edu.hk/"
          target="_blank"
          className="underline"
        >
          {t("AboutPage.school-title")}
        </Link>
      ),
      description: (
        <span>
          {t.rich("AboutPage.school-description", {
            HighlightText: (children) => (
              <HighlightText className="group-[.has-underline]:underline">
                {children}
              </HighlightText>
            ),
          })}
        </span>
      ),
      content: (
        <Link
          href="https://hkust.edu.hk/"
          target="_blank"
          className="underline"
        >
          <Image
            fill
            src="ust-logo.svg"
            alt="My University (HKUST) Logo"
            className="bg-white object-contain "
          />
        </Link>
      ),
    },
  ];

  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="visible"
      className="container mx-auto min-h-screen px-4 py-12"
    >
      <h1 className="whitespace-pre-line text-2xl font-bold md:text-7xl dark:text-white">
        {t("AboutPage.about")}
      </h1>

      <p className="mt-8 max-w-4xl whitespace-pre-line text-base md:text-xl dark:text-neutral-200">
        {t.rich("AboutPage.description", {
          HighlightText: (children) => (
            <HighlightText>{children}</HighlightText>
          ),
        })}
      </p>

      <div className="mt-8 flex flex-col gap-4">
        <StickyScroll content={content} />
      </div>

      <div className="bg-background lg:min-h-[20vh]"></div>
    </motion.div>
  );
};

export default AboutPage;
