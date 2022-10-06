import React, { useState } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import "./App.css";
import InputField from "./components/InputField";
import TaskList from "./components/TaskList";
import { Task } from "./model";

const App: React.FC = () => {
  const [task, setTask] = useState<string>("");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [completedTasks, setCompletedTasks] = useState<Task[]>([]);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (task) {
      setTasks([...tasks, { id: Date.now(), task, isDone: false }]);
    }
    setTask("");
  };

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    let add,
      active = tasks,
      complete = completedTasks;

    if (source.droppableId === "TasksList") {
      console.log(add, active, "didie");
      add = active[source.index];
      console.log(add, "add");
      active.splice(source.index, 1);
      console.log(active, "aktif bnu");
    } else {
      console.log(add, complete, "complete");
      add = complete[source.index];
      console.log(add, "add");
      complete.splice(source.index, 1);
    }

    if (destination.droppableId === "TasksList") {
      console.log(add, active);
      active.splice(destination.index, 0, add);
      console.log(active);
    } else {
      console.log(add, complete, "complet1212e");
      complete.splice(destination.index, 0, add);
    }
    console.log(tasks, "tasks");
    console.log(completedTasks, "komplit");
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="App">
        <span className="heading">My Task</span>
        <InputField task={task} setTask={setTask} handleAdd={handleAdd} />
        <TaskList
          tasks={tasks}
          setTasks={setTasks}
          completedTasks={completedTasks}
          setCompletedTasks={setCompletedTasks}
        />
      </div>
    </DragDropContext>
  );
};

export default App;
