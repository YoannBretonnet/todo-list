import React from 'react';
import PropTypes from 'prop-types';

// si 0 tâches => Aucune tâche en cours
// si 1 tâche => J'ai une tâche en cours
// si N tâche => J'ai N tâches en cours
const getCounterText = (nbOngoing) => {
  if (nbOngoing === 0) {
    return 'Aucune tâche en cours';
  }
  if (nbOngoing === 1) {
    return `J'ai une tâche en cours`;
  }
  else {
  return `J'ai ${nbOngoing} tâches en cours`;
  };
};

function Counter({ nbOfOngoingTasks }) {
  return (
    <p className="counter">{getCounterText(nbOfOngoingTasks)}</p>
  );
}

Counter.propTypes = {
  nbOfOngoingTasks: PropTypes.number.isRequired,
};

// mémoïsation pour amenener de legeres optimisations de performance
export default React.memo(Counter);
