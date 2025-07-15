import React, { useState } from "react";
import axios from "axios";

function OrganizationSetup() {
  const [form, setForm] = useState({
    name: "",
    revenue: "",
    headcount: "",
    geographies: "",
    industry: "",
    customIndustry: "",
    tag: "",
    score: "",
  });

  const industryOptions = [
    "Technology e.g. SaaS, IT Services, Platforms, Product Start-ups",
    "Manufacturing e.g. Factories, Heavy Industry, Electronics",
    "Logistics e.g. Transport, Warehousing, Distribution",
    "Banking e.g. Banks, Insurance, Fintech, Microfinance",
    "Healthcare e.g. Hospitals, Pharma, MedTech, Clinics",
    "Government e.g. Government, PSUs, Municipal Bodies",
    "Education e.g. Schools, EdTech, NGOs, Development Orgs",
    "Retail e.g. Retail, FMCG, Hospitality, E-commerce",
    "Energy e.g. Oil & Gas, Electricity, Water, Renewables",
    "Other (Please specify)",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => {
      const updatedForm = {
        ...prev,
        [name]: value,
      };

      let revenuePoints = 0;
      if (updatedForm.revenue < 5) revenuePoints = 1;
      else if (updatedForm.revenue < 25) revenuePoints = 2;
      else if (updatedForm.revenue < 250) revenuePoints = 3;
      else if (updatedForm.revenue < 1000) revenuePoints = 4;
      else if (updatedForm.revenue < 5000) revenuePoints = 5;
      else revenuePoints = 6;

      let headcountPoints = 0;
      if (updatedForm.headcount < 50) headcountPoints = 1;
      else if (updatedForm.headcount < 250) headcountPoints = 2;
      else if (updatedForm.headcount < 1000) headcountPoints = 3;
      else if (updatedForm.headcount < 5000) headcountPoints = 4;
      else if (updatedForm.headcount < 20000) headcountPoints = 5;
      else headcountPoints = 6;

      let geoPoints = 0;
      if (updatedForm.geographies < 2) geoPoints = 1;
      else if (updatedForm.geographies < 4) geoPoints = 2;
      else if (updatedForm.geographies < 6) geoPoints = 3;
      else if (updatedForm.geographies < 11) geoPoints = 4;
      else if (updatedForm.geographies < 16) geoPoints = 5;
      else geoPoints = 6;

      const totalScore = revenuePoints + headcountPoints + geoPoints;

      let tag = "";
      if (totalScore <= 4) tag = "Lean Local";
      else if (totalScore <= 6) tag = "Stable National";
      else if (totalScore <= 9) tag = "Expanding Enterprise";
      else if (totalScore <= 12) tag = "Global Player";
      else tag = "Complex Conglomerate";

      updatedForm.score = totalScore;
      updatedForm.tag = tag;

      return updatedForm;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/organizations", form);
      alert("Organization created successfully!");
    } catch (err) {
      console.error(err);
      alert("Error creating organization");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Organization Setup</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-full max-w-lg">
        <input
          name="name"
          placeholder="Organization Name"
          onChange={handleChange}
          className="p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 transition"
          required
        />
        <input
          name="revenue"
          placeholder="Revenue (Mn USD)"
          type="number"
          onChange={handleChange}
          className="p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 transition"
          required
        />
        <input
          name="headcount"
          placeholder="Total Headcount"
          type="number"
          onChange={handleChange}
          className="p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 transition"
          required
        />
        <input
          name="geographies"
          placeholder="Number of Geographies"
          type="number"
          onChange={handleChange}
          className="p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 transition"
          required
        />

        <select
          name="industry"
          onChange={handleChange}
          className="p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 transition"
          required
        >
          <option value="">Select Industry</option>
          {industryOptions.map((opt, idx) => (
            <option key={idx} value={opt}>{opt}</option>
          ))}
        </select>

        {form.industry === "Other (Please specify)" && (
          <input
            name="customIndustry"
            placeholder="Specify Industry"
            onChange={handleChange}
            className="p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 transition"
            required
          />
        )}

        <input
          value={form.tag}
          disabled
          placeholder="Org Tag (auto)"
          className="p-3 border rounded-lg bg-gray-100 text-gray-600"
        />
        <input
          value={form.score}
          disabled
          placeholder="Org Score (auto)"
          className="p-3 border rounded-lg bg-gray-100 text-gray-600"
        />

        <button type="submit" className="gradient-button">
          Save Organization
        </button>
      </form>
    </div>
  );
}

export default OrganizationSetup;
