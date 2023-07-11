import React, { useState } from 'react';
import '../styles/MiniCard.css';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea, Link } from '@mui/material';


function MiniCard(props) {
  const [ hovered, setHovered ] = useState(false)

  function mouseEnter(e) {
    switch (e.currentTarget.id) {
      case props.title + '-card':
        setHovered(true)
        break;
      case 'card2':
        break;
      default:
        break;
    }
  }

  function mouseLeave(e) {
    switch (e.currentTarget.id) {
      case props.title + '-card':
        setHovered(false)
        break;
      case 'card2':
        break;
      default:
        break;
    }
  }

  return (
    <div className={`mini-card ${props.title}`}>
      <Card 
        id='mini-card' 
        onMouseEnter={(e) => mouseEnter(e)} 
        onMouseLeave={(e) => mouseLeave(e)} 
        sx={{ 
          borderRadius: '50px', 
          display: 'flex',
          color: 'white',
          height: '100%'
        }}
      >
        <CardActionArea>
            <CardContent 
              id='card-content'
              sx={{
                position: 'absolute',
              }}
            >
              <span id='card-title'>
                {props.title.toUpperCase()}
              </span>
              <Link id='qpl23' href='/qpl-standings' underline='none'>
                <span id='league-title'>
                  QPL '23
                </span>
                <span id='table-link'>
                  See Table
                </span>
              </Link>
              <Link id='qsc23' href='/qsc-standings' underline='none'>
                <span id='league-title'>
                  QSC '23
                </span>
              </Link>
            </CardContent>
        </CardActionArea>
      </Card>
    </div>
  )
}

export default MiniCard;