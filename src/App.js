import React, { useState } from 'react';
import './App.css';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [editingTodo, setEditingTodo] = useState({ text: '', index: null });

  const addTodo = () => {
    if (newTodo !== '') {
      setTodos([...todos, { text: newTodo, editing: false }]);
      setNewTodo('');
    }
  };

  const deleteTodo = (index) => {
    const updatedTodos = [...todos];
    updatedTodos.splice(index, 1);
    setTodos(updatedTodos);
  };

  const updateTodo = () => {
    const updatedTodos = [...todos];
    updatedTodos[editingTodo.index].text = editingTodo.text;
    updatedTodos[editingTodo.index].editing = false;
    setTodos(updatedTodos);
    setEditingTodo({ text: '', index: null });
  };

  const toggleEditTodo = (index) => {
    const updatedTodos = [...todos];
    updatedTodos[index].editing = !updatedTodos[index].editing;
    setTodos(updatedTodos);

    if (updatedTodos[index].editing) {
      setEditingTodo({
        text: updatedTodos[index].text,
        index: index,
      });
    } else {
      setEditingTodo({ text: '', index: null });
    }
  };

  return (
    <div className='Main'>
      <h1>To Do List:</h1>&nbsp;&nbsp;
      <input type='text' value={newTodo} onChange={(e) => setNewTodo(e.target.value)} />&nbsp;&nbsp;
      <button className='AddButton' onClick={addTodo}> Add Todo </button>
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>
            {todo.editing ? (
              <input
                type='text'
                value={editingTodo.text}
                onChange={(e) =>
                  setEditingTodo({
                    ...editingTodo,
                    text: e.target.value,
                  })
                }
              />
            ) : (
              todo.text
            )}
            {todo.editing ? (
              <button
                className='UpdateButton'
                onClick={() => updateTodo()}
              >
                Update
              </button>
            ) : (
              <button
                className='EditButton'
                onClick={() => toggleEditTodo(index)}
              >
                Edit
              </button>
            )}
            <button
              className='DeleteButton'
              onClick={() => deleteTodo(index)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
