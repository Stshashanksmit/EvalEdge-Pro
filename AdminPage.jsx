import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AdminPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch users
  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/users");
      console.log("Fetched users:", res.data);
      setUsers(res.data);
    } catch (e) {
      console.error("Fetch error:", e);
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  // Approve user
  const handleApprove = async (email) => {
    try {
      await axios.post("http://localhost:5000/api/admin/approve-user", {
        email,
        action: "approve",
      });
      fetchUsers();
    } catch (e) {
      console.error("Approve error:", e);
    }
  };

  // Revoke user
  const handleRevoke = async (email) => {
    try {
      await axios.post("http://localhost:5000/api/admin/approve-user", {
        email,
        action: "revoke",
      });
      fetchUsers();
    } catch (e) {
      console.error("Revoke error:", e);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) return <p className="p-6">Loading…</p>;
  if (error) return <p className="p-6 text-red-600">Error: {error}</p>;

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-xl shadow p-6 mt-8">
      <h1 className="text-xl font-bold mb-4">User Management</h1>
      {users.length === 0 && <p className="text-gray-500">No users yet.</p>}
      <ul className="space-y-3">
        {users.map((u) => (
          <li
            key={u.email}
            className="flex justify-between items-center p-3 rounded-lg hover:bg-gray-50"
          >
            <span className="font-medium truncate">{u.email}</span>
            <div className="flex items-center space-x-3">
              <span
                className={`px-2 py-1 rounded-full text-xs font-semibold ${
                  u.isActive
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {u.isActive ? "Active" : "Pending"}
              </span>
              {!u.isActive && (
                <button
                  onClick={() => handleApprove(u.email)}
                  className="text-xs bg-green-600 text-white px-3 py-1 rounded-full hover:bg-green-700"
                >
                  Approve
                </button>
              )}
              {u.isActive && (
                <button
                  onClick={() => handleRevoke(u.email)}
                  className="text-xs bg-red-600 text-white px-3 py-1 rounded-full hover:bg-red-700"
                >
                  Revoke
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
