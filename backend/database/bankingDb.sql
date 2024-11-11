-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema banking_db
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema banking_db
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `banking_db` DEFAULT CHARACTER SET utf8 ;
USE `banking_db` ;

-- -----------------------------------------------------
-- Table `banking_db`.`Customer`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `banking_db`.`Customer` (
  `idCustomer` INT NOT NULL AUTO_INCREMENT,
  `age` INT NOT NULL,
  `phoneNumber` VARCHAR(13) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `password` VARCHAR(16) NOT NULL,
  PRIMARY KEY (`idCustomer`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `banking_db`.`Account`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `banking_db`.`Account` (
  `idAccount` INT NOT NULL AUTO_INCREMENT,
  `balance` FLOAT NOT NULL,
  `data` DATE NOT NULL,
  `idCustomer_Account` INT NOT NULL,
  PRIMARY KEY (`idAccount`, `idCustomer_Account`),
  INDEX `fk_Account_Customer_idx` (`idCustomer_Account` ASC) VISIBLE,
  CONSTRAINT `fk_Account_Customer`
    FOREIGN KEY (`idCustomer_Account`)
    REFERENCES `banking_db`.`Customer` (`idCustomer`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `banking_db`.`Card`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `banking_db`.`Card` (
  `idCard` INT NOT NULL,
  `number` INT NOT NULL,
  `pincode` VARCHAR(4) NOT NULL,
  `cvv` VARCHAR(3) NOT NULL,
  `dateExpiration` DATE NOT NULL,
  `type` VARCHAR(45) NOT NULL,
  `idAccount_Card` INT NOT NULL,
  `idCustomer_Account_Card` INT NOT NULL,
  PRIMARY KEY (`idCard`, `idAccount_Card`, `idCustomer_Account_Card`),
  INDEX `fk_Card_Account1_idx` (`idAccount_Card` ASC, `idCustomer_Account_Card` ASC) VISIBLE,
  CONSTRAINT `fk_Card_Account1`
    FOREIGN KEY (`idAccount_Card` , `idCustomer_Account_Card`)
    REFERENCES `banking_db`.`Account` (`idAccount` , `idCustomer_Account`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `banking_db`.`Transaction`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `banking_db`.`Transaction` (
  `idTransaction` INT NOT NULL,
  `typeTransaction` VARCHAR(45) NOT NULL,
  `amount` FLOAT NOT NULL,
  `commission` FLOAT NOT NULL,
  `idSender_Customer` INT NOT NULL,
  `idReciever_Customer` INT NOT NULL,
  `dateTansaction` DATE NOT NULL,
  PRIMARY KEY (`idTransaction`, `idSender_Customer`, `idReciever_Customer`),
  INDEX `fk_Transaction_Customer1_idx` (`idSender_Customer` ASC) VISIBLE,
  INDEX `fk_Transaction_Customer2_idx` (`idReciever_Customer` ASC) VISIBLE,
  CONSTRAINT `fk_Transaction_Customer1`
    FOREIGN KEY (`idSender_Customer`)
    REFERENCES `banking_db`.`Customer` (`idCustomer`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Transaction_Customer2`
    FOREIGN KEY (`idReciever_Customer`)
    REFERENCES `banking_db`.`Customer` (`idCustomer`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;



SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;


