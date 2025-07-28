import { useState} from "react";

/**
 * This component lets me type and add new
 * It manages its own input state and calls a function 
 * (passed in Via props) when I submit a task.
 */
export default function TaskInput({onAddTask}) {
    const [text, setText] = useState ("");
    
    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!text.trim()) return; //avoid empty tasks
        onAddTask(text);
        setText(""); //clear input after submission
    };

    return (
        <form
          onSubmit={handleSubmit}
          className="flex items-center gap-2 p-2 border-b border-gray-200"
          >
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="What do I need to Do?"
              className="flex-grow px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring focus:ring-indigo-300 text-sm"
            />
            <button
              type="submit"
              className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 text-sm"
            >
              Add
            </button>
        </form>
    );
}