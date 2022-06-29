var express = require('express');
var router = express.Router();

var articlesModel = require('../models/articles');
var ordersModel = require('../models/orders');
var userModel = require('../models/users');


// Home page
router.get('/', async function(req, res, next) {

  //Dashboard stock dynamique
  var articlesZero = await articlesModel.find({ stock : 0 });

  //Dashboard messages de l'admin
  var admin = await userModel.findById('5c52e4efaa4beef85aad5e52')
  
  var messages = admin.messages
  let unreadMessages = 0
  for(var i=0; i<messages.length; i++) {
    if(messages[i].read == false) {
      unreadMessages ++
    }
  }
  // console.log(unreadMessages);

  //Dashboard tasks de l'admin
  var tasks = admin.tasks
  let tasksUndone = 0
  for(var i=0; i<tasks.length; i++) {
    if(tasks[i].dateCloture == null) {
      tasksUndone ++
    }
  }

  res.render('index', { articlesZero : articlesZero.length, unreadMessages, tasksUndone });
});

// Tasks page
router.get('/tasks-page', async function(req, res, next) {
  var admin = await userModel.findById("5c52e4efaa4beef85aad5e52")
  //On va piocher juste les tâches de admin
  var adminTasks = admin.tasks
  res.render('tasks', { adminTasks });
});

//Messages page
router.get('/messages-page', async function(req, res, next) {
  var admin = await userModel.findById("5c52e4efaa4beef85aad5e52")
  // console.log(admin.messages)
  var adminMessages = admin.messages

  res.render('messages', { adminMessages });
});

//Users page
router.get('/users-page', async function(req, res, next) {
  var users = await userModel.find({ status : "customer" });
  res.render('users', { users });
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
  //populate() va récupérer les articles associé à une order, cela rempli l'information dans la réference.
  //Def : Remplace le chemin dans le document d'une collection avec le document d'une autre collection.
  res.render('order', { orderDetails });
});

// Charts page
router.get('/charts', function(req, res, next) {
  res.render('charts');
});


module.exports = router;