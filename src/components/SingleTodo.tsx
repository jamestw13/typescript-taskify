import React, { useState, useRef, useEffect } from 'react';
import { Todo } from '../model';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';
import { MdDone } from 'react-icons/md';
import './styles.css';
import { Draggable } from 'react-beautiful-dnd';

interface Props {
  todo: Todo;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  index: number;
}

const SingleTodo: React.FC<Props> = ({ todo, todos, setTodos, index }) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(todo.todo);

  const handleSubmit = (e: React.FormEvent, id: number) => {
    e.preventDefault();
    setTodos(todos.map(todo => (todo.id === id ? { ...todo, todo: editTodo } : todo)));
    setEdit(false);
  };

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [edit]);

  const handleEdit = () => {
    if (!edit && !todo.isDone) {
      setEdit(!edit);
    }
  };

  const handleDelete = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const handleDone = (id: number) => {
    setTodos(todos.map(todo => (todo.id === id ? { ...todo, isDone: !todo.isDone } : todo)));
  };

  return (
    <Draggable draggableId={todo.id.toString()} index={index}>
      {(provided, snapshot) => (
        <form
          className={`todos__single ${snapshot.isDragging && 'drag'}`}
          onSubmit={e => handleSubmit(e, todo.id)}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          {edit ? (
            <input
              value={editTodo}
              onChange={e => setEditTodo(e.target.value)}
              ref={inputRef}
              className="todos__single--text"
            />
          ) : todo.isDone ? (
            <s className="todos__single--text">{todo.todo}</s>
          ) : (
            <span className="todos__single--text">{todo.todo}</span>
          )}
          <div>
            <span className="icon">
              <AiFillEdit onClick={handleEdit} />
            </span>
            <span className="icon">
              <AiFillDelete onClick={() => handleDelete(todo.id)} />
            </span>
            <span className="icon">
              <MdDone onClick={() => handleDone(todo.id)} />
            </span>
          </div>
        </form>
      )}
    </Draggable>
  );
};

export default SingleTodo;
