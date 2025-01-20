import React from "react";
import { MdDeleteForever } from "react-icons/md"; 
import { MdEdit } from "react-icons/md"; 
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { useTodoContext } from "../ContextTodo/TodoContext";

function TodoList() {
  const {
    tasks,
    newTask,
    isModalOpen,
    taskBeingEdited,
    setNewTask,
    handleSaveTask,
    handleDeleteTask,
    handleEditTask,
    openModal,
    closeModal,
    setTasks, 
  } = useTodoContext();

  // Handle drag-and-drop logic
  const handleOnDragEnd = (result) => {
    if (!result.destination) return; 

    const reorderedTasks = Array.from(tasks);
    const [movedTask] = reorderedTasks.splice(result.source.index, 1);
    reorderedTasks.splice(result.destination.index, 0, movedTask);

    setTasks(reorderedTasks); 
  };

  return (
    <div className="bg-slate-300 text-white p-4 shadow-md">
      <div className="flex justify-center mb-4 mx-6">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full transition-all duration-300"
          onClick={openModal}
        >
          Create ToDo
        </button>
      </div>

     <DragDropContext onDragEnd={handleOnDragEnd}>
     <Droppable droppableId="tasks">
    {(provided) => (
      <div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-3"
        {...provided.droppableProps}
        ref={provided.innerRef}
      >
        {tasks.map((task, index) => (
          <Draggable key={task._id} draggableId={task._id} index={index}>
            {(provided) => (
              <div
                className="text-white p-4 bg-slate-900 rounded-md shadow-md"
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
              >
                <div className="flex flex-col mb-2">
                  <strong className="text-sm">{task.title}</strong>
                  <span className="text-gray-300 text-xs">
                    {task.description}
                  </span>
                </div>
                <div className="flex flex-col mb-2">
                  <span className="text-xs text-gray-400">
                    <span className="text-sm text-gray-300 font-bold">
                      Due Date:
                    </span>{" "}
                    {task.dueDate}
                  </span>
                  <span className="text-xs">
                    <span className="text-sm text-gray-300 font-bold pr-2">
                      Priority:
                    </span>
                    <span
                      className={`text-${
                        task.priority === "High"
                          ? "red"
                          : task.priority === "Medium"
                          ? "yellow"
                          : "green"
                      }-400`}
                    >
                      {task.priority}
                    </span>
                  </span>
                </div>
                <div className="flex justify-end mt-2">
                  <button
                    onClick={() => handleEditTask(task)}
                    className="ml-2 bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded-full text-xs"
                  >
                    <MdEdit />
                  </button>
                  <button
                    onClick={() => handleDeleteTask(task._id)}
                    className="ml-2 bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded-full text-xs"
                  >
                    <MdDeleteForever />
                  </button>
                </div>
              </div>
            )}
          </Draggable>
        ))}
        {provided.placeholder}
      </div>
    )}
  </Droppable>
</DragDropContext>


      {/* Modal (Dialog Box) */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-1/3">
            <h2 className="text-2xl mb-4">
              {taskBeingEdited ? "Edit Task" : "Create New Task"}
            </h2>
            <input
              type="text"
              className="p-2 mb-2 rounded-md bg-gray-700 text-white w-full"
              placeholder="Title"
              value={newTask.title}
              onChange={(e) =>
                setNewTask({ ...newTask, title: e.target.value })
              }
            />
            <textarea
              className="p-2 mb-2 rounded-md bg-gray-700 text-white w-full"
              placeholder="Description"
              value={newTask.description}
              onChange={(e) =>
                setNewTask({ ...newTask, description: e.target.value })
              }
            />
            <input
              type="date"
              className="p-2 mb-2 rounded-md bg-gray-700 text-white w-full"
              value={newTask.dueDate}
              onChange={(e) =>
                setNewTask({ ...newTask, dueDate: e.target.value })
              }
            />
            <select
              className="p-2 mb-2 rounded-md bg-gray-700 text-white w-full"
              value={newTask.priority}
              onChange={(e) =>
                setNewTask({ ...newTask, priority: e.target.value })
              }
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>

            <div className="flex justify-between mt-4">
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full"
                onClick={closeModal}
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                onClick={handleSaveTask}
              >
                {taskBeingEdited ? "Save Changes" : "Save Task"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TodoList;
