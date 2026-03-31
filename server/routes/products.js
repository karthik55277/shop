const express = require('express');
const { body } = require('express-validator');
const {
  getProducts, getProduct, createProduct,
  updateProduct, deleteProduct, getAllProductsAdmin
} = require('../controllers/productController');
const { protect, adminOnly } = require('../middleware/auth');

const router = express.Router();

const productValidation = [
  body('name').notEmpty().trim(),
  body('price').isFloat({ min: 0 }),
  body('category').notEmpty(),
  body('stock').isInt({ min: 0 })
];

router.get('/', getProducts);
router.get('/admin/all', protect, adminOnly, getAllProductsAdmin);
router.get('/:id', getProduct);
router.post('/', protect, adminOnly, productValidation, createProduct);
router.put('/:id', protect, adminOnly, updateProduct);
router.delete('/:id', protect, adminOnly, deleteProduct);

module.exports = router;
