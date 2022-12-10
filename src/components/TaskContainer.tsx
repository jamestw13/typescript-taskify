import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { TaskModel } from '../model';
import SingleTask from './SingleTask';
import './styles.css';

interface Props {
  activeTasks: TaskModel[];
  setActiveTasks: React.Dispatch<React.SetStateAction<TaskModel[]>>;
  completedTasks: TaskModel[];
  setCompletedTasks: React.Dispatch<React.SetStateAction<TaskModel[]>>;
}

const TaskContainer: React.FC<Props> = ({ activeTasks, setActiveTasks, completedTasks, setCompletedTasks }) => {
  return (
    <div className="container">
      <Droppable droppableId="TasksList">
        {(provided, snapshot) => (
          <div
            className={`tasks ${snapshot.isDraggingOver ? 'dragActive' : ''} `}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <span className="tasks__heading">Active Tasks</span>
            {activeTasks.map((task, index) => (
              <SingleTask index={index} task={task} key={task.id} tasks={activeTasks} setTasks={setActiveTasks} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <Droppable droppableId="TasksRemove">
        {(provided, snapshot) => (
          <div
            className={`tasks remove ${snapshot.isDraggingOver ? 'dragComplete' : ''} `}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <span className="tasks__heading">Completed Tasks</span>
            {completedTasks.map((task, index) => (
              <SingleTask index={index} task={task} key={task.id} tasks={completedTasks} setTasks={setCompletedTasks} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default TaskContainer;
