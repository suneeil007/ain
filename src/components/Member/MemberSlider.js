import React, { useEffect, useState } from "react";
import { Typography } from '@mui/material';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { motion } from 'framer-motion'; 
import axios from "axios";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import ExploreMoreButton from "../Buttons/ExploreMoreButton";

const fadeInVariants = {
  hidden: { opacity: 0, x: 30 }, 
  visible: { opacity: 1, x: 0, transition: { duration: 0.8 } }, 
};

const MemberSlider = () => {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    axios.get("https://intellisoftnepal.com.np/ain/public/api/memberIngos")
      .then((response) => {
        if (response.data && response.data.success) {
          setMembers(response.data.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching members data:", error);
      });
  }, []);

  return (
    <section style={{ width: "100%", backgroundColor: "#003153" }}>
      <div className="container">
        <Typography
          variant="h2"
          color={'white'}
          sx={{
            paddingTop:15,
            paddingBottom:2,
            textTransform: 'uppercase', 
            fontWeight: 'bold', 
          }}
        >
          Our Members
        </Typography>
        <div 
            className="brand-slider text-center"
            style={{ padding: "70px 0 70px 0" }}>
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={10}
            slidesPerView={4}
            pagination={{ clickable: true }}
            autoplay={{ delay: 2000, disableOnInteraction: false }} 
            loop
            className="custom-swiper"
          >
            {members.map((member) => (
              <SwiperSlide key={member.id}>
                <motion.div 
                  className="brand-box"
                  variants={fadeInVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <a href={member.url || "#"} target="_blank" rel="noopener noreferrer">
                    <img
                      src={member.image || "https://via.placeholder.com/150"}
                      alt={member.name || "Member"}
                      style={{ width: '60%' }}
                    />
                  </a>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div
          style={{
            display: 'flex', 
            justifyContent: 'flex-end', 
            width: '100%',           
            paddingBottom: '90px'
          }}
        >
          <ExploreMoreButton
            href="/members" 
            label="Explore More" 
            color="white" 
            hoverColor="#f39c12"  
          />
        </div>
        {/* Adjust the pagination positioning */}
        <style jsx>{`
          .swiper-pagination {
            margin-top: 120px;  /* Move pagination down */
          }
        `}</style>
      </div>
    </section>
  );
};

export default MemberSlider;
