const createCrudRouter = require('../utils/crudRouter');
const GalleryItem = require('../models/GalleryItem');
module.exports = createCrudRouter(GalleryItem, { populate: 'categoryId' });
