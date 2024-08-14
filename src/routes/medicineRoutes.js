const express = require('express');
const {
  getAllMedicines,
  getMedicineById,
  addMedicine,
  updateMedicine,
  deleteMedicine,
} = require('../controllers/medicineController');

const router = express.Router();

router.get('/', getAllMedicines);
router.get('/:id', getMedicineById);
router.post('/', addMedicine);
router.put('/:id', updateMedicine);
router.delete('/:id', deleteMedicine);

module.exports = router;
