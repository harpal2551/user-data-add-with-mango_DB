import React, { useState, useEffect } from "react";
import "./HomeScreen.css";
import LoginCard from "./LoginCard";
import Form from "./Form";
import axios from "axios";
import MessagePop from "./MessagePop";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";
// const API = import.meta.env.VITE_API_URL || "http://192.168.43.161:5000/users";

function HomeScreen() {
  const [show, setShow] = useState(false);
  const [editing, setEditing] = useState(null); // user object if editing
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  // Get users from backend
  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(`${API}/users`);
        setUsers(res.data);
        setError(null);
      } catch (err) {
        console.error("Error fetching users:", err);
        setError("Failed to fetch users. Ensure backend is running.");
      }
    })();
  }, []);

  // Add new user
  const addUser = async (form) => {
    try {
      const res = await axios.post(`${API}/users`, form);
      setUsers((prev) => [res.data, ...prev]);
      // setUsers((prev) => [...prev, res.data]);
      setShow(false);
      setError(null);
    } catch (err) {
      console.error("Error adding user:", err);
      setError(err?.response?.data?.message || "Failed to add user.");
    }
  };

  // Update user
  const updateUser = async (form) => {
    try {
      const res = await axios.put(`${API}/users/${editing._id}`, form);
      setUsers((prev) => prev.map((u) => (u._id === editing._id ? res.data : u)));
      setEditing(null);
      setShow(false);
      setError(null);
    } catch (err) {
      console.error("Error updating user:", err);
      setError(err?.response?.data?.message || "Failed to update user.");
    }
  };

  // Delete user
  const deleteUser = async (id) => {
    try {
      await axios.delete(`${API}/users/${id}`);
      setUsers((prev) => prev.filter((u) => u._id !== id));
    } catch (err) {
      console.error("Error deleting user:", err);
      setError("Failed to delete user.");
    }
  };

  const openAdd = () => {
    setEditing(null);
    setShow(true);
  };

  const openEdit = (user) => {
    setEditing(user);
    setShow(true);
  };

  const handleSubmit = (form) => (editing ? updateUser(form) : addUser(form));

  return (
    <div className="addUserForm">
      <div className="formData">
        <h4>User Data Information</h4>
      <MessagePop className="PopMessage"/>
        {error && <div className="error">{error}</div>}

        <div className="addUserBtn">
          <button onClick={openAdd}>{editing ? "Add New" : "Add User"}</button>
        </div>

        <div className="loginCardDiv">
          {users.map((u) => (
            <LoginCard key={u._id || u.id} user={u} onEdit={openEdit} onDelete={deleteUser} />
          ))}
        </div>
      </div>

      {show && (
        <Form
          onSubmit={handleSubmit}
          onClose={() => {
            setShow(false);
            setEditing(null);
          }}
          initialData={editing}
        />
      )}
    </div>
  );
}

export default HomeScreen;
