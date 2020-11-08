"use strict"

//////////////////////////////////////
// Browser UI stuff goes below here //
//////////////////////////////////////

var jCurrentDayElement          = null;
var jTimeblockContainerElementj = null;

function grabPageElements()
{
  jCurrentDayElement = $("#currentDay");
  jTimeblockContainerElementj = $("#timeblock-container");
}

function uiPopulateAllBusinessHours()
{
  // I force now to be evenly on the hour for easy comparison
  let now = moment({minute:0}); 
  /* TODO remove the following assignment.  It is after-hours while I write this 
  so I won't get a variety of past/present/future unless I 
  fake the time.  So I am.  I'll pretend it is noon.*/
  now = moment({hour: 12, minute:0});
  let formattedToday = now.format("dddd, MMMM Do");

  for(let i=0; i<=8;++i)
  {
    let hour = i + 9; // 8 hours starting at 9
    let currentHourMoment = moment({hour: hour});
    let formattedCurrentHour = currentHourMoment.format("hhA");

    // create the following programatically
    // TODO: choose past/present/future correctly - for now HARDCODE
    // <div class="time-block row future">
    //   <div class="hour">-----The hour</div>
    //   <textarea>Words</textarea>
    //   <button class="saveBtn"><i class="fa fa-save"> Save</i></button>
    // </div>
    let pastPresentFuture = "";
    
    let isPast   = currentHourMoment.isBefore(now);
    let isFuture = currentHourMoment.isAfter(now);
    if(isPast) {
      pastPresentFuture = "past";
    } else if(isFuture) {
      pastPresentFuture = "future";
    } else {
      pastPresentFuture = "present";
    }

    console.log(`hour ${hour} is in the ${pastPresentFuture}`);
    console.log(`isPast = ${isPast}, isFuture = ${isFuture}`);
    let jTimeBlockDiv = $("<div>");
    jTimeBlockDiv.addClass("time-block").addClass("row").addClass(pastPresentFuture);

    console.log(`i = ${i}`)

    let jHourDiv = $("<div>").addClass("hour").text(formattedCurrentHour);
    let jTextArea = $("<textarea>"); // later, i'll load saved
    let jButton = $("<button>").addClass("saveBtn");
    let jButtonItalicElement = $("<i>").addClass("fa").addClass("fa-save").text(" Save");
    jButton.append(jButtonItalicElement);
    jTimeBlockDiv.append(jHourDiv).append(jTextArea).append(jButton);
    jTimeblockContainerElementj.append(jTimeBlockDiv);
  }
}

function uiSetTodaysDate()
{
  let now = moment();
  let formattedToday = now.format("dddd, MMMM Do");
  jCurrentDayElement.text(formattedToday);
}

function browserMain()
{
  grabPageElements();
  uiSetTodaysDate();
  uiPopulateAllBusinessHours();
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


