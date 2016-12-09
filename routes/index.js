var express = require('express');
var exec = require('child_process').exec;
var router = express.Router();

var history = [];

router.get('/', function (req, res, next) {
    res.render('index', {title: 'web terminal'});
});

router.post('/', function (req, res, next) {

    var shell = req.body.shell;
    var shellCom = req.body.shellCom;
    // var startTime = req.body.startTime;

    var startTime = formatDate(new Date());

    exec(shell, function (error, stdout, stderr) {

        var endTime = formatDate(new Date());

        history.push({
            command: shell,
            comment: shellCom,
            result: stdout,
            startTime: startTime,
            endTime: endTime
        })

        res.send(stdout);

        console.log('stdout: ' + stdout);
        console.log('stderr: ' + stderr);

        if (error !== null) {
            console.log('exec error: ' + error);
        }
    });

});

function formatDate(dateField) {

    var ms = dateField.getMilliseconds();
    if (ms < 10) ms = '0' + ms;

    var ss = dateField.getSeconds();
    if (ss < 10) ss = '0' + ss;

    var mn = dateField.getMinutes();
    if (mn < 10) mn = '0' + mn;

    var hh = dateField.getHours();
    if (hh < 10) hh = '0' + hh;

    return hh + ':' + mn + ':' + ss + ':' + ms;
}


router.get('/result', function (req, res, next) {

    res.render('result', {title: 'web terminal', result: history});
});

module.exports = router;
