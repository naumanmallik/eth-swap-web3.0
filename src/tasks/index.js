import * as React from "react";
import classes from "./tasks.module.css";
import { Link } from "react-router-dom";
import useLocalStorage from "../hooks/useLocalStorage";
import { isEmpty } from "../constants";

const Tasks = () => {
  let [storedValue, setValue] = useLocalStorage("tasks", []);
  const [taskIds, setTaskIds] = React.useState([]);

  const handleUpdateTask = ({
    event: {
      target: { checked },
    },
    id,
  }) => {
    if (checked) {
      setTaskIds((pre) => [...pre, id]);
    } else {
      setTaskIds((pre) => pre.filter((_id) => _id !== id));
    }
  };

  const handleDeleteTasks = () => {
    storedValue = storedValue?.filter(({ id }) => !taskIds.includes(id));
    setValue(storedValue);
    setTaskIds([]);
  };

  return (
    <div className={classes.root}>
      <div className={classes.btnRoot}>
        {!isEmpty(taskIds) && (
          <button
            type="button"
            component
            className={`${classes.deleteBtn} addBtn`}
            onClick={handleDeleteTasks}
          >
            Delete Task
          </button>
        )}
        <Link to={"/create-task"}>
          <button type="button" component className={"addBtn"}>
            Create New Task
          </button>
        </Link>
      </div>
      {isEmpty(storedValue) ? (
        <span className={classes.noTask}>No task's found</span>
      ) : (
        <div className={classes.cardRoot}>
          {storedValue?.map(({ name, id }) => (
            <div key={id} className={classes.card}>
              <div className={classes.checkBoxRoot}>
                <input
                  type="checkbox"
                  onChange={(event) => handleUpdateTask({ event, id })}
                />
              </div>
              <div className={classes.textRoot}>
                <span title={name} className="wrapTextIntoThreeLines">
                  {name}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Tasks;
