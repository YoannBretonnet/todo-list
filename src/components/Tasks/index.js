import PropTypes from 'prop-types';
import classNames from 'classnames';

function Tasks({
  taskList, onTaskStatusChange, onRemoveTask, onEditToggle, onTaskNameEdit,
}) {
  return (
    <ul className="list">
      {
        taskList.map((task) => (
          <li key={task.id}>
            <label className={classNames('list-item', { 'list-item--done': task.done })}>
              <input
                type="checkbox"
                checked={task.done}
                onChange={() => onTaskStatusChange(task.id)}
              />
              {/* si la tache est en édition, je vais afficher un input */}
              {task.editing && (
                <input
                  type="text"
                  value={task.label}
                  onChange={(event) => onTaskNameEdit(task.id, event.target.value)}
                />
              )}
              {/* sinon, j'affiche juste le label */}
              {!task.editing && task.label}
              <div>
                {/* quand je clique ici, j'active ou désactive le mode d'édition */}
                <button
                  className="list-item__iconbtn"
                  type="button"
                  onClick={() => onEditToggle(task.id)}
                >
                  ✍️
                </button>
                &nbsp;
                <button
                  className="list-item__iconbtn"
                  type="button"
                  onClick={() => onRemoveTask(task.id)}
                >
                  🗑️
                </button>
              </div>
            </label>
          </li>
        ))
      }
    </ul>
  );
}

Tasks.propTypes = {
  taskList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      label: PropTypes.string.isRequired,
      done: PropTypes.bool.isRequired,
    }),
  ).isRequired,
  onTaskStatusChange: PropTypes.func.isRequired,
  onRemoveTask: PropTypes.func.isRequired,
  onTaskNameEdit: PropTypes.func.isRequired,
  onEditToggle: PropTypes.func.isRequired,
};

export default Tasks;
