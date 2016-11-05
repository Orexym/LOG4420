var express = require('express');
var router = express.Router();

/* Navigable pages. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Accueil' });
});
router.get('/index', function(req, res, next) {
    res.render('index', { title: 'Accueil' });
});
router.get('/instructions', function(req, res, next) {
    res.render('instructions', { title: 'Instructions' });
});
router.get('/tableau', function(req, res, next) {
    res.render('tableau', { title: 'Tableau de bord' });
});
router.get('/admin', function(req, res, next) {
    res.render('admin', { title: 'Page d\'administration' });
});

/* Unreachable pages */
router.post('/examen', function(req, res, next) {
    res.render('examen', { title: 'Question' });
});
router.post('/test', function(req, res, next) {
    res.render('test_rapide', { title: 'Question' });
});
router.post('/resultats', function(req, res, next) {
    res.render('resultats', { title: 'Résultats' });
});

/* Invalid requests */
router.get('/resultats', function(req, res, next) {
    res.render('invalid', { title: 'Invalid' });
});
router.get('/examen', function(req, res, next) {
    res.render('invalid', { title: 'Invalid' });
});
router.get('/test', function(req, res, next) {
    res.render('invalid', { title: 'Invalid' });
});
router.get('/invalid', function(req, res, next) {
    res.render('invalid', { title: 'Invalid' });
});

module.exports = router;
