import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ScatterChart, Scatter, XAxis, YAxis, ZAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

export default function ResultsPage() {
  const [positions, setPositions] = useState([]);
  const [bands, setBands] = useState([
    { name: 'Band A', min: 0, max: 30 },
    { name: 'Band B', min: 31, max: 50 },
    { name: 'Band C', min: 51, max: 70 },
    { name: 'Band D', min: 71, max: 100 }
  ]);
  const [activeTab, setActiveTab] = useState('distribution');
  const [orgId, setOrgId] = useState(null);

  useEffect(() => {
    const id = localStorage.getItem('organizationId');
    if (id) {
      setOrgId(id);
      axios.get(`http://localhost:5000/api/positions/${id}`)
        .then(res => setPositions(res.data.filter(p => p.evalScore)))
        .catch(console.error);
    }
  }, []);

  const handleBandChange = (index, field, value) => {
    const updated = [...bands];
    updated[index][field] = Number(value);
    setBands(updated);
  };

  const addBand = () => {
    setBands([...bands, { name: `Band ${String.fromCharCode(65 + bands.length)}`, min: 0, max: 0 }]);
  };

  const removeBand = (index) => {
    if (bands.length <= 1) return;
    setBands(bands.filter((_, i) => i !== index));
  };

  const validateBands = () => {
    for (let i = 0; i < bands.length; i++) {
      if (bands[i].min >= bands[i].max) return false;
      if (i > 0 && bands[i].min !== bands[i-1].max + 1) return false;
    }
    return true;
  };

  const getBandForScore = (score) => {
    const band = bands.find(b => score >= b.min && score <= b.max);
    return band ? band.name : 'Unbanded';
  };

  const exportToExcel = () => {
    const data = positions.map(pos => ({
      'Position ID': pos.positionId,
      'Title': pos.title,
      'Department': pos.department,
      'Current Band': pos.currentBand,
      'EvalEdge Score': pos.evalScore,
      'Recommended Band': getBandForScore(pos.evalScore),
      'Salary Positioning': pos.currentSalary ? 
        (pos.currentSalary < pos.marketMedian ? 'Underpaid' : 'Overpaid') : 'N/A'
    }));

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Results");
    XLSX.writeFile(wb, "EvalEdge_Results.xlsx");
  };

  const exportToPDF = () => {
    // PDF generation would typically use a library like jsPDF or a server endpoint
    alert('PDF export would be implemented with a PDF generation library');
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-xl shadow p-6 mb-6">
        <h1 className="text-2xl font-bold mb-4">Evaluation Results</h1>
        
        <div className="flex border-b mb-4">
          <button 
            className={`px-4 py-2 font-medium ${activeTab === 'distribution' ? 'border-b-2 border-purple-700 text-purple-700' : 'text-gray-500'}`}
            onClick={() => setActiveTab('distribution')}
          >
            Score Distribution
          </button>
          <button 
            className={`px-4 py-2 font-medium ${activeTab === 'banding' ? 'border-b-2 border-purple-700 text-purple-700' : 'text-gray-500'}`}
            onClick={() => setActiveTab('banding')}
          >
            Banding Setup
          </button>
          <button 
            className={`px-4 py-2 font-medium ${activeTab === 'positions' ? 'border-b-2 border-purple-700 text-purple-700' : 'text-gray-500'}`}
            onClick={() => setActiveTab('positions')}
          >
            Position Analysis
          </button>
        </div>

        {activeTab === 'distribution' && (
          <div className="space-y-6">
            <div className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart
                  margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                >
                  <CartesianGrid />
                  <XAxis type="number" dataKey="evalScore" name="Score" domain={[0, 100]} />
                  <YAxis type="number" dataKey="currentSalary" name="Salary" />
                  <ZAxis type="number" dataKey="department" name="Department" />
                  <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                  <Legend />
                  <Scatter name="Positions" data={positions} fill="#8884d8" />
                </ScatterChart>
              </ResponsiveContainer>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-purple-50 p-4 rounded-lg">
                <h3 className="font-bold mb-2">Highest Scores</h3>
                {positions.slice().sort((a,b) => b.evalScore - a.evalScore).slice(0,3).map(pos => (
                  <div key={pos.positionId} className="text-sm mb-1">
                    {pos.title} - <span className="font-medium">{pos.evalScore}</span>
                  </div>
                ))}
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-bold mb-2">Widest Gaps</h3>
                {positions.filter(p => p.currentSalary).slice().sort((a,b) => 
                  Math.abs(b.currentSalary - (b.marketMedian || 0)) - Math.abs(a.currentSalary - (a.marketMedian || 0))
                ).slice(0,3).map(pos => (
                  <div key={pos.positionId} className="text-sm mb-1">
                    {pos.title} - <span className="font-medium">
                      {pos.currentSalary < (pos.marketMedian || 0) ? 'Underpaid' : 'Overpaid'}
                    </span>
                  </div>
                ))}
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-bold mb-2">Band Distribution</h3>
                {bands.map(band => (
                  <div key={band.name} className="text-sm mb-1">
                    {band.name}: {positions.filter(p => p.evalScore >= band.min && p.evalScore <= band.max).length} positions
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'banding' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Band Configuration</h2>
              <button 
                onClick={addBand}
                className="text-sm bg-purple-700 text-white px-3 py-1 rounded-full"
              >
                Add Band
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Band</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Min Score</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Max Score</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {bands.map((band, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input
                          type="text"
                          value={band.name}
                          onChange={(e) => handleBandChange(index, 'name', e.target.value)}
                          className="border rounded p-2 w-full"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input
                          type="number"
                          value={band.min}
                          onChange={(e) => handleBandChange(index, 'min', e.target.value)}
                          className="border rounded p-2 w-full"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input
                          type="number"
                          value={band.max}
                          onChange={(e) => handleBandChange(index, 'max', e.target.value)}
                          className="border rounded p-2 w-full"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() => removeBand(index)}
                          disabled={bands.length <= 1}
                          className="text-red-600 hover:text-red-900 disabled:opacity-50"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {!validateBands() && (
              <div className="text-red-600 mt-2">
                Band ranges must be sequential with no overlaps (each min should be previous max + 1)
              </div>
            )}
          </div>
        )}

        {activeTab === 'positions' && (
          <div className="space-y-4">
            <div className="flex justify-end space-x-2 mb-4">
              <button 
                onClick={exportToExcel}
                className="text-sm border border-green-600 text-green-600 px-3 py-1 rounded-full"
              >
                Export to Excel
              </button>
              <button 
                onClick={exportToPDF}
                className="text-sm border border-red-600 text-red-600 px-3 py-1 rounded-full"
              >
                Export to PDF
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Current Band</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">EvalEdge Score</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Recommended Band</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Salary Position</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {positions.map((pos) => (
                    <tr key={pos.positionId}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium">{pos.title}</div>
                        <div className="text-sm text-gray-500">{pos.positionId}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {pos.department}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {pos.currentBand}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          pos.evalScore < 30 ? 'bg-red-100 text-red-800' :
                          pos.evalScore < 60 ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {pos.evalScore}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        {getBandForScore(pos.evalScore)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {pos.currentSalary ? (
                          <span className={`font-semibold ${
                            pos.currentSalary < (pos.marketMedian || 0) ? 'text-red-600' : 'text-green-600'
                          }`}>
                            {pos.currentSalary < (pos.marketMedian || 0) ? 'Underpaid' : 'Overpaid'}
                          </span>
                        ) : 'N/A'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}