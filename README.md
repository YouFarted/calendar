# calendar

## Table of Contents

* [Goal](#goal)
* [Acceptance Criteria](#acceptance-criteria)
* [Changes](#changes)
* [Live Project](#live-project)

## Goal

Provided an index.html/style.css which provide an outline of how a calendar is to be displayed, create an hourly calendar
## Acceptance Criteria
```
GIVEN I am using a daily planner to create a schedule
WHEN I open the planner
THEN the current day is displayed at the top of the calendar
WHEN I scroll down
THEN I am presented with timeblocks for standard business hours
WHEN I view the timeblocks for that day
THEN each timeblock is color coded to indicate whether it is in the past, present, or future
WHEN I click into a timeblock
THEN I can enter an event
WHEN I click the save button for that timeblock
THEN the text for that event is saved in local storage
WHEN I refresh the page
THEN the saved events persist
```

## Changes
I used a baseline script from an earlier project and then
played with the provided html to figure out how to create the structure that i'll need to add dynamically.  Then I added code to create the time divs upon load. Then I added
load and store from and to localStorage and rigged up the save buttons to save while filling the textareas in the UI
with the saved schedule items upon load.  I added a clear
button for localstorage only and a clear that clears the
localstorage and the UI.

## Live Project

github project page: https://github.com/YouFarted/calendar<br/>
github live site: https://youfarted.github.io/calendar/
