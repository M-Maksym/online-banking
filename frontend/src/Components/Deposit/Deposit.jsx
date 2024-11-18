import { Box, Input, Typography, InputAdornment, Grid, Modal} from '@mui/material';
import React from 'react';
import style from './Deposit.module.css';
import { ReactComponent as CardIcon } from './assets/card.svg';
import { ReactComponent as PhoneIcon } from './assets/phone.svg';
import { ReactComponent as IbanIcon } from './assets/iban.svg';
import { ReactComponent as EthernetIcon } from './assets/ethernet.svg';
import { ReactComponent as UaIcon } from './assets/ua.svg';

function Deposit() {
    const [service, setService] = React.useState('');
    const [modalVisible, setModalVisible] = React.useState(false);
    const [opeationNumber, setOperationNumber] = React.useState();
    const [cardNumber, setCardNumber] = React.useState();
    const [phoneNumber, setPhoneNumber] = React.useState();
    const [iban, setIban] = React.useState();
    const [abonent, setAbonent] = React.useState();
    const [success, setSuccess] = React.useState(false);
    const [money, setMoney] = React.useState(); 
    const [cards, setCards] = React.useState([]);
    const [activeCards, setActiveCards] = React.useState(0);  
    const [error, setError] = React.useState(''); 
    
    //download info about cards
    React.useEffect(() => {
        const fetchCards = async () => {
            const token = localStorage.getItem('loginToken');
            try {
                const response = await fetch('http://localhost:3001/api/cards-customer', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                });
                
                if (response.ok) {
                    const data = await response.json();
                    setCards(data);
                } else {
                    console.error('Помилка:', response.statusText);
                }
            } catch (e) {
                console.error('Сталася помилка:', e);
            }
        };
    
        fetchCards();
    }, []);
    
    //dispalying balance
    const CardDisplay = ({ cardNumber }) => {
        const maskCardNumber = (number) => {
          if (!number) return '';
          const firstDigits = number.slice(0, 4);
          const lastDigits = number.slice(-4);
          const maskedSection = number.slice(4, -4).replace(/\d/g, '*');
          return `${firstDigits} ${maskedSection} ${lastDigits}`;
        };
      
        return <div>Картка {maskCardNumber(cardNumber)}</div>;
      };
    //function when user want change card
    const handleActiveCard = () =>{
        const numberOfCards = cards?.length;
        if(activeCards === numberOfCards-1){
            setActiveCards(0)
        }else{
            setActiveCards(activeCards+1)
        }
    }
    //when user click on airplane and we handle lable for modal windows
    const handleService = (lable) =>{
        setService(lable);
        switch (lable){
            case 'Картка':
                setOperationNumber(cardNumber);
            break;
            case 'Номер телефону':
                setOperationNumber(`380${phoneNumber}`)
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
    const handleMoney = (e) => {
        const value = e.target.value;
        const regex = /^[0-9]*\.?[0-9]*$/;
    
        if (regex.test(value)) {
            setMoney(value);
        }
    };
    
    const handleOperationInput = (e) => {
        let input = e.target.value;
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
                const maxLength = 34;
                input = input.toUpperCase();
                input = input.replace(/[^A-Z0-9]/g, '');
            
                if (input.length > 0 && /^[0-9]/.test(input)) {
                    input = input.replace(/^[0-9]+/, '');
                }
            
                const ibanPattern = /^[A-Z]{0,2}[0-9]*$/;
            
                if (input.length <= maxLength && ibanPattern.test(input)) {
                    if (input.length <= 2) {
                        if (/^[A-Z]*$/.test(input)) {
                            setOperationNumber(input);
                            e.target.value = input;
                        }
                    } else {
                        if (/^[A-Z]{2}[0-9]*$/.test(input)) {
                            setOperationNumber(input);
                            e.target.value = input;
                        }
                    }
                } else {
                    const correctedInput = input.slice(0, -1);
                    setOperationNumber(correctedInput);
                    e.target.value = correctedInput;
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
        let input = e.target.value.toUpperCase();
        const maxLength = 34;
    
        input = input.replace(/[^A-Z0-9]/g, '');
    
        if (input.length > 0 && /^[0-9]/.test(input)) {
            input = input.replace(/^[0-9]+/, '');
        }
    
        const ibanPattern = /^[A-Z]{0,2}[0-9]*$/;
    
        if (input.length <= maxLength && ibanPattern.test(input)) {
            if (input.length <= 2) {
                if (/^[A-Z]*$/.test(input)) {
                    setIban(input);
                    e.target.value = input;
                }
            } else {
                if (/^[A-Z]{2}[0-9]*$/.test(input)) {
                    setIban(input);
                    e.target.value = input;
                }
            }
        } else {
            const correctedInput = input.slice(0, -1);
            setIban(correctedInput);
            e.target.value = correctedInput;
        }
    }; 
    
    const handleAbonent = (e) => {
        const input = e.target.value;
        const onlyNumbers = input.replace(/\D/g, '');
        if(onlyNumbers.length <= 5){
            setAbonent(onlyNumbers); 
        }
        
    };
    const closeModal = () => {
        setModalVisible(false)
    }
    //function when user click on send
    const sendTransaction = async () => {
        //not sent if haven`t enough number
        switch (service) {
            case 'Картка': {
                const maxLength = 16;
                if (opeationNumber.length < maxLength) {
                    setError('Помилка, введена недостатня кілкість символів');
                    return;
                }
                break;
            }
            case 'Номер телефону': {
                const maxLength = 12;
                if (opeationNumber.length < maxLength) {
                    setError('Помилка, введена недостатня кілкість символів');
                    return;
                }
                break;
            }
            case 'Абонентський номер': {
                const maxLength = 10;
                if (opeationNumber.length < maxLength) {
                    setError('Помилка, введена недостатня кілкість символів');
                    return;
                }
                break;
            }
            case 'IBAN': {
                const maxLength = 34;
                if (opeationNumber.length < maxLength) {
                    setError('Помилка, введена недостатня кілкість символів');
                    return;
                }
                break;
            }
            default:
                console.log('Shoto ne to');
        }
        if (money && opeationNumber) {
            const operationType = service === 'Картка' ? 'Transfer' : 'Payment';
            const requestBody = {
                type: operationType,
                amount: money,
                senderCardNumber: cards[activeCards].number,
                destination: opeationNumber
            };
            const token = localStorage.getItem('loginToken')
            try {

                const response = await fetch('http://localhost:3001/api/transactions', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify(requestBody)
                });
    
                if (response.ok) {
                    closeModal();
                    setSuccess(true);
                    setError('')
                    const timer = setTimeout(() => setSuccess(false), 3000);
                    return () => clearTimeout(timer);
                } else {
                    setError("Помилка при відправці транзакції")
                    console.error('Помилка при відправці транзакції:', response.statusText);
                }
            } catch (error) {
                alert('Помилка при відправці транзакції')
                console.error('Сталася помилка:', error);
            }
        }
    };
    
    const closeTransInfo = () => {
        setSuccess(false)
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
                                <img src={require('./assets/arrow.png')} alt='send'  style={{width:"60px", height:"60px"}}/>
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
            <Grid item sm={12} md={5} lg={5} xl={5} style={{marginTop:"105px"}}>
                <Grid container direction="column" spacing={2} className={style.card} style={{paddingRight:"10px"}}>
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
                                <img src={require('./assets/arrow.png')} alt='send' style={{width:"60px", height:"60px"}}/>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Typography className={style.card__description}>
                            <br />
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
                                <img src={require('./assets/arrow.png')} alt='send' style={{width:"60px", height:"60px"}}/>
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
                                <img src={require('./assets/arrow.png')} alt='send' style={{width:"60px", height:"60px"}}/>
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
                                <img src={require('./assets/card.png')} alt='card' style={{width:"120px"}}/>
                            </Grid>
                            <Grid item>
                                <Grid container direction={'column'}>
                                    <Typography sx={{
                                                    fontFamily: "Dela",
                                                    color: "#FFF",
                                                    fontWeight: 400,
                                                    fontSize: "20px"
                                                }}>
                                    Картка <CardDisplay cardNumber={cards[activeCards]?.number} />
                                    </Typography>
                                    <Box sx={{display:"flex", alignItems:"center", justifyContent:"space-between"}}>
                                    <img src={require('./assets/master.png')} alt='system' style={{width:"90px"}}/>
                                    <Typography sx={{
                                                    fontFamily: "Dela",
                                                    color: "#FFF",
                                                    fontWeight: 400,
                                                    fontSize: "28px"
                                                }}
                                    >
                                        ₴{cards[activeCards]?.balance}
                                    </Typography>
                                    </Box>
                                    <Box sx={{display:"flex", alignItems:"center", justifyContent:"space-between", marginTop:"20px", cursor:"pointer"}} onClick={()=>{handleActiveCard()}}>
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
                                onChange={handleMoney}
                                value={money}
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
                            </Box>
                        </Box>
                        <Typography sx={{textAlign:'center', fontSize:"24px", fontWeight:400, color:"#E50404", fontFamily:"Dela"}}>{error}</Typography>
                        <Box sx={{width:"100%", display:"flex", justifyContent:"center", marginTop:"30px"}}>
                        <button className={style.sendBtn} onClick={()=>sendTransaction()}>Надіслати</button>
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
    );
}

export default Deposit;
