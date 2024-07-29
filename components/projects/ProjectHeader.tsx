"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

const ProjectHeader = () => {
  const t = useTranslations();

  return (
    <motion.div
      initial={{ y: 30, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1, transition: { delay: 0.3 } }}
      className="container mx-auto w-full px-4 py-12"
    >
      <h1 className="whitespace-pre-line text-2xl font-bold md:text-7xl dark:text-white">
        {t("ProjectPage.some-interesting-nside-projects")}
      </h1>
      <p className="mt-8 max-w-2xl text-base md:text-xl dark:text-neutral-200">
        {t("ProjectPage.description")}
      </p>
    </motion.div>
  );
};

export default ProjectHeader;
