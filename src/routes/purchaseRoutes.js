const express = require('express');
const {
  getAllPurchases,
  getPurchaseById,
  addPurchase,
  updatePurchase,
  deletePurchase,
} = require('../controllers/purchaseController');

const router = express.Router();

router.get('/', getAllPurchases);
router.get('/:id', getPurchaseById);
router.post('/', addPurchase);
router.put('/:id', updatePurchase);
router.delete('/:id', deletePurchase);

module.exports = router;
