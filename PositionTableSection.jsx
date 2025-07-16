import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as XLSX from 'xlsx';
import { FaMagic, FaUpload, FaPlus, FaSave } from 'react-icons/fa';

const FACTOR_DEFINITIONS = {
  factor1: {
    name: "Depth of Knowledge",
    options: [
      "1. Basic - Operational/procedural know-how",
      "2. Working - Practical knowledge",
      "3. Proficient - Advanced functional expertise",
      "4. Expert - Deep specialist knowledge",
      "5. Enterprise Expert - Broad mastery",
      "6. Industry Expert - Externally recognized",
      "7. Thought Leader - Pioneers new methods"
    ]
  },
  factor2: {
    name: "Breadth of Knowledge",
    options: [
      "1. Focused - Single function",
      "2. Functional - Adjacent functions",
      "3. Multi-functional - Cross-functional",
      "4. Enterprise-wide - Organization-wide",
      "5. Market Integrator - Cross-industry"
    ]
  },
  // ... include all 9 factors with similar structure
};

export default function PositionTableSection({ orgScore, organizationId }) {
  const [positions, setPositions] = useState([]);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  const [activeFactors, setActiveFactors] = useState([]);

  useEffect(() => {
    if (organizationId) {
      loadPositions();
    }
  }, [organizationId]);

  const loadPositions = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/positions/${organizationId}`);
      setPositions(res.data);
    } catch (err) {
      showMessage('Failed to load positions', 'error');
    }
  };

  const showMessage = (text, type) => {
    setMessage({ text, type });
    setTimeout(() => setMessage({ text: '', type: '' }), 5000);
  };

  const addPosition = () => {
    setPositions([...positions, createEmptyPosition()]);
  };

  const createEmptyPosition = () => ({
    positionId: generateId(),
    title: '',
    department: '',
    team: '',
    reportingId: '',
    reportingTitle: '',
    currentBand: '',
    currentSalary: '',
    jdText: '',
    jdUpload: null,
    factor1Score: '',
    // ... all other factors
    evalScore: '',
    isNew: true
  });

  const generateId = () => `POS-${Math.random().toString(36).substr(2, 8).toUpperCase()}`;

  const handleChange = (index, field, value) => {
    const updated = [...positions];
    updated[index][field] = value;
    
    // Auto-calculate EvalEdge score if all factors are filled
    if (field.startsWith('factor') && orgScore) {
      const allFactorsFilled = Object.keys(FACTOR_DEFINITIONS).every(f => 
        updated[index][`${f}Score`] && !isNaN(updated[index][`${f}Score`])
      );
      
      if (allFactorsFilled) {
        const weights = {
          factor1: 0.1, factor2: 0.1, factor3: 0.1, factor4: 0.1, 
          factor5: 0.1, factor6: 0.1, factor7: 0.2, factor8: 0.1, factor9: 0.1
        };
        
        const weightedSum = Object.keys(weights).reduce((sum, factor) => 
          sum + (parseInt(updated[index][`${factor}Score`]) * weights[factor]), 0);
        
        updated[index].evalScore = Math.round(weightedSum * orgScore);
      }
    }
    
    setPositions(updated);
  };

  const savePosition = async (index) => {
    const position = positions[index];
    if (!validatePosition(position)) return;

    setIsSaving(true);
    try {
      if (position.isNew) {
        await axios.post('http://localhost:5000/api/positions', {
          ...position,
          organizationId
        });
      } else {
        await axios.put(`http://localhost:5000/api/positions/${position.id}`, position);
      }
      
      const updated = [...positions];
      updated[index].isNew = false;
      setPositions(updated);
      showMessage('Position saved successfully!', 'success');
    } catch (err) {
      showMessage('Failed to save position', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  const validatePosition = (position) => {
    if (!position.positionId || !position.title || !position.department) {
      showMessage('Please fill required fields (ID, Title, Department)', 'error');
      return false;
    }
    return true;
  };

  const handleBulkUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);

      const newPositions = jsonData.map(item => ({
        ...createEmptyPosition(),
        positionId: item['Position ID'] || generateId(),
        title: item['Title'] || '',
        department: item['Department'] || '',
        team: item['Team'] || '',
        reportingId: item['Reporting ID'] || '',
        reportingTitle: item['Reporting Title'] || '',
        currentBand: item['Current Band'] || '',
        currentSalary: item['Current Salary'] || '',
        jdText: item['Job Description'] || ''
      }));

      setPositions([...positions, ...newPositions]);
      showMessage(`${jsonData.length} positions imported`, 'success');
    };
    reader.readAsArrayBuffer(file);
  };

  const handleAIEvaluate = async (index) => {
    const position = positions[index];
    if (!position.jdText) {
      showMessage('Please add job description text for AI evaluation', 'error');
      return;
    }

    try {
      showMessage('AI is evaluating the position...', 'info');
      // This would call your actual AI endpoint
      const mockResponse = {
        factor1Score: Math.floor(Math.random() * 7) + 1,
        factor2Score: Math.floor(Math.random() * 5) + 1,
        // ... mock scores for all factors
      };

      const updated = [...positions];
      Object.keys(mockResponse).forEach(key => {
        updated[index][key] = mockResponse[key];
      });
      setPositions(updated);
      showMessage('AI evaluation complete! Review and adjust as needed.', 'success');
    } catch (err) {
      showMessage('AI evaluation failed', 'error');
    }
  };

  const toggleFactorVisibility = (factor) => {
    setActiveFactors(prev => 
      prev.includes(factor) 
        ? prev.filter(f => f !== factor) 
        : [...prev, factor]
    );
  };

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <div className="flex flex-wrap justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Evaluations Workspace</h2>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={addPosition}
            className="flex items-center gap-2 bg-purple-700 text-white px-4 py-2 rounded-full text-sm"
          >
            <FaPlus /> Add Position
          </button>
          
          <label className="flex items-center gap-2 border border-purple-700 text-purple-700 px-4 py-2 rounded-full text-sm cursor-pointer">
            <FaUpload /> Bulk Upload
            <input type="file" accept=".xlsx,.xls,.csv" onChange={handleBulkUpload} className="hidden" />
          </label>
        </div>
      </div>

      {message.text && (
        <div className={`mb-4 p-3 rounded ${
          message.type === 'error' ? 'bg-red-100 text-red-800' :
          message.type === 'success' ? 'bg-green-100 text-green-800' :
          'bg-blue-100 text-blue-800'
        }`}>
          {message.text}
        </div>
      )}

      <div className="mb-4 p-3 bg-gray-50 rounded-lg">
        <h3 className="font-medium mb-2">Quick Filters</h3>
        <div className="flex flex-wrap gap-2">
          {Object.keys(FACTOR_DEFINITIONS).map(factor => (
            <button
              key={factor}
              onClick={() => toggleFactorVisibility(factor)}
              className={`px-3 py-1 rounded-full text-xs ${
                activeFactors.includes(factor)
                  ? 'bg-purple-700 text-white'
                  : 'bg-gray-200 text-gray-700'
              }`}
            >
              {FACTOR_DEFINITIONS[factor].name}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <TableHeader>Position</TableHeader>
              <TableHeader>Department</TableHeader>
              <TableHeader>Current Band</TableHeader>
              {activeFactors.map(factor => (
                <TableHeader key={factor}>{FACTOR_DEFINITIONS[factor].name}</TableHeader>
              ))}
              <TableHeader>EvalEdge Score</TableHeader>
              <TableHeader>Actions</TableHeader>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {positions.map((pos, index) => (
              <tr key={pos.positionId} className="hover:bg-gray-50">
                <TableCell>
                  <input
                    value={pos.positionId}
                    onChange={(e) => handleChange(index, 'positionId', e.target.value)}
                    placeholder="Position ID"
                    className="w-full border rounded p-1 mb-1"
                  />
                  <input
                    value={pos.title}
                    onChange={(e) => handleChange(index, 'title', e.target.value)}
                    placeholder="Title"
                    className="w-full border rounded p-1"
                  />
                </TableCell>
                <TableCell>
                  <input
                    value={pos.department}
                    onChange={(e) => handleChange(index, 'department', e.target.value)}
                    placeholder="Department"
                    className="w-full border rounded p-1"
                  />
                </TableCell>
                <TableCell>
                  <input
                    value={pos.currentBand}
                    onChange={(e) => handleChange(index, 'currentBand', e.target.value)}
                    placeholder="Current Band"
                    className="w-full border rounded p-1"
                  />
                </TableCell>
                
                {activeFactors.map(factor => (
                  <TableCell key={factor}>
                    <select
                      value={pos[`${factor}Score`] || ''}
                      onChange={(e) => handleChange(index, `${factor}Score`, e.target.value)}
                      className="w-full border rounded p-1"
                    >
                      <option value="">Select</option>
                      {FACTOR_DEFINITIONS[factor].options.map((opt, i) => (
                        <option key={i} value={i+1}>{opt}</option>
                      ))}
                    </select>
                  </TableCell>
                ))}
                
                <TableCell>
                  <div className={`px-2 py-1 rounded-full text-center ${
                    !pos.evalScore ? 'bg-gray-100 text-gray-700' :
                    pos.evalScore < 30 ? 'bg-red-100 text-red-700' :
                    pos.evalScore < 60 ? 'bg-yellow-100 text-yellow-700' :
                    'bg-green-100 text-green-700'
                  }`}>
                    {pos.evalScore || '-'}
                  </div>
                </TableCell>
                
                <TableCell>
                  <div className="flex gap-2">
                    <button
                      onClick={() => savePosition(index)}
                      disabled={isSaving}
                      className="flex items-center gap-1 bg-blue-600 text-white px-2 py-1 rounded text-xs"
                    >
                      <FaSave /> {isSaving ? 'Saving...' : 'Save'}
                    </button>
                    <button
                      onClick={() => handleAIEvaluate(index)}
                      className="flex items-center gap-1 bg-green-600 text-white px-2 py-1 rounded text-xs"
                    >
                      <FaMagic /> AI
                    </button>
                  </div>
                </TableCell>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const TableHeader = ({ children }) => (
  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
    {children}
  </th>
);

const TableCell = ({ children }) => (
  <td className="px-4 py-2 whitespace-nowrap text-sm">
    {children}
  </td>
);