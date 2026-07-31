import React, { useState } from 'react'
import { Link } from "react-scroll";
import { FiMenu } from "react-icons/fi";
import { MdClose } from "react-icons/md";
import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import {logo} from "../../assets/index"
import { navLinksdata } from '../../constants';

const Navbar = ({ hireMeLink = "https://www.linkedin.com/in/rakhal-chandro/" }) => {
  const [showMenu, setShowMenu]=useState(false)
  return (
    <div className="w-full h-24 sticky top-0 z-50 bg-bodyColor mx-auto flex items-center justify-between font-titleFont border-b-[1px] border-b-gray-600 px-2 sm:px-4">
      <div className="flex-shrink-0">
        <img src={logo} alt="logo" className="h-10 sm:h-12" />
      </div>
      <div className="flex-1 flex items-center justify-end">
        <ul className="hidden mdl:flex items-center justify-center gap-4 lg:gap-8 xl:gap-10 flex-1">
          {navLinksdata.map(({ _id, title, link }) => (
            <li
              className="text-base font-normal text-gray-400 tracking-wide cursor-pointer hover:text-designColor duration-300"
              key={_id}
            >
              <Link
                activeClass="active"
                to={link}
                spy={true}
                smooth={true}
                offset={-70}
                duration={500}
              >
                {title}
              </Link>
            </li>
          ))}
        </ul>
        <a
          href={hireMeLink}
          target="_blank"
          rel="noreferrer"
          className="hidden mdl:inline-flex items-center rounded-full border border-designColor px-4 py-2 text-sm font-semibold text-designColor hover:bg-designColor hover:text-white duration-300 ml-3"
        >
          Hire Me
        </a>
        <button
          type="button"
          onClick={() => setShowMenu(!showMenu)}
          className="ml-3 text-xl mdl:hidden bg-black w-10 h-10 inline-flex items-center justify-center rounded-full text-designColor cursor-pointer"
          aria-label="Toggle menu"
        >
          <FiMenu />
        </button>
        {showMenu && (
          <div className="w-[85%] max-w-sm h-screen overflow-y-auto absolute top-0 left-0 bg-gray-900 p-4 scrollbar-hide shadow-2xl">
            <div className="flex flex-col gap-8 py-2 relative">
              <div>
                <img className="w-32" src={logo} alt="logo" />
                <p className="text-sm text-gray-400 mt-2">
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Earum soluta perspiciatis molestias enim cum repellat, magnam
                  exercitationem distinctio aliquid nam.
                </p>
              </div>
              <ul className="flex flex-col gap-4">
                {navLinksdata.map((item) => (
                  <li
                    key={item._id}
                    className="text-base font-normal text-gray-400 tracking-wide cursor-pointer hover:text-designColor duration-300"
                  >
                    <Link
                      onClick={() => setShowMenu(false)}
                      activeClass="active"
                      to={item.link}
                      spy={true}
                      smooth={true}
                      offset={-70}
                      duration={500}
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="flex flex-col gap-4">
                <h2 className="text-base uppercase font-titleFont mb-4">
                  Find me in
                </h2>
                <div className="flex gap-4">
                  <span className="bannerIcon">
                    <FaFacebookF />
                  </span>
                  <span className="bannerIcon">
                    <FaTwitter />
                  </span>
                  <span className="bannerIcon">
                    <FaLinkedinIn />
                  </span>
                </div>
              </div>
              <a
                href={hireMeLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-full border border-designColor px-4 py-2 text-sm font-semibold text-designColor hover:bg-designColor hover:text-white duration-300"
              >
                Hire Me
              </a>
              <span
                onClick={() => setShowMenu(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-designColor duration-300 text-2xl cursor-pointer"
              >
                <MdClose />
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar