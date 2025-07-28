import { useState, useEffect } from "react";
import TaskInput from "./components/TaskInput";
import TaskItem from "./components/TaskItem";
import {
  DragDropContext,
  Droppable,
  Draggable,
} from "react-beautiful-dnd";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  // Sync dark mode with system preference
  useEffect(() => {
    const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setDarkMode(systemDark);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  const handleAddTask = (text) => {
    const newTask = {
      id: Date.now().toString(),
      text,
      done: false,
    };
    setTasks([newTask, ...tasks]);
  };

  const handleToggleTask = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  };

  const handleDeleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const handleClearCompleted = () => {
    setTasks((prev) => prev.filter((task) => !task.done));
  };

  const handleClearAll = () => {
    setTasks([]);
  };

  const handleMarkAllDone = () => {
    setTasks((prev) => prev.map((task) => ({ ...task, done: true })));
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const reordered = Array.from(tasks);
    const [removed] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, removed);
    setTasks(reordered);
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">🧠 CEO Task</h1>

      <TaskInput onAddTask={handleAddTask} />

      <div className="flex justify-between mt-4 text-sm text-gray-500">
        <p>Total: {tasks.length} | Done: {tasks.filter((t) => t.done).length}</p>
        <div className="space-x-2">
          <button onClick={handleMarkAllDone} className="text-blue-500">Mark All Done</button>
          <button onClick={handleClearCompleted} className="text-orange-500">Clear Completed</button>
          <button onClick={handleClearAll} className="text-red-500">Clear All</button>
          <button onClick={() => setDarkMode(!darkMode)} className="text-purple-500">
            Toggle Theme
          </button>
        </div>
      </div>

      <div className="mt-4">
        {tasks.length === 0 ? (
          <p className="text-center text-gray-500 mt-4">No tasks yet.</p>
        ) : (
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="tasks">
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="space-y-2 mt-4"
                >
                  {tasks.map((task, index) => (
                    <Draggable key={task.id} draggableId={task.id} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <TaskItem
                            task={task}
                            onToggle={() => handleToggleTask(task.id)}
                            onDelete={() => handleDeleteTask(task.id)}
                          />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        )}
      </div>

      <h2 className="mt-6 text-sm text-center text-gray-400">🧠 Built by CEO</h2>
    </div>
  );
}
