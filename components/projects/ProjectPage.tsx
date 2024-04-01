import { memo, useMemo } from "react";
import { HeroParallax } from "../ui/hero-parallax";
import { useTranslations } from "next-intl";
import { Link as LinkIcon } from "lucide-react";
import { SiteNameSlugEnum } from "@/lib/types/SiteNameSlugEnum";
import { Link } from "@/lib/i18n";

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

  return (
    <div>
      <HeroParallax products={products} />
      <div className="container pb-24">
        <h1 className="whitespace-pre-line text-2xl font-bold md:text-7xl dark:text-white">
          I also rewrote some cool animation
        </h1>
        <Link
          className="mt-4 flex gap-2 text-xl hover:underline"
          href={`/${SiteNameSlugEnum.Revolut}`}
        >
          Check out here! <LinkIcon />
        </Link>
      </div>
    </div>
  );
};

export default memo(ProjectPage);
