import React from 'react'
import {Grid2 as Grid, Box, Modal, Typography} from '@mui/material'
import style from './Operation.module.css'
import Card from './Card'
import Switch from '@mui/material/Switch';
import { styled } from '@mui/material/styles';
import History from './OperationHistory'
import Limits from './Limits'
const BankSwitch = styled((props) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 50,
  height: 30,
  padding: 0,
  '& .MuiSwitch-switchBase': {
    padding: 0,
    margin: 2,
    transitionDuration: '300ms',
    '&.Mui-checked': {
      transform: 'translateX(20px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        backgroundColor: '#C9700A',
        opacity: 1,
        border: 0,
        ...theme.applyStyles('dark', {
          backgroundColor: '#C9700A',
        }),
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: 0.5,
      },
    },
    '&.Mui-focusVisible .MuiSwitch-thumb': {
      color: '#33cf4d',
      border: '6px solid #fff',
    },
    '&.Mui-disabled .MuiSwitch-thumb': {
      color: theme.palette.grey[100],
      ...theme.applyStyles('dark', {
        color: theme.palette.grey[600],
      }),
    },
    '&.Mui-disabled + .MuiSwitch-track': {
      opacity: 0.7,
      ...theme.applyStyles('dark', {
        opacity: 0.3,
      }),
    },
  },
  '& .MuiSwitch-thumb': {
    boxSizing: 'border-box',
    width: 26,
    height: 26,
  },
  '& .MuiSwitch-track': {
    borderRadius: 30 / 2,
    backgroundColor: '#E9E9EA',
    opacity: 1,
    transition: theme.transitions.create(['background-color'], {
      duration: 500,
    }),
    ...theme.applyStyles('dark', {
      backgroundColor: '#39393D',
    }),
  },
}));



const Operations = () => {
  const [activeTab, setActiveTab] = React.useState(0);
  const [success, setSuccess] = React.useState(false);
  const [cardOperationModal, setCardOperationModal] = React.useState(false);
  const [cardOperationText, setCardOperationText] = React.useState('Чи справді Ви бажаєте видалити картку?');
  const changeActiveTab = (i) =>{
    setActiveTab(i)
  }
  const closeTransInfo = () => {
    setSuccess(false)
}
const closeCardInfo = () => {
  setCardOperationModal(false)
}
const cardOperation = (lable) =>{
  setCardOperationText(lable);
  setCardOperationModal(true);
}
const sendRequest = () => {
  setSuccess(true);
  setCardOperationModal(false);
  const timer = setTimeout(() => setSuccess(false), 5000);
  return () => clearTimeout(timer);
}
  return (
    <Grid container direction={'row'} justifyContent={'space-around'} style={{marginTop:"77px", marginBottom:"60px"}}>
      <Grid item size={{ xs: 10, sm: 10, md: 4, lg: 4, xl: 3 }} className={style.main}>
        <Grid container direction={'column'} justifyContent={'center'}>
          <Card balance={2000000} number={'5252 8822 8133 7284'} date={'09/25'} brand={require('./assets/mastercard.svg').default} />
          <img src={require('./assets/arrowDown.svg').default} alt='arrowDown'  className={style.arrowDown}/>
          <Grid item justifyContent={'center'}>
            <Grid container justifyContent={'space-between'}>
              <button className={activeTab === 0 ? style.operationBtnActive : style.operationBtn} onClick={() => changeActiveTab(0)}>
              Історія транзакцій
              </button>
              <button className={activeTab === -1 ? style.operationBtnActive : style.operationBtn} onClick={() => changeActiveTab(-1)}>
              Створити картку
              </button>
            </Grid>
            <Grid container direction={'row'} justifyContent={'space-between'} gap={1} style={{marginTop:"11px"}}>
              <Grid item size={{ xs: 5, sm: 5, md: 5, lg: 5, xl: 5 }}>
                <button className={activeTab === 1 ? style.operationBtnActive : style.operationBtn} onClick={() => changeActiveTab(1)}>
                  Поповнити
                </button>
              </Grid>
              <Grid item size={{ xs: 5, sm: 5, md: 5, lg: 5, xl: 5 }}>
                <button className={activeTab === 2 ? style.operationBtnActive : style.operationBtn} onClick={() => cardOperation('Чи справді Ви бажаєте видалити картку?')}>
                  Видалити картку
                </button>
              </Grid>
              <Grid item size={{ xs: 5, sm: 5, md: 5, lg: 5, xl: 5 }}>
                <button className={activeTab === 3 ? style.operationBtnActive : style.operationBtn} onClick={() => cardOperation('Чи справді Ви бажаєте заблокувати картку?')}>
                  Заблокувати картку
                </button>
              </Grid>
              <Grid item size={{ xs: 5, sm: 5, md: 5, lg: 5, xl: 5 }}>
                <button className={activeTab === 4 ? style.operationBtnActive : style.operationBtn} onClick={() => changeActiveTab(4)}>
                  Налаштування лімітів
                </button>
              </Grid>
            </Grid>
          </Grid>
          <Box className={style.limit}>
            ЛІМІТИ
          </Box>
          <Grid container direction={'row'} alignItems={'center'} justifyContent={'space-between'} className={style.option}>
            <Grid item>
              <Grid container direction={'column'}>
                <Box className={style.main__option}>
                  Оплата в інтернеті
                </Box>
                <Box className={style.main__option}>
                  Доступно: 20 000 UAH на день
                </Box>
              </Grid>
            </Grid>
            <Grid item>
              <BankSwitch sx={{ m: 1 }} defaultChecked />
            </Grid>
          </Grid>
          <Grid container direction={'row'} alignItems={'center'} justifyContent={'space-between'} className={style.option}>
            <Grid item>
              <Grid container direction={'column'}>
                <Box className={style.main__option}>
                  Зняття готівки
                </Box>
                <Box className={style.main__option}>
                  Доступно: 100 000 UAH на день
                </Box>
              </Grid>
            </Grid>
            <Grid item>
              <BankSwitch sx={{ m: 1 }} defaultChecked />
            </Grid>
          </Grid>
          <Grid container direction={'row'} alignItems={'center'} justifyContent={'space-between'} className={style.optionLast}>
            <Grid item>
              <Grid container direction={'column'}>
                <Box className={style.main__option}>
                  Переказ на картку
                </Box>
                <Box className={style.main__option}>
                  Доступно: 50 000 UAH на день
                </Box>
              </Grid>
            </Grid>
            <Grid item>
              <BankSwitch sx={{ m: 1 }} defaultChecked />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item size={{ xs: 12, sm: 12, md: 8, lg: 7, xl: 8 }}>
        {activeTab === 0 && <History />}
        {activeTab === 4 && <Limits />}
      </Grid>
      <Modal
            open={cardOperationModal}
            onClose={closeCardInfo}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            sx={{backdropFilter:"blur(3px)"}}
            >
                <Box className={style.modal}>
                    <Typography className={style.modal__text}>{cardOperationText}</Typography>
                    <Box className={style.modal__variant}>
                      <Box className={style.modal__variant__choice} onClick={()=>sendRequest()}>
                        <img src={require('./assets/yes.png')} alt='successs' style={{width:"190px", marginRight:"6px"}}/>
                        <Typography className={style.modal__variant__choice__text}>Так</Typography>
                      </Box>
                      <Box className={style.modal__variant__choice} onClick={()=>closeCardInfo()}>
                        <img src={require('./assets/no.png')} alt='successs' style={{width:"150px", marginRight:"46px"}}/>
                        <Typography className={style.modal__variant__choice__text}>Ні</Typography>
                      </Box>
                    </Box>
                </Box>
        </Modal>
      <Modal
            open={success}
            onClose={closeTransInfo}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
                <Box className={style.modalSuccess}>
                    <Box style={{width:"120px"}}>
                        <img src={require('./assets/success.png')} alt='successs' style={{width:"120px"}}/>
                    </Box>
                    <h1 className={style.successText}>Успішно</h1>
                </Box>
            </Modal>
    </Grid>
  )
}

export default Operations