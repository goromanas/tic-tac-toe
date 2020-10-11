const express = require('express');
const cors = require('cors');

const router = express.Router();
const actionController = require('./controllers/actionController');

router.use(cors());

router.get('/action', actionController.log);
router.post('/action', actionController.add);
router.delete('/action', actionController.clear);

module.exports = router;
