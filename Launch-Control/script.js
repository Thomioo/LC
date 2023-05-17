// Set the davar mouse = false;
var now;
var pressed;
var distance;
var seconds;
var run = false;
var launching = false;
var mouse;

var scrollToBottomm = function()
{
  var output = document.getElementById("output");
  output.scrollTop = output.scrollHeight;
}


function mousedown()
{
  mouse = true;
  pressed = new Date().getTime();
  run = false;
  callEvent();
}
function mouseup()
{
  document.getElementById("btn").style.backgroundColor = "blanchedalmond";
  if(launching == false)
  {
    mouse = false;
    if (run == true)
    {
      send();
    }
  }
}


function callEvent()
{
  if(launching == false)
  {
    if(mouse)
    {
      now = new Date().getTime();
      distance = pressed - now;
      seconds = Math.floor((distance % (1000 * 60)) / 1000);
      if (seconds <= -5)
      {
        document.getElementById("btn").style.backgroundColor = "#32de84";
        run = true;
      }
      // document.getElementById("btn").innerHTML = seconds
      setTimeout("callEvent()",100);
    }else
    {
      return false;
    }
  }
}

var connect = function(){
  if(launching == false)
  {
    var site = "http://" + document.getElementById("adress").value.toString() + ":8000/";
    fetch(site)
    .then(response => response.text())
    .then(data => {
      var temp = document.getElementById("output").innerHTML;
      temp += data + "<br><br>";
      document.getElementById("output").innerHTML = temp;
      scrollToBottomm();
    })
    .catch(function()
      {
        var temp = document.getElementById("output").innerHTML;
        temp += "<strong>ERROR</strong>: didn't recieve a response, server might not be running or the IP adress might be wrong<br><br>";
        document.getElementById("output").innerHTML = temp;
        scrollToBottomm();
      })
  }
}

function reset()
{
  if(launching == false)
  {
    document.getElementById("output").innerHTML = "";
  }
}

var request = function()
{
  var temp = document.getElementById("output").innerHTML;
  temp += "sent request.<br>";
  document.getElementById("output").innerHTML = temp;
  scrollToBottomm();

  // var orgSite = "http://192.168.2.241:8000/start";
  var site = "http://" + document.getElementById("adress").value.toString() + ":8000/start";
  fetch(site)
    .then(response => response.text())
    .then(data => 
      {
        var temp = document.getElementById("output").innerHTML;
        temp += "got response:<br>";
        document.getElementById("output").innerHTML = temp;
        scrollToBottomm();

        var temp = document.getElementById("output").innerHTML;
        temp += data + "<br><br>";
        document.getElementById("output").innerHTML = temp;
        scrollToBottomm();
        launching = false;
      })
    .catch(function()
      {
        var temp = document.getElementById("output").innerHTML;
        temp += "<strong>ERROR</strong>: didn't recieve a response, server might not be running or the IP adress might be wrong<br><br>";
        document.getElementById("output").innerHTML = temp;
        scrollToBottomm();
        launching = false;
      })
}



function send() {
        launching = true;
        var temp = document.getElementById("output").innerHTML;
        temp += "starting...<br>";
        document.getElementById("output").innerHTML = temp;
        scrollToBottomm();

        var timeLeft = 10;
        var temp = document.getElementById("output").innerHTML;
        temp += timeLeft + "<br>";
        document.getElementById("output").innerHTML = temp;
        scrollToBottomm();
        timeLeft --;
        var countdownTimer = setInterval(function()
        {
          if(timeLeft == 0)
          {
            request();
            return clearInterval(countdownTimer);
          }

          var temp = document.getElementById("output").innerHTML;
          temp += timeLeft + "<br>";
          document.getElementById("output").innerHTML = temp;
          scrollToBottomm();
          timeLeft -= 1;
        }, 1000);
}