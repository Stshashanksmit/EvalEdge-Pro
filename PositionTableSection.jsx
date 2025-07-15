import React, { useState, useEffect } from "react";
import axios from "axios";

const factorOptions = {
  factor1: ["1. Basic","2. Working","3. Proficient","4. Expert","5. Enterprise Expert","6. Industry Expert","7. Thought Leader"],
  factor2: ["1. Focused","2. Functional","3. Multi-functional","4. Enterprise-wide","5. Market Integrator"],
  factor3: ["1. Common","2. Broadly Available","3. Specialized","4. Rare","5. Exceptional"],
  factor4: ["1. Routine","2. Adaptive","3. Analytical","4. Integrative","5. Transformative","6. Pioneering","7. Visionary"],
  factor5: ["1. Self-Adaptive","2. Team Support","3. Team Driver","4. Multi-Team Driver","5. Enterprise Leader","6. Ecosystem Leader","7. Societal Shaper"],
  factor6: ["1. Information Exchange","2. Persuade","3. Influence","4. Negotiate","5. Strategize"],
  factor7: ["1. Supportive","2. Operational","3. Functional","4. Business Unit","5. Enterprise","6. Multi-Entity","7. Industry/Society"],
  factor8: ["1. Prescribed","2. Routine","3. People","4. People and Financials","5. People, Financials and Enterprise"],
  factor9: ["1. Support","2. Enabling","3. Shared","4. Line Critical","5. Pivotal"]
};

function PositionTableSection({ orgScore, organizationId }) {
  const [positions, setPositions] = useState([]);
  const [savingIndex, setSavingIndex] = useState(null);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    if (!organizationId) return;
    axios.get(`http://localhost:5000/api/positions/${organizationId}`)
         .then(res => setPositions(res.data))
         .catch(() => setMsg("Could not load positions"));
  }, [organizationId]);

  const addPosition = () => setPositions(prev => [...prev, createEmptyPosition()]);

  const createEmptyPosition = () => ({
    positionId:"",title:"",department:"",team:"",reportingId:"",reportingTitle:"",currentBand:"",currentSalary:"",jdText:"",jdUpload:"",
    factor1Score:"",factor2Score:"",factor3Score:"",factor4Score:"",factor5Score:"",factor6Score:"",factor7Score:"",factor8Score:"",factor9Score:"",
    evalScore:"",comments:""
  });

  const handleChange = (index, field, value) => {
    setPositions(prev => {
      const updated = [...prev];
      updated[index][field] = value;

      // auto-calc EvalEdge Score
      const scores = Array.from({ length: 9 }, (_, i) => parseInt(updated[index][`factor${i + 1}Score`]?.[0] || 0, 10));
      const weights = [0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.2, 0.1, 0.1];
      const weighted = scores.reduce((sum, s, i) => sum + s * weights[i], 0);
      updated[index].evalScore = orgScore ? Math.round(weighted * orgScore) : 0;
      return updated;
    });
  };

  const savePosition = async (pos, idx) => {
    setSavingIndex(idx);
    try {
      await axios.post("http://localhost:5000/api/positions", { ...pos, organizationId });
      setMsg("Saved!");
      setTimeout(() => setMsg(""), 3000);
    } catch (e) {
      setMsg("Save failed");
    } finally {
      setSavingIndex(null);
    }
  };

  const handleBulkUpload = () => alert("Bulk upload via CSV will open file picker (hook later)");

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Evaluations Workspace</h2>
        <div className="space-x-2">
          <button onClick={addPosition} className="text-sm gradient-button px-3 py-1">Add Position</button>
          <button onClick={handleBulkUpload} className="text-sm border border-purple-700 text-purple-700 px-3 py-1 rounded-full hover:bg-purple-50 transition">Bulk Upload (CSV)</button>
          <button onClick={() => alert("AI auto-score coming soon")} className="text-sm border border-purple-700 text-purple-700 px-3 py-1 rounded-full hover:bg-purple-50 transition">AI Auto-Evaluate</button>
        </div>
      </div>

      {msg && <div className={`mb-3 text-sm ${msg.includes("failed") ? "text-red-600" : "text-green-600"}`}>{msg}</div>}

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-100 sticky top-0">
            <tr>
              {["Position ID","Title","Dept","Team","Report ID","Report Title","Band","Salary",
                "Depth","Breadth","Skill","Problem","Change","Influence","Biz Value","Decision","Value Chain","Score","Comments","Save"]
                .map(h => <th key={h} className="px-2 py-1">{h}</th>)}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {positions.map((pos, i) => (
              <tr key={i}>
                {["positionId","title","department","team","reportingId","reportingTitle","currentBand","currentSalary",
                  "factor1Score","factor2Score","factor3Score","factor4Score","factor5Score","factor6Score","factor7Score","factor8Score","factor9Score","evalScore","comments"]
                  .map(f => (
                    <td key={f} className="px-1 py-1">
                      {f.includes("factor") ? (
                        <select value={pos[f]} onChange={e => handleChange(i, f, e.target.value)} className="w-full border rounded-lg p-1 focus:ring-2 focus:ring-purple-500 transition">
                          <option value="">-</option>
                          {factorOptions[f.replace("Score", "")].map(opt => <option key={opt} value={opt}>{opt}</option>)}
                        </select>
                      ) : f === "evalScore" ? (
                        <span className="font-bold">{pos[f]}</span>
                      ) : (
                        <input value={pos[f]} onChange={e => handleChange(i, f, e.target.value)} className="w-full border rounded-lg p-1 focus:ring-2 focus:ring-purple-500 transition" />
                      )}
                    </td>
                  ))}
                <td>
                  <button onClick={() => savePosition(pos, i)} disabled={savingIndex === i} className="text-xs bg-blue-500 text-white px-2 py-1 rounded-full hover:bg-blue-600 transition disabled:opacity-50">
                    {savingIndex === i ? "…" : "Save"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PositionTableSection;
