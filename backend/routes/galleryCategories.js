const createCrudRouter = require('../utils/crudRouter');
const GalleryCategory = require('../models/GalleryCategory');
module.exports = createCrudRouter(GalleryCategory);
