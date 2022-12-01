const { Router } = require('express');
const authenticate = require('../middleware/authenticate');
const authorize = require('../middleware/authorize');
const Item = require('../models/Item');

module.exports = Router()
  .get('/', authenticate, async (req, res, next) => {
    try {
      const items = await Item.getAll(req.user.id);
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
  })
  .put('/:id', [authenticate, authorize], async (req, res, next) => {
    try {
      const data = await Item.updateById(req.params.id, req.body);
      res.json(data);
    } catch (e) {
      next(e);
    }
  })
  .delete('/:id', [authenticate, authorize], async (req, res, next) => {
    try {
      const data = await Item.delete(req.params.id);
      if (data) {
        res.send('Item successfully deleted.');
      }
    } catch (e) {
      next(e);
    }
  });
