// var casper = require('casper').create();
var casper = require('casper').create({
    clientScripts:  [
        'jquery-1.11.3.js'
    ],
    pageSettings: {
        loadImages: false,
        loadPlugins: false
    },
    verbose: true,
    waitTimeout: 20000,
    // logLevel: 'debug'

});

var count = casper.cli.get(0) ? parseInt(casper.cli.get(0), 10) : 10;
casper.echo(count, 'INFO');
casper.start().repeat(count, function() {

    this.userAgent('Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.017902.801 Safari/537.36');
    this.thenOpen('http://nownews.com/', function() {
        var foo = this.evaluate(function() {
            return $('#headline a').attr('href');
        });

        var url = 'http://nownews.com' + foo;

        this.then(function() {
            this.click('#headline');
        });

        this.echo(url, 'INFO');

        this.thenOpen(url, function() {
            var bar = this.evaluate(function() {
                return document.title;
            });
            this.echo(bar, 'INFO');
        });
    });
});

// casper.then(function(){
//     var bar = this.evaluate(function(){
//         return $('a').attr('href');
//     });
//     this.echo(bar, 'INFO');
//     this.click('a');
// });

// casper.then(function() {
//     console.log('clicked ok, new location is ' + this.getCurrentUrl());
// });

// casper.then(function () {
//     this.back();
// });

// casper.then(function() {
//     console.log('clicked ok, new location is ' + this.getCurrentUrl());
// });



// setInterval(function(){
//     casper.run();
// }, 120000);

casper.run();

