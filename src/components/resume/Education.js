import React from "react";
import { motion } from "framer-motion";
import ResumeCard from "./ResumeCard";

const Education = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.5 } }}
      className="w-full flex flex-col lgl:flex-row gap-10 lgl:gap-20"
    >
      {/* part one */}
      <div>
        <div className="py-6 lgl:py-12 font-titleFont flex flex-col gap-4">
          <p className="text-sm text-designColor tracking-[4px]">1998 - 2010</p>
          <h2 className="text-3xl md:text-4xl font-bold">Education Quality</h2>
        </div>
        <div className="mt-6 lgl:mt-14 w-full h-[1000px] border-l-[6px] border-l-black border-opacity-30 flex flex-col gap-10">
          <ResumeCard
            title="Bachelor of Social Science"
            subTitle="Jhaudanga College, Satkhira - (2010 - 2014)"
            result="2.64/4"
            des="The training provided by universities in order to prepare people to work in various sectors of the economy or areas of culture."
          />
          <ResumeCard
            title="Higher Secondary School"
            subTitle="Kaloroya Gov't College, Satkhira - (2010 - 2012)"
            result="3.80/5"
            des="Higher education is tertiary education leading to award of an academic degree. Higher education, also called post-secondary education."
          />
          <ResumeCard
            title="Secondary School Education"
            subTitle="Tengrakhali High School, Satkhira - (2008 - 2010)"
            result="3.50/5"
            des="Secondary education or post-primary education covers two phases on the International Standard Classification of Education scale."
          />
        </div>
      </div>
      {/* part Two */}

      <div>
        <div className="py-6 lgl:py-12 font-titleFont flex flex-col gap-4">
          <p className="text-sm text-designColor tracking-[4px]">2010 - 2022</p>
          <h2 className="text-3xl md:text-4xl font-bold">Job Experience</h2>
        </div>
        <div className="mt-6 lgl:mt-14 w-full h-[1000px] border-l-[6px] border-l-black border-opacity-30 flex flex-col gap-10">
          <ResumeCard
            title="Joykoly Publications Ltd."
            subTitle="Office executive - (2025 - Present)"
            result="Dhaka, Bangladesh "
            des="I was working as a office executive in Joykoly Publications Ltd. I was responsible for the office work and other duties."
          />
          <ResumeCard
            title="Web Developer & Trainer"
            subTitle="RC Training center - (2015 - 2024)"
            result="Assasuni, Satkhira, Bangladesh"
            des="I was working as a trainer in RC Training center. I was responsible for the training of the students."
          />
          <ResumeCard
            title="Robi axiata limited"
            subTitle="Office executive - (2011 - 2014)"
            result="Satkhira, Bangladesh "
            des="I was working as a office executive in robi axiata limited. I was responsible for the office work and other duties."
          />
        </div>
      </div>
    </motion.div>
  );
};

export default Education;
