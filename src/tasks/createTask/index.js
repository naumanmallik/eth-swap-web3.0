import * as React from "react";
import classes from "./createTask.module.css";
import { useNavigate } from "react-router-dom";
import { isEmpty } from "../../constants";
import useLocalStorage from "../../hooks/useLocalStorage";

const CreateTask = () => {
  const navigate = useNavigate();
  const [taskName, setTaskName] = React.useState(null);
  const [taskErr, setTaskErr] = React.useState(false);

  let [storedValue, setValue] = useLocalStorage("tasks", []);

  const handleChangeTask = ({ target: { value } }) => {
    if (isEmpty(value)) {
      setTaskName(null);
      setTaskErr(true);
    } else {
      setTaskName(value);
      setTaskErr(false);
    }
  };

  const addTask = () => {
    if (isEmpty(taskName)) {
      setTaskErr(true);
    } else {
      storedValue = isEmpty(storedValue)
        ? [{ id: Date.now(), name: taskName }]
        : [...storedValue, { id: Date.now(), name: taskName }];
      setValue(storedValue);
      navigate("/list-tasks");
      setTaskErr(false);
    }
  };

  return (
    <div className={classes.root}>
      <h1>Create New Task</h1>
      <input
        placeholder="Task Name"
        onChange={handleChangeTask}
        className={classes.input}
        type={"text"}
      />
      {taskErr && <span className={classes.error}>This is required field</span>}
      <button
        type="button"
        component
        className={`${classes.btn} addBtn`}
        disabled={taskErr}
        onClick={addTask}
      >
        Submit
      </button>
    </div>
  );
};

export default CreateTask;
