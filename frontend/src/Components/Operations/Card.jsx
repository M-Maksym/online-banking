import React from 'react'
import {Box, Grid2 as Grid} from '@mui/material'
import style from './Operation.module.css'

const Card = ({balance, number, date, brand}) => {
  return (
    <Grid container direction={'column'} className={style.card} alignItems={'space-between'}>
      <Grid item>
        <Grid container direction={'row'} justifyContent={'space-between'} alignItems={'flex-start'}>
          <Grid container direction={'column'}>
            <Box className={style.balance}>
              Баланс
            </Box>
            <Box className={style.balanceNumber}>
            ₴{balance}
            </Box>
          </Grid>
          <Grid container>
            <img src={brand} alt="brand" />
          </Grid>
        </Grid>
      </Grid>
      <Grid item className={style.addInfo}>
        <Grid container justifyContent={'space-between'} direction={'row'}>
          <Box className={style.card__infoNumber}>
            {number}
          </Box>
          <Box className={style.card__infoDate}>
            {date}
          </Box>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default Card