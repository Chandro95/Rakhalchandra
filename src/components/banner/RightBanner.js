import React from 'react'
import { bannerImg } from "../../assets/index";

const RightBanner = ({ banner }) => {
  return (
    <div className="w-full lg:w-1/2 flex justify-center items-center relative px-2 sm:px-4">
      <img
        className="w-full max-w-[280px] sm:max-w-[340px] md:max-w-[420px] lg:max-w-[500px] h-auto object-contain z-10"
        src={banner?.bannerImage || bannerImg}
        alt="bannerImg"
      />
    </div>
  );
}

export default RightBanner