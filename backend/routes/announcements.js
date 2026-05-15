const createCrudRouter = require('../utils/crudRouter');
const Announcement = require('../models/Announcement');
module.exports = createCrudRouter(Announcement);
