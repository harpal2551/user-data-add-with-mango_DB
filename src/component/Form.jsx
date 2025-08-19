import React, { useState, useEffect } from "react";
import "./Form.css";
import CancelSharpIcon from "@mui/icons-material/CancelSharp";

function Form({ onSubmit, onClose, initialData = null }) {
  const [form, setForm] = useState({ name: "", email: "", username: "" });

  useEffect(() => {
    if (initialData) {
      setForm({
        name: initialData.name || "",
        email: initialData.email || "",
        username: initialData.username || "",
      });
    }
  }, [initialData]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSubmit(form); // parent handles add/update
    setForm({ name: "", email: "", username: "" });
  };

  return (
    <div className="formFillTable">
      <div className="formFill">
        <form onSubmit={handleSubmit}>
          <button type="button" onClick={onClose} className="closeWin" aria-label="Close">
            <CancelSharpIcon className="closeIconUi" />
          </button>

          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Enter Your Name"
            required
          />
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Enter Your Email"
            required
          />
          <input
            type="text"
            name="username"
            value={form.username}
            onChange={handleChange}
            placeholder="Enter Your Username"
            required
          />

          <div className="btnSubmit">
            <button className="submitBtn" type="submit">{initialData ? "UPDATE" : "SUBMIT"}</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Form;
