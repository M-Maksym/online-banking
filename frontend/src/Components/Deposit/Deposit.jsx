import { Box, Input, Typography, InputAdornment, Grid, Modal } from '@mui/material';
import React from 'react';
import style from './Deposit.module.css';
import { ReactComponent as CardIcon } from './assets/card.svg';
import { ReactComponent as PhoneIcon } from './assets/phone.svg';
import { ReactComponent as IbanIcon } from './assets/iban.svg';
import { ReactComponent as EthernetIcon } from './assets/ethernet.svg';
import { ReactComponent as UaIcon } from './assets/ua.svg';
import { fontFamily } from '@mui/system';

function Deposit() {
    const [service, setService] = React.useState('');
    const [modalVisible, setModalVisible] = React.useState(false);
    const [opeationNumber, setOperationNumber] = React.useState();
    const [cardNumber, setCardNumber] = React.useState();
    const [phoneNumber, setPhoneNumber] = React.useState();
    const [iban, setIban] = React.useState();
    const [abonent, setAbonent] = React.useState();

    const handleService = (lable) =>{
        setService(lable);
        switch (lable){
            case 'Картка':
                setOperationNumber(cardNumber);
            break;
            case 'Номер телефону':
                setOperationNumber(phoneNumber)
            break;
            case 'Абонентський номер':
                setOperationNumber(abonent)
            break;
            case 'IBAN':
                setOperationNumber(iban)
            break;
            default:
                console.log('Shoto ne to')
        }

        setModalVisible(true);
    }
    const handleOperationInput = (e) => {
        const input = e.target.value;
    
        switch (service) {
            case 'Картка': {
                const onlyNumbers = input.replace(/\D/g, '');
                const maxLength = 16;
                if (onlyNumbers.length <= maxLength) {
                    setOperationNumber(onlyNumbers);
                }
                break;
            }
            case 'Номер телефону': {
                const formattedPhone = input.replace(/\D/g, '');
                const maxPhoneLength = 12;
                if (formattedPhone.length <= maxPhoneLength) {
                    setOperationNumber(formattedPhone);
                }
                break;
            }
            case 'Абонентський номер': {
                const formattedAbonent = input.replace(/\D/g, '');
                const maxAbonentLength = 10;
                if (formattedAbonent.length <= maxAbonentLength) {
                    setOperationNumber(formattedAbonent);
                }
                break;
            }
            case 'IBAN': {
                const formattedIBAN = input.toUpperCase().replace(/[^A-Z0-9]/g, '');
                const maxIbanLength = 34;
                if (formattedIBAN.length <= maxIbanLength) {
                    setOperationNumber(formattedIBAN);
                }
                break;
            }
            default:
                console.log('Shoto ne to');
        }
    };
    
    const handleCardNumber = (e) => {
        const input = e.target.value;
        const onlyNumbers = input.replace(/\D/g, '');
        const maxLength = 16;
    
        if (onlyNumbers.length <= maxLength) {
            setCardNumber(onlyNumbers); 
        }
    };
    const handlePhoneNumber = (e) => {
        const input = e.target.value;
        const onlyNumbers = input.replace(/\D/g, '');
        const maxLength = 9;
    
        if (onlyNumbers.length <= maxLength) {
            setPhoneNumber(onlyNumbers); 
        }
    };
    const handleIbanNumber = (e) => {
        const input = e.target.value;
        const ibanPattern = /^[A-Z0-9]*$/;
        const formattedInput = input.toUpperCase().replace(/[^A-Z0-9]/g, ''); 
        const maxLength = 34; 

        if (formattedInput.length <= maxLength && ibanPattern.test(formattedInput)) {
            setIban(formattedInput); 
        }
    };
    const handleAbonent = (e) => {
        const input = e.target.value;
        const onlyNumbers = input.replace(/\D/g, '');
        setAbonent(onlyNumbers); 
    };
    const closeModal = () => {
        setModalVisible(false)
    }

    return (
        <Grid container direction="row" justifyContent={'space-around'} sx={{width:"100%"}}>
            <Grid item sm={12} md={5} lg={5} xl={5} style={{marginTop:"100px"}}>
                <Grid container direction="column" className={style.card}>
                    <Grid item>
                        <Grid container direction="row" alignItems="center" spacing={1} style={{marginBottom:"60px"}}>
                            <Grid item>
                                <Box className={style.card__ico__card}>
                                    <CardIcon style={{ width: '50px', height: '50px' }} />
                                </Box>
                            </Grid>
                            <Grid item>
                                <Typography className={style.card__name__shortdecription}>Переказ на картку</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Grid container direction="row" alignItems="center" spacing={1}>
                            <Grid item className={style.input__width}>
                                <Input
                                disableUnderline
                                value={cardNumber}
                                onChange={handleCardNumber}
                                    sx={{
                                        backgroundColor: "transparent",
                                        width:"100%",
                                        padding: "10px 14px",
                                        fontFamily: "Dela",
                                        color: "#FFF",
                                        fontWeight: 400,
                                        fontSize: "26px",
                                        marginBottom: "20px",
                                        borderBottom:"1px solid #CAC4D0"
                                    }}
                                    
                                    aria-describedby="number"
                                    inputProps={{
                                        'aria-label': 'weight',
                                    }}
                                />
                            </Grid>
                            <Grid item onClick={()=>handleService('Картка')} style={{cursor:"pointer"}}>
                                <img src={require('./assets/arrow.png')}  style={{width:"60px", height:"60px"}}/>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Typography className={style.card__description}>
                            VISA/MasterCard українських та закордонних банків
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item sm={12} md={5} lg={5} xl={5} style={{marginTop:"100px"}}>
                <Grid container direction="column" spacing={2} className={style.card}>
                    <Grid item>
                        <Grid container direction="row" alignItems="center" spacing={1} style={{marginBottom:"60px"}}>
                            <Grid item>
                                <Box className={style.card__ico__phone}>
                                    <PhoneIcon style={{ width: '50px', height: '50px' }} />
                                </Box>
                            </Grid>
                            <Grid item>
                                <Typography className={style.card__name__shortdecription}>Поповнення мобільного</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Grid container direction="row" alignItems="center" spacing={1}>
                            <Grid item className={style.input__width}>
                                <Input
                                disableUnderline
                                value={phoneNumber}
                                onChange={handlePhoneNumber}
                                    sx={{
                                        backgroundColor: "transparent",
                                        
                                        padding: "10px 14px",
                                        fontFamily: "Dela",
                                        color: "#FFF",
                                        fontWeight: 400,
                                        fontSize: "26px",
                                        marginBottom: "20px",
                                        borderBottom:"1px solid #CAC4D0"
                                    }}
                                    startAdornment={
                                        <InputAdornment position="start">
                                            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center" }}>
                                                <UaIcon style={{ width: "55px", height: "45px" }} />
                                                <Typography sx={{
                                                    fontFamily: "Dela",
                                                    color: "#FFF",
                                                    fontWeight: 400,
                                                    fontSize: "26px",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    textAlign: "center"
                                                }}>
                                                    +380 |
                                                </Typography>
                                            </Box>
                                        </InputAdornment>
                                    }
                                    aria-describedby="number"
                                    inputProps={{
                                        'aria-label': 'weight',
                                    }}
                                />
                            </Grid>
                            <Grid item onClick={()=>handleService('Номер телефону')} style={{cursor:"pointer"}}>
                                <img src={require('./assets/arrow.png')}  style={{width:"60px", height:"60px"}}/>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Typography className={style.card__description}>
                            
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item sm={12} md={5} lg={5} xl={5} style={{marginTop:"100px"}}>
                <Grid container direction="column" spacing={2} className={style.card}>
                    <Grid item>
                        <Grid container direction="row" alignItems="center" spacing={1} style={{marginBottom:"60px"}}>
                            <Grid item>
                                <Box className={style.card__ico__iban}>
                                    <IbanIcon style={{ width: '50px', height: '50px' }} />
                                </Box>
                            </Grid>
                            <Grid item>
                                <Typography className={style.card__name__shortdecription}>Платіж за IBAN</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Grid container direction="row" alignItems="center" spacing={1}>
                            <Grid item className={style.input__width}>
                                <Input
                                disableUnderline
                                value={iban}
                                onChange={handleIbanNumber}
                                    sx={{
                                        backgroundColor: "transparent",
                                        width:"100%",
                                        padding: "10px 14px",
                                        fontFamily: "Dela",
                                        color: "#FFF",
                                        fontWeight: 400,
                                        fontSize: "26px",
                                        marginBottom: "20px",
                                        borderBottom:"1px solid #CAC4D0"
                                    }}
                                    
                                    aria-describedby="number"
                                    inputProps={{
                                        'aria-label': 'weight',
                                    }}
                                />
                            </Grid>
                            <Grid item onClick={()=>handleService('IBAN')} style={{cursor:"pointer"}}>
                                <img src={require('./assets/arrow.png')}  style={{width:"60px", height:"60px"}}/>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Typography className={style.card__description}>
                            IBAN, ЄДРПОУ, номер р/рахунку або назва одержувача
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item sm={12} md={5} lg={5} xl={5} style={{marginTop:"100px"}}>
                <Grid container direction="column" spacing={2} className={style.card}>
                    <Grid item>
                        <Grid container direction="row" alignItems="center" spacing={1} style={{marginBottom:"60px"}}>
                            <Grid item>
                                <Box className={style.card__ico__eth}>
                                    <EthernetIcon style={{ width: '50px', height: '50px' }} />
                                </Box>
                            </Grid>
                            <Grid item>
                                <Typography className={style.card__name__shortdecription}>Оплата інтернету/ТБ</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Grid container direction="row" alignItems="center" spacing={1}>
                            <Grid item className={style.input__width}>
                                <Input
                                disableUnderline
                                value={abonent}
                                onChange={handleAbonent}
                                    sx={{
                                        backgroundColor: "transparent",
                                        width:"100%",
                                        padding: "10px 14px",
                                        fontFamily: "Dela",
                                        color: "#FFF",
                                        fontWeight: 400,
                                        fontSize: "26px",
                                        marginBottom: "20px",
                                        borderBottom:"1px solid #CAC4D0"
                                    }}
                                    
                                    aria-describedby="number"
                                    inputProps={{
                                        'aria-label': 'weight',
                                    }}
                                />
                            </Grid>
                            <Grid item onClick={()=>handleService('Абонентський номер')} style={{cursor:"pointer"}}>
                                <img src={require('./assets/arrow.png')}  style={{width:"60px", height:"60px"}}/>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Typography className={style.card__description}>
                            Ваш абонентський номер, за яким сплачуєте за інтернет/ТБ.
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
            <Modal
                open={modalVisible}
                onClose={closeModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box className={style.modal}>
                    <Box className={style.close} onClick={()=>closeModal()}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="45"
                            height="45"
                            viewBox="0 0 45 45"
                            fill="none"
                            stroke="#C9700A"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            >
                            <line x1="10" y1="10" x2="35" y2="35" />
                            <line x1="10" y1="35" x2="35" y2="10" />
                        </svg>
                    </Box>
                    <Box className={style.transaction}>
                        <Typography className={style.transaction__lable}>
                            З картки
                        </Typography>
                        <Grid container justifyContent={'space-between'} direction={'row'} className={style.selectedCard}>
                            <Grid item style={{width:"120px"}}>
                                <img src={require('./assets/card.png')} style={{width:"120px"}}/>
                            </Grid>
                            <Grid item>
                                <Grid container direction={'column'}>
                                    <Typography sx={{
                                                    fontFamily: "Dela",
                                                    color: "#FFF",
                                                    fontWeight: 400,
                                                    fontSize: "20px"
                                                }}>
                                    Картка 5152 **** **** 7284
                                    </Typography>
                                    <Box sx={{display:"flex", alignItems:"center", justifyContent:"space-between"}}>
                                    <img src={require('./assets/master.png')} style={{width:"90px"}}/>
                                    <Typography sx={{
                                                    fontFamily: "Dela",
                                                    color: "#FFF",
                                                    fontWeight: 400,
                                                    fontSize: "28px"
                                                }}
                                    >
                                        ₴2000000
                                    </Typography>
                                    </Box>
                                    <Box sx={{display:"flex", alignItems:"center", justifyContent:"space-between", marginTop:"20px"}}>
                                        <Typography
                                            sx={{
                                                fontFamily: "Dela",
                                                color: "#FFF",
                                                fontWeight: 400,
                                                fontSize: "28px"
                                            }}
                                        >
                                            Змінити картку 
                                        </Typography>
                                        <svg width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="14.5" cy="14.5" r="14.5" fill="#282828"/>
                                        <path d="M14.2929 20.7071C14.6834 21.0976 15.3166 21.0976 15.7071 20.7071L22.0711 14.3431C22.4616 13.9526 22.4616 13.3195 22.0711 12.9289C21.6805 12.5384 21.0474 12.5384 20.6569 12.9289L15 18.5858L9.34315 12.9289C8.95262 12.5384 8.31946 12.5384 7.92893 12.9289C7.53841 13.3195 7.53841 13.9526 7.92893 14.3431L14.2929 20.7071ZM14 9V20H16V9H14Z" fill="white"/>
                                        </svg>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Typography className={style.transaction__lable}>
                            Одержувач
                        </Typography>
                        <Box sx={{marginBottom: "20px",borderRadius:"30px", padding:"20px 30px", backgroundColor: "#827E7E",}}>
                        <Input
                            placeholder={service}
                            value={opeationNumber}
                            onChange={handleOperationInput}
                            disableUnderline
                                    sx={{
                                        backgroundColor: "#827E7E",
                                        width:"100%",
                                        fontFamily: "Dela",
                                        color: "#373535",
                                        fontWeight: 400,
                                        fontSize: "32px",
                                        borderBottom:"2px solid #CAC4D0"
                                    }}
                                    
                                    aria-describedby="number"
                                    inputProps={{
                                        'aria-label': 'weight',
                                    }}
                        />
                        </Box>
                        
                        <Typography className={style.transaction__lable}>
                            Сума
                        </Typography>
                        <Box sx={{marginBottom: "20px",borderRadius:"30px", padding:"20px 30px", backgroundColor: "#827E7E", flexDirection:'row', flexWrap:"nowrap", display:"flex"}}>
                            <Input
                                placeholder='00.00'
                                disableUnderline
                                        sx={{
                                            backgroundColor: "#827E7E",
                                            width:"80%",
                                            fontFamily: "Dela",
                                            color: "#373535",
                                            fontWeight: 400,
                                            fontSize: "32px",
                                            borderBottom:"2px solid #CAC4D0"
                                        }}
                                        
                                        aria-describedby="number"
                                        inputProps={{
                                            'aria-label': 'weight',
                                        }}
                            />
                            <Box sx={{borderBottom:"2px solid #CAC4D0", display:"flex", alignItems:"center", justifyContent:"space-between", marginLeft:"10px"}}>
                                <Typography sx={{fontFamily:"Dela", fontSize:"32px", fontWeight:400, color:"#373535"}}>
                                    UAH
                                </Typography>
                                <svg width="18" height="9" viewBox="0 0 18 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9 9L0.339745 0.75L17.6603 0.75L9 9Z" fill="#373535"/>
                                </svg>

                            </Box>
                        </Box>
                        <Box sx={{width:"100%", display:"flex", justifyContent:"center", marginTop:"30px"}}>
                        <button className={style.sendBtn} onClick={()=>closeModal()}>Надіслати</button>
                        </Box>
                    </Box>
                    
                </Box>
            </Modal>
        </Grid>
    );
}

export default Deposit;
