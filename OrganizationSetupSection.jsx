import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

export default function OrganizationSetupSection({ setOrgScore, setOrgId }) {
  const [form, setForm] = useState({
    name: "",
    revenue: "",
    headcount: "",
    geographies: "",
    industry: "",
    customIndustry: "",
    score: "",
    tag: "",
  });
  const [showOther, setShowOther] = useState(false);
  const [saving, setSaving] = useState(false);
  const saveTimeout = useRef(null);

  useEffect(() => {
    const storedOrgId = localStorage.getItem("organizationId");
    if (storedOrgId) {
      axios
        .get(`http://localhost:5000/api/organizations/by-id/${storedOrgId}`)
        .then((res) => {
          const data = res.data;
          setForm({
            name: data.name,
            revenue: data.revenue?.toString() || "",
            headcount: data.headcount?.toString() || "",
            geographies: data.geographies?.toString() || "",
            industry: data.industry,
            customIndustry: "",
            score: data.score,
            tag: data.tag,
          });
          setOrgScore(data.score);
          setOrgId(data.id);
        })
        .catch(() => {
          console.log("No org found");
        });
    }
  }, []);

  useEffect(() => {
    return () => {
      if (saveTimeout.current) clearTimeout(saveTimeout.current);
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updated = { ...form, [name]: value };

    if (name === "industry") {
      setShowOther(value === "Other");
      if (value !== "Other") updated.customIndustry = "";
    }

    // Calculate points
    const rev = parseFloat(updated.revenue) || 0;
    const hc = parseInt(updated.headcount) || 0;
    const geo = parseInt(updated.geographies) || 0;

    const revPts = rev < 5 ? 1 : rev < 25 ? 2 : rev < 250 ? 3 : rev < 1000 ? 4 : rev < 5000 ? 5 : 6;
    const hcPts = hc < 50 ? 1 : hc < 250 ? 2 : hc < 1000 ? 3 : hc < 5000 ? 4 : hc < 20000 ? 5 : 6;
    const geoPts = geo < 2 ? 1 : geo < 4 ? 2 : geo < 6 ? 3 : geo < 11 ? 4 : geo < 16 ? 5 : 6;

    const totalScore = revPts + hcPts + geoPts;

    let tag = "";
    if (totalScore <= 4) tag = "Lean Local";
    else if (totalScore <= 6) tag = "Stable National";
    else if (totalScore <= 9) tag = "Expanding Enterprise";
    else if (totalScore <= 12) tag = "Global Player";
    else tag = "Complex Conglomerate";

    updated.score = totalScore;
    updated.tag = tag;

    setForm(updated);
    setOrgScore(totalScore);

    if (saveTimeout.current) clearTimeout(saveTimeout.current);
    saveTimeout.current = setTimeout(() => {
      handleSave(updated);
    }, 1000);
  };

  const handleSave = async (dataToSave = form) => {
    if (!dataToSave.name || !dataToSave.revenue || !dataToSave.headcount || !dataToSave.geographies || !dataToSave.industry) {
      return;
    }
    setSaving(true);
    try {
      const finalIndustry = dataToSave.industry === "Other" ? dataToSave.customIndustry || "Other" : dataToSave.industry;

      const payload = {
        name: dataToSave.name,
        revenue: parseFloat(dataToSave.revenue),
        headcount: parseInt(dataToSave.headcount),
        geographies: parseInt(dataToSave.geographies),
        industry: finalIndustry,
        score: dataToSave.score,
        tag: dataToSave.tag,
      };

      const res = await axios.post("http://localhost:5000/api/organizations", payload);

      if (res.data?.id) {
        setOrgId(res.data.id);
        localStorage.setItem("organizationId", res.data.id);
      }
    } catch (e) {
      console.error("Auto-save failed:", e);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Organization Name</label>
        <input
          name="name"
          placeholder="Organization Name"
          value={form.name}
          onChange={handleChange}
          className="w-full border rounded p-3"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Revenue (Mn USD)</label>
        <input
          name="revenue"
          type="number"
          placeholder="Revenue"
          value={form.revenue}
          onChange={handleChange}
          className="w-full border rounded p-3"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Total Headcount</label>
        <input
          name="headcount"
          type="number"
          placeholder="Headcount"
          value={form.headcount}
          onChange={handleChange}
          className="w-full border rounded p-3"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Number of Countries</label>
        <input
          name="geographies"
          type="number"
          placeholder="Countries"
          value={form.geographies}
          onChange={handleChange}
          className="w-full border rounded p-3"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Industry</label>
        <select
          name="industry"
          value={form.industry}
          onChange={handleChange}
          className="w-full border rounded p-3"
          required
        >
          <option value="">Select Industry</option>
          <option>Professional Services</option>
          <option>Tech / Digital Products</option>
          <option>Manufacturing & Engineering</option>
          <option>Logistics & Supply Chain</option>
          <option>Banking & Financial Services</option>
          <option>Healthcare & Life Sciences</option>
          <option>Public Sector & Government</option>
          <option>Education & Non-profit</option>
          <option>Retail & Consumer Services</option>
          <option>Energy & Utilities</option>
          <option>Other</option>
        </select>
      </div>
      {showOther && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Specify Industry</label>
          <input
            name="customIndustry"
            placeholder="Specify Industry"
            value={form.customIndustry}
            onChange={handleChange}
            className="w-full border rounded p-3"
            required
          />
        </div>
      )}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Org Score</label>
          <input
            value={form.score ?? ""}
            disabled
            className="w-full border rounded p-3 bg-gray-100 text-gray-700"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Org Tag</label>
          <input
            value={form.tag}
            disabled
            className="w-full border rounded p-3 bg-gray-100 text-gray-700"
          />
        </div>
      </div>
      <button
        onClick={() => handleSave()}
        disabled={saving}
        className="w-full bg-purple-700 text-white py-3 rounded hover:bg-purple-800 disabled:opacity-50"
      >
        {saving ? "Saving…" : "Save Organization"}
      </button>
    </div>
  );
}
