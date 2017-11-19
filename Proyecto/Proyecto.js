function Coin (obj){
  this.nombre = obj.Nombre;
  this.axis = +obj.Axis;
  this.diametro = +obj.Diametro;
  date = obj.Fecha.split('-');
  if (isNaN(date[0])) {
    newDate = +date[1]
  } else{
    newDate = -1* +date[0]
  }
  this.fecha = newDate;
  this.peso = +obj.Peso;
  this.anverso = obj.Anverso;
  this.reverso = obj.Reverso;
}

var nemusProyect = function( p ) {
  var Color;
  var year = document.getElementById('yearIn');
  var diameterMin = document.getElementById('diameterMinIn');
  var diameterMax = document.getElementById('diameterMaxIn');
  var weightMin = document.getElementById('weightMinIn');
  var weightMax = document.getElementById('weightMaxIn');
  var searchBox = document.getElementById('searchIn');
  // var minYear = 1800;
  // var maxYear = 1900;
  var minDiameter = 10;
  var maxDiameter = 500;
  var minWeight = 10;
  var maxWeight = 300;
  var minDate = -500;
  var maxDate = 500;
  var lines;
  var data;
  var date;
  var newDate;
  var axisValue;
  // var rangeT = document.getElementById('testR');
  var radios = document.getElementsByName('yAxis');
  var axisStringMeasure;
  var xScale = 10.0;
  var yearOff = 0;
  var coins = [];
  document.getElementById('buttonSearch').onclick = function() {searchBox = document.getElementById('searhIn').value; alert(searchBox);};
  window.onload = function(){
  }
  // document.getElementById('yearIn').max = maxYear;
  // document.getElementById('yearIn').min = minYear;

  p.preload = function(){
    lines = p.loadTable("/data/nomisma1.csv",'csv','header'); //////////////////////////////
  }

  p.setup = function() {
    p.createCanvas(700, 400);
    var c;
    for (var i = 0; i < lines.getRowCount(); i++) {
      c = new Coin(lines.rows[i].obj);
      coins.push(c);
    }
    console.log(coins[73]);
  };

  p.draw = function() {
    document.getElementById('diameterMinIn').min = minDiameter;
    document.getElementById('diameterMinIn').max = document.getElementById('diameterMaxIn').value;
    document.getElementById('diameterMaxIn').min = document.getElementById('diameterMinIn').value;
    document.getElementById('diameterMaxIn').max = maxDiameter;
    document.getElementById('spanDiamMin').innerHTML = document.getElementById('diameterMinIn').value;
    document.getElementById('spanDiamMax').innerHTML = document.getElementById('diameterMaxIn').value;
    document.getElementById('weightMinIn').min = minWeight;
    document.getElementById('weightMinIn').max = document.getElementById('weightMaxIn').value;
    document.getElementById('weightMaxIn').min = document.getElementById('weightMinIn').value;
    document.getElementById('weightMaxIn').max = maxWeight;
    document.getElementById('spanWeightMin').innerHTML = document.getElementById('weightMinIn').value;
    document.getElementById('spanWeightMax').innerHTML = document.getElementById('weightMaxIn').value;
    document.getElementById('dateMinIn').min = minDate;
    document.getElementById('dateMinIn').max = document.getElementById('dateMaxIn').value;
    document.getElementById('dateMaxIn').min = document.getElementById('dateMinIn').value;
    document.getElementById('dateMaxIn').max = maxDate;
    document.getElementById('spanDateMin').innerHTML = document.getElementById('dateMinIn').value;
    document.getElementById('spanDateMax').innerHTML = document.getElementById('dateMaxIn').value;
    document.getElementById('dateRange').max = maxDate;
    document.getElementById('dateRange').min = minDate;
    yearOff = document.getElementById('dateRange').value;
    // document.getElementById('spanDateRange').innerHTML = yearOff;

    // console.log(diameterMin.value, diameterMax.value, weightMin.value, weightMax.value);
    for (var i = 0, length = radios.length; i < length; i++){
      if (radios[i].checked){
        // do whatever you want with the checked radio
        axisValue = radios[i].value;
        // only one radio can be logically checked, don't check the rest
        break;
      }
    }
    p.background(255);
    p.translate(p.width/2.0,p.height);
    p.text("Año",10,-7);
    if (axisValue == 1) {
      p.text("Diametro",-p.width/2.0,-300);
      axisStringMeasure = "mm";
    } else {
      p.text("Peso",-p.width/2.0,-300);
      axisStringMeasure = "gr";
    }
    p.translate(-yearOff*10.0,0);
    p.translate(0,-30);

    p.line(0,30,0,-p.height);
    p.line(minDate*xScale,0,maxDate*xScale,0);
    p.push()
    p.stroke(0,30)
    for (var i = -500; i < 501; i+=50) { // Lineas verticales
      if (i != 0) {
        p.line(i*xScale,30,i*xScale,-p.height);
        p.fill(0,50)
        p.text(i.toString(),i*xScale,13);
      }
    }
    p.text("0",1,13);
    p.fill(0)
    for (var i = 20; i < 261; i+=20) { // Lineas horizontales
      p.line(minDate*xScale,-i,maxDate*xScale,-i);
      p.fill(0,50)
      p.text(i.toString()+axisStringMeasure,1,-i);
    }
    p.pop()
    p.push()
    p.noFill();
    p.strokeWeight(1);
    for (var i = 0; i < coins.length; i++) {
      var centerX = coins[i].fecha*xScale;
      var centerY;
      var diameter = coins[i].diametro;
      if (axisValue == 1) {
        centerY = -diameter;
        p.push();
        if ((p.pow((p.mouseX-(p.width/2.0)+yearOff*10.0 - centerX),2)+p.pow((p.mouseY-p.height+30 - centerY),2)) <= p.pow(diameter/2.0,2)) {
          p.stroke(p.random(255),p.random(255),p.random(255));
          console.log(i);
        }
        p.ellipse(centerX,centerY,diameter,diameter);
        p.pop();
      }else {
        centerY = -coins[i].peso;
        p.push();
        if ((p.pow((p.mouseX-(p.width/2.0)+yearOff*10.0 - centerX),2)+p.pow((p.mouseY-p.height+30 - centerY),2)) <= p.pow(diameter/2.0,2)) {
          p.stroke(p.random(255),p.random(255),p.random(255));
          console.log(i);
        }
        p.ellipse(centerX,centerY,diameter,diameter);
        p.pop();
      }
      // if (i == 862) { // Moneda grande
      // }
    }

    p.pop()

    p.translate(-60,30);
    // p.translate(yearOff*10.0,0);
    p.translate(-p.width/2.0,-p.height);
  };

  p.mousePressed = function(){
    // console.log(p.mouseX-(p.width/2.0)-yearOff*10.0,p.mouseY-p.height,yearOff,yearOff*10.0);
  };

  // p.windowResized = function(){
  //   p.resizeCanvas(p.windowWidth-550, 400);
  // }
};

var varProyect = new p5(nemusProyect, 'nemusProyect');
