import React from 'react';

export const TodoItem = ({ todo, deleteHandler, checkboxHandler }) => {
  return (
    <li>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => checkboxHandler(todo.id)}
      />
      <span>{todo.text}</span>
      <button onClick={(e) => deleteHandler(e, todo.id)}>Delete</button>
    </li>
  );
};
