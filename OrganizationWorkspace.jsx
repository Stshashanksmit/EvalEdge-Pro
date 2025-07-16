import React, { useState, useEffect } from "react";
import OrganizationSetupSection from "./OrganizationSetupSection";
import PositionTableSection from "./PositionTableSection";

export default function OrganizationWorkspace() {
  const [orgScore, setOrgScore] = useState(0);
  const [orgId, setOrgId] = useState(null);

  useEffect(() => {
    const storedOrgId = localStorage.getItem("organizationId");
    if (storedOrgId) {
      setOrgId(parseInt(storedOrgId));
    }
  }, []);

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <section className="bg-white rounded-xl shadow p-6 mb-8">
        <h2 className="text-2xl font-bold mb-2">Organization Setup</h2>
        <p className="text-sm text-gray-600 mb-4">One-time setup. Auto-saved and reused for all evaluations.</p>
        <OrganizationSetupSection setOrgScore={setOrgScore} setOrgId={setOrgId} />
      </section>
      {orgId ? (
        <section className="bg-white rounded-xl shadow p-6">
          <h2 className="text-2xl font-bold mb-2">Evaluations Workspace</h2>
          <p className="text-sm text-gray-600 mb-4">Add positions, edit factor scores, auto-calculate EvalEdge scores.</p>
          <PositionTableSection orgScore={orgScore} organizationId={orgId} />
        </section>
      ) : (
        <div className="bg-white rounded-xl shadow p-6 text-center text-gray-500">Complete Organization Setup to unlock evaluations workspace.</div>
      )}
    </div>
  );
}
