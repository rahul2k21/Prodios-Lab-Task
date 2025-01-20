import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const TodoContext = createContext();

export const useTodoContext = () => useContext(TodoContext);

export const TodoProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: "Low",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskBeingEdited, setTaskBeingEdited] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(
          "http://localhost:7500/api/task/getTasks",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("UserToken")}`,
            },
          }
        );
        setTasks(response.data.tasks);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  const handleSaveTask = async () => {
    if (newTask.title.trim() === "") return;

    try {
      if (taskBeingEdited) {
        const response = await axios.put(
          `http://localhost:7500/api/task/${taskBeingEdited._id}`,
          newTask,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("UserToken")}`,
            },
          }
        );
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task._id === taskBeingEdited._id ? response.data.task : task
          )
        );
        setTaskBeingEdited(null);
      } else {
        const response = await axios.post(
          "http://localhost:7500/api/task/create",
          newTask,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("UserToken")}`,
            },
          }
        );
        setTasks((prevTasks) => [...prevTasks, response.data.task]);
      }

      setNewTask({
        title: "",
        description: "",
        dueDate: "",
        priority: "Low",
      });
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error saving task:", error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await axios.delete(`http://localhost:7500/api/task/${taskId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("UserToken")}`,
        },
      });
      setTasks(tasks.filter((task) => task._id !== taskId));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleEditTask = (task) => {
    setTaskBeingEdited(task);
    setNewTask({
      title: task.title,
      description: task.description,
      dueDate: task.dueDate,
      priority: task.priority,
    });
    setIsModalOpen(true);
  };

  const openModal = () => {
    setTaskBeingEdited(null);
    setNewTask({
      title: "",
      description: "",
      dueDate: "",
      priority: "Low",
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTaskBeingEdited(null);
  };

  const updateTaskOrder = (newTasksOrder) => {
    setTasks(newTasksOrder);
  };

  const handleOnDragEnd = (result) => {
    const { destination, source } = result;

    // If the task was dropped outside a valid destination, exit
    if (!destination) return;

    // Reorder tasks based on the drag-and-drop result
    const updatedTasks = Array.from(tasks);
    const [movedTask] = updatedTasks.splice(source.index, 1); 
    updatedTasks.splice(destination.index, 0, movedTask); 

    updateTaskOrder(updatedTasks);
  };

  return (
    <TodoContext.Provider
      value={{
        tasks,
        setTasks,
        newTask,
        isModalOpen,
        taskBeingEdited,
        setNewTask,
        setIsModalOpen,
        setTaskBeingEdited,
        handleSaveTask,
        handleDeleteTask,
        handleEditTask,
        openModal,
        closeModal,
        updateTaskOrder,
        handleOnDragEnd, 
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
