import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from './App';
import PositionSetup from './PositionSetup';

const OrganizationSetup = () => {
  const { auth } = useContext(AuthContext);
  const [orgData, setOrgData] = useState({
    name: '',
    revenue: '',
    headcount: '',
    geographies: '',
    industry: '',
  });
  const [orgScore, setOrgScore] = useState(null);
  const [orgTag, setOrgTag] = useState('');
  const [message, setMessage] = useState('');
  const [organizationId, setOrganizationId] = useState(null);

  useEffect(() => {
    const fetchOrgData = async () => {
      if (auth.user?.organizationId) {
        try {
          const { data } = await axios.get(`http://localhost:5000/api/organizations/${auth.user.organizationId}`, {
            headers: { Authorization: `Bearer ${auth.token}` },
          });
          setOrgData(data);
          setOrgScore(data.score);
          setOrgTag(data.tag);
        } catch (error) {
          console.error("Failed to fetch organization data", error);
        }
      }
    };
    if (auth.token) {
      fetchOrgData();
    }
  }, [auth]);

  const handleChange = (e) => {
    setOrgData({ ...orgData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/organizations', orgData, {
        headers: { Authorization: `Bearer ${auth.token}` },
      });
      setOrgScore(res.data.score);
      setOrgTag(res.data.tag);
      setOrganizationId(res.data.id);
      setMessage('Organization details saved successfully!');
    } catch (error) {
      setMessage('Failed to save details. Please try again.');
    }
  };
  
  const industryOptions = [
    "Professional Services e.g. Consulting, HR, Legal, Marketing Agencies",
    "Tech / Digital Products e.g. SaaS, IT Services, Platforms, Product Start-ups",
    "Manufacturing & Engineering e.g. Factories, Heavy Industry, Electronics",
    "Logistics & Supply Chain e.g. Transport, Warehousing, Distribution",
    "Banking & Financial Services e.g. Banks, Insurance, Fintech, Microfinance",
    "Healthcare & Life Sciences e.g. Hospitals, Pharma, MedTech, Clinics",
    "Public Sector & Government Organizations e.g. Government, PSUs, Municipal Bodies",
    "Education & Non-profit e.g. Schools, EdTech, NGOs, Development Orgs",
    "Retail & Consumer Services e.g. Retail, FMCG, Hospitality, E-commerce",
    "Energy & Utilities e.g. Oil & Gas, Electricity, Water, Renewables",
    "Others (Please specify)",
  ];

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Organization & Position Setup</h1>
      <div className="bg-white p-6 rounded-lg shadow mb-8">
        <h2 className="text-2xl font-semibold mb-4">Organization Setup</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input name="name" value={orgData.name} onChange={handleChange} placeholder="Company Name" className="p-3 border rounded-lg" required />
          <input name="revenue" value={orgData.revenue} onChange={handleChange} placeholder="Revenue (Mn USD)" type="number" className="p-3 border rounded-lg" required />
          <input name="headcount" value={orgData.headcount} onChange={handleChange} placeholder="Total Headcount" type="number" className="p-3 border rounded-lg" required />
          <input name="geographies" value={orgData.geographies} onChange={handleChange} placeholder="Number of Countries" type="number" className="p-3 border rounded-lg" required />
          <select name="industry" value={orgData.industry} onChange={handleChange} className="p-3 border rounded-lg" required>
            <option value="">Select Industry</option>
            {industryOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
          </select>
          <div className="md:col-span-2 flex items-center justify-between">
            <div className="flex gap-4">
              <div className="p-3 border rounded-lg bg-gray-100">Org Score: {orgScore ?? 'N/A'}</div>
              <div className="p-3 border rounded-lg bg-gray-100">Org Tag: {orgTag || 'N/A'}</div>
            </div>
            <button type="submit" className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700">Save</button>
          </div>
        </form>
        {message && <p className="mt-4 text-center">{message}</p>}
      </div>
      <PositionSetup organizationId={organizationId} orgScore={orgScore} />
    </div>
  );
};

export default OrganizationSetup;
