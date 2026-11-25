"use client";

import Image from "next/image";
import * as React from "react";
import { cn } from "tailwind-variants";

import { menuItems } from "@/app/config/menu";

import { Section } from "@/ui/layout/Section/Section";
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/ui/primitives/carousel";
import { SectionHeader, type SectionHeaderProps } from "@/ui/sections/SectionHeader";
import { Text } from "@/ui/typography/Text";

interface HeroProps {
  sectionHeader: SectionHeaderProps;
}

const Hero = ({ sectionHeader }: HeroProps) => {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(1);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  const activeItem = menuItems[current - 1] ?? menuItems[0];
  const activeIndex = current - 1;

  return (
    <Section header={<SectionHeader {...sectionHeader} />} className="overflow-x-hidden">
      <Carousel
        className="w-full [&>div]:overflow-visible"
        opts={{ align: "center", loop: true }}
        setApi={setApi}
      >
        <CarouselContent className="ml-0 items-end">
          {menuItems.map((item, index) => {
            const distanceFromActive = Math.abs(index - activeIndex);
            const isVisible =
              distanceFromActive <= 1 || distanceFromActive === menuItems.length - 1;

            return (
              <CarouselItem
                aria-hidden={!isVisible}
                className={cn("aspect-square pl-0 basis-[75%] lg:basis-[55%]", {
                  invisible: !isVisible,
                })}
                key={item.title}
              >
                <Image
                  alt={item.title}
                  className={cn(
                    "size-full origin-bottom rounded-lg object-cover transition-transform duration-500 ease-out",
                    {
                      "scale-[0.8] lg:scale-[0.7]": index !== activeIndex,
                    },
                  )}
                  src={item.imageSrc}
                  loading="eager"
                />
              </CarouselItem>
            );
          })}
        </CarouselContent>
        {activeItem && (
          <div className="mx-auto mt-10 flex max-w-sm flex-col items-center gap-4 text-balance">
            <Text as="h3" styleType="heading-sm" className="text-center">
              {activeItem.title}
            </Text>
            {activeItem.description && (
              <Text
                as="p"
                styleType="body-md"
                className="line-clamp-2 text-center h-[2.6em] max-md:max-w-xs"
              >
                {activeItem.description}
              </Text>
            )}
          </div>
        )}
        <div className="flex justify-center gap-3 mt-10">
          <CarouselPrevious className="static top-auto left-auto translate-y-0 size-12 border-foreground! [&>svg]:size-5!" />
          <CarouselNext className="static top-auto right-auto translate-y-0 size-12 border-foreground! [&>svg]:size-5!" />
        </div>
      </Carousel>
    </Section>
  );
};

export default Hero;
