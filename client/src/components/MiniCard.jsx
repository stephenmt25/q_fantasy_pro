import React, { useState } from 'react';
import '../styles/MiniCard.css';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, Link } from '@mui/material';

// props = title

const descriptions =
  {
    leagues: 'League Tables and more information',
    awards: 'Awards for Manager of the Month and Hall of Famers'
  }

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
          height: '350px',
          display: 'flex',
          color: 'white'
        }}
      >
        <CardActionArea>
          {/* <Link href={props.linkTo} underline="none"> */}
            <CardMedia
              id='card-media'
              component="img"
              image={props.image}
              sx={{ 
                borderTopRadius: '50px', 
                maxHeight: '60%', 
                // display: `${hovered ? 'none' : 'block'}`,
                position: 'absolute',
                top: 0
              }}
            />
            <CardContent 
              id='card-content'
              sx={{
                position: 'absolute',
              }}
            >
              <Typography gutterBottom variant="h5" component="div">
                {props.title.toUpperCase()}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {descriptions[props.title]}
              </Typography>
            </CardContent>
          {/* </Link> */}
        </CardActionArea>
      </Card>
    </div>
  )
}

export default MiniCard;