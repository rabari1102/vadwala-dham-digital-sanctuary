const createCrudRouter = require('../utils/crudRouter');
const PaymentInfo = require('../models/PaymentInfo');
module.exports = createCrudRouter(PaymentInfo);
