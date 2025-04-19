const db = require('../config/db');

exports.updateReward = (req, res) => {
  const { buyer_id, plastic_free_tag, low_carbonfootprint_tag, recyclable_tag, tree_planter_tag, biodegradable_tag } = req.body;
  const query = `INSERT INTO rewards (buyer_id, plastic_free_tag, low_carbonfootprint_tag, recyclable_tag, tree_planter_tag, biodegradable_tag)
                 VALUES (?, ?, ?, ?, ?, ?)
                 ON DUPLICATE KEY UPDATE
                   plastic_free_tag = plastic_free_tag + VALUES(plastic_free_tag),
                   low_carbonfootprint_tag = low_carbonfootprint_tag + VALUES(low_carbonfootprint_tag),
                   recyclable_tag = recyclable_tag + VALUES(recyclable_tag),
                   tree_planter_tag = tree_planter_tag + VALUES(tree_planter_tag),
                   biodegradable_tag = biodegradable_tag + VALUES(biodegradable_tag)`;
  db.query(query, [buyer_id, plastic_free_tag, low_carbonfootprint_tag, recyclable_tag, tree_planter_tag, biodegradable_tag], (err, result) => {
    if (err) return res.status(500).send(err);
    res.status(200).send({ message: 'Rewards updated' });
  });
};

exports.getRewardByBuyerId = (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM rewards WHERE id = ?', [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(result[0]);
  });
};

exports.deleteReward = (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM rewards WHERE id = ?', [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Reward deleted successfully' });
  });
};