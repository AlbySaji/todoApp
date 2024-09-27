import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, clearTodo, editTodo } from "../Store/todoReducer";
import TodoItem from "./todoItem";
import { FaPlus } from "react-icons/fa";

const Todo = () => {
  const [text, setText] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState("");
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const todoList = useSelector((state) => state.todoList);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim() === "") {
      alert("Please enter a valid todo item.");
      return;
    }
    if (isEditing && editingId) {
      dispatch(editTodo({ id: editingId, text }));
      setEditingId(null);
    } else {
      dispatch(addTodo(text));
    }
    setText("");
    setIsEditing(false);
    setShowModal(false);
  };

  const handleEdit = (id, newText) => {
    setIsEditing(true);
    setEditingId(id);
    setText(newText);
    setShowModal(true);
  };

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(todoList));
  }, [todoList]);

  return (
    <div className="flex flex-col items-center w-full min-h-screen bg-gradient-to-r from-purple-400 to-blue-500 py-10">
      {/* Header */}
      <header className="w-full max-w-4xl mx-auto mb-10 text-center">
        <h1 className="text-4xl font-bold text-white mb-2">My Todo List</h1>
        <p className="text-xl text-gray-200">Stay organized and productive</p>
      </header>

      {/* Todo Container */}
      <div className="w-full max-w-4xl bg-white p-8 rounded-xl shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">Tasks</h2>
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded-full shadow-lg hover:bg-blue-600 transition flex items-center"
            onClick={() => setShowModal(true)}
          >
            <FaPlus className="mr-2" /> Add Task
          </button>
        </div>

        {/* Todo List */}
        <div className="space-y-4 max-h-80 overflow-y-auto custom-scrollbar">
          {todoList.map((item) => (
            <TodoItem key={item.id} {...item} handleEdit={handleEdit} />
          ))}
        </div>

        {/* Clear All Button */}
        <button
          onClick={() => dispatch(clearTodo())}
          className="w-full bg-red-500 text-white py-3 mt-6 rounded-md hover:bg-red-600 transition"
        >
          Clear All
        </button>
      </div>

      {/* Modal for Adding/Editing Task */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white w-full max-w-md p-6 rounded-xl shadow-lg">
            <h3 className="text-xl font-semibold mb-4">
              {isEditing ? "Edit Task" : "Add New Task"}
            </h3>
            <form onSubmit={handleSubmit} className="flex flex-col">
              <input
                type="text"
                placeholder="Enter your task"
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="p-3 border border-gray-300 rounded-md mb-4 outline-none focus:ring-2 focus:ring-blue-400"
              />
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
              >
                {isEditing ? "Update Task" : "Add Task"}
              </button>
            </form>
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
            >
              &times;
            </button>
          </div>
        </div>
      )}

      {/* Floating Action Button */}
      <button
        className="fixed bottom-10 right-10 bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-600 transition"
        onClick={() => setShowModal(true)}
      >
        <FaPlus size={24} />
      </button>
    </div>
  );
};

export default Todo;
