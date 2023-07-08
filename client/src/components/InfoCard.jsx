import React from 'react';
import './InfoCard.css';

function ManagerInfoBox({ focusedManager, rank, onClose, showInfo }) {
  return (
    <div className={`info-box ${showInfo ? 'show' : ''}`}>
      <button className="close-button" onClick={onClose()}>
        X
      </button>
      <h2>{focusedManager.player_name}</h2>
      <p>Team Name: {focusedManager.entry_name}</p>
      <p>Total Points: {focusedManager.total}</p>
      <p>QPL Rank: {rank + 1}</p>
    </div>
  );
}

export default ManagerInfoBox;