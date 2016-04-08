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
    // logLevel: 'debug' //如果要看 debug 模式請把註解拿掉
});

var count = 0; // 計算目前爬了幾次

var cliUrl = casper.cli.get('url'); // 從外部參數帶入 url

var countTotal = casper.cli.get(0) ? parseInt(casper.cli.get(0), 10) : 10; // 總共要爬的次數
casper.echo('重複次數: ' + countTotal, 'GREEN_BAR');

casper.start().repeat(countTotal, function() {

    // 設定 userAgent
    this.userAgent('Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.017902.801 Safari/537.36');

    this.echo('開始時間: ' + new Date(), 'COMMENT');

    // 先爬新聞首頁
    this.thenOpen('http://nownews.com/', function() {

        var foo = this.evaluate(function() {
            var newsTotal = $('#headline a').length;
            var number = Math.floor((Math.random() * newsTotal) + 1);
            return $('#headline a')[number].href;
        });

        this.echo('step1, 爬取連結: ' + this.getCurrentUrl(), 'INFO');
        this.then(function() {
            this.click('#headline');
        });

        // console.log(zoo);

        // 爬大三小六或是外部傳入的連結
        var url = cliUrl === undefined ? foo : cliUrl;
        url = url === null ? 'http://www.nownews.com' : url;
        this.echo('step2, 爬取連結: ' + url, 'INFO');
        this.thenOpen(url, function() {
            var bar = this.evaluate(function() {
                return document.title;
            });
            this.echo('step3, 爬到的新聞標題: ' + bar, 'INFO');
            this.echo('結束時間: ' + new Date(), 'COMMENT');
            count++;
            this.echo('爬取進度 ' + count + '/' + countTotal, 'INFO_BAR');
        });
    });
});

casper.run();

