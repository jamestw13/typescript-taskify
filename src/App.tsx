import { useState } from 'react';
import './App.css';
import InputField from './components/InputField';
import TaskContainer from './components/TaskContainer';
import { TaskModel } from './model';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';

const App: React.FC = () => {
  const [taskText, setTaskText] = useState<string>('');
  const [activeTasks, setActiveTasks] = useState<TaskModel[]>([]);
  const [completedTasks, setCompletedTasks] = useState<TaskModel[]>([]);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();

    if (taskText) {
      setActiveTasks([...activeTasks, { id: Date.now(), text: taskText }]);
      setTaskText('');
    }
  };

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;
    if (source.droppableId === destination.droppableId && source.index === destination.index) return;
    let add,
      active = activeTasks,
      complete = completedTasks;

    if (source.droppableId === 'TasksList') {
      add = active[source.index];
      active.splice(source.index, 1);
    } else {
      add = complete[source.index];
      complete.splice(source.index, 1);
    }

    destination.droppableId === 'TasksList'
      ? active.splice(destination.index, 0, add)
      : complete.splice(destination.index, 0, add);

    setActiveTasks(active);
    setCompletedTasks(complete);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="App">
        <span className="heading">Taskify</span>
        <InputField taskText={taskText} setTaskText={setTaskText} handleAdd={handleAdd} />
        <TaskContainer
          activeTasks={activeTasks}
          setActiveTasks={setActiveTasks}
          completedTasks={completedTasks}
          setCompletedTasks={setCompletedTasks}
        />
      </div>
    </DragDropContext>
  );
};

export default App;
