import React from "react";
import { useDispatch } from "react-redux";
import { deleteTodo, toggleTodo } from "../Store/todoReducer";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import DeleteIcon from "@mui/icons-material/Delete";
import EditRoundedIcon from "@mui/icons-material/EditRounded";

const TodoItem = ({ id, text, completed, handleEdit }) => {
  const dispatch = useDispatch();

  return (
    <div className="todo-item flex justify-between items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="flex items-center">
        <CheckRoundedIcon
          className={`cursor-pointer mr-4 text-2xl transition-transform duration-200 transform ${
            completed ? "text-green-500 scale-110" : "text-gray-500"
          }`}
          onClick={() => dispatch(toggleTodo(id))}
        />
        <h1 className={`text-lg font-semibold transition-colors duration-200 ${completed ? "line-through text-gray-400" : "text-gray-800"}`}>
          {text}
        </h1>
      </div>
      <div className="flex items-center">
        <EditRoundedIcon
          className="cursor-pointer text-blue-500 mr-4 hover:text-blue-600 transition-colors duration-200"
          onClick={() => handleEdit(id, text)}
        />
        <DeleteIcon
          className="cursor-pointer text-red-500 hover:text-red-600 transition-colors duration-200"
          onClick={() => dispatch(deleteTodo(id))}
        />
      </div>
    </div>
  );
};

export default TodoItem;
