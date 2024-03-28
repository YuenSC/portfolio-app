"use client";

import useEmblaCarousel, {
  type UseEmblaCarouselType,
} from "embla-carousel-react";
import * as React from "react";

import { cn } from "@/lib/utils";
import Image from "next/image";

type CarouselApi = UseEmblaCarouselType[1];
type CarouselApiNonNull = Exclude<CarouselApi, undefined>;
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>;
type CarouselOptions = UseCarouselParameters[0];
type CarouselPlugin = UseCarouselParameters[1];

type CarouselProps = {
  opts?: CarouselOptions;
  plugins?: CarouselPlugin;
  orientation?: "horizontal" | "vertical";
  setApi?: (api: CarouselApi) => void;

  // custom
  tweenFactorBase?: number;
  tweenNodeClassName?: string;
};

type CarouselContextProps = {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0];
  api: ReturnType<typeof useEmblaCarousel>[1];
  scrollPrev: () => void;
  scrollNext: () => void;
  canScrollPrev: boolean;
  canScrollNext: boolean;
} & CarouselProps;

const CarouselContext = React.createContext<CarouselContextProps | null>(null);

function useCarousel() {
  const context = React.useContext(CarouselContext);

  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />");
  }

  return context;
}

const numberWithinRange = (number: number, min: number, max: number): number =>
  Math.min(Math.max(number, min), max);

const Carousel = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & CarouselProps
>(
  (
    {
      orientation = "horizontal",
      opts,
      setApi,
      plugins,
      className,
      children,
      tweenFactorBase = 1,
      tweenNodeClassName,
      ...props
    },
    ref,
  ) => {
    const [carouselRef, api] = useEmblaCarousel(
      {
        ...opts,
        axis: orientation === "horizontal" ? "x" : "y",
      },
      plugins,
    );
    const [canScrollPrev, setCanScrollPrev] = React.useState(false);
    const [canScrollNext, setCanScrollNext] = React.useState(false);
    const tweenFactor = React.useRef(0);
    const tweenNodes = React.useRef<HTMLElement[]>([]);

    const onSelect = React.useCallback((api: CarouselApi) => {
      if (!api) {
        return;
      }

      setCanScrollPrev(api.canScrollPrev());
      setCanScrollNext(api.canScrollNext());
    }, []);

    const scrollPrev = React.useCallback(() => {
      api?.scrollPrev();
    }, [api]);

    const scrollNext = React.useCallback(() => {
      api?.scrollNext();
    }, [api]);

    const handleKeyDown = React.useCallback(
      (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          scrollPrev();
        } else if (event.key === "ArrowRight") {
          event.preventDefault();
          scrollNext();
        }
      },
      [scrollPrev, scrollNext],
    );

    const setTweenNodes = React.useCallback(
      (emblaApi: CarouselApiNonNull): void => {
        tweenNodes.current = emblaApi.slideNodes().map((slideNode) => {
          return slideNode.querySelector(
            `.${tweenNodeClassName}`,
          ) as HTMLElement;
        });
      },
      [tweenNodeClassName],
    );

    const setTweenFactor = React.useCallback(
      (emblaApi: CarouselApiNonNull) => {
        tweenFactor.current =
          tweenFactorBase * emblaApi.scrollSnapList().length;
      },
      [tweenFactorBase],
    );

    const tweenScale = React.useCallback(
      (emblaApi: CarouselApiNonNull, eventName?: string) => {
        const engine = emblaApi.internalEngine();
        const scrollProgress = emblaApi.scrollProgress();
        const slidesInView = emblaApi.slidesInView();
        const isScrollEvent = eventName === "scroll";

        emblaApi.scrollSnapList().forEach((scrollSnap, snapIndex) => {
          let diffToTarget = scrollSnap - scrollProgress;

          const slidesInSnap = engine.slideRegistry[snapIndex];

          slidesInSnap.forEach((slideIndex) => {
            if (isScrollEvent && !slidesInView.includes(slideIndex)) return;

            if (engine.options.loop) {
              engine.slideLooper.loopPoints.forEach((loopItem) => {
                const target = loopItem.target();

                if (slideIndex === loopItem.index && target !== 0) {
                  const sign = Math.sign(target);

                  if (sign === -1) {
                    diffToTarget = scrollSnap - (1 + scrollProgress);
                  }
                  if (sign === 1) {
                    diffToTarget = scrollSnap + (1 - scrollProgress);
                  }
                }
              });
            }

            const tweenValue = 1 - Math.abs(diffToTarget * tweenFactor.current);
            const scale = numberWithinRange(tweenValue, 0.5, 1).toString();
            const tweenNode = tweenNodes.current[slideIndex];
            if (tweenNode) {
              tweenNode.style.transform = `scale(${scale})`;
            }
          });
        });
      },
      [],
    );

    React.useEffect(() => {
      if (!api || !setApi) {
        return;
      }

      setApi(api);
    }, [api, setApi]);

    React.useEffect(() => {
      if (!api) {
        return;
      }

      setTweenNodes(api);
      setTweenFactor(api);
      tweenScale(api);
      onSelect(api);

      api.on("reInit", onSelect);
      api.on("select", onSelect);

      api
        .on("reInit", setTweenNodes)
        .on("reInit", setTweenFactor)
        .on("reInit", tweenScale)
        .on("scroll", tweenScale);

      return () => {
        api?.off("select", onSelect);
      };
    }, [api, onSelect, setTweenFactor, setTweenNodes, tweenScale]);

    return (
      <CarouselContext.Provider
        value={{
          carouselRef,
          api: api,
          opts,
          orientation:
            orientation || (opts?.axis === "y" ? "vertical" : "horizontal"),
          scrollPrev,
          scrollNext,
          canScrollPrev,
          canScrollNext,
        }}
      >
        <div
          ref={ref}
          onKeyDownCapture={handleKeyDown}
          className={cn("relative", className)}
          role="region"
          aria-roledescription="carousel"
          {...props}
        >
          {children}
        </div>
      </CarouselContext.Provider>
    );
  },
);
Carousel.displayName = "Carousel";

const CarouselContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { carouselRef, orientation } = useCarousel();

  return (
    <div ref={carouselRef} className="overflow-hidden">
      <div
        ref={ref}
        className={cn(
          "flex",
          orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col",
          className,
        )}
        {...props}
      />
    </div>
  );
});
CarouselContent.displayName = "CarouselContent";

const CarouselItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { orientation } = useCarousel();

  return (
    <div
      ref={ref}
      role="group"
      aria-roledescription="slide"
      className={cn(
        "min-w-0 shrink-0 grow-0 basis-full",
        orientation === "horizontal" ? "pl-4" : "pt-4",
        className,
      )}
      {...props}
    />
  );
});
CarouselItem.displayName = "CarouselItem";

const CarouselPrevious = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => {
  const { orientation, scrollPrev, canScrollPrev, api } = useCarousel();

  const [firstNodeWidth, setFirstNodeWidth] = React.useState(0);

  React.useEffect(() => {
    if (!api) return;

    const getFirstNode = (api: CarouselApi) => {
      const firstNode = api?.slideNodes()?.[0];
      if (firstNode) setFirstNodeWidth(firstNode.clientWidth);
    };

    getFirstNode(api);
    api.on("reInit", getFirstNode);
  }, [api]);

  return (
    <div
      ref={ref}
      className={cn(
        "absolute  h-8 w-8 cursor-pointer hover:opacity-50",
        orientation === "horizontal"
          ? "-left-12 top-1/2 -translate-y-1/2"
          : "-top-12 left-1/2 -translate-x-1/2 rotate-90",

        !canScrollPrev && "opacity-50",
        className,
      )}
      onClick={canScrollPrev ? scrollPrev : undefined}
      style={{
        ...props.style,
        left: `calc(50% - ${firstNodeWidth / 2}px)`,
      }}
      {...props}
    >
      <Image
        src="images/ProductLeftArrow.png"
        width={30}
        height={53}
        alt="Left Arrow"
      />
    </div>
  );
});
CarouselPrevious.displayName = "CarouselPrevious";

const CarouselNext = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => {
  const { orientation, scrollNext, canScrollNext, api } = useCarousel();

  const [firstNodeWidth, setFirstNodeWidth] = React.useState(0);

  React.useEffect(() => {
    if (!api) return;

    const getFirstNode = (api: CarouselApi) => {
      const firstNode = api?.slideNodes()?.[0];
      if (firstNode) setFirstNodeWidth(firstNode.clientWidth);
    };

    getFirstNode(api);
    api.on("reInit", getFirstNode);
  }, [api]);

  return (
    <div
      ref={ref}
      className={cn(
        "absolute h-8 w-8 cursor-pointer hover:opacity-50",
        orientation === "horizontal"
          ? "-right-12 top-1/2 -translate-y-1/2"
          : "-bottom-12 left-1/2 -translate-x-1/2 rotate-90",
        !canScrollNext && "opacity-50",
        className,
      )}
      onClick={canScrollNext ? scrollNext : undefined}
      style={{
        right: `calc(50% - ${firstNodeWidth / 2}px)`,
      }}
      {...props}
    >
      <Image
        src="images/ProductRightArrow.png"
        width={30}
        height={53}
        alt="Left Arrow"
      />
    </div>
  );
});
CarouselNext.displayName = "CarouselNext";

const CarouselPagination = ({ className }: { className?: string }) => {
  const { api } = useCarousel();

  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(api);

  if (scrollSnaps.length <= 1) {
    return null;
  }

  return (
    <div
      className={cn(
        "absolute bottom-[8%] left-1/2 flex -translate-x-1/2 items-center justify-center gap-[6px]",
        className,
      )}
    >
      {scrollSnaps.map((_, index) => (
        <DotButton
          key={index}
          onClick={() => onDotButtonClick(index)}
          className={cn(
            "inline-flex h-[10px] w-[10px] cursor-pointer touch-manipulation rounded-full bg-mediumGrey",
            index === selectedIndex ? "bg-black" : "",
          )}
        />
      ))}
    </div>
  );
};

type UseDotButtonType = {
  selectedIndex: number;
  scrollSnaps: number[];
  onDotButtonClick: (index: number) => void;
};

export const useDotButton = (
  emblaApi: CarouselApi | undefined,
): UseDotButtonType => {
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [scrollSnaps, setScrollSnaps] = React.useState<number[]>([]);

  const onDotButtonClick = React.useCallback(
    (index: number) => {
      if (!emblaApi) return;
      emblaApi.scrollTo(index);
    },
    [emblaApi],
  );

  const onInit = React.useCallback((emblaApi: CarouselApi) => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
  }, []);

  const onSelect = React.useCallback((emblaApi: CarouselApi) => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, []);

  React.useEffect(() => {
    if (!emblaApi) return;

    onInit(emblaApi);
    onSelect(emblaApi);
    emblaApi.on("reInit", onInit);
    emblaApi.on("reInit", onSelect);
    emblaApi.on("select", onSelect);
  }, [emblaApi, onInit, onSelect]);

  return {
    selectedIndex,
    scrollSnaps,
    onDotButtonClick,
  };
};

type PropType = React.PropsWithChildren<
  React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >
>;

export const DotButton: React.FC<PropType> = (props) => {
  const { children, ...restProps } = props;

  return (
    <button type="button" {...restProps}>
      {children}
    </button>
  );
};

export {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselPagination,
  type CarouselApi,
};
