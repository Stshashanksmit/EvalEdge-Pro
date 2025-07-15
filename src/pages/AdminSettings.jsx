import { Users, Settings, Shield, Key } from "lucide-react";

export default function AdminSettings() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-evaledge-text mb-2">Admin & Settings</h1>
          <p className="text-gray-600">
            Manage users, configure system settings, and control access permissions
          </p>
        </div>

        {/* Admin Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="card text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-semibold text-evaledge-text mb-2">User Management</h3>
            <p className="text-sm text-gray-600">Add, remove, and manage user access</p>
          </div>

          <div className="card text-center">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Shield className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-semibold text-evaledge-text mb-2">Role Permissions</h3>
            <p className="text-sm text-gray-600">Configure role-based access control</p>
          </div>

          <div className="card text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Settings className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="font-semibold text-evaledge-text mb-2">System Settings</h3>
            <p className="text-sm text-gray-600">Organization and system configuration</p>
          </div>

          <div className="card text-center">
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Key className="w-6 h-6 text-orange-600" />
            </div>
            <h3 className="font-semibold text-evaledge-text mb-2">API & Security</h3>
            <p className="text-sm text-gray-600">Integrations and security settings</p>
          </div>
        </div>

        {/* Placeholder Content */}
        <div className="card text-center py-16">
          <Settings className="w-16 h-16 text-gray-400 mx-auto mb-6" />
          <h2 className="text-xl font-bold text-gray-700 mb-4">Admin Panel Coming Soon</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            This page will include comprehensive user management, role-based access control (RBAC) 
            following the Owner → HR Admin → Evaluator → Viewer hierarchy, privacy settings, 
            export/import functionality, and API integration management.
          </p>
        </div>
      </div>
    </div>
  );
}