import Link from "next/link";
import { memo } from "react";
import { FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="container flex items-center gap-2 p-4">
      <p>All rights reserved. © 2024 Calvin Yuen</p>
      <Link
        href="https://www.linkedin.com/in/sing-chun-yuen-423a09185/"
        target="_blank"
        className="bg-white"
      >
        <FaLinkedin className="scale-125 text-[#0077b5]" size={24} />
      </Link>
    </div>
  );
};

export default memo(Footer);
