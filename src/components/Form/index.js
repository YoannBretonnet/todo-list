import PropTypes from 'prop-types';

function Form({ newTaskInput, onInputChange, onTaskSubmit }) {
  return (
    <form
      className="form"
      onSubmit={onTaskSubmit}
    >
      <input
        type="text"
        className="form-item"
        placeholder="Ajouter une tâche"
        value={newTaskInput}
        onChange={onInputChange}
      />
    </form>
  );
}

Form.propTypes = {
  newTaskInput: PropTypes.string.isRequired,
  onInputChange: PropTypes.func.isRequired,
  onTaskSubmit: PropTypes.func.isRequired,
};

export default Form;
