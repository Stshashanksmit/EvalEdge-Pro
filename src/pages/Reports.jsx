import { TrendingUp, Download, FileText } from "lucide-react";

export default function Reports() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-evaledge-text mb-2">Reports & Insights</h1>
              <p className="text-gray-600">
                Advanced analytics, heatmaps, and strategic insights for your organization
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <button className="btn-secondary flex items-center">
                <FileText className="w-4 h-4 mr-2" />
                Generate Report
              </button>
              <button className="btn-primary flex items-center">
                <Download className="w-4 h-4 mr-2" />
                Export Insights
              </button>
            </div>
          </div>
        </div>

        {/* Placeholder Content */}
        <div className="card text-center py-16">
          <TrendingUp className="w-16 h-16 text-gray-400 mx-auto mb-6" />
          <h2 className="text-xl font-bold text-gray-700 mb-4">Reports & Insights Coming Soon</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            This page will feature heatmaps showing position distributions across departments and bands, 
            upgrade/downgrade visualizations, market salary comparisons, and comprehensive insights 
            about over/underpaid roles.
          </p>
          <div className="mt-8">
            <p className="text-sm text-gray-500">
              More evaluation data will unlock powerful analytics and insights.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}