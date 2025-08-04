import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getAllContactsApi, deleteContactApi } from "../api/api";

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [contacts, setContacts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      const token = localStorage.getItem("token");
      const [usersRes, contactsRes] = await Promise.all([
        axios.get("http://localhost:5005/api/use/getallUsers", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        getAllContactsApi(),
      ]);
      setUsers(usersRes.data.users || []);
      setContacts(contactsRes.contacts || []);
    } catch (err) {
      console.error("Error fetching admin data:", err);
      alert("Unauthorized or session expired.");
      navigate("/login");
    }
  };

  const handleDeleteContact = async (id) => {
    if (window.confirm('Are you sure you want to delete this message?')) {
      try {
        const response = await deleteContactApi(id);
        if (response.success) {
          setContacts(contacts.filter(contact => contact.id !== id));
          alert('Message deleted successfully');
        } else {
          alert('Failed to delete message');
        }
      } catch (error) {
        console.error('Error deleting contact:', error);
        alert('Error deleting message');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-blue-800 mb-6 text-center">Admin Dashboard</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Users */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold text-gray-700 mb-3">Registered Users</h2>
          <ul className="max-h-60 overflow-y-auto">
            {users.map((user, index) => (
              <li key={index} className="border-b py-1">
                {user.username} ({user.email})
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Messages */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold text-gray-700 mb-3">Contact Messages</h2>
          <div className="max-h-60 overflow-y-auto">
            {contacts.length === 0 ? (
              <p className="text-gray-500">No contact messages yet.</p>
            ) : (
              contacts.map((contact) => (
                <div key={contact.id} className="border-b py-3">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <p className="font-semibold text-gray-800">{contact.name}</p>
                      <p className="text-sm text-gray-600">{contact.email}</p>
                      <p className="text-sm text-gray-700 mt-1">{contact.message}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {new Date(contact.createdAt).toLocaleString()}
                      </p>
                    </div>
                    <button
                      onClick={() => handleDeleteContact(contact.id)}
                      className="ml-2 text-red-600 hover:text-red-800 text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Placeholder for future movie management */}
        <div className="bg-white p-4 rounded shadow lg:col-span-2">
          <h2 className="text-xl font-semibold text-gray-700 mb-3">Movie Management (Coming Soon)</h2>
          <p className="text-gray-500">Add, edit, or remove movies and showtimes here.</p>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;