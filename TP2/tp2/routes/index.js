var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Accueil' });
});

router.get('/index', function(req, res, next) {
    res.render('index', { title: 'Accueil' });
});

router.get('/examen?q=1', function(req, res, next) {
    res.render('examen', { title: '1' });
});

router.get('/examen?q=2', function(req, res, next) {
    res.render('examen', { title: '2' });
});

router.get('/test?q=1', function(req, res, next) {
    res.render('test_rapide', { title: '1' });
});

router.get('/test?q=2', function(req, res, next) {
    res.render('test_rapide', { title: '2' });
});

router.get('/instructions', function(req, res, next) {
    res.render('instructions', { title: 'Instructions' });
});

router.get('/tableau', function(req, res, next) {
    res.render('tableau', { title: 'Tableau de bord' });
});

router.get('/resultats', function(req, res, next) {
    res.render('resultats', { title: 'Résultats' });
});

module.exports = router;
