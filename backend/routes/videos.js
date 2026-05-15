const createCrudRouter = require('../utils/crudRouter');
const Video = require('../models/Video');
module.exports = createCrudRouter(Video);
