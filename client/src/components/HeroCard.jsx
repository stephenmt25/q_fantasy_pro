import React, { useState } from 'react';
import '../styles/HeroCard.css';
import { Card, Typography, Grid, IconButton, Stack } from '@mui/material/';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Pagination from '@mui/material/Pagination';

//temp data
const DATA = [
  {
    value: '76',
    title: 'QPL Average',
    page: 0
  },
  {
    value: '67',
    title: 'Overall Average ',
    page: 1
  },
  {
    value: '89',
    title: 'Highest Points',
    page: 2
  },
  {
    value: '26',
    title: 'Harry Kane',
    page: 3
  },
];
const page = 0;

function HeroCard() {
  const [ currentPage, setCurrentPage ] =  useState(page);
  const [ direction, setDirection ] =  useState(false);

  const goRight = () => {
    setDirection('goRight')
   }
 
  const goLeft = () => {
    setDirection('goLeft')
  }

  const Cards = (DATA, currentPage) => {
    return (
      <>
        <Typography variant='h1' sx={{
          position: 'relative',
          scale: '1.8', //add scale to envoke overlap
          // top: {
          //   xs: '0px', //adjust position with left and top 
          //   md: '120px'
          // },
          // left: {
          //   md: '100px' 
          // }
          }}
          className={[
            (currentPage === DATA.page && direction) ? direction : '',
            (currentPage === DATA.page ? 'show' : 'hide')
          ]}
        >
          {DATA.value}
        </Typography>
        <Typography variant='h6' sx={{ 
            color: 'white',
            position: 'relative', 
            left: {
              xs: '0px', //adjust position with left and top
              md: '20px'
            },
            top: {
              xs: '100px',
              md: '100px'
            }
          }}
          className={[
            (currentPage === DATA.page && direction) ? direction : '',
            (currentPage === DATA.page ? 'show' : 'hide')
          ]}
        >
          {DATA.title}
        </Typography>
      </>  
    )
  }

  return (
    <div className="hero-card">
      <div 
        className='left-click'
        onClick={() => {
            setCurrentPage(currentPage === 0 ? currentPage : currentPage - 1)
            goLeft()
          }
        } 
      >
        <IconButton 
          aria-label="previous"
          sx={{ 
            opacity: currentPage === 0 ? 0 : 1,
            width: '100%' 
          }}
        >
          <ArrowBackIosIcon />
        </IconButton>
      </div>
      
      <Stack sx={{
          flexDirection: {
            xs: 'column',
            md: 'row',
          },
          justifyContent: {
            xs: 'center',
            md: 'flex-end', // theme.breakpoints.up('md')
          }, 
          alignItems: {
            xs: 'center',
            md: 'flex-start', // theme.breakpoints.up('md')
          }, 
        }}
      >
        {DATA.map(item => Cards(item, currentPage))}
      </Stack>

      <div 
        className='right-click'
        onClick={() => {
            setCurrentPage( currentPage === DATA.length - 1 ? currentPage : currentPage + 1)
            goRight()
          }
        } 
      >
        <IconButton 
          aria-label="next"
          sx={{ 
            opacity: currentPage === DATA.length - 1 ? 0 : 1,
            width: '100%' 
          }}
        >
          <ArrowForwardIosIcon/>
        </IconButton>
      </div>
      <Pagination 
        className='Pagination'
        count={DATA.length} 
        hidePrevButton 
        hideNextButton 
        page={currentPage + 1} 
        renderItem={(item) => (
          <button
              key={item.page}
              className={item.selected ? 'dot-active' : 'dot'}
          />
        )}
      />

    </div>
  );
}

export default HeroCard;