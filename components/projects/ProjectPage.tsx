import { memo, useMemo } from "react";
import { HeroParallax } from "../ui/hero-parallax";
import { useTranslations } from "next-intl";

const ProjectPage = () => {
  const t = useTranslations();

  const products = useMemo(() => {
    return [
      {
        title: t("ProjectPage.my-porfolio"),
        link: "https://portfolio-calvin-yuen.vercel.app",
        github: "https://github.com/YuenSC/portfolio-app",
        thumbnail: "my-portfolio.png",
      },
      {
        title: t("ProjectPage.resume-creator"),
        link: "https://resume-creator-calvin-yuen.vercel.app/en",
        github: "https://github.com/YuenSC/resume-maker",
        thumbnail: "resume-creator.png",
      },
      {
        title: t("common.coming-soon"),
        link: "",
        github: "https://github.com/YuenSC/expo-router-app",
        thumbnail: "group-expense.png",
      },
    ];
  }, [t]);

  return <HeroParallax products={products} />;
};

export default memo(ProjectPage);
