import React, { useEffect, useState } from "react";
import { defaultFeatureItems, defaultProjectItems, defaultSectionContent, defaultSiteContent } from "../../constants";
import { isCustomImageUrl } from "../../utils/imageUtils";

const imageOptions = [
  { value: "projectOne", label: "Project One" },
  { value: "projectTwo", label: "Project Two" },
  { value: "projectThree", label: "Project Three" },
  { value: "custom", label: "Upload custom image" },
];

const AdminPanel = ({ initialData, onSave, onCancel }) => {
  const [formData, setFormData] = useState(initialData);
  const [message, setMessage] = useState("");

  useEffect(() => {
    setFormData(initialData);
  }, [initialData]);

  const handleFeatureChange = (id, field, value) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      ),
    }));
  };

  const handleProjectChange = (id, field, value) => {
    setFormData((prev) => ({
      ...prev,
      projects: prev.projects.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      ),
    }));
  };

  const uploadImageToBackend = async (file) => {
    const base64 = await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = () => reject(reader.error);
      reader.readAsDataURL(file);
    });

    const response = await fetch("/api/upload", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ file: base64 }),
    });

    if (!response.ok) {
      throw new Error("Upload failed");
    }

    const data = await response.json();
    return data.url;
  };

  const handleBannerImageUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const imageUrl = await uploadImageToBackend(file);
      setFormData((prev) => ({
        ...prev,
        banner: {
          ...prev.banner,
          bannerImage: imageUrl,
          bannerImageName: file.name,
        },
      }));
      setMessage("Banner image uploaded successfully.");
    } catch (error) {
      console.error("Failed to upload banner image", error);
      setMessage("Banner image upload failed. Please try again.");
    }
  };

  const handleProjectImageUpload = async (id, event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const imageUrl = await uploadImageToBackend(file);
      setFormData((prev) => ({
        ...prev,
        projects: prev.projects.map((item) =>
          item.id === id ? { ...item, image: imageUrl, imageName: file.name } : item
        ),
      }));
      setMessage("Project image uploaded successfully.");
    } catch (error) {
      console.error("Failed to upload project image", error);
      setMessage("Project image upload failed. Please try again.");
    }
  };

  const handleSave = () => {
    onSave(formData);
    setMessage("Content saved successfully.");
  };

  const handleBannerChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      banner: {
        ...prev.banner,
        [field]: value,
      },
    }));
  };

  const handleReset = () => {
    const resetData = {
      section: defaultSectionContent,
      site: defaultSiteContent,
      features: defaultFeatureItems,
      projects: defaultProjectItems,
    };
    setFormData(resetData);
    onSave(resetData);
    setMessage("Content reset to defaults.");
  };

  return (
    <div className="w-full py-10">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-white">Admin Panel</h2>
          <p className="text-gray-400 mt-2">
            Update your portfolio content for Features and Projects here.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={handleSave}
            className="px-4 py-2 rounded-md bg-designColor text-white font-semibold"
          >
            Save Changes
          </button>
          <button
            onClick={handleReset}
            className="px-4 py-2 rounded-md border border-gray-600 text-gray-200"
          >
            Reset
          </button>
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-md bg-black text-gray-200"
          >
            Back to Site
          </button>
        </div>
      </div>

      {message ? (
        <div className="mb-6 rounded-md border border-green-600 bg-green-950/40 px-4 py-3 text-green-300">
          {message}
        </div>
      ) : null}

      <div className="grid gap-8 xl:grid-cols-2">
        <section className="rounded-xl border border-gray-800 bg-[#11171d] p-6">
          <h3 className="text-xl font-semibold mb-4 text-white">Homepage Controls</h3>
          <div className="space-y-4">
            <div>
              <label className="mb-2 block text-sm text-gray-400">Hire Me Link</label>
              <input
                value={formData.site?.hireMeLink || ""}
                onChange={(e) => setFormData((prev) => ({ ...prev, site: { ...prev.site, hireMeLink: e.target.value } }))}
                className="w-full rounded-md border border-gray-700 bg-[#0c1218] px-3 py-2 text-white"
                placeholder="https://example.com"
              />
            </div>
          </div>

          <h3 className="text-xl font-semibold mt-8 mb-4 text-white">Banner Controls</h3>
          <div className="space-y-4">
            <div>
              <label className="mb-2 block text-sm text-gray-400">Top text</label>
              <input
                value={formData.banner?.bannerTopText || ""}
                onChange={(e) => handleBannerChange("bannerTopText", e.target.value)}
                className="w-full rounded-md border border-gray-700 bg-[#0c1218] px-3 py-2 text-white"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm text-gray-400">Intro text</label>
              <input
                value={formData.banner?.bannerIntroText || ""}
                onChange={(e) => handleBannerChange("bannerIntroText", e.target.value)}
                className="w-full rounded-md border border-gray-700 bg-[#0c1218] px-3 py-2 text-white"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm text-gray-400">Name</label>
              <input
                value={formData.banner?.bannerName || ""}
                onChange={(e) => handleBannerChange("bannerName", e.target.value)}
                className="w-full rounded-md border border-gray-700 bg-[#0c1218] px-3 py-2 text-white"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm text-gray-400">Banner description</label>
              <textarea
                value={formData.banner?.bannerDescription || ""}
                onChange={(e) => handleBannerChange("bannerDescription", e.target.value)}
                className="min-h-[100px] w-full rounded-md border border-gray-700 bg-[#0c1218] px-3 py-2 text-white"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm text-gray-400">Banner Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleBannerImageUpload}
                className="w-full rounded-md border border-gray-700 bg-[#0c1218] px-3 py-2 text-white"
              />
              {formData.banner?.bannerImageName ? (
                <p className="mt-2 text-sm text-gray-400">Selected file: {formData.banner.bannerImageName}</p>
              ) : null}
            </div>
          </div>

          <h3 className="text-xl font-semibold mt-8 mb-4 text-white">What I Do Section</h3>
          <div className="space-y-4">
            <div>
              <label className="mb-2 block text-sm text-gray-400">Section Title</label>
              <input
                value={formData.section?.featuresTitle || ""}
                onChange={(e) => setFormData((prev) => ({ ...prev, section: { ...prev.section, featuresTitle: e.target.value } }))}
                className="w-full rounded-md border border-gray-700 bg-[#0c1218] px-3 py-2 text-white"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm text-gray-400">Section Subtitle</label>
              <input
                value={formData.section?.featuresDescription || ""}
                onChange={(e) => setFormData((prev) => ({ ...prev, section: { ...prev.section, featuresDescription: e.target.value } }))}
                className="w-full rounded-md border border-gray-700 bg-[#0c1218] px-3 py-2 text-white"
              />
            </div>
          </div>
        </section>

        <section className="rounded-xl border border-gray-800 bg-[#11171d] p-6">
          <h3 className="text-xl font-semibold mb-4 text-white">Features</h3>
          <div className="space-y-4">
            {formData.features.map((feature) => (
              <div key={feature.id} className="rounded-lg border border-gray-700 p-4">
                <label className="mb-2 block text-sm text-gray-400">Title</label>
                <input
                  value={feature.title}
                  onChange={(e) => handleFeatureChange(feature.id, "title", e.target.value)}
                  className="w-full rounded-md border border-gray-700 bg-[#0c1218] px-3 py-2 text-white"
                />
                <label className="mb-2 mt-3 block text-sm text-gray-400">Description</label>
                <textarea
                  value={feature.description}
                  onChange={(e) => handleFeatureChange(feature.id, "description", e.target.value)}
                  className="min-h-[90px] w-full rounded-md border border-gray-700 bg-[#0c1218] px-3 py-2 text-white"
                />
                <label className="mb-2 mt-3 block text-sm text-gray-400">Icon Key</label>
                <input
                  value={feature.icon}
                  onChange={(e) => handleFeatureChange(feature.id, "icon", e.target.value)}
                  className="w-full rounded-md border border-gray-700 bg-[#0c1218] px-3 py-2 text-white"
                  placeholder="web, app, design, video, ux, hosting"
                />
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-xl border border-gray-800 bg-[#11171d] p-6">
          <h3 className="text-xl font-semibold mb-4 text-white">Projects</h3>
          <div className="space-y-4">
            {formData.projects.map((project) => (
              <div key={project.id} className="rounded-lg border border-gray-700 p-4">
                <label className="mb-2 block text-sm text-gray-400">Title</label>
                <input
                  value={project.title}
                  onChange={(e) => handleProjectChange(project.id, "title", e.target.value)}
                  className="w-full rounded-md border border-gray-700 bg-[#0c1218] px-3 py-2 text-white"
                />
                <label className="mb-2 mt-3 block text-sm text-gray-400">Description</label>
                <textarea
                  value={project.description}
                  onChange={(e) => handleProjectChange(project.id, "description", e.target.value)}
                  className="min-h-[90px] w-full rounded-md border border-gray-700 bg-[#0c1218] px-3 py-2 text-white"
                />
                <label className="mb-2 mt-3 block text-sm text-gray-400">Website Link</label>
                <input
                  value={project.websiteLink || ""}
                  onChange={(e) => handleProjectChange(project.id, "websiteLink", e.target.value)}
                  className="w-full rounded-md border border-gray-700 bg-[#0c1218] px-3 py-2 text-white"
                  placeholder="https://example.com"
                />

                <label className="mb-2 mt-3 block text-sm text-gray-400">Image</label>
                <select
                  value={isCustomImageUrl(project.image) ? "custom" : project.image}
                  onChange={(e) => {
                    if (e.target.value === "custom") {
                      handleProjectChange(project.id, "image", "custom");
                      return;
                    }
                    handleProjectChange(project.id, "image", e.target.value);
                    handleProjectChange(project.id, "imageName", "");
                  }}
                  className="w-full rounded-md border border-gray-700 bg-[#0c1218] px-3 py-2 text-white"
                >
                  {imageOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>

                {project.image === "custom" || isCustomImageUrl(project.image) ? (
                  <div className="mt-3">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleProjectImageUpload(project.id, e)}
                      className="w-full rounded-md border border-gray-700 bg-[#0c1218] px-3 py-2 text-white"
                    />
                    {project.imageName ? (
                      <p className="mt-2 text-sm text-gray-400">Selected file: {project.imageName}</p>
                    ) : null}
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default AdminPanel;
