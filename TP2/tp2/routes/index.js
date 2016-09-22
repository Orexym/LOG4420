var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Accueil' });
});

router.get('/index.html', function(req, res, next) {
    res.render('index', { title: 'Accueil' });
});

router.get('/examen.html?q=:q', function(req, res, next) {
    res.render('examen', { title: req.params.q });
});

router.get('/examen.html', function(req, res, next) {
    res.render('examen', { title: '1' });
});

router.post('/test.html', function(req, res, next) {
    res.render('test_rapide', { title: req.query.q });
});

router.get('/test.html', function(req, res, next) {
    res.render('test_rapide', { title: '1' });
});

router.get('/instructions.html', function(req, res, next) {
    res.render('instructions', { title: 'Instructions' });
});

router.get('/tableau.html', function(req, res, next) {
    res.render('tableau', { title: 'Tableau de bord' });
});

router.get('/resultats.html', function(req, res, next) {
    res.render('resultats', { title: 'Résultats' });
});

module.exports = router;
