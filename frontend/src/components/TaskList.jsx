// src/components/TaskList.tsx

import { useTaskStore } from '@/store/taskStore'
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd'
import { useCallback } from 'react'

export const TaskList = () => {
  const tasks = useTaskStore(state => state.tasks)
  const reorderTasks = useTaskStore(state => state.reorderTasks) // assume you create this
  const toggleTask = useTaskStore(state => state.toggleTask)
  const deleteTask = useTaskStore(state => state.deleteTask)

  const onDragEnd = useCallback((result: DropResult) => {
    if (!result.destination) return
    reorderTasks(result.source.index, result.destination.index)
  }, [reorderTasks])

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="tasklist">
        {(provided) => (
          <ul {...provided.droppableProps} ref={provided.innerRef} className="space-y-2 mt-4">
            {tasks.map((task, index) => (
              <Draggable key={task.id} draggableId={task.id} index={index}>
                {(provided) => (
                  <li
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className="flex justify-between items-center bg-white dark:bg-gray-800 p-3 rounded shadow"
                  >
                    <div className="flex-1 cursor-pointer" onClick={() => toggleTask(task.id)}>
                      <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => toggleTask(task.id)}
                        className="mr-2"
                      />
                      <span className={task.completed ? 'line-through text-gray-500' : ''}>
                        {task.text}
                      </span>
                    </div>
                    <button onClick={() => deleteTask(task.id)} className="text-red-500 hover:text-red-700">
                      🗑️
                    </button>
                  </li>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  )
}
