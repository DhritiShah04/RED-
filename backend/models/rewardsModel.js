const Rewards = {
    create: (buyerId, callback) => {
      const sql = 'INSERT INTO rewards (buyer_id) VALUES (?)';
      db.query(sql, [buyerId], callback);
    },
  
    getByBuyerId: (buyerId, callback) => {
      db.query('SELECT * FROM rewards WHERE buyer_id = ?', [buyerId], callback);
    },
  
    updateTag: (buyerId, tagField, incrementValue, callback) => {
      const sql = `UPDATE rewards SET ${tagField} = ${tagField} + ?, last_updated = CURRENT_TIMESTAMP WHERE buyer_id = ?`;
      db.query(sql, [incrementValue, buyerId], callback);
    }
  };
  
  module.exports = Rewards;