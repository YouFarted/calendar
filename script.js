"use strict"

//////////////////////////////////////
// Browser UI stuff goes below here //
//////////////////////////////////////


var currentDayElement = null;

function grabPageElements()
{
  currentDayElement = document.getElementById("currentDay");
}

function uiSetTodaysDate()
{
  let now = moment();
  let formattedToday = now.format("dddd, MMMM Do");
  currentDayElement.innerText = formattedToday;
}

function browserMain()
{
  grabPageElements();
  uiSetTodaysDate();
}

///////////////////////////////////////////////////////
// Straight non-Browser non-UI stuff goes below here //
///////////////////////////////////////////////////////


function isNode()
{
  return ((typeof process) === 'object');
}

function assert(x)
{
  if(!x)
  {
    throw "FAIL: " + x + " isn't true.  And UR ugly.";
  }
}

// main
if(!isNode()) {
  browserMain();
}
else {
  nodeMain();
}

function nodeMain()
{
  console.log("Node is running.  If the script just completes silently then nothing below blew up.");
  
  //play();
  tests();
}

function play()
{
}

function deepArrayEquals(a, b)
{
  if (Array.isArray(a)){
    return (Array.isArray(b) && 
    a.length === b.length &&
    a.every((val, index) => deepArrayEquals(val, b[index])) );
  }
  return a === b;
}

function tests()
{
  testDeepArrayEquals();
}



function testDeepArrayEquals()
{
  assert(deepArrayEquals(1,1));
  assert(deepArrayEquals([],[]));
  assert(!deepArrayEquals(1,[]));
  assert(deepArrayEquals([1,2,3,4,5],[1,2,3,4,5]));
  assert(!deepArrayEquals([1,2,3,4,5],[1,2,3,4,6]));
}


//////////////////////////////////////
// Browser UI stuff goes below here //
//////////////////////////////////////


