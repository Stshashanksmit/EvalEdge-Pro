import React, { useState, useEffect } from "react";
import axios from "axios";

export default function OrganizationSetupSection({ setOrgScore, setOrgId }) {
  const [form, setForm] = useState({
    name: "",
    revenue: "",
    headcount: "",
    geographies: "",
    industry: "",
    customIndustry: "",
    score: null,
    tag: "",
  });

  const [showOtherInput, setShowOtherInput] = useState(false);
  const [saving, setSaving] = useState(false);

  const ORG_NAME = "MyOrg"; // hard-coded for MVP single-tenant

  /* ---------- fetch existing org ---------- */
  useEffect(() => {
    async function fetchOrg() {
      try {
        const { data } = await axios.get(`http://localhost:5000/api/organizations/${ORG_NAME}`);
        setForm({
          ...data,
          revenue: data.revenue?.toString() ?? "",
          headcount: data.headcount?.toString() ?? "",
          geographies: data.geographies?.toString() ?? "",
          score: data.score,
          tag: data.tag,
        });
        setOrgScore(data.score);
        setOrgId(data.id);
        if (data.industry === "Other") setShowOtherInput(true);
      } catch {
        /* no org yet */
      }
    }
    fetchOrg();
  }, [setOrgScore, setOrgId]);

  /* ---------- on change ---------- */
  const handleChange = (e) => {
    const { name, value } = e.target;
    const updated = { ...form, [name]: value };

    if (name === "industry") {
      setShowOtherInput(value === "Other");
      if (value !== "Other") updated.customIndustry = "";
    }

    /* PRD points table */
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
  };

  /* ---------- save ---------- */
  const handleSave = async () => {
    if (!form.name || !form.revenue || !form.headcount || !form.geographies || !form.industry) {
      alert("Please fill all required fields.");
      return;
    }
    setSaving(true);
    try {
      let finalIndustry = form.industry;
      if (form.industry === "Other") finalIndustry = form.customIndustry || "Other";

      const payload = {
        name: form.name,
        revenue: parseFloat(form.revenue),
        headcount: parseInt(form.headcount),
        geographies: parseInt(form.geographies),
        industry: finalIndustry,
        score: form.score,
        tag: form.tag,
      };

      const { data } = await axios.post("http://localhost:5000/api/organizations", payload);
      setOrgId(data.id);
      alert("Organization saved!");
    } catch (e) {
      alert("Error saving: " + e.message);
    } finally {
      setSaving(false);
    }
  };

  /* ---------- industries ---------- */
  const industries = [
    "Professional Services",
    "Tech / Digital Products",
    "Manufacturing & Engineering",
    "Logistics & Supply Chain",
    "Banking & Financial Services",
    "Healthcare & Life Sciences",
    "Public Sector & Government",
    "Education & Non-profit",
    "Retail & Consumer Services",
    "Energy & Utilities",
    "Other",
  ];

  return (
    <div className="max-w-xl mx-auto bg-white rounded-xl shadow p-8 mt-8">
      <h1 className="text-2xl font-bold mb-6">Organization Setup</h1>

      <div className="space-y-4">
        <input
          name="name"
          placeholder="Organization Name"
          value={form.name}
          onChange={handleChange}
          className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-purple-500 transition"
          required
        />
        <input
          name="revenue"
          type="number"
          placeholder="Revenue (Mn USD)"
          value={form.revenue}
          onChange={handleChange}
          className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-purple-500 transition"
          required
        />
        <input
          name="headcount"
          type="number"
          placeholder="Total Headcount"
          value={form.headcount}
          onChange={handleChange}
          className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-purple-500 transition"
          required
        />
        <input
          name="geographies"
          type="number"
          placeholder="Number of Countries"
          value={form.geographies}
          onChange={handleChange}
          className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-purple-500 transition"
          required
        />

        <select
          name="industry"
          value={form.industry}
          onChange={handleChange}
          className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-purple-500 transition"
          required
        >
          <option value="">Select Industry</option>
          {industries.map((i) => (
            <option key={i} value={i}>{i}</option>
          ))}
        </select>

        {showOtherInput && (
          <input
            name="customIndustry"
            placeholder="Specify Industry"
            value={form.customIndustry}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-purple-500 transition"
            required
          />
        )}

        <div className="grid grid-cols-2 gap-4">
          <input
            value={form.score ?? ""}
            disabled
            placeholder="Org Score"
            className="w-full border rounded-lg p-3 bg-gray-100 text-gray-700"
          />
          <input
            value={form.tag}
            disabled
            placeholder="Org Tag"
            className="w-full border rounded-lg p-3 bg-gray-100 text-gray-700"
          />
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="w-full gradient-button disabled:opacity-50"
        >
          {saving ? "Saving…" : "Save Organization"}
        </button>
      </div>
    </div>
  );
}
