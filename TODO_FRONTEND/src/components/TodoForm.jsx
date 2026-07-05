import { useState } from 'react';
import api from '../api';

function TodoForm({ onTodoAdded }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Title must not be blank');
      return;
    }
    
    try {
      await api.post('', { title, description });
      setTitle('');
      setDescription('');
      setError('');
      onTodoAdded();
    } catch (err) {
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError('Error creating todo');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 p-4 border rounded-xl shadow-sm bg-white">
      <div className="mb-3">
        <input 
          type="text" 
          placeholder="Todo Title" 
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <textarea 
          placeholder="Description (optional)" 
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none h-24"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      {error && <p className="text-red-500 mb-3 text-sm font-medium">{error}</p>}
      <button type="submit" className="w-full bg-blue-600 text-white font-semibold p-3 rounded-lg hover:bg-blue-700 transition duration-200">
        + Add Todo
      </button>
    </form>
  );
}

export default TodoForm;
