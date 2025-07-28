export default function TaskItem({ task, onToggle, onDelete }) {
  return (
    <div className="flex justify-between items-center bg-white dark:bg-gray-800 rounded-xl p-3 shadow hover:shadow-md transition">
      <span
        onClick={onToggle}
        className={`cursor-pointer flex-1 ${
          task.done ? "line-through text-gray-400" : ""
        }`}
      >
        {task.text}
      </span>
      <button
        onClick={onDelete}
        className="ml-3 text-red-500 hover:text-red-700 font-bold"
      >
        ✕
      </button>
    </div>
  );
}
