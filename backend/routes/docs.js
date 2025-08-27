const express = require('express');
const router = express.Router();
const docsController = require('../controllers/docsController');

router.get('/', docsController.getAll);
router.get('/:id', docsController.getOne);
router.post('/', docsController.create);
router.put('/:id', docsController.update);
router.delete('/:id', docsController.remove);

module.exports = router;
