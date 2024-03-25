import Link from "next/link";
import { memo } from "react";

const NavBar = ({ locale }: { locale: string }) => {
  return (
    <div className="flex items-center justify-between">
      <Link href={`/${locale}`}>Calvin Yuen</Link>
      <div></div>
    </div>
  );
};

export default memo(NavBar);
