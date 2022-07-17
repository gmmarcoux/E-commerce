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

    .then(dbCategoryData => res.json(dbCategoryData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});


// GET /api/category/1
router.get('/:id', (req, res) => {
  Category.findOne({
    // find one category by its `id` value
    where: {
      id: req.params.id
    },
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


// POST /api/category
router.post('/', (req, res) => {
  // create a new category
  Category.create ({
    category_name: req.body.category_name
  })
    .then(dbCategoryData => res.json(dbCategoryData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});


// PUT /api/category/1
router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(req.body, {
    individualHooks: true,
    where: {
      id: req.params.id
    }
  })
    .then(dbCategoryData => {
      if (!dbCategoryData[0]) {
        res.status(404).json({ message: 'No category found with this id' });
        return;
      }
      res.json(dbCategoryData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});


//DELETE /api/category/1
router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(dbCategoryData => {
      if (!dbCategoryData) {
        res.status(404).json({ message: 'No Category found with this id' });
        return;
      }
      res.json(dbCategoryData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
