import React, { useEffect, useState } from "react";
import Banner from "./components/banner/Banner";
import AdminRoute from "./components/admin/AdminRoute";
import Contact from "./components/contact/Contact";
import Features from "./components/features/Features";
import Footer from "./components/footer/Footer";
import FooterBottom from "./components/footer/FooterBottom";
import Navbar from "./components/navbar/Navbar";
import Projects from "./components/projects/Projects";
import Resume from "./components/resume/Resume";
import Testimonial from "./components/tesimonial/Testimonial";
import {
  defaultBannerContent,
  defaultFeatureItems,
  defaultProjectItems,
  defaultSectionContent,
  defaultSiteContent,
} from "./constants";

function App() {
  const getCurrentRoute = () => (window.location.pathname === "/admin" ? "admin" : "home");
  const [route, setRoute] = useState(getCurrentRoute);
  const [content, setContent] = useState({
    banner: defaultBannerContent,
    section: defaultSectionContent,
    site: defaultSiteContent,
    features: defaultFeatureItems,
    projects: defaultProjectItems,
  });

  const navigateTo = (path) => {
    window.history.pushState({}, "", path);
    setRoute(path === "/admin" ? "admin" : "home");
  };

  const handleContentChange = (nextContent) => {
    setContent(nextContent);
    try {
      localStorage.setItem("portfolio-admin-content", JSON.stringify(nextContent));
    } catch (error) {
      console.error("Failed to persist admin content", error);
    }
  };

  useEffect(() => {
    try {
      const saved = localStorage.getItem("portfolio-admin-content");
      if (saved) {
        const parsed = JSON.parse(saved);
        setContent({
          banner: parsed.banner || defaultBannerContent,
          section: parsed.section || defaultSectionContent,
          site: parsed.site || defaultSiteContent,
          features: parsed.features || defaultFeatureItems,
          projects: parsed.projects || defaultProjectItems,
        });
      }
    } catch (error) {
      console.error("Failed to load saved admin content", error);
    }
  }, []);

  useEffect(() => {
    const handlePopState = () => {
      setRoute(getCurrentRoute());
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  return (
    <div className="w-full min-h-screen bg-bodyColor text-lightText px-3 sm:px-4 lg:px-6">
      {route === "admin" ? (
        <AdminRoute onExit={() => navigateTo("/")} onContentChange={handleContentChange} />
      ) : (
        <>
          <Navbar hireMeLink={content.site?.hireMeLink} />
          <div className="mx-auto max-w-7xl w-full">
            <Banner banner={content.banner} />
            <Features items={content.features} section={content.section} />
            <Projects items={content.projects} />
            <Resume />
            <Testimonial />
            <Contact />
            <Footer />
            <FooterBottom />
          </div>
        </>
      )}
    </div>
  );
}

export default App;
