/* eslint-disable max-len */
import React from 'react';

import Form from 'src/components/Form';
import Counter from 'src/components/Counter';
import Tasks from 'src/components/Tasks';
import Title from '../Title';

import tasksData from 'src/data/tasks';

// == Composant
class App extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      tasks: tasksData,
      inputValue: '',
    };

    this.handleTaskInputChange = this.handleTaskInputChange.bind(this);
    this.handleTaskSubmit = this.handleTaskSubmit.bind(this);
    this.handleTaskStatusChange = this.handleTaskStatusChange.bind(this);
    this.handleTaskRemoval = this.handleTaskRemoval.bind(this);
    this.handleEditToggle = this.handleEditToggle.bind(this);
    this.handleTaskNameEdit = this.handleTaskNameEdit.bind(this);
  }

  handleTaskInputChange(event) {
    this.setState({
      inputValue: event.target.value,
    });
  }

  handleTaskStatusChange(checkedTaskId) {
    // mon objectif : recopier le tableau de tâches
    // mais modifier le booléen de la tache qui correspond a l'id recu

    const newTasks = this.state.tasks.map((task) => {
      if (task.id === checkedTaskId) {
          return {
          ...task,
          done: !task.done,
        };
      }
      return task;
    });

    this.setState({
      tasks: newTasks,
    });
  }

  // passe une tâche en mode édition avec son id
  handleEditToggle(taskId) {
    const newTasks = this.state.tasks.map((task) => {
      if (task.id === taskId) {
        return {
          ...task,
          editing: !task.editing,
        };
      }
      return task;
    });

    this.setState({ tasks: newTasks });
  }

  // gère la soumission du formulaire de nouvelle tâche
  handleTaskSubmit(event) {
    // on ne veut pas que la page se recharge
    event.preventDefault();

    // calcul du nouvel id
    const ids = this.state.tasks.map((task) => task.id);
    const newId = Math.max(...ids) + 1;

    // déclaration de la nouvelle tâche
    const newTask = {
      done: false,
      label: this.state.inputValue,
      editing: false,
      id: newId,
    };

    this.setState({
      tasks: [ 
        ...this.state.tasks,
        newTask, 
      ],
      // je remets a zéro mon champ contrôlé
      inputValue: '',
    });
  }

  // gère la modification du nom d'une tache
  handleTaskNameEdit(taskId, newValue) {
    const newTasks = this.state.tasks.map((task) => {
      if (task.id === taskId) {
        return {
          ...task,
          label: newValue,
        };
      }
      return task;
    });

    this.setState({ tasks: newTasks });
  }

  // gère la suppression d'une tâche
  handleTaskRemoval(taskId) {
    const newTasks = this.state.tasks.filter((task) => task.id !== taskId);

    this.setState({
      tasks: newTasks,
    });
  }

  // je filtre les taches pour lesquelles done est faux
  // puis je compte la longueur du tableau filtré avec un .length
  getOngoingTasksNumber() {
    return this.state.tasks.filter((task) => !task.done).length;
  }

  render() {
    return (
      <div className="app">
        <Form
          newTaskInput={this.state.inputValue}
          onInputChange={this.handleTaskInputChange}
          onTaskSubmit={this.handleTaskSubmit}
        />
        <Tasks
          onTaskStatusChange={this.handleTaskStatusChange}
          onRemoveTask={this.handleTaskRemoval}
          onEditToggle={this.handleEditToggle}
          onTaskNameEdit={this.handleTaskNameEdit}
          />
          <Counter nbOfOngoingTasks={this.getOngoingTasksNumber()} />
      </div>
    );
  }
}

// == Export
export default App;
