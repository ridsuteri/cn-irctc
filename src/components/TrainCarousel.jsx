import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { FaArrowRight } from "react-icons/fa";
import styles from "../styles/TrainCarousel.module.css";



export const recentSearches = [
  { from: { code: "CBE", name: "COIMBATORE" }, to: { code: "BRC", name: "VADODARA JN" }, date: "Tue 18 Mar 2025", classType: "ALL CLASSES" },
  { from: { code: "NDLS", name: "NEW DELHI" }, to: { code: "PNBE", name: "PATNA JN" }, date: "Mon 17 Mar 2025", classType: "ALL CLASSES" },
  { from: { code: "PRYJ", name: "PRAYAGRAJ" }, to: { code: "HW", name: "HARIDWAR" }, date: "THU 20 Mar 2025", classType: "ALL CLASSES" },
  { from: { code: "MAS", name: "CHENNAI CENTRAL" }, to: { code: "SBC", name: "BENGALURU" }, date: "Sat 22 Mar 2025", classType: "AC 3 TIER" },
  { from: { code: "CSTM", name: "MUMBAI CST" }, to: { code: "HWH", name: "HOWRAH JN" }, date: "Sun 23 Mar 2025", classType: "SLEEPER" }
];


const TrainCarousel = () => {
  // Determine if we're on mobile or desktop
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  
  // Settings for the slider
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: isMobile ? 1 : 3,
    slidesToScroll: 4,
    autoplay: true,
    autoplaySpeed: 1000,
    arrows: true,
    centerMode: true,
    centerPadding: '10px',
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          centerMode: true,
          centerPadding: '30px',
        }
      }
    ]
  };

  return (
    <div className={styles.carouselContainer}>
      <h2 className={styles.heading}>Recent Searches</h2>
      <Slider {...settings} className={styles.carousel}>
        {recentSearches.map((search, index) => (
          <div key={index} className={styles.card}>
            <div className={styles.trainRoute}>
              <span className={styles.stationCode}>{search.from.code}</span>
              <span className={styles.arrow}><FaArrowRight /></span>
              <span className={styles.stationCode}>{search.to.code}</span>
            </div>
            <div className={styles.stationNames}>
              <span>{search.from.name}</span>
              <span>{search.to.name}</span>
            </div>
            <div className={styles.tripDetails}>
              <span className={styles.date}>{search.date}</span>
              <span className={styles.classType}>{search.classType}</span>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default TrainCarousel;