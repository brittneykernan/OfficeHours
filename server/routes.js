module.exports = function(app){
  var officehours = require('./controllers/officehours');
  app.get('/officehours', officehours.findAll);
  app.get('/officehours/:id', officehours.findById);
  app.get('/officehours/today', officehours.getTodays);
  app.post('/officehours', officehours.add);
  app.put('/officehours/:id', officehours.update);
  app.delete('/officehours/:id', officehours.delete);
}