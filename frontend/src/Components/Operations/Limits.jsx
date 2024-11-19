import { Grid2, Grid, Box, Input, InputAdornment } from '@mui/material';
import React from 'react';
import style from './Limits.module.css'

const Limits = () => {
    const [ethernet, setEthernet] = React.useState(20000);
    const [cash, setCash] = React.useState(100000);
    const [card, setCard] = React.useState(50000);
    const [ethernetLimit, setEthernetLimit] = React.useState(20000);
    const [cashLimit, setCashLimit] = React.useState(100000);
    const [cardLimit, setCardLimit] = React.useState(50000);

    React.useEffect(()=>{
        update()
    })
    const update = () =>{
        setEthernetLimit(sessionStorage.getItem('ethernetLimit') || 20000)
        setCashLimit(sessionStorage.getItem('cashLimit') || 100000)
        setCardLimit(sessionStorage.getItem('cardLimit') || 50000)
    }

    const handleEthernet = (e) => {
        const input = e.target.value;
        if (/^\d*$/.test(input) && input.length <= 10) {
          setEthernet(input)
        }
    };
    const handleClickEthernet = () => {
        sessionStorage.setItem('ethernetLimit', ethernet);
    };   
    const handleCash = (e) => {
        const input = e.target.value;
        if (/^\d*$/.test(input) && input.length <= 10) {
          setCash(input)
        }
    };
    const handleClickCash = () => {
        sessionStorage.setItem('cashLimit', cash);
    };   
    const handleCard = (e) => {
        const input = e.target.value;
        if (/^\d*$/.test(input) && input.length <= 10) {
          setCard(input)
        }
    };
    const handleClickCard = () => {
        sessionStorage.setItem('cardLimit', card);
    };      
      

    return(
        <Grid2 container className={style.main} direction={'column'}>
            <Grid2 item>
                <Box className={style.main__label}>
                Налаштування Лімітів
                </Box>
            </Grid2>
            <Grid2 item sx={{marginTop:"20px"}}>
                <Grid container justifyContent={'center'} gap={5}>
                    <Grid item xs={10} sm={10} md={5} lg={5} xl={5} className={style.limit}>
                        <Grid container direction={'column'} justifyContent={'center'}>
                            <Box className={style.limit__label}>
                                Оплата в Інтернеті  
                            </Box>
                            <Box className={style.limit__secInfo}>
                                Доступно {ethernetLimit} з {ethernetLimit} UAH
                            </Box>
                            <Box className={style.limit__inputLabel}>
                                Новий ліміт
                            </Box>
                            <Input
                                disableUnderline
                                placeholder='10 000'
                                onChange={handleEthernet}
                                value={ethernet}
                                sx={{backgroundColor:"#4E4E4E", borderRadius:"28px", padding:"15px 26px", fontFamily: "Dela", color: "#B8B8B8", fontWeight: 400, fontSize: "20px", marginBottom:"20px"}}
                                endAdornment={<InputAdornment position="end">
                                    <Box sx={{ fontFamily: "Dela", color: "#B8B8B8", fontWeight: 400, fontSize: "20px" }}>
                                        UAH на день
                                    </Box>
                                </InputAdornment>}
                                aria-describedby="number"
                                inputProps={{
                                'aria-label': 'weight',
                                }}
                            />
                            <button className={style.limit__save} onClick={()=>handleClickEthernet()}>
                                Зберегти
                            </button>
                        </Grid>
                    </Grid>
                    <Grid item xs={10} sm={10} md={5} lg={5} xl={5} className={style.limit}>
                        <Grid container direction={'column'} justifyContent={'center'}>
                            <Box className={style.limit__label}>
                                Зняття готівки
                            </Box>
                            <Box className={style.limit__secInfo}>
                                Доступно {cashLimit} з {cashLimit} UAH
                            </Box>
                            <Box className={style.limit__inputLabel}>
                                Новий ліміт
                            </Box>
                            <Input
                                disableUnderline
                                placeholder='120 000'
                                onChange={handleCash}
                                value={cash}
                                sx={{backgroundColor:"#4E4E4E", borderRadius:"28px", padding:"15px 26px", fontFamily: "Dela", color: "#B8B8B8", fontWeight: 400, fontSize: "20px", marginBottom:"20px"}}
                                endAdornment={<InputAdornment position="end">
                                    <Box sx={{ fontFamily: "Dela", color: "#B8B8B8", fontWeight: 400, fontSize: "20px" }}>
                                        UAH на день
                                    </Box>
                                </InputAdornment>}
                                aria-describedby="number"
                                inputProps={{
                                'aria-label': 'weight',
                                }}
                            />
                            <button className={style.limit__save} onClick={()=>{handleClickCash()}}>
                                Зберегти
                            </button>
                        </Grid>
                    </Grid>
                    <Grid item xs={10} sm={10} md={5} lg={5} xl={5} className={style.limit}>
                        <Grid container direction={'column'} justifyContent={'center'}>
                            <Box className={style.limit__label}>
                                Переказ на картку
                            </Box>
                            <Box className={style.limit__secInfo}>
                                Доступно {cardLimit} з {cardLimit} UAH
                            </Box>
                            <Box className={style.limit__inputLabel}>
                                Новий ліміт
                            </Box>
                            <Input
                                disableUnderline
                                placeholder='40 000'
                                onChange={handleCard}
                                value={card}
                                sx={{backgroundColor:"#4E4E4E", borderRadius:"28px", padding:"15px 26px", fontFamily: "Dela", color: "#B8B8B8", fontWeight: 400, fontSize: "20px", marginBottom:"20px"}}
                                endAdornment={<InputAdornment position="end">
                                    <Box sx={{ fontFamily: "Dela", color: "#B8B8B8", fontWeight: 400, fontSize: "20px" }}>
                                        UAH на день
                                    </Box>
                                </InputAdornment>}
                                aria-describedby="number"
                                inputProps={{
                                'aria-label': 'weight',
                                }}
                            />
                            <button className={style.limit__save} onClick={()=>{handleClickCard()}}>
                                Зберегти
                            </button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid2>
        </Grid2>
    )
} 
export default Limits