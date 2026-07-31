import React from 'react'
import Title from '../layouts/Title'
import { projectOne, projectTwo, projectThree } from "../../assets/index";
import ProjectsCard from './ProjectsCard';

const imageMap = {
  projectOne,
  projectTwo,
  projectThree,
};

const Projects = ({ items = [] }) => {
  const projectItems = items.length ? items : [];

  return (
    <section
      id="projects"
      className="w-full py-16 sm:py-20 border-b-[1px] border-b-black"
    >
      <div className="flex justify-center items-center text-center">
        <Title
          title="VISIT MY PORTFOLIO AND KEEP YOUR FEEDBACK"
          des="My Projects"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-6 xl:gap-10">
        {projectItems.map((item) => (
          <ProjectsCard
            key={item.id}
            title={item.title}
            des={item.description}
            src={item.image?.startsWith("blob:") ? item.image : imageMap[item.image] || projectOne}
            websiteLink={item.websiteLink}
          />
        ))}
      </div>
    </section>
  );
}

export default Projects