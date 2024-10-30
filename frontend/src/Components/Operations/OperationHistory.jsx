import { Grid2, Grid, Box } from '@mui/material';
import React from 'react';
import style from './OperationHist.module.css'

const dummyHistory = [
    {
        date:'Сьогодні',
        transaction:[
            {
                senderNumber:'5375 1111 1111 1111',
                recieverNumber:'5252 8822 8133 7284',
                suma: -500,
                balance:1500,
                mode:'send'
            }
        ]
    },
    {
        date:'Вчора',
        transaction:[
            {
                senderNumber:'5252 8822 8133 7284',
                recieverNumber:'5375 1111 1111 1111',
                suma: 1000,
                balance:2000,
                mode:'get'
            },
        ]
    },
    {
        date:'20 жовтня',
        transaction:[
            {
                senderNumber:'5375 1111 1111 1111',
                recieverNumber:'5252 8822 8133 7284',
                suma: 1000,
                balance:1000,
                mode:'get'
            },
        ]
    }
]
const renderTransaction = (elem) => {
    return elem.mode === 'send' ?       
     <Grid container direction="row" alignItems="center" justifyContent="space-between">
        <Grid item xs={1} sm={1} md={1} lg={1} xl={1}>
           <img src={require('./assets/send.svg').default} alt="status"/>
        </Grid>
        <Grid item xs={10} sm={10} md={3} lg={3} xl={3}>
            <Grid container direction="column">
                <Box className={style.transaction__info}>
                    На рахунок:
                </Box>
                <Box className={style.transaction__info}>
                    {elem.recieverNumber}
                </Box>
            </Grid>
        </Grid>
        <Grid item xs={10} sm={10} md={3} lg={3} xl={3}>
            <Grid container direction="column">
                <Box className={style.transaction__info}>
                    З картки:
                </Box>
                <Box className={style.transaction__info}>
                    {elem.senderNumber}
                </Box>
            </Grid>
        </Grid>
        <Grid item xs={10} sm={10} md={3} lg={4} xl={5} className={style.transaction__money}>
            <Grid container direction="row">
                <Box className={style.transaction__money__text}>
                    СУМА:&nbsp;&nbsp;{elem.suma}&nbsp;UAH&nbsp;
                </Box>
                <Box className={style.transaction__money__text}>
                &nbsp;ЗАЛИШОК:&nbsp;&nbsp;{elem.balance}&nbsp;UAH&nbsp;
                </Box>
            </Grid>
        </Grid>
    </Grid>   
    :
    <Grid container direction="row" alignItems="center" justifyContent="space-between">
        <Grid item xs={1} sm={1} md={1} lg={1} xl={1}>
           <img src={require('./assets/receive.svg').default} alt="status"/>
        </Grid>
        <Grid item xs={10} sm={10} md={3} lg={3} xl={3}>
            <Grid container direction="column">
                <Box className={style.transaction__info}>
                    На картку:
                </Box>
                <Box className={style.transaction__info}>
                    {elem.recieverNumber}
                </Box>
            </Grid>
        </Grid>
        <Grid item xs={10} sm={10} md={3} lg={3} xl={3}>
            <Grid container direction="column">
                <Box className={style.transaction__info}>
                    З рахунку:
                </Box>
                <Box className={style.transaction__info}>
                    {elem.senderNumber}
                </Box>
            </Grid>
        </Grid>
        <Grid item xs={10} sm={10} md={3} lg={4} xl={5} className={style.transaction__money}>
            <Grid container direction="row">
                <Box className={style.transaction__money__text}>
                    СУМА:&nbsp;&nbsp;{elem.suma}&nbsp;UAH&nbsp;
                </Box>
                <Box className={style.transaction__money__text}>
                &nbsp;ЗАЛИШОК:&nbsp;&nbsp;{elem.balance}&nbsp;UAH&nbsp;
                </Box>
            </Grid>
        </Grid>
    </Grid>;
};
const History = () => {
    return(
        <Grid2 container className={style.main} direction={'column'}>
            <Grid2 item>
                <Box className={style.main__label}>
                    ОПЕРАЦІЇ
                </Box>
            </Grid2>
            <Grid2 item>
                {dummyHistory.map((elem, i) => {
                    return(
                        <Grid2 container direction={'column'}>
                            <Box className={style.date}>
                                {elem.date}
                            </Box>
                            <Grid2 item size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}>
                                {elem.transaction.map((elem)=>{
                                    return renderTransaction(elem)
                                })}
                            </Grid2>
                        </Grid2>
                    )
                })}
            </Grid2>
        </Grid2>
    )
} 
export default History