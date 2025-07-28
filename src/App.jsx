import {useState} from "react";
import TaskInput from "./components/TaskInput";
import TaskItem from "./components/TaskItem";

/**
 * This is the main app where my task state lives.
 * I manage an array of tasks here and render TaskItems.
 */

export default function App() {
    const [tasks, setTasks] = useState([]);

    // Add a new task to the list
    const handleAddTask = (text) => {
        const newTask = {
            id: Date.now(), // simple unique ID
            text,
            done: false,
        };
        setTasks([newTask, ...tasks]); // newest first
    };

    //Toggle task done state 
    const handleToggleTask = (id) => {
      setTasks.map((task) =>
        prevTasks.map((task) =>
          task.id === id? {...task, done: !task.done} : task
        
        )
      );
    };

    return (
        <div className="max-w-xl mx-auto mt-10 p-4">
          <h1 className="text-2xl font-bold mb-4 text-center">🧠 CEO Task</h1>

          <TaskInput onAddTask={handleAddTask} />

          <div className="mt-4 space-y-2">
            {tasks.length === 0 && (
              <p className="text-gray-500 text-center">No tasks yet.</p>
            )}
            {tasks.map((task) => (
              <TaskItem
                key={(task.id)}
                task={task}
                onToggle={() => handleToggleTask(task.id)}
                onDelete={() => handleDeleteTask(task.id)}
              />
            ))}
          </div>
        </div>
    );
}