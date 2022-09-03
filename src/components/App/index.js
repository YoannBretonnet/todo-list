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

    this.handleTaskStatusChange = this.handleTaskStatusChange.bind(this);
    this.handleTaskRemoval = this.handleTaskRemoval.bind(this);
    this.handleEditToggle = this.handleEditToggle.bind(this);
    this.handleTaskNameEdit = this.handleTaskNameEdit.bind(this);
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

  render() {
    return (
      <div className="app">
        <Tasks
          onTaskStatusChange={this.handleTaskStatusChange}
          onRemoveTask={this.handleTaskRemoval}
          onEditToggle={this.handleEditToggle}
          onTaskNameEdit={this.handleTaskNameEdit}
          />
      </div>
    );
  }
}

// == Export
export default App;
