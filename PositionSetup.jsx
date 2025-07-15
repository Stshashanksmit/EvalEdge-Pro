import React, { useState, useEffect } from "react";
import axios from "axios";

function PositionSetup() {
  const [form, setForm] = useState({
    positionId: "",
    title: "",
    department: "",
    team: "",
    reportingId: "",
    reportingTitle: "",
    currentBand: "",
    currentSalary: "",
    jdText: "",
    jdUpload: "",
    factor1Score: "",
    factor2Score: "",
    factor3Score: "",
    factor4Score: "",
    factor5Score: "",
    factor6Score: "",
    factor7Score: "",
    factor8Score: "",
    factor9Score: "",
    evalScore: "",
    organizationId: "",
  });
  const [message, setMessage] = useState("");

  const factorWeights = {
    factor1Score: 0.10, // Depth
    factor2Score: 0.10, // Breadth
    factor3Score: 0.10, // Skill
    factor4Score: 0.10, // Problem Solving
    factor5Score: 0.10, // Change Leadership
    factor6Score: 0.10, // Influence
    factor7Score: 0.20, // Business Value
    factor8Score: 0.10, // Decision-Making
    factor9Score: 0.10, // Value Chain
  };

  useEffect(() => {
    const orgScore = parseFloat(form.organizationId) || 0;
    let weightedSum = 0;
    for (const factor in factorWeights) {
      const score = parseInt(form[factor]) || 0;
      weightedSum += score * factorWeights[factor];
    }
    const evalScore = Math.round(weightedSum * orgScore);
    setForm((prev) => ({
      ...prev,
      evalScore: isNaN(evalScore) ? "" : evalScore,
    }));
  }, [
    form.factor1Score,
    form.factor2Score,
    form.factor3Score,
    form.factor4Score,
    form.factor5Score,
    form.factor6Score,
    form.factor7Score,
    form.factor8Score,
    form.factor9Score,
    form.organizationId,
  ]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    await axios.post("http://localhost:5000/api/positions", form);
    setMessage("Position created successfully!");

    // Reset form fields after success
    setForm({
      positionId: "",
      title: "",
      department: "",
      team: "",
      reportingId: "",
      reportingTitle: "",
      currentBand: "",
      currentSalary: "",
      jdText: "",
      jdUpload: "",
      factor1Score: "",
      factor2Score: "",
      factor3Score: "",
      factor4Score: "",
      factor5Score: "",
      factor6Score: "",
      factor7Score: "",
      factor8Score: "",
      factor9Score: "",
      evalScore: "",
      organizationId: "",
    });
  } catch (err) {
    console.error(err);
    setMessage("Error creating position");
  }
};

  return (
    <div className="flex flex-col items-center justify-center p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Position Setup</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-full max-w-lg">
        <input name="positionId" placeholder="Position ID" onChange={handleChange} className="p-2 border rounded" required />
        <input name="title" placeholder="Title" onChange={handleChange} className="p-2 border rounded" required />
        <input name="department" placeholder="Department" onChange={handleChange} className="p-2 border rounded" required />
        <input name="team" placeholder="Team (optional)" onChange={handleChange} className="p-2 border rounded" />
        <input name="reportingId" placeholder="Reporting ID" onChange={handleChange} className="p-2 border rounded" required />
        <input name="reportingTitle" placeholder="Reporting Title" onChange={handleChange} className="p-2 border rounded" required />
        <input name="currentBand" placeholder="Current Band" onChange={handleChange} className="p-2 border rounded" required />
        <input name="currentSalary" placeholder="Current Salary (optional)" type="number" onChange={handleChange} className="p-2 border rounded" />
        <textarea name="jdText" placeholder="JD Text (optional)" onChange={handleChange} className="p-2 border rounded" />
        <input name="jdUpload" placeholder="JD Upload Link (optional)" onChange={handleChange} className="p-2 border rounded" />
        <input name="organizationId" placeholder="Organization Score (Org Score)" type="number" onChange={handleChange} className="p-2 border rounded" required />

        {/* Factor dropdowns */}
        <FactorDropdown name="factor1Score" label="Depth of Knowledge" options={["Basic", "Working", "Proficient", "Expert", "Enterprise Expert", "Industry Expert", "Thought Leader"]} onChange={handleChange} />
        <FactorDropdown name="factor2Score" label="Breadth of Knowledge" options={["Focused", "Functional", "Multi-functional", "Enterprise-wide", "Market Integrator"]} onChange={handleChange} />
        <FactorDropdown name="factor3Score" label="Skill Comparison" options={["Common", "Broadly Available", "Specialized", "Rare", "Exceptional"]} onChange={handleChange} />
        <FactorDropdown name="factor4Score" label="Problem Solving & Innovation" options={["Routine", "Adaptive", "Analytical", "Integrative", "Transformative", "Pioneering", "Visionary"]} onChange={handleChange} />
        <FactorDropdown name="factor5Score" label="Change Leadership & Agility" options={["Self-Adaptive", "Team Support", "Team Driver", "Multi-Team Driver", "Enterprise Leader", "Ecosystem Leader", "Societal Shaper"]} onChange={handleChange} />
        <FactorDropdown name="factor6Score" label="Influence & Alignment" options={["Information Exchange", "Persuade", "Influence", "Negotiate", "Strategize"]} onChange={handleChange} />
        <FactorDropdown name="factor7Score" label="Business Value Impact" options={["Supportive", "Operational", "Functional", "Business Unit", "Enterprise", "Multi-Entity", "Industry/Society"]} onChange={handleChange} />
        <FactorDropdown name="factor8Score" label="Decision-Making Authority" options={["Prescribed", "Routine", "People", "People and Financials", "People, Financials and Enterprise"]} onChange={handleChange} />
        <FactorDropdown name="factor9Score" label="Role in Value Chain" options={["Support", "Enabling", "Shared", "Line Critical", "Pivotal"]} onChange={handleChange} />

        <input value={form.evalScore} disabled placeholder="EvalEdge Score (auto-calculated)" className="p-2 border rounded bg-gray-100 text-gray-600" />

        <button type="submit" className="bg-purple-700 text-white p-2 rounded">Save Position</button>
      </form>
      {message && <p className="mt-4 text-green-600">{message}</p>}
    </div>
  );
}

function FactorDropdown({ name, label, options, onChange }) {
  return (
    <div>
      <label className="block mb-1 font-medium">{label}</label>
      <select name={name} onChange={onChange} className="p-2 border rounded w-full" required>
        <option value="">Select Score & Anchor</option>
        {options.map((option, idx) => (
          <option key={idx} value={idx + 1}>{`${idx + 1}. ${option}`}</option>
        ))}
      </select>
    </div>
  );
}

export default PositionSetup;
