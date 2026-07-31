import React from "react";
import { motion } from "framer-motion";
import ResumeCard from "./ResumeCard";

const Experience = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.5 } }}
      className="w-full flex flex-col lgl:flex-row gap-10 lgl:gap-20"
    >
      <div>
        <div className="py-6 lgl:py-12 font-titleFont flex flex-col gap-4">
          <p className="text-sm text-designColor tracking-[4px]">2010 - 2022</p>
          <h2 className="text-3xl md:text-4xl font-bold">Job Experience</h2>
        </div>
        <div className="mt-6 lgl:mt-14 w-full h-[1000px] border-l-[6px] border-l-black border-opacity-30 flex flex-col gap-10">
        <ResumeCard
            title="Web Developer & Trainer"
            subTitle="RC Training Center"
            result="Satkhira, Bangladesh"
            des="I was working as a web developer and trainer in RC Training Center. I was responsible for the web development and training of the students."
          />
          <ResumeCard
            title="Front-end Developer"
            subTitle="Joykoly Publications Ltd. - ( Present)"
            result="Dhaka, Bangladesh"
            des="I was working as a web developer and trainer in Joykoly Publications Ltd. I was responsible for the web development and training of the students."
          />
          <ResumeCard
            title="Back-end Developer"
            subTitle="Joykoly Publications Ltd. - ( Present)"
            result="Dhaka, Bangladesh"
            des="I was working as a web developer and trainer in Joykoly Publications Ltd. I was responsible for the web development and training of the students."
          />
        </div>
      </div>
      <div>
        <div className="py-6 lgl:py-12 font-titleFont flex flex-col gap-4">
          <p className="text-sm text-designColor tracking-[4px]">2001 - 2020</p>
          <h2 className="text-3xl md:text-4xl font-bold">Trainer Experience</h2>
        </div>
        <div className="mt-6 lgl:mt-14 w-full h-[1000px] border-l-[6px] border-l-black border-opacity-30 flex flex-col gap-10">
          <ResumeCard
            title="Database management"
            subTitle="RC Training Center (2015 - 2020)"
            result="Satkhira, Bangladesh"
            des="I was working as a database management trainer in RC Training Center. I was responsible for the database management training of the students."
          />
          <ResumeCard
            title="Web Developer and Instructor"
            subTitle="RC Training Center (2010 - 2014)"
            result="Satkhira, Bangladesh"
            des="I was working as a web developer and instructor in RC Training Center. I was responsible for the web development and training of the students."
          />
          <ResumeCard
            title="Basic computer trainer"
            subTitle="RC Training Center (2015 - 2024)"
            result="Satkhira, Bangladesh"
            des="I was working as a basic computer trainer in RC Training Center. I was responsible for the basic computer training of the students."
          />
        </div>
      </div>
    </motion.div>
  );
};

export default Experience;
