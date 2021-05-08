import React, { useEffect, useState } from "react";
import "./Teamtodo.css";
import addIcon from "../assets/plus.svg";
import RemoveIcon from "../assets/remove.svg";
import TextareaAutosize from "react-textarea-autosize";
import db from "../firebase";
import firebase from "firebase";
function Teamtodo({ teamId }) {
  const [addTodo, setAddTodo] = useState(false);
  const [deleteTodo, setDeleteTodo] = useState(false);
  const [newTodo, setNewTodo] = useState("");
  const [todoList, setTodoList] = useState([]);

  const addNewTodo = (e) => {
    e.preventDefault();

    db.collection("Teams").doc(teamId).collection("Todo").add({
      todo: newTodo,
      timeStamp: firebase.firestore.Timestamp.now(),
    });

    setNewTodo("");
    setAddTodo(false);
  };

  useEffect(() => {
    const getTodoList = async () => {
      const todo = await db
        .collection("Teams")
        .doc(teamId)
        .collection("Todo")
        .orderBy("timeStamp", "asc")
        .onSnapshot((snapshot) => {
          setTodoList(snapshot.docs);
        });
    };
    getTodoList();
  }, []);

  const onDelete = (todoId) => {
    db.collection("Teams").doc(teamId).collection("Todo").doc(todoId).delete();
    setDeleteTodo(false);
  };
  return (
    <div className="Teamtodolist">
      <div className="Todo">
        <div className="Todo-title">
          {addTodo ? (
            <p className="todoList-Title">Add To-Do</p>
          ) : deleteTodo ? (
            <p className="todoList-Title">Delete To-do</p>
          ) : (
            <p className="todoList-Title">To-do list</p>
          )}

          <div className="todo-btn">
            {/* add Section */}
            {!deleteTodo && addTodo ? (
              <div className="add-todo-btn" onClick={(e) => setAddTodo(false)}>
                <p className="cancel_btn">cancel</p>
              </div>
            ) : !deleteTodo ? (
              <div
                className="add-todo-btn"
                onClick={(e) => setAddTodo(!addTodo)}
              >
                {/* add icon */}
                <img src={addIcon} alt="" />
                <p className="addToDobtnTxt">Add</p>
              </div>
            ) : (
              <></>
            )}
            {!addTodo && deleteTodo ? (
              <div
                className="add-todo-btn"
                onClick={(e) => setDeleteTodo(false)}
              >
                <p className="cancel_btn">cancel</p>
              </div>
            ) : !addTodo ? (
              <div
                className="todo-delete"
                onClick={(e) => setDeleteTodo(!deleteTodo)}
              >
                <img src={RemoveIcon} alt="" />
                <p className="deleteToDobtnTxt">Delete</p>
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
        {addTodo ? (
          <div className="addNewTodo">
            <TextareaAutosize
              placeholder="Type Here .."
              onChange={(e) => setNewTodo(e.target.value)}
              value={newTodo}
            />

            <div className="addNewTodo_btn">
              <button onClick={addNewTodo}>Add</button>
            </div>
          </div>
        ) : deleteTodo ? (
          <div className="deleteTodoContainer">
            <div className="todo-item-container">
              {todoList.map((todo) => (
                <div
                  className="deletetodo-item"
                  onClick={() => onDelete(todo.id)}
                >
                  <p>{todo.data().todo}</p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="todo-item-container">
            {todoList.map((todo) => (
              <div className="todo-item">
                <p>{todo.data().todo}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Teamtodo;
