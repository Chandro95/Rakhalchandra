import React, { useEffect, useState } from "react";
import AdminPanel from "./AdminPanel";
import LoginForm from "./LoginForm";
import { defaultBannerContent, defaultFeatureItems, defaultProjectItems, defaultSectionContent, defaultSiteContent } from "../../constants";

const AUTH_KEY = "portfolio-admin-auth";
const ADMIN_EMAIL = "admin@rakhalchandra.online";
const ADMIN_PASSWORD = "166595";

const loadInitialData = () => ({
  banner: defaultBannerContent,
  section: defaultSectionContent,
  site: defaultSiteContent,
  features: defaultFeatureItems,
  projects: defaultProjectItems,
});

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
    const loadSharedContent = async () => {
      try {
        const response = await fetch("/api/content");
        if (!response.ok) {
          return;
        }
        const sharedContent = await response.json();
        setContent({
          banner: sharedContent.banner || defaultBannerContent,
          section: sharedContent.section || defaultSectionContent,
          site: sharedContent.site || defaultSiteContent,
          features: sharedContent.features || defaultFeatureItems,
          projects: sharedContent.projects || defaultProjectItems,
        });
      } catch (error) {
        console.error("Failed to load shared admin content", error);
      }
    };

    loadSharedContent();
  }, []);

  const saveSharedContent = async (nextContent) => {
    try {
      const resp = await fetch("/api/save-content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: nextContent }),
      });

      if (resp.ok) {
        return;
      }
      console.error("/api/save-content failed with status", resp.status);
    } catch (error) {
      console.error("Failed to save shared content via /api/save-content", error);
    }

    try {
      const cloudName = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;
      const uploadPreset = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET;
      if (cloudName && uploadPreset) {
        const jsonString = JSON.stringify(nextContent);
        const base64 = typeof window !== "undefined" && window.btoa
          ? window.btoa(unescape(encodeURIComponent(jsonString)))
          : Buffer.from(jsonString).toString("base64");
        const dataUri = `data:application/json;base64,${base64}`;

        const formData = new FormData();
        formData.append("file", dataUri);
        formData.append("upload_preset", uploadPreset);
        formData.append("folder", "portfolio-data");
        formData.append("public_id", "portfolio-content");
        formData.append("resource_type", "raw");
        formData.append("format", "json");
        formData.append("overwrite", "true");
        formData.append("unique_filename", "false");

        const url = `https://api.cloudinary.com/v1_1/${cloudName}/raw/upload`;
        const r = await fetch(url, { method: "POST", body: formData });
        if (r.ok) {
          return;
        }
        const txt = await r.text().catch(() => "");
        console.error("Cloudinary client save failed", r.status, txt);
      }
    } catch (err) {
      console.error("Client-side Cloudinary save failed", err);
    }
  };

  const handleSaveContent = async (nextContent) => {
    setContent(nextContent);
    onContentChange?.(nextContent);
    await saveSharedContent(nextContent);
  };

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
            onSave={handleSaveContent}
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
