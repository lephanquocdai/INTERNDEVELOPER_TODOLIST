import { useState } from 'react';
import api from '../api';

function TodoItem({ todo, refreshTodos }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const [editDesc, setEditDesc] = useState(todo.description || '');

  const saveEdit = async () => {
    try {
      await api.put(`/${todo.id}`, { title: editTitle, description: editDesc });
      setIsEditing(false);
      refreshTodos();
    } catch (error) {
      console.error('Error updating', error);
      alert(error.response?.data?.message || 'Error updating todo');
    }
  };

  if (isEditing) {
    return (
      <div className="border p-4 rounded-xl shadow-md bg-white">
        <input 
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
          className="w-full p-2 border rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <textarea 
          value={editDesc}
          onChange={(e) => setEditDesc(e.target.value)}
          className="w-full p-2 border rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
        />
        <div className="flex gap-2">
          <button onClick={saveEdit} className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg transition">Save</button>
          <button onClick={() => setIsEditing(false)} className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium px-4 py-2 rounded-lg transition">Cancel</button>
        </div>
      </div>
    );
  }

  return (
    <div className="border border-gray-200 p-4 rounded-lg shadow-sm bg-white flex justify-between items-start sm:items-center gap-4 hover:shadow-md transition">
      <div className="flex-1">
        <h3 className={`font-semibold text-lg ${todo.completed ? 'line-through text-gray-400' : 'text-gray-800'}`}>
          {todo.title}
        </h3>
        {todo.description && (
          <p className="text-sm mt-1 text-gray-600">
            {todo.description}
          </p>
        )}
      </div>
      <div className="flex gap-2">
        <button 
          onClick={() => setIsEditing(true)} 
          className="text-blue-500 hover:bg-blue-50 px-3 py-1.5 rounded-lg text-sm font-semibold transition"
        >
          Edit
        </button>
      </div>
    </div>
  );
}

export default TodoItem;
