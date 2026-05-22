const router = require('express').Router();
const pool = require('../config/database');

// GET all chalets
router.get('/', async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM chalets ORDER BY id");
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: "Database error fetching chalets" });
    }
});

// GET one chalet by ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const result = await pool.query(
            "SELECT * FROM chalets WHERE id = $1",
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Chalet not found" });
        }

        res.json(result.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;