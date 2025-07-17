import React, { useState } from "react";
import OrganizationSetupSection from "./OrganizationSetupSection.jsx";
import PositionTableSection from "./PositionTableSection.jsx";

function OrganizationWorkspace() {
  const [orgScore, setOrgScore] = useState(0);
  const [orgId, setOrgId] = useState(null);

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* Organization Setup Section */}
      <section className="bg-white rounded-xl shadow p-6 mb-8 transition">
        <h2 className="text-2xl font-bold mb-2">Organization Setup</h2>
        <p className="text-sm text-gray-600 mb-4">
          One-time setup. Auto-saved and reused for all evaluations.
        </p>
        <OrganizationSetupSection setOrgScore={setOrgScore} setOrgId={setOrgId} />
      </section>

      {/* Evaluations Workspace Section */}
      {orgId ? (
        <section className="bg-white rounded-xl shadow p-6 transition">
          <h2 className="text-2xl font-bold mb-2">Evaluations Workspace</h2>
          <p className="text-sm text-gray-600 mb-4">
            Add positions, set factor scores, and auto-calculate EvalEdge scores.
          </p>
          <PositionTableSection orgScore={orgScore} organizationId={orgId} />
        </section>
      ) : (
        <div className="bg-white rounded-xl shadow p-6 text-center text-gray-500 transition">
          Complete Organization Setup to unlock the workspace.
        </div>
      )}
    </div>
  );
}

export default OrganizationWorkspace;
