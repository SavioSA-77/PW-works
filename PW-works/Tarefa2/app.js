var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const port = 5000;

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var magicRouter = require('./routes/magic');
var userSigninRouter = require('./routes/userSignin');
var userLoginRouter = require('./routes/userLogin');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
var aboutRouter = require('./routes/about');
var newsRouter = require('./routes/news');
var dataRouter = require('./routes/data');
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/about', aboutRouter);
app.use('/news', newsRouter);
app.use('/data', dataRouter);
app.use('/users/:userid', usersRouter);
app.use('/users/:userid/usersignin', usersRouter);
app.use('/users/:usersigin/userlogin', usersRouter);
app.use('/magic', magicRouter);
app.use('/userLogin', userLoginRouter);
app.use('/userSignin', userSigninRouter);


app.get('/about', (req, res) => {
  res.send('Essa é a página sobre nós.');
});

app.post('/data', (req, res) => {
  res.send('Dados recebidos com sucesso!');
});

app.get('/users', (req, res) => {
    res.send('Olá, coloque na url /userlogin para fazer login');
});

app.get('/users/:userid', (req, res) => {
  const { userid } = req.params;
  res.redirect(`/users/${userid}/usersignin`);
});

app.get('/users/:userid/usersignin', (req, res) => {
  const { userid } = req.params;
  res.send(`Boas vindas ${userid}!`);
});

app.get('/users/:usersigin/userlogin', (req, res) => {
  res.send('Insira um ID depois de /users para fazer login.');
});

app.use((req, res) => {
  res.status(404).json({ erro: 'Página não encontrada' });
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
