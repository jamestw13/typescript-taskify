import React, { useState, useRef, useEffect } from 'react';
import { TaskModel } from '../model';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';
import './styles.css';
import { Draggable } from 'react-beautiful-dnd';

interface Props {
  task: TaskModel;
  tasks: TaskModel[];
  setTasks: React.Dispatch<React.SetStateAction<TaskModel[]>>;
  index: number;
}

const SingleTask: React.FC<Props> = ({ task, tasks, setTasks, index }) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [editText, setEditText] = useState<string>(task.text);

  const handleSubmit = (e: React.FormEvent, id: number) => {
    e.preventDefault();
    setTasks(tasks.map(task => (task.id === id ? { ...task, text: editText } : task)));
    setEdit(false);
  };

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [edit]);

  const handleEdit = () => {
    if (!edit) {
      setEdit(!edit);
    }
  };

  const handleDelete = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <Draggable draggableId={task.id.toString()} index={index}>
      {(provided, snapshot) => (
        <form
          className={`tasks__single ${snapshot.isDragging && 'drag'}`}
          onSubmit={e => handleSubmit(e, task.id)}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          {edit ? (
            <input
              value={editText}
              onChange={e => setEditText(e.target.value)}
              ref={inputRef}
              className="tasks__single--text"
            />
          ) : (
            <span className="tasks__single--text">{task.text}</span>
          )}
          <div>
            <span className="icon">
              <AiFillEdit onClick={handleEdit} />
            </span>
            <span className="icon">
              <AiFillDelete onClick={() => handleDelete(task.id)} />
            </span>
          </div>
        </form>
      )}
    </Draggable>
  );
};

export default SingleTask;
