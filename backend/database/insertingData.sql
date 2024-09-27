USE banking_db;

-- Insert data into the Customer table
-- idCustomer: identifier for each customer
-- age: customer's age
-- phoneNumber: customer's phone number
-- email: customer's email address
-- password: customer's account password
INSERT INTO Customer (idCustomer, age, phoneNumber, email, password) 
VALUES
(1, 25, '1234567890', 'john.doe@example.com', 'password123'),
(2, 30, '0987654321', 'jane.smith@example.com', 'mypassword456'),
(3, 40, '1112223333', 'mark.jones@example.com', 'securepass789');


-- Insert data into the Account table
-- idAccount: identifier for each account
-- balance: the account balance
-- data: additional data
-- idCustomer_Account: foreign key linking the account to a customer
INSERT INTO Account (idAccount, balance, data, idCustomer_Account) 
VALUES
(1, 1000.50, '2023-08-10', 1),
(2, 2500.00, '2023-08-11', 2),
(3, 1500.75, '2023-08-12', 3);


-- Insert data into the Card table
-- idCard: identifier for each card
-- number: the card number
-- pincode: the card's PIN code
-- cvv: the card's CVV security number
-- dateExpiration: expiration date of the card
-- type: type of the card (e.g., Visa, MasterCard, etc.)
-- idAccount_Card: foreign key linking the card to an account
-- idCustomer_Account_Card: foreign key linking the card to a customer
INSERT INTO Card (idCard, number, pincode, cvv, dateExpiration, type, idAccount_Card, idCustomer_Account_Card) 
VALUES
(1, 123456789, '1234', '123', '2026-08-01', 'Visa', 1, 1),
(2, 234567890, '4321', '321', '2025-12-15', 'MasterCard', 2, 2),
(3, 345678901, '5678', '456', '2027-01-10', 'AmericanExpress', 3, 3);


-- Insert data into the Transaction table
-- idTransaction: identifier for each transaction
-- typeTransaction: type of the transaction (e.g., Transfer, Withdrawal, Deposit)
-- amount: transaction amount
-- commission: commission or fee for the transaction
-- idSender_Customer: foreign key to the customer who initiated the transaction
-- idReceiver_Customer: foreign key to the customer who received the transaction
INSERT INTO Transaction (idTransaction, typeTransaction, amount, commission, idSender_Customer, idReciever_Customer) 
VALUES
(1, 'Transfer', 100.00, 2.00, 1, 2),
(2, 'Withdrawal', 200.00, 3.50, 2, 2),
(3, 'Deposit', 150.00, 1.50, 3, 3);


-- Insert data into the TransactionLog table
-- idTransactionLog: unique identifier for each transaction log
-- message: log message describing the transaction
-- idTransaction_Log: foreign key linking to the transaction
-- idSender_Customer_Log: foreign key linking to the customer who sent the transaction
-- idReceiver_Customer_Log: foreign key linking to the customer who received the transaction
INSERT INTO TransactionLog (idTransactionLog, message, idTransaction_Log, idSender_Customer_Log, idReciever_Customer_Log) 
VALUES
(1, 'Transfer from John to Jane', 1, 1, 2),
(2, 'Withdrawal by Jane', 2, 2, 2),
(3, 'Deposit by Mark', 3, 3, 3);
