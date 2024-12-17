import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const brands = [
  { id: 1, logo: "https://ain.org.np/public/images/logo.png", alt: "Brand 1" },
  { id: 2, logo: "https://ain.org.np/public/images/logo.png", alt: "Brand 2" },
  { id: 3, logo: "https://ain.org.np/public/images/logo.png", alt: "Brand 3" },
  { id: 4, logo: "https://ain.org.np/public/images/logo.png", alt: "Brand 4" },
  { id: 5, logo: "https://ain.org.np/public/images/logo.png", alt: "Brand 5" },
  { id: 6, logo: "https://ain.org.np/public/images/logo.png", alt: "Brand 1" },
  { id: 7, logo: "https://ain.org.np/public/images/logo.png", alt: "Brand 2" },
  { id: 8, logo: "https://ain.org.np/public/images/logo.png", alt: "Brand 3" },
  { id: 9, logo: "https://ain.org.np/public/images/logo.png", alt: "Brand 4" },
  { id: 10, logo: "https://ain.org.np/public/images/logo.png", alt: "Brand 5" },
];

const BrandSlider = () => {
  return (
    <section style={{ width: "100%", backgroundColor: "#f5f5f5", padding: "70px 0" }}>
      <div className="container">
        <h2 className="text-center p-5">Member INGOs</h2>
        <div className="brand-slider text-center">
          <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={10}
            slidesPerView={4}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 2000 }}
            loop
            className="custom-swiper"
          >
            {brands.map((brand) => (
              <SwiperSlide key={brand.id}>
                <div className="brand-box">
                  <a href="">
                    <img
                      src={brand.logo}
                      alt={brand.alt}
                      style={{ width:'60%' }}
                    />
                  </a>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default BrandSlider;
