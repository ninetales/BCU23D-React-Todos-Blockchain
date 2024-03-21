import React from 'react';

export const TodoItem = ({ todo, deleteHandler, checkboxHandler }) => {
  console.log('Item Component:', todo);
  console.log('Item Component details:', Boolean(todo.completed));
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
