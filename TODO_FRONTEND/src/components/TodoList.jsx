import TodoItem from './TodoItem';

function TodoList({ todos, refreshTodos }) {
  if (todos.length === 0) {
    return <p className="text-center text-gray-500 py-8">Chưa có công việc nào!</p>;
  }

  return (
    <div className="space-y-4">
      {todos.map(todo => (
        <TodoItem key={todo.id} todo={todo} refreshTodos={refreshTodos} />
      ))}
    </div>
  );
}

export default TodoList;
