import React from 'react';
import { TodoItem } from './TodoItem';

export const TodoList = ({ todos, deleteHandler, checkboxHandler }) => {
  return (
    <ul className="todo-list">
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
