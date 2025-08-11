import { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";
import TaskInput from "./components/TaskInput";
import TaskItem from "./components/TaskItem";
import StatsPanel from "./components/StatsPanel";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import { motion, AnimatePresence } from "framer-motion";

interface Task {
  id: string;
  text: string;
  done: boolean;
  priority: 'low' | 'medium' | 'high';
  category: string;
  createdAt: Date;
  completedAt?: Date;
}

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  const [sortBy, setSortBy] = useState<'created' | 'priority' | 'alphabetical'>('created');

  // Load tasks from localStorage
  useEffect(() => {
    const savedTasks = localStorage.getItem('ceotasks');
    if (savedTasks) {
      const parsedTasks = JSON.parse(savedTasks).map((task: any) => ({
        ...task,
        createdAt: new Date(task.createdAt),
        completedAt: task.completedAt ? new Date(task.completedAt) : undefined
      }));
      setTasks(parsedTasks);
    }
  }, []);

  // Save tasks to localStorage
  useEffect(() => {
    localStorage.setItem('ceotasks', JSON.stringify(tasks));
  }, [tasks]);

  // Sync dark mode with system preference
  useEffect(() => {
    const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setDarkMode(systemDark);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  const handleAddTask = (text: string, priority: 'low' | 'medium' | 'high' = 'medium', category: string = 'General') => {
    const newTask: Task = {
      id: Date.now().toString(),
      text,
      done: false,
      priority,
      category,
      createdAt: new Date(),
    };
    setTasks([newTask, ...tasks]);
  };

  const handleToggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id 
          ? { 
              ...task, 
              done: !task.done,
              completedAt: !task.done ? new Date() : undefined
            } 
          : task
      )
    );
  };

  const handleDeleteTask = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const handleUpdateTask = (id: string, updates: Partial<Task>) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, ...updates } : task
      )
    );
  };

  const handleClearCompleted = () => {
    setTasks((prev) => prev.filter((task) => !task.done));
  };

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to delete all tasks?')) {
      setTasks([]);
    }
  };

  const handleMarkAllDone = () => {
    setTasks((prev) => prev.map((task) => ({ 
      ...task, 
      done: true,
      completedAt: task.completedAt || new Date()
    })));
  };

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const reordered = Array.from(tasks);
    const [removed] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, removed);
    setTasks(reordered);
  };

  // Filter and sort tasks
  const filteredTasks = tasks
    .filter(task => {
      if (filter === 'active') return !task.done;
      if (filter === 'completed') return task.done;
      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'priority') {
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      }
      if (sortBy === 'alphabetical') {
        return a.text.localeCompare(b.text);
      }
      return b.createdAt.getTime() - a.createdAt.getTime();
    });

  const stats = {
    total: tasks.length,
    completed: tasks.filter(t => t.done).length,
    active: tasks.filter(t => !t.done).length,
    completionRate: tasks.length > 0 ? Math.round((tasks.filter(t => t.done).length / tasks.length) * 100) : 0
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      darkMode ? 'dark bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'
    }`}>
      {/* Header */}
      <Header 
        darkMode={darkMode} 
        setDarkMode={setDarkMode}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* Sidebar */}
      <Sidebar 
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        filter={filter}
        setFilter={setFilter}
        sortBy={sortBy}
        setSortBy={setSortBy}
        stats={stats}
      />

      {/* Main Content */}
      <div className="flex">
        {/* Main Content Area */}
        <main className={`flex-1 transition-all duration-300 ${
          sidebarOpen ? 'ml-64' : 'ml-0'
        }`}>
          <div className="max-w-4xl mx-auto p-6">
            {/* Stats Panel */}
            <StatsPanel stats={stats} />

            {/* Task Input */}
            <div className="mb-8">
              <TaskInput onAddTask={handleAddTask} />
            </div>

            {/* Filters and Actions */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                  {filteredTasks.length} task{filteredTasks.length !== 1 ? 's' : ''}
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">Filter:</span>
                  <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value as any)}
                    className="text-sm border border-gray-300 dark:border-gray-600 rounded px-2 py-1 bg-white dark:bg-gray-700"
                  >
                    <option value="all">All</option>
                    <option value="active">Active</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">Sort:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="text-sm border border-gray-300 dark:border-gray-600 rounded px-2 py-1 bg-white dark:bg-gray-700"
                  >
                    <option value="created">Created</option>
                    <option value="priority">Priority</option>
                    <option value="alphabetical">Alphabetical</option>
                  </select>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <button
                  onClick={handleMarkAllDone}
                  className="px-3 py-1 text-sm bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
                >
                  Mark All Done
                </button>
                <button
                  onClick={handleClearCompleted}
                  className="px-3 py-1 text-sm bg-orange-500 text-white rounded hover:bg-orange-600 transition-colors"
                >
                  Clear Completed
                </button>
                <button
                  onClick={handleClearAll}
                  className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                >
                  Clear All
                </button>
              </div>
            </div>

            {/* Task List */}
            <div className="space-y-3">
              {filteredTasks.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-12"
                >
                  <div className="text-6xl mb-4">📝</div>
                  <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">
                    {filter === 'all' ? 'No tasks yet' : `No ${filter} tasks`}
                  </h3>
                  <p className="text-gray-500 dark:text-gray-500">
                    {filter === 'all' 
                      ? 'Start by adding your first task above!' 
                      : `All tasks are ${filter === 'active' ? 'completed' : 'active'}`
                    }
                  </p>
                </motion.div>
              ) : (
                <DragDropContext onDragEnd={handleDragEnd}>
                  <Droppable droppableId="tasks">
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className="space-y-3"
                      >
                        <AnimatePresence>
                          {filteredTasks.map((task, index) => (
                            <Draggable key={task.id} draggableId={task.id} index={index}>
                              {(provided, snapshot) => (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  className={`${
                                    snapshot.isDragging ? 'rotate-2 shadow-lg' : ''
                                  }`}
                                >
                                  <TaskItem
                                    task={task}
                                    onToggle={() => handleToggleTask(task.id)}
                                    onDelete={() => handleDeleteTask(task.id)}
                                    onUpdate={(updates) => handleUpdateTask(task.id, updates)}
                                  />
                                </div>
                              )}
                            </Draggable>
                          ))}
                        </AnimatePresence>
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </DragDropContext>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
