import Image from "next/image";
import { memo } from "react";

const Hero = () => {
  return (
    <div className="relative flex min-h-[75vh] items-center">
      <div className="relative -mt-8 flex w-full items-center justify-center">
        <div className="relative aspect-square w-full max-w-[300px] overflow-hidden rounded-full border-4 border-white shadow-lg">
          <Image src="self-photo.jpg" alt="Calvin Yuen's image" fill />
        </div>

        <div className="absolute bottom-0 flex">
          {Array.from(Array(10).keys()).map((_, index) => (
            <h1
              key={index}
              className="animate-infinite-scrolling-text whitespace-nowrap px-6 text-6xl text-white mix-blend-difference"
            >
              Calvin YUEN
            </h1>
          ))}
        </div>
      </div>
    </div>
  );
};

export default memo(Hero);
