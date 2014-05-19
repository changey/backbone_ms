

var casper = require('casper').create();
// starting the casper functionality by following the url given

casper.start('https://www.lifemiles.com/index.aspx');
casper.viewport(1500,1500);

casper.then(function() {
  var js = this.evaluate(function() {
    return document;
  });
  this.echo(js.all[0].outerHTML);
});

// Fill the login form that appear in twitter login page ,here the form class = clearfix signin js-signin ,username field name attribute =session[username_or_email] and password field name = session[password] 

//casper.then(function() {
//this.fill('#status-bar', {
//  'txtUser': 'alexdiaz03@outlook.com',
//  'username-pass': 'projectms',
//  'txtPassword': 'projectms'
//}, false);
//this.wait(1000);
//});
//casper.then(function clickButton() {
//	this.click('#botonlogin');
//  this.wait(1000);
//});
//
//casper.waitForSelector('#botonlogin', function() {
//  this.click('#botonlogin');
//});
//
//casper.thenOpen('https://www.lifemiles.com/eng/use/red/dynredpar.aspx');
//
//casper.then(function() {
//
//  this.evaluate(function() {
//    $("#cmbOrigen option:selected")[0].text='San Francisco (SFO), United States';
//    $("#cmbOrigen option:selected")[0].value="SFO";
//    $('#textOrigen').val('San Francisco (SFO), United States');
//    $('#textDestino').val('Taipei, Taiwan Taoyuan International Airport (TPE), Taiwan');
//
//    $("#cmbDestino option:selected")[0].text='Taipei, Taiwan Taoyuan International Airport (TPE), Taiwan';
//    $("#cmbDestino option:selected")[0].value="TPE";
//    $('#fechaSalida').val('09/18/2014');
//    $('#fechaRegreso').val('09/25/2014');
//    submitForm();
//    //$('a[href="javascript:goForm();"]').click();
//    var names = $("#cmbDestino option:selected")
//  });
//});
//
//
//
////casper.then(function() {
////
////  this.wait(1000);
////  this.capture('after.png');
////});
//
//casper.waitForSelector('#aspnetForm', function() {
//  this.echo(this.getCurrentUrl());
//  this.capture('after.png');
//}, function() {
//  this.echo("Timeout reached");
//  this.echo(this.getCurrentUrl());
//  this.capture('fail.png');
//  // do something
//}, 150000);



//Then run the casperjs 
casper.run();