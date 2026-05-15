const createCrudRouter = require('../utils/crudRouter');
const DonationItem = require('../models/DonationItem');
module.exports = createCrudRouter(DonationItem);
