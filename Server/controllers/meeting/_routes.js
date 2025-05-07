const express = require('express');
const auth = require('../../middelwares/auth');
const meeting = require('./meeting')

const router = express.Router();

router.get('/', auth, meeting.index)
router.post('/add', auth, meeting.add)
router.get('/view/:id', auth, meeting.view)
router.post('/deleteMany', auth, meeting.deleteMany)


module.exports = router