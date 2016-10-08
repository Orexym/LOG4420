var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Accueil' });
});

router.get('/index', function(req, res, next) {
    res.render('index', { title: 'Accueil' });
});

router.post('/examen', function(req, res, next) {
    res.render('examen', { title: 'Question', qNumber: req.query.q, totalQuestions: req.query.totalQuestions });
});

router.get('/examen', function(req, res, next) {
    res.render('examen', { title: 'Question', qNumber: 1, totalQuestions: req.query.questions });
});

router.post('/test', function(req, res, next) {
    res.render('test_rapide', { title: 'Question', qNumber: req.query.q });
});

router.get('/test', function(req, res, next) {
    res.render('test_rapide', { title: 'Question', qNumber: 1 });
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
