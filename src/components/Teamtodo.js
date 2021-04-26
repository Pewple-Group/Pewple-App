import React, { useState } from "react";
import "./Teamtodo.css";
import addIcon from "../assets/plus.svg";
import RemoveIcon from "../assets/remove.svg";
import TextareaAutosize from "react-textarea-autosize";
function Teamtodo() {
  const [addTodo, setAddTodo] = useState(false);
  const [deleteTodo, setDeleteTodo] = useState(false);
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
            <TextareaAutosize placeholder="Type Here .." />

            <div className="addNewTodo_btn">
              <button>Add</button>
            </div>
          </div>
        ) : deleteTodo ? (
          <div className="deleteTodoContainer">
            <div className="todo-item-container">
              <div className="deletetodo-item">
                <input type="checkbox" name="" id="" />
                <p>Grab all the component from scratch</p>
              </div>
              <div className="deletetodo-item">
                <input type="checkbox" name="" id="" />
                <p>
                  finish the meal pd!!! & get back to work and finish it asap
                </p>
              </div>
              <div className="deletetodo-item">
                <input type="checkbox" name="" id="" />
                <p>Grab all the materials you required</p>
              </div>
            </div>

            <div className="delete__todo__btn">
              <button>Delete</button>
            </div>
          </div>
        ) : (
          <div className="todo-item-container">
            <div className="todo-item">
              <p>Grab all the component from scratch</p>
            </div>
            <div className="todo-item">
              <p>finish the meal pd!!! & get back to work and finish it asap</p>
            </div>
            <div className="todo-item">
              <p>Grab all the materials you required</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Teamtodo;
