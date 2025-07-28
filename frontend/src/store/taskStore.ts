import { create } from 'zustand'

type Task = {
  id: string
  text: string
  completed: boolean
}

type TaskState = {
  tasks: Task[]
  addTask: (text: string) => void
  deleteTask: (id: string) => void
  toggleTask: (id: string) => void
  reorderTasks: (fromIndex: number, toIndex: number) => void
}

export const useTaskStore = create<TaskState>((set) => ({
  tasks: [],
  addTask: (text) =>
    set((state) => ({
      tasks: [...state.tasks, { id: crypto.randomUUID(), text, completed: false }],
    })),
  deleteTask: (id) =>
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== id),
    })),
  toggleTask: (id) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      ),
    })),
  reorderTasks: (from, to) =>
    set((state) => {
      const updated = Array.from(state.tasks)
      const [moved] = updated.splice(from, 1)
      updated.splice(to, 0, moved)
      return { tasks: updated }
    }),
}))
