const db = require('../config/db.config');

// Create a new message
exports.createMessage = (req, res) => {
    const { content, author } = req.body;
    
    if (!content || !author) {
        return res.status(400).send({ 
            message: 'content, and author are required!' 
        });
    }

    const query = 'INSERT INTO messages (content, author) VALUES ( ?, ?)';
    db.query(query, [content, author], (err, result) => {
        if (err) {
            return res.status(500).send({ 
                message: 'Error creating message.', 
                err 
            });
        }
        res.status(201).send({ 
            message: 'Message created successfully!', 
            messageId: result.insertId 
        });
    });
};

// Get all messages
exports.getAllMessages = (req, res) => {
    const query = 'SELECT * FROM messages ORDER BY created_at DESC';
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).send({ 
                message: 'Error retrieving messages.', 
                err 
            });
        }
        res.send(results);
    });
};

// Get a single message by ID
exports.getMessageById = (req, res) => {
    const messageId = req.params.id;
    const query = 'SELECT * FROM messages WHERE id = ?';
    
    db.query(query, [messageId], (err, result) => {
        if (err) {
            return res.status(500).send({ 
                message: 'Error retrieving message.', 
                err 
            });
        }
        if (result.length === 0) {
            return res.status(404).send({ 
                message: 'Message not found.' 
            });
        }
        res.send(result[0]);
    });
};

// Update a message by ID
exports.updateMessage = (req, res) => {
    const messageId = req.params.id;
    const { content, author } = req.body;
    
    if (!content || !author) {
        return res.status(400).send({ 
            message: 'content, and author are required!' 
        });
    }

    const query = 'UPDATE messages content = ?, author = ? WHERE id = ?';
    db.query(query, [content, author, messageId], (err, result) => {
        if (err) {
            return res.status(500).send({ 
                message: 'Error updating message.', 
                err 
            });
        }
        if (result.affectedRows === 0) {
            return res.status(404).send({ 
                message: 'Message not found.' 
            });
        }
        res.send({ message: 'Message updated successfully!' });
    });
};

// Delete a message by ID
exports.deleteMessage = (req, res) => {
    const messageId = req.params.id;
    const query = 'DELETE FROM messages WHERE id = ?';
    
    db.query(query, [messageId], (err, result) => {
        if (err) {
            return res.status(500).send({ 
                message: 'Error deleting message.', 
                err 
            });
        }
        if (result.affectedRows === 0) {
            return res.status(404).send({ 
                message: 'Message not found.' 
            });
        }
        res.send({ message: 'Message deleted successfully!' });
    });
};

