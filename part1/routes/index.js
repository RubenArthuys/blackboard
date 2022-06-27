var express = require('express');
var router = express.Router();

var articlesModel = require('../models/articles');
var ordersModel = require('../models/orders');

// Home page
router.get('/', function(req, res, next) {
  res.render('index');
});

// Tasks page
router.get('/tasks-page', function(req, res, next) {
  res.render('tasks');
});

//Messages page
router.get('/messages-page', function(req, res, next) {
  res.render('messages');
});

//Users page
router.get('/users-page', function(req, res, next) {
  res.render('users');
});

// Catalog page
router.get('/catalog-page', async function(req, res, next) {

  var articlesFromDB = await articlesModel.find();
  res.render('catalog', { articlesEJS : articlesFromDB });
});

// Orders LIST page
router.get('/orders-list-page', async function(req, res, next) {

  var orders = await ordersModel.find();
  res.render('orders-list', { ordersEJS : orders });
});

// Order DETAILS page
router.get('/order-page', async function(req, res, next) {

  var orderDetails = await ordersModel.findById(req.query.id)
                                      .populate('articles')
                                      .exec();                                    
                                
  res.render('order', { orderDetails });
});

// Charts page
router.get('/charts', function(req, res, next) {
  res.render('charts');
});



module.exports = router;
