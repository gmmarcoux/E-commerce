const router = require('express').Router();
const res = require('express/lib/response');
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// GET /api/category
router.get('/', (req, res) => {

  // find all categories
  Category.findAll({
    attributes: [
      'id', 
      'category_name'
    ],

  // be sure to include its associated Products
    include: [
      {
        model: Product,
        attributes: [
          'id', 
          'product_name',
          'price',
          'stock',
          'category_id'
        ]
      }
    ]
  })

    .then(dbCategoryData => {
      if (!dbCategoryData) {
        res.status(404).json({ message: 'No category with this id' });
        return;
      }
      res.json(dbCategoryData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});


// GET /api/category/1
router.get('/:id', (req, res) => {
  // find one category by its `id` value
  where: {
    
  }
  // be sure to include its associated Products
});


// POST /api/category
router.post('/', (req, res) => {
  // create a new category
});


// PUT /api/category/1
router.put('/:id', (req, res) => {
  // update a category by its `id` value
});


//DELETE /api/category/1
router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
