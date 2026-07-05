import { useState, useEffect } from 'react';
import api from './api';
import TodoList from './components/TodoList';

function App() {
  const [todos, setTodos] = useState([]);

  const fetchTodos = async () => {
    try {
      const response = await api.get('');
      setTodos(response.data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="min-h-screen py-10 px-4 bg-gray-50">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md p-6">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">📝 Todo List</h1>
        <TodoList todos={todos} />
      </div>
    </div>
  );
}

export default App;
