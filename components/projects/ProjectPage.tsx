import { useTranslations } from "next-intl";
import { memo, useMemo } from "react";
import ProductCard from "./ProductCard";
import ProjectHeader from "./ProjectHeader";

const ProjectPage = () => {
  const t = useTranslations();

  const products = useMemo(() => {
    return [
      {
        title: "Group Expense (Coming Soon)",
        link: "https://testflight.apple.com/join/A4CSYSgc",
        github: "https://github.com/YuenSC/expo-router-app",
        thumbnail: "group-expense.png",
      },
      {
        title: t("ProjectPage.resume-creator"),
        link: "https://resume-creator-calvin-yuen.vercel.app/en",
        github: "https://github.com/YuenSC/resume-maker",
        thumbnail: "resume-creator.png",
      },
      {
        title: t("ProjectPage.my-porfolio"),
        link: "https://portfolio-calvin-yuen.vercel.app",
        github: "https://github.com/YuenSC/portfolio-app",
        thumbnail: "my-portfolio.png",
      },
    ];
  }, [t]);

  return (
    <div className="flex flex-col gap-4 py-12">
      <ProjectHeader />
      <div className="container flex flex-wrap justify-center gap-8">
        {products.map((product, index) => {
          return <ProductCard key={index} product={product} />;
        })}
      </div>
    </div>
  );
};

export default memo(ProjectPage);
