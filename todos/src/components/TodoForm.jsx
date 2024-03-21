import React from 'react';

export const TodoForm = ({ todoFormHandler }) => {
  return (
    <form onSubmit={(e) => todoFormHandler(e)} className="todo-form">
      <input type="text" placeholder="New todo" />
      <button>Add</button>
    </form>
  );
};
