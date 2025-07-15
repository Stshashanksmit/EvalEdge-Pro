import { useState, useEffect } from "react";
import { Building, Upload, Plus, Download, Zap, Save, AlertCircle } from "lucide-react";
import { industries, calculateOrganizationalScore, getOrganizationalTag, evaluationFactors } from "../data/evaluationFactors.js";

export default function OrganizationSetup() {
  // Organization setup state
  const [orgData, setOrgData] = useState({
    companyName: "",
    revenue: "",
    headcount: "",
    countries: "",
    industry: "",
    customIndustry: ""
  });

  const [orgResults, setOrgResults] = useState(null);
  const [orgSaved, setOrgSaved] = useState(false);

  // Positions/evaluations state
  const [positions, setPositions] = useState([
    {
      id: 1,
      positionId: "ENG001",
      positionTitle: "Senior Software Engineer",
      department: "Engineering",
      team: "Backend Team",
      reportingId: "ENG000",
      reportingTitle: "Engineering Manager",
      currentBand: "L5",
      currentSalary: 120000,
      jdText: "",
      jdFile: null,
      factorScores: {},
      evalEdgeScore: 0,
      comments: ""
    }
  ]);

  // Calculate organization results when form data changes
  useEffect(() => {
    if (orgData.revenue && orgData.headcount && orgData.countries) {
      const score = calculateOrganizationalScore(
        parseInt(orgData.revenue),
        parseInt(orgData.headcount),
        parseInt(orgData.countries)
      );
      const tag = getOrganizationalTag(score);
      
      setOrgResults({
        score,
        tag: tag.tag,
        description: tag.description
      });
    } else {
      setOrgResults(null);
    }
  }, [orgData.revenue, orgData.headcount, orgData.countries]);

  const handleOrgChange = (e) => {
    setOrgData({
      ...orgData,
      [e.target.name]: e.target.value
    });
  };

  const handleOrgSave = () => {
    if (orgResults) {
      setOrgSaved(true);
      // Save to localStorage or API
      localStorage.setItem('organizationData', JSON.stringify({ ...orgData, ...orgResults }));
    }
  };

  const handlePositionChange = (id, field, value) => {
    setPositions(positions.map(pos => 
      pos.id === id ? { ...pos, [field]: value } : pos
    ));
  };

  const handleFactorScoreChange = (positionId, factorId, score) => {
    setPositions(positions.map(pos => {
      if (pos.id === positionId) {
        const newFactorScores = { ...pos.factorScores, [factorId]: parseInt(score) };
        
        // Calculate EvalEdge Score
        let totalWeightedScore = 0;
        let hasAllScores = true;
        
        Object.keys(evaluationFactors).forEach(fId => {
          const factor = evaluationFactors[fId];
          if (newFactorScores[fId]) {
            totalWeightedScore += newFactorScores[fId] * (factor.weight / 100);
          } else {
            hasAllScores = false;
          }
        });
        
        const evalEdgeScore = hasAllScores && orgResults ? totalWeightedScore * orgResults.score : 0;
        
        return {
          ...pos,
          factorScores: newFactorScores,
          evalEdgeScore: parseFloat(evalEdgeScore.toFixed(2))
        };
      }
      return pos;
    }));
  };

  const addNewPosition = () => {
    const newId = Math.max(...positions.map(p => p.id)) + 1;
    setPositions([...positions, {
      id: newId,
      positionId: "",
      positionTitle: "",
      department: "",
      team: "",
      reportingId: "",
      reportingTitle: "",
      currentBand: "",
      currentSalary: "",
      jdText: "",
      jdFile: null,
      factorScores: {},
      evalEdgeScore: 0,
      comments: ""
    }]);
  };

  const handleBulkUpload = () => {
    // Simulate bulk upload
    alert("Bulk upload functionality would be implemented here. Users can upload CSV/Excel files to populate position data.");
  };

  const handleAIEvaluation = () => {
    if (!orgSaved) {
      alert("Please complete and save organization setup first.");
      return;
    }
    // Simulate AI evaluation
    alert("AI evaluation feature for premium users. This would analyze JD text and auto-assign factor scores.");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-evaledge-text mb-2">Organization & Position Setup</h1>
          <p className="text-gray-600">Configure your organization details and manage position evaluations</p>
        </div>

        {/* Organization Setup Section */}
        <div className="card mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <Building className="w-6 h-6 text-evaledge-base" />
              <h2 className="text-xl font-bold text-evaledge-text">Organization Setup</h2>
              <span className="text-sm text-gray-500">(One-time setup)</span>
            </div>
            {orgSaved && (
              <div className="flex items-center space-x-2 text-green-600">
                <AlertCircle className="w-4 h-4" />
                <span className="text-sm font-medium">Saved</span>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            {/* Company Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Company Name *</label>
              <input
                type="text"
                name="companyName"
                value={orgData.companyName}
                onChange={handleOrgChange}
                className="input-field"
                placeholder="Enter company name"
                required
              />
            </div>

            {/* Revenue */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Revenue (Mn USD) *</label>
              <input
                type="number"
                name="revenue"
                value={orgData.revenue}
                onChange={handleOrgChange}
                className="input-field"
                placeholder="e.g., 250"
                required
              />
            </div>

            {/* Headcount */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Total Headcount *</label>
              <input
                type="number"
                name="headcount"
                value={orgData.headcount}
                onChange={handleOrgChange}
                className="input-field"
                placeholder="e.g., 1500"
                required
              />
              <p className="text-xs text-gray-500 mt-1">Add 50% of total contractual staff if applicable</p>
            </div>

            {/* Countries */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Number of Countries of Operations *</label>
              <input
                type="number"
                name="countries"
                value={orgData.countries}
                onChange={handleOrgChange}
                className="input-field"
                placeholder="e.g., 5"
                required
              />
            </div>

            {/* Industry */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Industry *</label>
              <select
                name="industry"
                value={orgData.industry}
                onChange={handleOrgChange}
                className="input-field"
                required
              >
                <option value="">Select industry</option>
                {industries.map((industry) => (
                  <option key={industry} value={industry}>{industry}</option>
                ))}
              </select>
              
              {orgData.industry === 'Others (Please specify)' && (
                <div className="mt-3">
                  <input
                    type="text"
                    name="customIndustry"
                    value={orgData.customIndustry}
                    onChange={handleOrgChange}
                    className="input-field"
                    placeholder="Please specify your industry"
                    required
                  />
                </div>
              )}
            </div>
          </div>

          {/* Results Display */}
          {orgResults && (
            <div className="bg-gradient-to-r from-evaledge-base/10 to-evaledge-light/10 rounded-2xl p-6 mb-6">
              <h3 className="text-lg font-bold text-evaledge-text mb-4">Organization Results</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="text-sm font-medium text-gray-600 mb-1">Organizational Score</div>
                  <div className="text-3xl font-bold text-evaledge-base">{orgResults.score}</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-600 mb-1">Organizational Tag</div>
                  <div className="text-xl font-bold text-evaledge-text">{orgResults.tag}</div>
                  <div className="text-sm text-gray-600">{orgResults.description}</div>
                </div>
              </div>
            </div>
          )}

          {/* Save Button */}
          <div className="flex justify-end">
            <button
              onClick={handleOrgSave}
              disabled={!orgResults}
              className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
            >
              <Save className="w-4 h-4 mr-2" />
              Save Organization Setup
            </button>
          </div>
        </div>

        {/* Evaluations Workspace */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-evaledge-text">Evaluations Workspace</h2>
            
            <div className="flex items-center space-x-3">
              <button
                onClick={addNewPosition}
                className="btn-secondary flex items-center"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add New Position
              </button>
              
              <button
                onClick={handleBulkUpload}
                className="btn-secondary flex items-center"
              >
                <Upload className="w-4 h-4 mr-2" />
                Bulk Upload
              </button>
              
              <button
                onClick={handleAIEvaluation}
                className="btn-primary flex items-center"
              >
                <Zap className="w-4 h-4 mr-2" />
                AI Auto-Evaluate
              </button>
            </div>
          </div>

          {/* Position evaluation table would go here - due to space constraints, showing a simplified version */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-2 font-semibold text-gray-700">Position ID</th>
                  <th className="text-left py-3 px-2 font-semibold text-gray-700">Position Title</th>
                  <th className="text-left py-3 px-2 font-semibold text-gray-700">Department</th>
                  <th className="text-left py-3 px-2 font-semibold text-gray-700">Current Band</th>
                  <th className="text-left py-3 px-2 font-semibold text-gray-700">EvalEdge Score</th>
                  <th className="text-left py-3 px-2 font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {positions.map((position) => (
                  <tr key={position.id} className="border-b border-gray-100">
                    <td className="py-3 px-2">
                      <input
                        type="text"
                        value={position.positionId}
                        onChange={(e) => handlePositionChange(position.id, 'positionId', e.target.value)}
                        className="w-20 px-2 py-1 border border-gray-200 rounded text-xs"
                        placeholder="ID"
                      />
                    </td>
                    <td className="py-3 px-2">
                      <input
                        type="text"
                        value={position.positionTitle}
                        onChange={(e) => handlePositionChange(position.id, 'positionTitle', e.target.value)}
                        className="w-32 px-2 py-1 border border-gray-200 rounded text-xs"
                        placeholder="Position title"
                      />
                    </td>
                    <td className="py-3 px-2">
                      <input
                        type="text"
                        value={position.department}
                        onChange={(e) => handlePositionChange(position.id, 'department', e.target.value)}
                        className="w-24 px-2 py-1 border border-gray-200 rounded text-xs"
                        placeholder="Department"
                      />
                    </td>
                    <td className="py-3 px-2">
                      <input
                        type="text"
                        value={position.currentBand}
                        onChange={(e) => handlePositionChange(position.id, 'currentBand', e.target.value)}
                        className="w-16 px-2 py-1 border border-gray-200 rounded text-xs"
                        placeholder="Band"
                      />
                    </td>
                    <td className="py-3 px-2">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-evaledge-light/20 text-evaledge-base">
                        {position.evalEdgeScore || '0.00'}
                      </span>
                    </td>
                    <td className="py-3 px-2">
                      <button className="text-evaledge-base hover:underline text-xs">
                        Evaluate
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 text-center text-gray-500">
            <p className="text-sm">
              Complete factor scoring interface would be implemented here with dropdowns for each of the 9 evaluation factors.
              <br />
              This includes: Depth of Knowledge, Breadth of Knowledge, Skill Comparison, Problem Solving, Change Leadership, 
              Influence, Business Value Impact, Decision-Making Authority, and Role in Value Chain.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}