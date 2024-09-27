//Customer queries

/**
 * Gets all Customers
 * @returns Array of Customers
 */
async function getCustomers() {
  conts[rows] = await pool.query("SELECT * FROM Customer");
  return rows;
}

/**
 * Gets Customer by id
 * @param {int} id
 * @returns Object of Customer
 */
async function getCustomer(id) {
  const [rows] = await pool.query(
    `SELECT * 
    FROM Customer
    WHERE id = ?`,
    [id]
  );

  return rows[0];
}

/**
 * Creates Customer
 * @param {int} age
 * @param {string} phoneNumber max 13 letters
 * @param {string} email
 * @param {string} password max 16 letters
 * @returns Result header info
 */
async function createCustomer(age, phoneNumber, email, password) {
  const [result] = await pool.query(
    `INSERT INTO Customer (age, phoneNumber, email, password)
    VALUES (?, ?, ?, ?)`,
    [age, phoneNumber, email, password]
  );

  return result;
}

/**
 * Deletes Customer by id
 * @param {int} id
 * @returns Result header info
 */
async function deleteCustomer(id) {
  const [result] = await pool.query(
    `DELETE * 
    FROM Customer
    WHERE id = ?`,
    [id]
  );

  return result;
}

/**
 * Updates Customer's info by id
 * @param {int} id
 * @param {int} age
 * @param {string} phoneNumber max 13 letters
 * @param {string} email
 * @param {string} password max 16 letters
 * @returns Result Header info
 */
async function updateCustomer(id, age, phoneNumber, email, password) {
  const [result] = await pool.query(
    `UPDATE * 
    FROM Customer
    SET age = ?, phoneNumber = ?, email = ?, password = ?
    WHERE id = ?`,
    [age, phoneNumber, email, password, id]
  );

  return result;
}

//Account queries

/**
 * Gets all Accounts
 * @returns Array of Accounts
 */
async function getAccounts() {
  conts[rows] = await pool.query("SELECT * FROM Account");
  return rows;
}

/**
 * Gets Account by id
 * @param {int} id
 * @returns Pbject of Account
 */
async function getAccount(id) {
  const [rows] = await pool.query(
    `SELECT * 
    FROM Account
    WHERE id = ?`,
    [id]
  );

  return rows[0];
}

/**
 * Creates Account
 * @param {float} balance
 * @param {string} data
 * @param {int} idCustomer_Account id of Customer who owns this Account
 * @returns Result Header info
 */
async function createAccount(balance, data, idCustomer_Account) {
  const [result] = await pool.query(
    `INSERT INTO Account (balance, data, idCustomer_Account)
    VALUES (?, ?, ?)`,
    [balance, data, idCustomer_Account]
  );

  return result;
}

/**
 * Deletes Account by id
 * @param {int} id
 * @returns Result Header info
 */
async function deleteAccount(id) {
  const [result] = await pool.query(
    `DELETE * 
    FROM Account
    WHERE id = ?`,
    [id]
  );

  return result;
}

/**
 * Updates Account's info by id
 * @param {int} id
 * @param {float} balance
 * @param {string} data
 * @param {int} idCustomer_Account id of Customer who owns Account
 * @returns Result Header info
 */
async function updateAccount(id, balance, data, idCustomer_Account) {
  const [result] = await pool.query(
    `UPDATE * 
    FROM Account
    SET balance = ?, data = ?, idCustomer_Account = ?
    WHERE id = ?`,
    [balance, data, idCustomer_Account, id]
  );

  return result;
}

//Card queries

/**
 * Gets all Cards
 * @returns Array of Cards
 */
async function getCards() {
  conts[rows] = await pool.query("SELECT * FROM Card");
  return rows;
}

/**
 * Gets Card by id
 * @param {int} id
 * @returns Object of Card
 */
async function getCard(id) {
  const [rows] = await pool.query(
    `SELECT * 
    FROM Card
    WHERE id = ?`,
    [id]
  );

  return rows[0];
}

/**
 * Creates Card
 * @param {int} number
 * @param {string} pincode max 4 letters
 * @param {string} cvv max 3 letters
 * @param {Date} dateExpiration
 * @param {string} type
 * @param {int} idAccount_Card id of Account that owns Card
 * @param {int} idCustomer_Account_Card id of Customer that owns Account and Card
 * @returns Result Header info
 */
async function createCard(
  number,
  pincode,
  cvv,
  dateExpiration,
  type,
  idAccount_Card,
  idCustomer_Account_Card
) {
  const [result] = await pool.query(
    `INSERT INTO Card (number, pincode, cvv, dateExpiration, type, idAccount_Card, idCustomer_Account_Card)
    VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [
      number,
      pincode,
      cvv,
      dateExpiration,
      type,
      idAccount_Card,
      idCustomer_Account_Card,
    ]
  );

  return result;
}

/**
 * Deletes Card
 * @param {int} id
 * @returns Result Header info
 */
async function deleteCard(id) {
  const [result] = await pool.query(
    `DELETE * 
    FROM Card
    WHERE id = ?`,
    [id]
  );

  return result;
}

/**
 * Updates Card's info by id
 * @param {int} id
 * @param {int} number
 * @param {string} pincode max 4 letters
 * @param {string} cvv max 3 letters
 * @param {Date} dateExpiration
 * @param {string} type
 * @param {int} idAccount_Card id of Account that owns Card
 * @param {int} idCustomer_Account_Card id of Customer that owns Account and Card
 * @returns Result Header info
 */
async function updateCard(
  id,
  number,
  pincode,
  cvv,
  dateExpiration,
  type,
  idAccount_Card,
  idCustomer_Account_Card
) {
  const [result] = await pool.query(
    `UPDATE * 
    FROM Card
    SET number = ?, pincode = ?, cvv = ?, dateExpiration = ?, type = ?, idAccount_Card = ?, idCustomer_Account_Card = ?
    WHERE id = ?`,
    [
      number,
      pincode,
      cvv,
      dateExpiration,
      type,
      idAccount_Card,
      idCustomer_Account_Card,
      id,
    ]
  );

  return result;
}

//Transaction queries

/**
 * Gets all Transactions
 * @returns Array of Transactioms
 */
async function getTransactions() {
  conts[rows] = await pool.query("SELECT * FROM Transaction");
  return rows;
}

/**
 * Gets Transaction by id
 * @param {int} id
 * @returns Object of Transaction
 */
async function getTransaction(id) {
  const [rows] = await pool.query(
    `SELECT * 
    FROM Transaction
    WHERE id = ?`,
    [id]
  );

  return rows[0];
}

/**
 * Creates Transaction
 * @param {string} typeTransaction
 * @param {float} amount
 * @param {float} commission
 * @param {int} idSender_Customer id of Customer who sends
 * @param {int} idReciever_Customer if of Customer who recieves
 * @returns Result Header info
 */
async function createTransaction(
  typeTransaction,
  amount,
  commission,
  idSender_Customer,
  idReciever_Customer
) {
  const [result] = await pool.query(
    `INSERT INTO Transaction (typeTransaction, amount, commission, idSender_Customer, idReciever_Customer)
    VALUES (?, ?, ?, ?, ?)`,
    [
      typeTransaction,
      amount,
      commission,
      idSender_Customer,
      idReciever_Customer,
    ]
  );

  return result;
}

/**
 * Deletes Transaction by id
 * @param {int} id
 * @returns Result Header info
 */
async function deleteTransaction(id) {
  const [result] = await pool.query(
    `DELETE * 
    FROM Transaction
    WHERE id = ?`,
    [id]
  );

  return result;
}

/**
 * Updates Transaction's info by id
 * @param {int} id
 * @param {string} typeTransaction
 * @param {float} amount
 * @param {float} commission
 * @param {int} idSender_Customer id of Customer who sends
 * @param {int} idReciever_Customer if of Customer who recieves
 * @returns Result Header info
 */
async function updateTransaction(
  id,
  typeTransaction,
  amount,
  commission,
  idSender_Customer,
  idReciever_Customer
) {
  const [result] = await pool.query(
    `UPDATE * 
    FROM Transaction
    SET typeTransaction = ?, amount = ?, commission = ?, idSender_Customer = ?, idReciever_Customer = ?
    WHERE id = ?`,
    [
      typeTransaction,
      amount,
      commission,
      idSender_Customer,
      idReciever_Customer,
      id,
    ]
  );

  return result;
}

//TransactionLog queries

/**
 * Get all TransactionLogs
 * @returns Arrau of TransactionLogs
 */
async function getTransactionLogs() {
  conts[rows] = await pool.query("SELECT * FROM TransactionLog");
  return rows;
}

/**
 * Gets TransactionLog by id
 * @param {int} id
 * @returns Obkect of TransactionLog
 */
async function getTransactionLog(id) {
  const [rows] = await pool.query(
    `SELECT * 
    FROM TransactionLog
    WHERE id = ?`,
    [id]
  );

  return rows[0];
}

/**
 * Creates TransictionLog
 * @param {string} message
 * @param {int} idTransaction_Log id of Transaction
 * @param {int} idSender_Customer_Log id of CUstomer sender
 * @param {int} idReciever_Customer_Log id of Customer reciever
 * @returns Result Header info
 */
async function createTransactionLog(
  message,
  idTransaction_Log,
  idSender_Customer_Log,
  idReciever_Customer_Log
) {
  const [result] = await pool.query(
    `INSERT INTO TransactionLog (message, idTransaction_Log, idSender_Customer_Log, idReciever_Customer_Log)
    VALUES (?, ?, ?, ?)`,
    [message, idTransaction_Log, idSender_Customer_Log, idReciever_Customer_Log]
  );

  return result;
}

/**
 * Deletes TransactiomLog
 * @param {int} id
 * @returns Result Header info
 */
async function deleteTransactionLog(id) {
  const [result] = await pool.query(
    `DELETE * 
    FROM TransactionLog
    WHERE id = ?`,
    [id]
  );

  return result;
}

/**
 * Updates TransactionLog's info by id
 * @param {int} id
 * @param {string} message
 * @param {int} idTransaction_Log id of Transaction
 * @param {int} idSender_Customer_Log id of CUstomer sender
 * @param {int} idReciever_Customer_Log id of Customer reciever
 * @returns Result Header info
 */
async function updateTransactionLog(
  id,
  message,
  idTransaction_Log,
  idSender_Customer_Log,
  idReciever_Customer_Log
) {
  const [result] = await pool.query(
    `UPDATE * 
    FROM TransactionLog
    SET  message = ?, idTransaction_Log = ?, idSender_Customer_Log = ?, idReciever_Customer_Log = ?
    WHERE id = ?`,
    [
      message,
      idTransaction_Log,
      idSender_Customer_Log,
      idReciever_Customer_Log,
      id,
    ]
  );

  return result;
}
