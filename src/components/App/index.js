/* eslint-disable max-len */
import React from 'react';

import Form from 'src/components/Form';
import Counter from 'src/components/Counter';
import Tasks from 'src/components/Tasks';
import Title from '../Title';

// import de mes données statiques
import tasksData from 'src/data/tasks';

// import des hooks
import { useState } from 'react';

function App (props) {
 
  // je refactorise en utilisant le hook useState
  const [tasks, setTasks] = useState(tasksData);
  const [inputValue, setInputValue] = useState('');

  const handleTaskInputChange = (event) => {
    setInputValue(event.target.value)
    };

  const handleTaskStatusChange = (checkedTaskId) => {
    // mon objectif : recopier le tableau de tâches
    // mais modifier le booléen de la tache qui correspond a l'id recu

    const newTasks = tasks
    .map((task) => {
      if (task.id === checkedTaskId) {
          return {
          ...task,
          done: !task.done,
        };
      }
      return task;
    });

    setTasks(newTasks);
    };

  // passe une tâche en mode édition avec son id
  const handleEditToggle = (taskId) => {
    const newTasks = tasks
    .map((task) => {
      if (task.id === taskId) {
        return {
          ...task,
          editing: !task.editing,
        };
      }
      return task;
    });

    setTasks(newTasks);
  };

  // gère la soumission du formulaire de nouvelle tâche
  const handleTaskSubmit = (event) => {
    // on ne veut pas que la page se recharge
    event.preventDefault();

    // calcul du nouvel id
    const ids = tasks.map((task) => task.id);
    const newId = Math.max(...ids) + 1;

    // déclaration de la nouvelle tâche
    const newTask = {
      done: false,
      label: inputValue,
      editing: false,
      id: newId,
    };

    setTasks(
      [ 
        ...tasks,
        newTask, 
      ],
    );

    // je remets a zéro mon champ contrôlé
    setInputValue('');
  };

  // gère la modification du nom d'une tache
  const handleTaskNameEdit = (taskId, newValue) => {
    const newTasks = tasks
    .map((task) => {
      if (task.id === taskId) {
        return {
          ...task,
          label: newValue,
        };
      }
      return task;
    });

    setTasks(newTasks);
  };

  // gère la suppression d'une tâche
  const handleTaskRemoval = (taskId) => {
    const newTasks = tasks
    .filter((task) => task.id !== taskId);

    setTasks(newTasks);

  };

  // je filtre les taches pour lesquelles done est faux
  // puis je compte la longueur du tableau filtré avec un .length
  const getOngoingTasksNumber = () => {
   const number = tasks.filter((task) => !task.done).length;

   return number;
  };

  // fonction qui trie les taches
  const getSortedTasks = () => {
    const sortedTasks = [...tasks];
    sortedTasks.sort((a, b) => a.done - b.done);

    return sortedTasks;
  };

    return (
      <div className="app">
        <Title/>
        <Form
          newTaskInput={inputValue}
          onInputChange={handleTaskInputChange}
          onTaskSubmit={handleTaskSubmit}
        />
        <Tasks
          taskList={getSortedTasks()}
          onTaskStatusChange={handleTaskStatusChange}
          onRemoveTask={handleTaskRemoval}
          onEditToggle={handleEditToggle}
          onTaskNameEdit={handleTaskNameEdit}
          />
          <Counter nbOfOngoingTasks={getOngoingTasksNumber()} />
      </div>
    );
}

// == Export
export default App;
