import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function DashboardPage() {
  const [stats, setStats] = useState({
    totalPositions: 0,
    completedEvaluations: 0,
    orgTag: '',
    pendingItems: 0
  });
  const [bandDistribution, setBandDistribution] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);
  const [loading, setLoading] = useState(true);
  const [orgId, setOrgId] = useState(null);

  useEffect(() => {
    const id = localStorage.getItem('organizationId');
    if (id) {
      setOrgId(id);
      fetchDashboardData(id);
    }
  }, []);

  const fetchDashboardData = async (orgId) => {
    try {
      setLoading(true);
      const [orgRes, positionsRes] = await Promise.all([
        axios.get(`http://localhost:5000/api/organizations/by-id/${orgId}`),
        axios.get(`http://localhost:5000/api/positions/${orgId}`)
      ]);

      const positions = positionsRes.data;
      const completed = positions.filter(p => p.evalScore).length;

      // Generate band distribution (mock - would use actual bands from org setup)
      const bands = [
        { name: 'Band A', min: 0, max: 30 },
        { name: 'Band B', min: 31, max: 50 },
        { name: 'Band C', min: 51, max: 70 },
        { name: 'Band D', min: 71, max: 100 }
      ];
      
      const distribution = bands.map(band => ({
        name: band.name,
        count: positions.filter(p => p.evalScore >= band.min && p.evalScore <= band.max).length
      }));

      setStats({
        totalPositions: positions.length,
        completedEvaluations: completed,
        orgTag: orgRes.data.tag,
        pendingItems: positions.length - completed
      });

      setBandDistribution(distribution);
      
      // Recent activity (last 5 modified positions)
      setRecentActivity(positions
        .sort((a,b) => new Date(b.updatedAt) - new Date(a.updatedAt))
        .slice(0, 5)
        .map(p => ({
          id: p.positionId,
          title: p.title,
          department: p.department,
          status: p.evalScore ? 'Complete' : 'Pending',
          score: p.evalScore || '-'
        }));

    } catch (err) {
      console.error('Failed to load dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="p-6">Loading dashboard...</div>;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here's your evaluation overview.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl shadow p-4">
          <h3 className="text-sm font-medium text-gray-500 mb-1">Total Positions</h3>
          <p className="text-2xl font-bold">{stats.totalPositions}</p>
        </div>
        <div className="bg-white rounded-xl shadow p-4">
          <h3 className="text-sm font-medium text-gray-500 mb-1">Organization Tag</h3>
          <p className="text-2xl font-bold">{stats.orgTag}</p>
        </div>
        <div className="bg-white rounded-xl shadow p-4">
          <h3 className="text-sm font-medium text-gray-500 mb-1">Completed Evaluations</h3>
          <p className="text-2xl font-bold">
            {stats.completedEvaluations} ({Math.round((stats.completedEvaluations / stats.totalPositions) * 100)}%)
          </p>
        </div>
        <div className="bg-white rounded-xl shadow p-4">
          <h3 className="text-sm font-medium text-gray-500 mb-1">Pending Items</h3>
          <p className="text-2xl font-bold">{stats.pendingItems}</p>
        </div>
      </div>

      {/* Chart + Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2 bg-white rounded-xl shadow p-4">
          <h3 className="font-medium mb-4">Band Distribution</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={bandDistribution}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#8884d8" name="Positions" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow p-4">
          <h3 className="font-medium mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button className="w-full text-left p-3 bg-purple-50 hover:bg-purple-100 rounded-lg transition">
              Start New Evaluation
            </button>
            <button className="w-full text-left p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition">
              View Insights
            </button>
            <button className="w-full text-left p-3 bg-green-50 hover:bg-green-100 rounded-lg transition">
              View Criteria
            </button>
            <button className="w-full text-left p-3 bg-yellow-50 hover:bg-yellow-100 rounded-lg transition">
              Generate Report
            </button>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow p-4">
        <h3 className="font-medium mb-4">Recent Activity</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Score</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentActivity.map((activity, idx) => (
                <tr key={idx}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium">{activity.title}</div>
                    <div className="text-sm text-gray-500">ID: {activity.id}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {activity.department}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      activity.status === 'Complete' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {activity.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {activity.score}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-purple-600 hover:text-purple-900 mr-3">Edit</button>
                    <button className="text-red-600 hover:text-red-900">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}