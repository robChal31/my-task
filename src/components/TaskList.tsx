import React from "react";
import { Droppable } from "react-beautiful-dnd";
import { Task } from "../model";
import SingleTask from "./SingleTask";
import "./styles.css";

interface Props {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  completedTasks: Task[];
  setCompletedTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

const TaskList: React.FC<Props> = ({
  tasks,
  setTasks,
  completedTasks,
  setCompletedTasks,
}) => {
  return (
    <div className="container">
      <Droppable droppableId="TasksList">
        {(provided, snapshot) => (
          <div
            className={`tasks ${snapshot.isDraggingOver ? "dragActive" : ""}`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <span className="tasks__heading">Active Task</span>
            {tasks.map((task, index) => (
              <SingleTask
                index={index}
                task={task}
                tasks={tasks}
                setTasks={setTasks}
                key={task.id}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <Droppable droppableId="CompletedTasks">
        {(provided, snapshot) => (
          <div
            className={`tasks remove ${
              snapshot.isDraggingOver ? "dragComplete" : ""
            }`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <span className="tasks__heading">Completed Task</span>
            {completedTasks.map((task, index) => (
              <SingleTask
                index={index}
                task={task}
                tasks={completedTasks}
                setTasks={setCompletedTasks}
                key={task.id}
              />
            ))}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default TaskList;
