import { Grid2, Grid, Box, Input, InputAdornment } from '@mui/material';
import React from 'react';
import style from './Limits.module.css'

const Limits = () => {
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
                                Доступно 20 000 з 20 000 UAH
                            </Box>
                            <Box className={style.limit__inputLabel}>
                                Новий ліміт
                            </Box>
                            <Input
                                disableUnderline
                                placeholder='10 000'
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
                            <button className={style.limit__save}>
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
                                Доступно 100 000 з 100 000 UAH
                            </Box>
                            <Box className={style.limit__inputLabel}>
                                Новий ліміт
                            </Box>
                            <Input
                                disableUnderline
                                placeholder='120 000'
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
                            <button className={style.limit__save}>
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
                                Доступно 50 000 з 50 000 UAH
                            </Box>
                            <Box className={style.limit__inputLabel}>
                                Новий ліміт
                            </Box>
                            <Input
                                disableUnderline
                                placeholder='40 000'
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
                            <button className={style.limit__save}>
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