import React from 'react';
import background from './background.svg'; // Імпорт зображення

export default function Convertor() {
  return (
    <div className='container'>
      <img src={background} alt='back' style={style.back}/>
      <div style={style.modal}>
        <h1>Сервіс на етапі розробки</h1>
        <h3>Поки що, будь ласка, скористайтеся алтернативним конвертором</h3>
        <a href='https://minfin.com.ua/ua/currency/converter/' style={style.link}>Перейти за посиланням</a>
      </div>
    </div>
  );
}

const style = {
    back:{
        zIndex:"-1",
        position:"absolute",
        top:0,
        left:0
    },
    modal: {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        padding: "100px",
        backgroundColor: "rgba(45, 45, 45, 0.7)",
        boxShadow: "0 5px 15px rgba(0, 0, 0, 0.3)",
        borderRadius: "10px",
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        flexDirection:"column"
    },
    link:{
        color:"white",
        fontWeight:600,
        fontSize:"20px"
    }
}
