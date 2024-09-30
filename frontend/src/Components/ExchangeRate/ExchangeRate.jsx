import React from "react";
import classes from "./ExchangeRate.module.css";

const ExcengeRate = () => {
    return(
        <div className={classes.container}>
            <p className={classes.rate}>USD 41.19 <strong>₴</strong></p>
            <p className={classes.rate}>EUR 45.49 <strong>₴</strong></p>
        </div>
    )
} 

export default ExcengeRate