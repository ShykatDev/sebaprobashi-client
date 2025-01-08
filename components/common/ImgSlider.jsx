import Image from "next/image";
import Slider from "react-slick";

const sliderImg = [
    {
        id: 1,
        imgSrc: "/assets/slider/slider.jpg",
    },
    {
        id: 2,
        imgSrc: "/assets/slider/slider.jpg",
    },
    {
        id: 3,
        imgSrc: "/assets/slider/slider.jpg",
    },
];

const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 5000,
    cssEase: "linear",
    arrows:false
};

export default function CarouselSlider() {
    return (
        <Slider  {...settings}>
            {
                sliderImg.map((item) => {
                    return (
                        <Image
                            key={item.id}
                            alt={`img-${item.id}`}
                            src={item.imgSrc}
                            priority
                            width={4000}
                            height={4000}
                            className="w-full h-40 lg:h-[24rem] object-fit lg:object-cover"
                        />
                    )
                })
            }
            
        </Slider>
    )
}