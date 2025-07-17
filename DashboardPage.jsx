import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from './App';

const DashboardPage = () => {
  const { auth } = useContext(AuthContext);
  const [dashboardData, setDashboardData] = useState({
    totalPositions: 0,
    completedEvaluations: 0,
    orgTag: '',
    recentActivity: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: positions } = await axios.get('http://localhost:5000/api/positions', {
          headers: { Authorization: `Bearer ${auth.token}` },
        });
        const { data: org } = await axios.get(`http://localhost:5000/api/organizations/${auth.user.organizationId}`, {
          headers: { Authorization: `Bearer ${auth.token}` },
        });

        const completed = positions.filter(p => p.evalScore).length;
        setDashboardData({
          totalPositions: positions.length,
          completedEvaluations: completed,
          orgTag: org.tag,
          recentActivity: positions.slice(-10).reverse(),
        });
      } catch (error) {
        console.error("Failed to fetch dashboard data", error);
      }
    };

    if (auth.token) {
      fetchData();
    }
  }, [auth]);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-2">Welcome, {auth.user?.name}!</h1>
      <p className="text-gray-600 mb-8">Here's your organization's snapshot.</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-500">Total Positions</h3>
          <p className="text-4xl font-bold">{dashboardData.totalPositions}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-500">Completed Evaluations</h3>
          <p className="text-4xl font-bold">{dashboardData.completedEvaluations}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-500">Organization Tag</h3>
          <p className="text-4xl font-bold">{dashboardData.orgTag || 'N/A'}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-bold mb-4">Recent Activity</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="text-left text-sm text-gray-500">
                  <th className="p-2">Position Title</th>
                  <th className="p-2">Department</th>
                  <th className="p-2">Status</th>
                  <th className="p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {dashboardData.recentActivity.map(pos => (
                  <tr key={pos.id} className="border-b">
                    <td className="p-2 font-semibold">{pos.title}</td>
                    <td className="p-2">{pos.department}</td>
                    <td className="p-2">{pos.evalScore ? 'Complete' : 'Pending'}</td>
                    <td className="p-2">
                      <Link to="/organization" className="text-purple-600 hover:underline">Evaluate</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-bold mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <Link to="/organization" className="block w-full text-center bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition">
              Start New Evaluation
            </Link>
            <Link to="/results" className="block w-full text-center bg-gray-200 text-gray-800 py-3 rounded-lg hover:bg-gray-300 transition">
              View Insights
            </Link>
            <Link to="/criteria" className="block w-full text-center bg-gray-200 text-gray-800 py-3 rounded-lg hover:bg-gray-300 transition">
              View Criteria
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
