const { Router } = require('express');
const authenticate = require('../middleware/authenticate');
const Item = require('../models/Item');

module.exports = Router()
  .get('/', async (req, res, next) => {
    try {
      const items = await Item.getAll();
      res.json(items);
    } catch (e) {
      next(e);
    }
  })
  .post('/', authenticate, async (req, res, next) => {
    try {
      const item = await Item.insert({ user_id: req.user.id, ...req.body });
      res.json(item);
    } catch (e) {
      next(e);
    }
  });
