// Import statements
import React, { useState, useEffect } from "react";
import "./App.css";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import ListItemContent from "@mui/joy/ListItemContent";
import TextField from "@mui/material/TextField";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusSquare } from "@fortawesome/free-solid-svg-icons";

function App() {
  // State variables
  const [inputValue, setInputValue] = useState("");
  const [editing, setEditing] = useState({ index: null, value: "" });
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved
      ? JSON.parse(saved)
      : [{ content: "Go to gym", isComplete: false }];
  });

  // Effect for updating localStorage
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Task manipulation functions
  const addTasks = () => {
    if (inputValue !== "") {
      setTasks([...tasks, { content: inputValue, isComplete: false }]);
      setInputValue("");
    }
  };

  const deleteTasks = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const toggleCompleteTasks = (index, isComplete) => {
    setTasks(
      tasks.map((task, i) =>
        i === index
          ? {
              ...task,
              isComplete: !isComplete,
            }
          : task
      )
    );
  };

  const editTask = (index, content) => {
    setEditing({ index, value: content });
  };

  const updateTask = (index, newValue) => {
    setTasks(
      tasks.map((task, i) =>
        i === index ? { ...task, content: newValue } : task
      )
    );
    setEditing({ index: null, value: "" });
  };

  // Render function
  return (
    <div className="App">
      <div className="content">
        <h1>React To Do List</h1>
        <div className="form">
          <TextField
            required
            id="addingName"
            label="Task Name"
            variant="standard"
            placeholder="Insert What To Do"
            value={inputValue}
            onKeyDown={(e) => {
              if (e.key === "Enter") addTasks();
            }}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button className="todo-button" onClick={addTasks}>
            <FontAwesomeIcon icon={faPlusSquare} size="3x" />
          </button>
        </div>
        <div className="todo-container">
          <List className="todoList">
            {tasks.map((task, index) => (
              <ListItem
                key={index}
                className="todoList"
                style={{
                  textDecoration: !task.isComplete ? "line-through" : "none",
                  color: !task.isComplete ? "grey" : "black",
                  fontWeight: !task.isComplete ? "normal" : "bold",
                }}
              >
                <ListItemContent>
                  {editing.index === index ? (
                    <TextField
                      value={editing.value}
                      onChange={(e) =>
                        setEditing({ ...editing, value: e.target.value })
                      }
                    />
                  ) : (
                    task.content
                  )}
                  <button
                    className="delete-button"
                    onClick={() => deleteTasks(index)}
                  >
                    X
                  </button>
                  <button
                    className="complete-button"
                    onClick={() => toggleCompleteTasks(index, true)}
                  >
                    O
                  </button>
                  <button
                    className="Undo-button"
                    onClick={() => toggleCompleteTasks(index, false)}
                  >
                    Undo Completion
                  </button>
                  {editing.index === index ? (
                    <>
                      <button onClick={() => updateTask(index, editing.value)}>
                        Update
                      </button>
                      <button
                        onClick={() => setEditing({ index: null, value: "" })}
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <button onClick={() => editTask(index, task.content)}>
                      Edit Task
                    </button>
                  )}
                </ListItemContent>
              </ListItem>
            ))}
          </List>
        </div>
      </div>
    </div>
  );
}

export default App;
