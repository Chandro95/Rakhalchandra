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
  };

  useEffect(() => {
    const loadSharedContent = async () => {
      try {
        const response = await fetch("/api/content");
        if (!response.ok) {
          throw new Error("No shared content available");
        }
        const content = await response.json();
        setContent({
          banner: content.banner || defaultBannerContent,
          section: content.section || defaultSectionContent,
          site: content.site || defaultSiteContent,
          features: content.features || defaultFeatureItems,
          projects: content.projects || defaultProjectItems,
        });
        return;
      } catch (error) {
        console.error("Failed to load shared content", error);
      }
      // Try to fetch directly from Cloudinary public raw URL if env vars present
      try {
        const cloudName = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;
        if (cloudName) {
          const cloudUrls = [
            `https://res.cloudinary.com/${cloudName}/raw/upload/portfolio-data/portfolio-content.json`,
            `https://res.cloudinary.com/${cloudName}/raw/upload/portfolio-data/portfolio-content`,
          ];
          for (const cloudUrl of cloudUrls) {
            const res = await fetch(cloudUrl);
            if (!res.ok) {
              continue;
            }
            const data = await res.json();
            setContent({
              banner: data.banner || defaultBannerContent,
              section: data.section || defaultSectionContent,
              site: data.site || defaultSiteContent,
              features: data.features || defaultFeatureItems,
              projects: data.projects || defaultProjectItems,
            });
            return;
          }
        }
      } catch (e) {
        console.error("Failed to fetch content directly from Cloudinary", e);
      }
    };

    loadSharedContent();
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
