-- -----------------------------------------------------
-- MySQL Workbench Forward Engineering
-- -----------------------------------------------------

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema banking_db
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS banking_db DEFAULT CHARACTER SET utf8;
USE banking_db;

-- -----------------------------------------------------
-- Table banking_db.Customer
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS Customer (
  idCustomer INT NOT NULL AUTO_INCREMENT,
  age INT NOT NULL,
  phoneNumber VARCHAR(13) NOT NULL,
  password VARCHAR(64) NOT NULL,
  address VARCHAR(100) NULL ,
  firstName VARCHAR(50) NULL,
  lastName VARCHAR(50) NULL,
  middleName VARCHAR(50) NULL,
  dateCreated DATE NOT NULL,
  PRIMARY KEY (`idCustomer`)
) ENGINE = InnoDB;

-- Sample data for Customer (removed email column)
INSERT INTO Customer (`age`, phoneNumber, password, balance, `dateCreated`)
VALUES
(30, '123-456-7890', 'pass1234', 5000.00, '2024-01-15'),
(25, '321-654-9870', 'secure5678', 3000.50, '2024-02-10'),
(40, '987-654-3210', 'pass9999', 10000.75, '2024-03-05');

-- -----------------------------------------------------
-- Table banking_db.Card
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS Card (
  idCard INT NOT NULL AUTO_INCREMENT,
  number CHAR(16) NOT NULL UNIQUE,
  pincode CHAR(4) NOT NULL,
  cvv CHAR(3) NOT NULL,
  dateExpiration DATE NOT NULL,
  type ENUM('Debit', 'Credit', 'Student') NOT NULL,
  idCustomer INT NOT NULL,
  PRIMARY KEY (`idCard`),
  INDEX fk_Card_Customer_idx (`idCustomer`),
  CONSTRAINT fk_Card_Customer
    FOREIGN KEY (`idCustomer`)
    REFERENCES Customer (`idCustomer`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION
) ENGINE = InnoDB;

-- Sample data for Card
INSERT INTO Card (`number`, pincode, cvv, dateExpiration, type, `idCustomer`)
VALUES
('1234567890123456', '1234', '321', '2027-10-12', 'Debit', 1),
('9876543210987654', '5678', '654', '2026-08-05', 'Credit', 2),
('5555666677778888', '9101', '987', '2025-12-31', 'Debit', 3);

-- -----------------------------------------------------
-- Table banking_db.Transaction
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS Transaction (
  idTransaction INT NOT NULL AUTO_INCREMENT,
  typeTransaction ENUM('Transfer', 'Payment') NOT NULL,
  amount DECIMAL(20, 2) NOT NULL,
  commission DECIMAL(10, 2) NOT NULL,
  senderCardNumber CHAR(16) NOT NULL,
  destination CHAR(100) NOT NULL,
  dateCreated DATE,
  PRIMARY KEY (`idTransaction`)
) ENGINE = InnoDB;

DELIMITER $$

CREATE TRIGGER set_dateCreated_before_insert
BEFORE INSERT ON `Transaction`
FOR EACH ROW
BEGIN
  -- Set dateCreated to the current date if it's not provided
  IF NEW.dateCreated IS NULL THEN
    SET NEW.dateCreated = CURDATE();
  END IF;
END $$

DELIMITER ;


-- Sample data for Transaction
INSERT INTO Transaction (typeTransaction, amount, commission, senderCardNumber, destination)
VALUES ('Transfer', -1000.00, 10.00, '1234567812345678', 'Destination Description');

-- -----------------------------------------------------
-- Final Settings
-- -----------------------------------------------------
SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
