var express = require('express');
var exec = require('child_process').exec;
var router = express.Router();

var history = [];

/* GET home page. */

router.get('/', function (req, res, next) {
    res.render('index', {title: 'web terminal'});
});

router.post('/', function (req, res, next) {

    var shell = req.body.shell;

    exec(shell, function (error, stdout, stderr) {

        history.push({
            command: shell,
            result: stdout
        })
        res.send(stdout);

        console.log('stdout: ' + stdout);
        console.log('stderr: ' + stderr);

        if (error !== null) {
            console.log('exec error: ' + error);
        }
    });

});


router.get('/result', function (req, res, next) {
    res.render('result', {title: 'Result'});
});

// router.get('/test', function(req, res, next) {
//     res.render('test', { title: 'Express' });
// });

// router.post('/test/submit', function(req, res, next) {
//     res.redirect('/test')
// });

module.exports = router;
