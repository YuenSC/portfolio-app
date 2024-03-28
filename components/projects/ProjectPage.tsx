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
        thumbnail: "my-portfolio.png",
      },
      {
        title: t("ProjectPage.resume-creator"),
        link: "https://resume-creator-calvin-yuen.vercel.app/en",
        thumbnail: "resume-creator.png",
      },
      {
        title: t("common.coming-soon"),
        link: "",
        thumbnail: "",
      },
    ];
  }, [t]);

  return <HeroParallax products={products} />;
};

export default memo(ProjectPage);
