import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  Plus, 
  FileText, 
  Eye, 
  BarChart3, 
  Building, 
  Users, 
  CheckCircle, 
  Clock,
  TrendingUp,
  Award,
  MoreVertical,
  Play
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function Dashboard() {
  const [userName] = useState("Sarah Johnson"); // This would come from auth context
  const [organizationData] = useState({
    name: "TechCorp Solutions",
    industry: "Tech / Digital Products",
    totalPositions: 24,
    completedEvaluations: 18,
    pendingEvaluations: 6,
    orgScore: 10,
    orgTag: "Global Player"
  });

  // Sample data for the chart
  const [chartData] = useState([
    { band: 'Band A', count: 2 },
    { band: 'Band B', count: 5 },
    { band: 'Band C', count: 8 },
    { band: 'Band D', count: 6 },
    { band: 'Band E', count: 3 },
  ]);

  // Sample recent activity data
  const [recentActivity] = useState([
    {
      id: 1,
      positionTitle: "Senior Software Engineer",
      department: "Engineering",
      status: "Complete",
      recommendedBand: "Band C",
      lastModified: "2 hours ago"
    },
    {
      id: 2,
      positionTitle: "Product Manager",
      department: "Product",
      status: "Pending",
      recommendedBand: "-",
      lastModified: "1 day ago"
    },
    {
      id: 3,
      positionTitle: "HR Business Partner",
      department: "Human Resources",
      status: "Complete",
      recommendedBand: "Band B",
      lastModified: "2 days ago"
    },
    {
      id: 4,
      positionTitle: "Marketing Manager",
      department: "Marketing",
      status: "Complete",
      recommendedBand: "Band C",
      lastModified: "3 days ago"
    },
    {
      id: 5,
      positionTitle: "DevOps Engineer",
      department: "Engineering",
      status: "Pending",
      recommendedBand: "-",
      lastModified: "5 days ago"
    }
  ]);

  const getIndustryIcon = (industry) => {
    if (industry.includes("Tech")) return "💻";
    if (industry.includes("Manufacturing")) return "🏭";
    if (industry.includes("Healthcare")) return "🏥";
    if (industry.includes("Financial")) return "🏦";
    return "🏢";
  };

  const completionPercentage = Math.round((organizationData.completedEvaluations / organizationData.totalPositions) * 100);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-evaledge-text mb-2">
                Welcome back, {userName}! 👋
              </h1>
              <p className="text-gray-600">
                Here's what's happening with your job evaluations today.
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">
                Last login: Today, 9:24 AM
              </p>
            </div>
          </div>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Positions */}
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <span className="text-sm text-gray-500">Total Positions</span>
            </div>
            <div className="text-3xl font-bold text-evaledge-text mb-1">
              {organizationData.totalPositions}
            </div>
            <p className="text-sm text-gray-600">Active positions in workspace</p>
          </div>

          {/* Organization Tag */}
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <span className="text-2xl">{getIndustryIcon(organizationData.industry)}</span>
              </div>
              <span className="text-sm text-gray-500">Organization</span>
            </div>
            <div className="text-lg font-bold text-evaledge-text mb-1">
              {organizationData.orgTag}
            </div>
            <p className="text-sm text-gray-600">
              Score: {organizationData.orgScore} • {organizationData.industry.split(' ')[0]}
            </p>
          </div>

          {/* Completed Evaluations */}
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <span className="text-sm text-gray-500">Completed</span>
            </div>
            <div className="text-3xl font-bold text-evaledge-text mb-1">
              {organizationData.completedEvaluations}
            </div>
            <p className="text-sm text-gray-600">{completionPercentage}% completion rate</p>
          </div>

          {/* Pending Items */}
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                <Clock className="w-6 h-6 text-orange-600" />
              </div>
              <span className="text-sm text-gray-500">Pending</span>
            </div>
            <div className="text-3xl font-bold text-evaledge-text mb-1">
              {organizationData.pendingEvaluations}
            </div>
            <p className="text-sm text-gray-600">Evaluations in progress</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Visual Graph */}
          <div className="lg:col-span-2">
            <div className="card">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-evaledge-text">Band Distribution</h2>
                <Link to="/results" className="text-evaledge-base hover:underline text-sm font-medium">
                  View details
                </Link>
              </div>
              
              {chartData.length > 0 ? (
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="band" />
                      <YAxis />
                      <Tooltip />
                      <Bar 
                        dataKey="count" 
                        fill="url(#colorGradient)"
                        radius={[4, 4, 0, 0]}
                      />
                      <defs>
                        <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#6C5CE7" />
                          <stop offset="100%" stopColor="#B8A6FF" />
                        </linearGradient>
                      </defs>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              ) : (
                <div className="h-64 flex items-center justify-center text-gray-500">
                  <div className="text-center">
                    <BarChart3 className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>No evaluations completed yet</p>
                    <p className="text-sm">Complete your first evaluation to see band distribution</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="card">
            <h2 className="text-xl font-bold text-evaledge-text mb-6">Quick Actions</h2>
            
            <div className="space-y-4">
              <Link 
                to="/organization-setup" 
                className="flex items-center p-4 bg-gradient-to-r from-evaledge-base to-evaledge-mid text-white rounded-xl hover:shadow-glow transform hover:-translate-y-0.5 transition-all"
              >
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center mr-4">
                  <Plus className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="font-semibold">Start New Evaluation</div>
                  <div className="text-sm opacity-90">Add positions and begin evaluation</div>
                </div>
              </Link>

              <Link 
                to="/reports" 
                className="flex items-center p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
              >
                <div className="w-10 h-10 bg-evaledge-light/20 rounded-lg flex items-center justify-center mr-4">
                  <TrendingUp className="w-5 h-5 text-evaledge-base" />
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-evaledge-text">View Insights</div>
                  <div className="text-sm text-gray-600">Analyze evaluation results</div>
                </div>
              </Link>

              <Link 
                to="/criteria" 
                className="flex items-center p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
              >
                <div className="w-10 h-10 bg-evaledge-light/20 rounded-lg flex items-center justify-center mr-4">
                  <Eye className="w-5 h-5 text-evaledge-base" />
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-evaledge-text">View Criteria</div>
                  <div className="text-sm text-gray-600">Review evaluation factors</div>
                </div>
              </Link>

              <Link 
                to="/reports" 
                className="flex items-center p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
              >
                <div className="w-10 h-10 bg-evaledge-light/20 rounded-lg flex items-center justify-center mr-4">
                  <FileText className="w-5 h-5 text-evaledge-base" />
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-evaledge-text">Generate Report</div>
                  <div className="text-sm text-gray-600">Export evaluation results</div>
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mt-8">
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-evaledge-text">Recent Activity</h2>
              <Link to="/organization-setup" className="text-evaledge-base hover:underline text-sm font-medium">
                View all positions
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Position Title</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Department</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Recommended Band</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {recentActivity.map((item) => (
                    <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <div className="font-medium text-evaledge-text">{item.positionTitle}</div>
                        <div className="text-sm text-gray-500">{item.lastModified}</div>
                      </td>
                      <td className="py-3 px-4 text-gray-600">{item.department}</td>
                      <td className="py-3 px-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          item.status === 'Complete' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-orange-100 text-orange-800'
                        }`}>
                          {item.status === 'Complete' ? (
                            <CheckCircle className="w-3 h-3 mr-1" />
                          ) : (
                            <Clock className="w-3 h-3 mr-1" />
                          )}
                          {item.status}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        {item.recommendedBand !== '-' ? (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-evaledge-light/20 text-evaledge-base">
                            <Award className="w-3 h-3 mr-1" />
                            {item.recommendedBand}
                          </span>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </td>
                      <td className="py-3 px-4">
                        <div className="relative">
                          <button className="text-gray-400 hover:text-evaledge-base">
                            <MoreVertical className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}