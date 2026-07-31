import React, { useEffect, useState } from "react";
import AdminPanel from "./AdminPanel";
import LoginForm from "./LoginForm";
import { defaultBannerContent, defaultFeatureItems, defaultProjectItems, defaultSectionContent, defaultSiteContent } from "../../constants";

const STORAGE_KEY = "portfolio-admin-content";
const AUTH_KEY = "portfolio-admin-auth";
const ADMIN_EMAIL = "admin@rakhalchandra.online";
const ADMIN_PASSWORD = "166595";

const loadInitialData = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) {
      return {
        banner: defaultBannerContent,
        section: defaultSectionContent,
        site: defaultSiteContent,
        features: defaultFeatureItems,
        projects: defaultProjectItems,
      };
    }

    const parsed = JSON.parse(saved);
    return {
      banner: parsed.banner || defaultBannerContent,
      section: parsed.section || defaultSectionContent,
      site: parsed.site || defaultSiteContent,
      features: parsed.features || defaultFeatureItems,
      projects: parsed.projects || defaultProjectItems,
    };
  } catch (error) {
    return {
      banner: defaultBannerContent,
      section: defaultSectionContent,
      site: defaultSiteContent,
      features: defaultFeatureItems,
      projects: defaultProjectItems,
    };
  }
};

const loadAuthState = () => {
  try {
    const saved = localStorage.getItem(AUTH_KEY);
    return saved === "true";
  } catch {
    return false;
  }
};

const AdminRoute = ({ onExit, onContentChange }) => {
  const [content, setContent] = useState(loadInitialData);
  const [authenticated, setAuthenticated] = useState(loadAuthState);
  const [loginError, setLoginError] = useState("");

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
    onContentChange?.(content);
  }, [content, onContentChange]);

  const handleLogin = ({ email, password }) => {
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      setAuthenticated(true);
      localStorage.setItem(AUTH_KEY, "true");
      setLoginError("");
      return;
    }
    setLoginError("Invalid credentials. Please try again.");
  };

  const handleLogout = () => {
    setAuthenticated(false);
    localStorage.removeItem(AUTH_KEY);
    onExit();
  };

  return (
    <div className="w-full py-4">
      {authenticated ? (
        <>
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <button
              onClick={onExit}
              className="rounded-md border border-gray-700 bg-black px-4 py-2 text-sm text-gray-200"
            >
              Go to Home
            </button>
            <button
              onClick={handleLogout}
              className="rounded-md border border-red-600 bg-red-950/40 px-4 py-2 text-sm text-red-300"
            >
              Logout
            </button>
          </div>
          <AdminPanel
            initialData={content}
            onSave={setContent}
            onCancel={onExit}
          />
        </>
      ) : (
        <LoginForm onLogin={handleLogin} error={loginError} />
      )}
    </div>
  );
};

export default AdminRoute;
