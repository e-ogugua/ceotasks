// src/components/TaskList.tsx
import { useTaskStore } from '../store/taskStore'
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd'
import { useCallback } from 'react'
import { AnimatePresence } from 'framer-motion'

export const TaskList = () => {
  const tasks = useTaskStore((state: any) => state.tasks)
  const reorderTasks = useTaskStore((state: any) => state.reorderTasks)
  const toggleTask = useTaskStore((state: any) => state.toggleTask)
  const deleteTask = useTaskStore((state: any) => state.deleteTask)

  const onDragEnd = useCallback((result: DropResult) => {
    if (!result.destination) return
    reorderTasks(result.source.index, result.destination.index)
  }, [reorderTasks])

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="tasklist">
        {(provided) => (
          <ul
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="space-y-2 mt-4 min-h-[100px]"
          >
            <AnimatePresence>
              {tasks.map((task: any, index: number) => (
                <Draggable key={task.id} draggableId={task.id} index={index}>
                  {(provided, snapshot) => (
                    <li
                      key={task.id}
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className={`flex justify-between items-center p-3 rounded shadow transition-colors ${
                        snapshot.isDragging
                          ? 'bg-blue-100 dark:bg-blue-900'
                          : 'bg-white dark:bg-gray-800'
                      }`}
                    >
                      <div
                        className="flex-1 cursor-pointer"
                        onClick={() => toggleTask(task.id)}
                      >
                        <input
                          type="checkbox"
                          checked={task.completed}
                          onChange={() => toggleTask(task.id)}
                          className="mr-2"
                        />
                        <span
                          className={
                            task.completed ? 'line-through text-gray-500' : ''
                          }
                        >
                          {task.text}
                        </span>
                      </div>
                      <button
                        onClick={() => deleteTask(task.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        🗑️
                      </button>
                    </li>
                  )}
                </Draggable>
              ))}
            </AnimatePresence>
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  )
}
