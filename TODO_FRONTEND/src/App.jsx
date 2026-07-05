import { useState, useEffect } from 'react';
import api from './api';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';

function App() {
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState('all');
  const [keyword, setKeyword] = useState('');
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const fetchTodos = async () => {
    try {
      const params = { page, size: 10 };
      if (status !== 'all') params.status = status;
      if (keyword) params.keyword = keyword;
      
      const response = await api.get('', { params });
      setTodos(response.data.content);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, [status, keyword, page]);

  return (
    <div className="min-h-screen py-10 px-4 bg-gray-50">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md p-6">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">📝 Todo List</h1>
        
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <input 
            type="text" 
            placeholder="Search tasks..." 
            className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50"
            value={keyword}
            onChange={(e) => { setKeyword(e.target.value); setPage(0); }}
          />
          <select 
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50 cursor-pointer font-medium text-gray-700"
            value={status}
            onChange={(e) => { setStatus(e.target.value); setPage(0); }}
          >
            <option value="all">🌟 All Tasks</option>
            <option value="completed">✅ Completed</option>
            <option value="pending">⏳ Pending</option>
          </select>
        </div>

        <TodoForm onTodoAdded={fetchTodos} />
        <TodoList todos={todos} refreshTodos={fetchTodos} />
        
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 mt-8">
            <button 
              disabled={page === 0}
              onClick={() => setPage(p => p - 1)}
              className="px-4 py-2 bg-gray-100 text-gray-700 font-medium rounded-lg disabled:opacity-50 hover:bg-gray-200 transition"
            >
              Prev
            </button>
            <span className="font-medium text-gray-600">Page {page + 1} of {totalPages}</span>
            <button 
              disabled={page >= totalPages - 1}
              onClick={() => setPage(p => p + 1)}
              className="px-4 py-2 bg-gray-100 text-gray-700 font-medium rounded-lg disabled:opacity-50 hover:bg-gray-200 transition"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
