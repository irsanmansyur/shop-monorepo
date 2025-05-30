import * as React from "react";
import Autoplay from "embla-carousel-autoplay";

import { Card, CardContent } from "../components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../components/ui/carousel";

export function ImageProductCarausel({ imageUrl }: { imageUrl: string }) {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true }),
  );

  return (
    <Carousel
      plugins={[plugin.current]}
      className="-mx-2 md:mx-16"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent className="p-0">
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem className="" key={index}>
            <div className="">
              <Card className="border-none shadow-none">
                <CardContent className="flex aspect-square items-center justify-center md:p-6">
                  <img
                    src={imageUrl}
                    alt="Card Image"
                    className="h-full w-full object-cover rounded-xl"
                  />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
