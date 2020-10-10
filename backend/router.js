const express = require('express');
const router = express.Router();
const actionController = require('./controllers/actionController');
const cors = require('cors');

router.use(cors());

router.get('/action', actionController.log);
router.post('/action', actionController.add);
router.delete('/action', actionController.clear);

module.exports = router;
