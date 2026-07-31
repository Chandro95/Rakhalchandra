import React from 'react'
import LeftBanner from './LeftBanner';
import RightBanner from './RightBanner';
const Banner = ({ banner }) => {
  return (
    <section
      id="home"
      className="w-full pt-8 pb-14 sm:pt-10 sm:pb-20 flex flex-col gap-8 md:gap-10 lg:flex-row lg:items-center border-b-[1px] font-titleFont border-b-black"
    >
      <LeftBanner banner={banner} />
      <RightBanner banner={banner} />
    </section>
  );
}

export default Banner