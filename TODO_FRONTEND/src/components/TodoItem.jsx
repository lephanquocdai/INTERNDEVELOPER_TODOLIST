function TodoItem({ todo }) {
  return (
    <div className="border border-gray-200 p-4 rounded-lg shadow-sm bg-white flex justify-between items-center">
      <div>
        <h3 className={`font-semibold text-lg ${todo.completed ? 'line-through text-gray-400' : 'text-gray-800'}`}>
          {todo.title}
        </h3>
        {todo.description && (
          <p className="text-sm mt-1 text-gray-600">
            {todo.description}
          </p>
        )}
      </div>
    </div>
  );
}

export default TodoItem;
