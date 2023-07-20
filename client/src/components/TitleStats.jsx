import React from 'react'

function TitleStats({ focusedManager, cardData }) {
  return (
    <div className="row1">
        <div className="name-card">         
          <span className='team-name'>
            {focusedManager.team_name}
          </span>
          <span className='manager-name'>
            {focusedManager.manager_name}
          </span>
        </div>
        <div className="row2">
        {cardData.map((card, index) => (
          <div className="tiny-card" key={index}>
            <div className="main-data">{card.data}</div>
            <span className="data-description">{card.desc}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TitleStats