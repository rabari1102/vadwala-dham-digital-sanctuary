const createCrudRouter = require('../utils/crudRouter');
const Activity = require('../models/Activity');
module.exports = createCrudRouter(Activity);
