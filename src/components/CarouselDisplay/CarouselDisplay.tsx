import { Carousel } from 'antd';
import SliderControls from '../SliderControls';
import { CarouselRef } from 'antd/es/carousel';
import { useRef } from 'react';
import { cn } from '~/utils/TailwindMerge';

const CarouselDisplay = ({
    children,
    responsiveCustom,
    className,
}: {
    children: React.ReactNode;
    responsiveCustom?: { laptop?: number; tablet?: number; mobile?: number };
    className?: string;
}) => {
    const ref = useRef<CarouselRef>(null);
    const handlePrev = () => {
        if (ref.current) {
            ref.current.prev();
        }
    };
    const handleNext = () => {
        if (ref.current) {
            ref.current.next();
        }
    };
    return (
        <div className={cn('relative', className)}>
            <Carousel
                ref={ref}
                responsive={[
                    {
                        breakpoint: 3000,
                        settings: {
                            slidesToShow: responsiveCustom?.laptop || 5,
                        },
                    },
                    {
                        breakpoint: 1024,
                        settings: {
                            slidesToShow: responsiveCustom?.tablet || 2,
                        },
                    },
                    {
                        breakpoint: 464,
                        settings: {
                            slidesToShow: responsiveCustom?.mobile || 1,
                        },
                    },
                ]}
                draggable
                dots={false}
            >
                {children}
            </Carousel>

            <SliderControls isButtonHandle={false} handleNext={handleNext} handlePrev={handlePrev} />
        </div>
    );
};

export default CarouselDisplay;
