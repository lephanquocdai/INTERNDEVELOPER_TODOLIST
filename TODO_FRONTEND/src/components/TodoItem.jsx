import { useState } from 'react';
import api from '../api';

function TodoItem({ todo, refreshTodos }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const [editDesc, setEditDesc] = useState(todo.description || '');

  const toggleStatus = async () => {
    try {
      await api.patch(`/${todo.id}/toggle`);
      refreshTodos();
    } catch (error) {
      console.error('Error toggling status', error);
    }
  };

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

  const deleteTodo = async () => {
    if (!window.confirm('Are you sure you want to delete this?')) return;
    try {
      await api.delete(`/${todo.id}`);
      refreshTodos();
    } catch (error) {
      console.error('Error deleting', error);
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
    <div className={`border border-gray-200 p-4 rounded-lg shadow-sm transition-all duration-300 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 ${todo.completed ? 'bg-gray-50' : 'bg-white hover:shadow-md'}`}>
      <div className="flex items-start gap-4 flex-1">
        <input 
          type="checkbox" 
          checked={todo.completed} 
          onChange={toggleStatus} 
          className="mt-1 w-5 h-5 rounded cursor-pointer accent-blue-600 transition"
        />
        <div>
          <h3 className={`font-semibold text-lg transition-colors ${todo.completed ? 'line-through text-gray-400' : 'text-gray-800'}`}>
            {todo.title}
          </h3>
          {todo.description && (
            <p className={`text-sm mt-1 transition-colors ${todo.completed ? 'text-gray-400' : 'text-gray-600'}`}>
              {todo.description}
            </p>
          )}
        </div>
      </div>
      <div className="flex gap-2 w-full sm:w-auto justify-end">
        <button 
          onClick={() => setIsEditing(true)} 
          className="text-blue-500 hover:bg-blue-50 px-3 py-1.5 rounded-lg text-sm font-semibold transition"
        >
          Edit
        </button>
        <button 
          onClick={deleteTodo} 
          className="text-red-500 hover:bg-red-50 px-3 py-1.5 rounded-lg text-sm font-semibold transition"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default TodoItem;
