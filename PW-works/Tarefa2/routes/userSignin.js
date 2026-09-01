var express = require('express');
var router = express.Router();

/* GET user sign-in page. */
router.get('/', function(req, res, next) {
	res.render('userSignin');
});

module.exports = router;
