export default function TaskItem({ task, onToggle, onDelete }) {
  return (
    <div className="flex items-center justify-between bg-white shadow p-3 rounded-lg hover:shadow-md transition">
      <div
        className={`flex-1 cursor-pointer ${
          task.done ? "line-through text-gray-400" : ""
        }`}
        onClick={onToggle}
    >
        {task.text}
    </div>
    <button
      onClick={onDelete}
      className="ml-4 text-red-500 hover:text-red-700 font-bold"
      title="Delete task"
    >
      x
    </button>
  </div>
);

}