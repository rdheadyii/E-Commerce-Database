const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
    const categoryData = await Category.findAll({
      include: [
        {
          model: Product,
          attributes: ['id', 'product_name', 'price', 'category_id']
        }
      ]
    })
    res.status(200).json(categoryData)
  } catch(err) {
    res.status(400).json(err)
  }
});

router.get('/:id', async (req, res) => {
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [
        {
          model: Product,
          attributes: ['id', 'product_name', 'price', 'category_id']
        }
      ]
    })
    if(!categoryData){
      res.status(404).json({ message: 'No category with this id!' });
      return;
    }
    res.status(200).json(categoryData)
  } catch(err) {
    res.status(400).json(err)
  }
});

router.post('/', async (req, res) => {
  try{
    const categoryData = await Category.create({
      category_name: req.body.category_name
    })
    res.status(200).json(categoryData)
  } catch (err){
    res.status(400).json(err)
  }
});

router.put('/:id', async (req, res) => {
  try{
    const categoryData = await Category.update(req.body, {
      where: {
        id: req.params.id
      }
    })
    if (!categoryData) {
      res.status(404).json({ message: 'No category with this id!' });
      return;
    }
    res.status(200).json('Category successfully updated!')
  } catch (err) {
    res.status(400).json(err)
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id
      }
    })
    if(!categoryData){
      res.status(404).json({ message: 'No category with this id!' });
      return;
    }
    res.status(200).json('Category successfully deleted!')
  } catch(err) {
    res.status(400).json(err)
  }
});

module.exports = router;
