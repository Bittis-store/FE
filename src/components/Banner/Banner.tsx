import { Carousel } from 'antd';
import { CarouselRef } from 'antd/es/carousel';
import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import SliderControls from '../SliderControls';

export default function Banner() {
    const [currentSlide, setCurrentSlide] = useState(0);
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
        <div className='relative'>
            <div className='group'>
                <Carousel className='w-full' ref={ref} draggable infinite autoplay>
                    <div className='h-[20vh]'>
                        <img
                            className='h-[80vh] w-full object-cover'
                            src='https://res.cloudinary.com/dpplfiyki/image/upload/v1748442592/3c8b3282-a10f-4df8-8539-cf69d7e4b747_qjyhsp.jpg'
                            alt=''
                        />
                    </div>
                    <div>
                        <img
                            className='h-[80vh] w-full object-cover'
                            src='https://res.cloudinary.com/dpplfiyki/image/upload/v1748442556/b215030d-0727-4647-a2db-048127f55847_rxjzax.jpg'
                            alt=''
                        />
                    </div>
                </Carousel>
                <SliderControls isButtonHandle={false} handlePrev={handlePrev} handleNext={handleNext} />
            </div>
        </div>
    );
}
