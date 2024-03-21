import React from 'react';
import { TodoItem } from './TodoItem';

export const TodoList = ({ todos, deleteHandler, checkboxHandler }) => {
  console.log('The Todo List Component:', todos);
  return (
    <ul>
      {todos.map((todo, index) => {
        return (
          <TodoItem
            key={index}
            todo={todo}
            deleteHandler={deleteHandler}
            checkboxHandler={checkboxHandler}
          />
        );
      })}
    </ul>
  );
};
