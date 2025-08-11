import { create } from 'zustand'

interface Task {
  id: string
  text: string
  completed: boolean
}

interface TaskState {
  tasks: Task[]
  addTask: (text: string) => void
  deleteTask: (id: string) => void
  toggleTask: (id: string) => void
  reorderTasks: (from: number, to: number) => void
}

export const useTaskStore = create<TaskState>((set) => ({
  tasks: [],
  addTask: (text: string) =>
    set((state: TaskState) => ({
      tasks: [
        { id: Date.now().toString(), text, completed: false },
        ...state.tasks,
      ],
    })),
  deleteTask: (id: string) =>
    set((state: TaskState) => ({
      tasks: state.tasks.filter((task: Task) => task.id !== id),
    })),
  toggleTask: (id: string) =>
    set((state: TaskState) => ({
      tasks: state.tasks.map((task: Task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      ),
    })),
  reorderTasks: (from: number, to: number) =>
    set((state: TaskState) => {
      const reordered = Array.from(state.tasks)
      const [removed] = reordered.splice(from, 1)
      reordered.splice(to, 0, removed)
      return { tasks: reordered }
    }),
}))
