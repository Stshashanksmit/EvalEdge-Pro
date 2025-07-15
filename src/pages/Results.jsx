import { useState } from "react";
import { Download, Settings, BarChart3 } from "lucide-react";

export default function Results() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-evaledge-text mb-2">Results & Banding</h1>
              <p className="text-gray-600">
                View evaluation results, configure bands, and analyze recommendations
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <button className="btn-secondary flex items-center">
                <Settings className="w-4 h-4 mr-2" />
                Configure Bands
              </button>
              <button className="btn-primary flex items-center">
                <Download className="w-4 h-4 mr-2" />
                Export Results
              </button>
            </div>
          </div>
        </div>

        {/* Placeholder Content */}
        <div className="card text-center py-16">
          <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-6" />
          <h2 className="text-xl font-bold text-gray-700 mb-4">Results Page Coming Soon</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            This page will display the score distribution graph, banding setup table, 
            position results with recommended bands, market salary comparisons, and export options.
          </p>
          <div className="mt-8">
            <p className="text-sm text-gray-500">
              Complete some evaluations in the Organization Setup to see results here.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}