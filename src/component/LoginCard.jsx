import React from "react";
import { useState } from "react";
import "./LoginCard.css";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import BorderColorIcon from '@mui/icons-material/BorderColor';

function LoginCard({ user, onEdit, onDelete }) {
  const [recycleIcon, setRecycleIcon] = useState(false);
  const [editIcon, setEditIcon] = useState(false);
  // setReycleIcon = <DeleteForeverIcon />
  return (
    <div className="loginCards">
      <div className="boxCard">
        <div className="userName">
          Name: <p>{user.name}</p>
        </div>
        <div className="userEmail">
          Email: <p>{user.email}</p>
        </div>
        <div className="userTheName">
          Username: <p>{user.username}</p>
        </div>
        <div className="editDeleteBtn">
          <button
            className="edit"
            onClick={() => onEdit(user)}
            aria-label="Edit"
          >
            {/* <ModeEditIcon className="editIcon" /> */}
            {editIcon ? (
              <BorderColorIcon 
              onMouseLeave={() => setEditIcon(false)}
              />) : (
              <ModeEditIcon
              onMouseEnter={() => setEditIcon(true)}
              />
            )}
          </button>
          <button
            className="delete"
            onClick={() => onDelete(user._id)}
            aria-label="Delete"
          >
            {recycleIcon ? (
              <DeleteForeverIcon
                className="deleteIcon"
                onMouseLeave={() => setRecycleIcon(false)}
              />) : (
              <DeleteIcon
                className="deleteIcon"
                onMouseEnter={() => setRecycleIcon(true)}
              />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginCard;
