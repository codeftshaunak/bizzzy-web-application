import React, { useState } from "react";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { activeJobsData } from '../MyJobMockData/MyJobMockData';
import ActiveJobCard from '../ActiveJobCard';


const ActiveJobSlider = () => {

    const [sliderSettings] = useState({
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    });

    return (
        <div>
            <Slider {...sliderSettings}>
                {activeJobsData.map((job, index) => {
                    return (
                        <ActiveJobCard
                            key={index}
                            job={job}
                        />
                    )
                })}
            </Slider>
        </div>
    );
};

export default ActiveJobSlider;
