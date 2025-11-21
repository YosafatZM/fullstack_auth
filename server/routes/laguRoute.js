const express = require('express');
const router = express.Router();
const laguController = require('../controllers/laguController');
const auth = require('../middleware/auth');

// Semua route lagu memerlukan autentikasi
router.get('/', auth, laguController.getAllLagu);
router.get('/:id', auth, laguController.getLaguById);
router.post('/', auth, laguController.createLagu);
router.put('/:id', auth, laguController.updateLagu);
router.delete('/:id', auth, laguController.deleteLagu);

module.exports = router;