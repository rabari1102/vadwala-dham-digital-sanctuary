const createCrudRouter = require('../utils/crudRouter');
const Festival = require('../models/Festival');
module.exports = createCrudRouter(Festival);
