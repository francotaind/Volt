const express = require('express');
const router = express.Router();
const messages = require('../controllers/message.controller');

// Define routes
router.post('/', messages.createMessage);
router.get('/', messages.getAllMessages);
router.get('/:id', messages.getMessageById);
router.put('/:id', messages.updateMessage);
router.delete('/:id', messages.deleteMessage);

module.exports = router;
