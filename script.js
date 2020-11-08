"use strict"

//////////////////////////////////////
// Browser UI stuff goes below here //
//////////////////////////////////////

var jCurrentDayElement          = null;
var jTimeblockContainerElement = null;
var jClearSavedButton           = null;
var jClearUIButton              = null;

function grabPageElements()
{
  jCurrentDayElement = $("#currentDay");
  jTimeblockContainerElement = $("#timeblock-container");
  jClearSavedButton = $("#clear-saved-schedule-button");
  jClearUIButton = $("#clear-ui-button");
}

function loadLocalStorageSchedule()
{
  let emptyDaySchedule = new Array(8);
  let scheduleString = localStorage.getItem("schedule");
  if( !scheduleString ){
    return emptyDaySchedule;
  }
  else {
    if(scheduleString[0] != "[")
    {
      return emptyDaySchedule;
    }
    let scheduleArray = JSON.parse(scheduleString);
    if(typeof(scheduleArray) !== "object"){
      return emptyDaySchedule;
    }
    return scheduleArray;
  }
}

function saveLocalStorageSchedule(schedule)
{
  let str = JSON.stringify(schedule);
  localStorage.setItem("schedule", str);
}

function saveTimeI(i, text)
{
  let scheduleArray = loadLocalStorageSchedule();

  scheduleArray[i] = text;

  saveLocalStorageSchedule(scheduleArray);
}

function uiPopulateAllBusinessHours()
{
  let scheduleArray = loadLocalStorageSchedule();
  // I force variable "now" to be evenly on the hour for easy comparison
  let now = moment({minute:0}); 
  let formattedToday = now.format("dddd, MMMM Do");

  let schedule = loadLocalStorageSchedule();

  for(let i=0; i<=8;++i)
  {
    let hour = i + 9; // 8 hours starting at 9
    let currentHourMoment = moment({hour: hour});
    let formattedCurrentHour = currentHourMoment.format("hhA");

    // create the following programatically
    // <div class="time-block row future">
    //   <div class="hour">The hour</div>
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
    jTimeBlockDiv
      .addClass("time-block")
      .addClass("row")
      .addClass(pastPresentFuture);
    // save index as a data element for convienent retrieval 
    // from a bubbled click using event.target
    jTimeBlockDiv.data("index", i);

    let jHourDiv = $("<div>").addClass("hour").text(formattedCurrentHour);
    let jTextArea = $("<textarea>").val(scheduleArray[i]);
    let jButton = $("<button>").addClass("saveBtn");
    let jButtonItalicElement = $("<i>").addClass("fa").addClass("fa-save").text(" Save");
    jButton.append(jButtonItalicElement);
    jTimeBlockDiv.append(jHourDiv).append(jTextArea).append(jButton);
    jTimeblockContainerElement.append(jTimeBlockDiv);
  }
}

function uiSetTodaysDate()
{
  let now = moment();
  let formattedToday = now.format("dddd, MMMM Do");
  jCurrentDayElement.text(formattedToday);
}

function uiRegisterEvents()
{
  jTimeblockContainerElement.on("click", function(e){
    let tgt = e.target;
    let tgtTag = tgt.tagName;
    let jTimeblockDiv = null;
    // it can bubble through the italic element in which 
    // case the target is one level deeper
    // so I do .parent().parent() in the case of I element targets
    if(tgtTag === "BUTTON") {
      jTimeblockDiv = $(e.target).parent();
    } else if(tgtTag === "I") {
      let iParent = $(e.target).parent();
      console.log(`iParent = ${iParent}`);
      jTimeblockDiv = $(e.target).parent().parent();
    } else return;

    // jTimeblockDiv must be set here otherwise I would have returned already
    let index = jTimeblockDiv.data("index");
    let textareaText = jTimeblockDiv.find("textarea").val();
    console.log(`save text "${textareaText}" to index ${index}`);
    saveTimeI(index, textareaText);
  });
  jClearSavedButton.on("click", function(e){
    localStorage.removeItem("schedule");
    loadLocalStorageSchedule();
  });
  jClearUIButton.on("click", function(e){
    localStorage.removeItem("schedule");
    uiPopulateAllBusinessHours();
  }); 
}

function browserMain()
{
  grabPageElements();
  uiSetTodaysDate();
  uiPopulateAllBusinessHours();
  uiRegisterEvents();
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
