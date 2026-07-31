import React from 'react'
import { AiFillAppstore } from "react-icons/ai";
import { FaMobile, FaGlobe } from "react-icons/fa";
import { SiProgress, SiAntdesign } from "react-icons/si";
import Title from '../layouts/Title';
import Card from './Card';

const iconMap = {
  web: <AiFillAppstore />,
  design: <AiFillAppstore />,
  video: <SiProgress />,
  app: <FaMobile />,
  ux: <SiAntdesign />,
  hosting: <FaGlobe />,
};

const Features = ({ items = [], section = {} }) => {
  const featureItems = items.length ? items : [];

  return (
    <section
      id="features"
      className="w-full py-16 sm:py-20 border-b-[1px] border-b-black"
    >
      <Title title={section.featuresTitle || "Features"} des={section.featuresDescription || "What I Do"} />
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-6 xl:gap-10">
        {featureItems.map((item) => (
          <Card
            key={item.id}
            title={item.title}
            des={item.description}
            icon={iconMap[item.icon] || <AiFillAppstore />}
          />
        ))}
      </div>
    </section>
  );
}

export default Features
