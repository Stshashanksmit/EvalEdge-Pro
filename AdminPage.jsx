import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AdminPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUsers = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/users");
      setUsers(data);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const approve = async (email) => {
    await axios.post("http://localhost:5000/api/approve", { email });
    fetchUsers();
  };

  const revoke = async (email) => {
    await axios.post("http://localhost:5000/api/revoke", { email });
    fetchUsers();
  };

  useEffect(() => {
    fetchUsers();
    console.warn("Admin page is open to all for MVP");
  }, []);

  if (loading) return <p className="p-6">Loading…</p>;
  if (error) return <p className="p-6 text-red-600">Error: {error}</p>;

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-xl shadow p-6 mt-8">
      <h1 className="text-2xl font-bold mb-4">User Management</h1>
      {users.length === 0 && (
        <p className="text-gray-500">No users yet. Users will appear once they sign up or are added by admin.</p>
      )}
      <ul className="space-y-3">
        {users.map((u) => (
          <li
            key={u.email}
            className="flex justify-between items-center p-3 rounded-lg border hover:shadow transition"
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
                  onClick={() => approve(u.email)}
                  className="text-xs bg-green-600 text-white px-3 py-1 rounded-full hover:bg-green-700 transition"
                >
                  Approve
                </button>
              )}
              {u.isActive && (
                <button
                  onClick={() => revoke(u.email)}
                  className="text-xs bg-red-600 text-white px-3 py-1 rounded-full hover:bg-red-700 transition"
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
