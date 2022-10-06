import React, { useRef } from "react";
import "./styles.css";

interface Props {
  task: string;
  setTask: React.Dispatch<React.SetStateAction<string>>;
  handleAdd: (e: React.FormEvent) => void;
}

const InputField: React.FC<Props> = ({ task, setTask, handleAdd }) => {
  const inpRef = useRef<HTMLInputElement>(null);

  return (
    <form
      className="input"
      onSubmit={(e) => {
        handleAdd(e);
        inpRef.current?.blur();
      }}
    >
      <input
        ref={inpRef}
        type="input"
        placeholder="Enter a task"
        className="input__box"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <button className="input__submit" type="submit">
        Go
      </button>
    </form>
  );
};

export default InputField;
