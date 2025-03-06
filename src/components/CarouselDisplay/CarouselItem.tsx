import React from 'react';

const CarouselItem = ({ children }: { children: React.ReactElement }) => {
    return (
        <div>
            <div className='group mx-[6px] bg-transparent'>
                {/* @CardItem */}
                {children}
                {/* {React.cloneElement(children)} */}
            </div>
        </div>
    );
};

export default CarouselItem;
