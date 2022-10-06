import React, { useState, useRef, useEffect } from "react";
import { Task } from "../model";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { MdDone } from "react-icons/md";
import "./styles.css";
import { Draggable } from "react-beautiful-dnd";

interface Props {
  task: Task;
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  index: number;
}

const SingleTask: React.FC<Props> = ({ task, tasks, setTasks, index }) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [editTask, setEditTask] = useState<string>(task.task);

  const editInp = useRef<HTMLInputElement>(null);

  useEffect(() => {
    editInp.current?.focus();
  }, [edit]);

  const handleDone = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, isDone: !task.isDone } : task
      )
    );
  };

  const handleDelete = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleEditTask = (e: React.FormEvent, id: number) => {
    e.preventDefault();
    setTasks(
      tasks.map((task) => (task.id === id ? { ...task, task: editTask } : task))
    );
    setEdit(!edit);
  };

  return (
    <Draggable draggableId={task.id.toString()} index={index} key={task.id}>
      {(provided, snapshot) => (
        <form
          className={`tasks__single ${snapshot.isDragging ? "drag" : ""}`}
          key={task.id}
          onSubmit={(e) => handleEditTask(e, task.id)}
          ref={provided.innerRef}
          {...provided.dragHandleProps}
          {...provided.draggableProps}
        >
          {edit ? (
            <input
              ref={editInp}
              type={"input"}
              value={editTask}
              onChange={(e) => setEditTask(e.target.value)}
              className={"tasks__single--text"}
            />
          ) : task.isDone ? (
            <s className="tasks__single--text">{task.task}</s>
          ) : (
            <span className="tasks__single--text">{task.task}</span>
          )}
          <div className="">
            <span
              className="icon"
              onClick={() => {
                if (!edit && !task.isDone) {
                  setEdit(!edit);
                }
              }}
            >
              <AiFillEdit />
            </span>
            <span className="icon" onClick={() => handleDelete(task.id)}>
              <AiFillDelete />
            </span>
            <span className="icon" onClick={() => handleDone(task.id)}>
              <MdDone />
            </span>
          </div>
        </form>
      )}
    </Draggable>
  );
};

export default SingleTask;
