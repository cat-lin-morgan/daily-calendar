//daily planner to create a schedule
//data structure
var plans = [];

//in the header it will display current day
var currentTime = function () {
  var now = moment().format("MMM Do, YYYY hh:mm:ss a");
  //append the current time and date to the header
  $("#currentDay").text(now);
};

//make div a text area
var startEditPlans = function () {
  //this is the div col-8 overflow
  var parentClass = $(this).attr("class");
  var parentIndex = $(this).attr("data-plan-index");
  //grab target from the event
  var text = $(this)
    .children(".description")
    .text();
  //make new box
  var textArea = $("<textarea>")
    .addClass(parentClass)
    .attr("data-plan-index", parentIndex)
    .val(text)
    .on("blur", stopEditPlans);

  $(this).replaceWith(textArea);

  textArea.trigger("focus");
};

var stopEditPlans = function () {
  var parentClass = $(this).attr("class");
  var parentIndex = $(this).attr("data-plan-index");
  //get text area's current value and text
  var text = $(this)
    .val();
  //updating the global variable plans
  plans[parentIndex].text = text;
  //remake div
  var plansEl = $("<div>")
    .addClass(parentClass)
    .attr("data-plan-index", parentIndex)
    .on("click", startEditPlans);
  //remake p element
  var paraEl = $("<p>")
    .addClass("description")
    .text(text);
  //append p to div
  plansEl.append(paraEl);
  //replace text with p element
  $(this).replaceWith(plansEl);
};


//each time block will be color coated for current time, past, and future
var getRowColor = function (rowTime) {
  var timeIsInCurrentHour = moment().isBetween(rowTime, moment(rowTime).add(1, "h"));
  var timeIsBeforeRowTime = moment().isAfter(rowTime);
  var timeIsAfterRowTime = moment().isBefore(rowTime);
  //if time is current make red
  if (timeIsInCurrentHour) {
    return "present";
  }
  //if time is before now then grey
  if (timeIsBeforeRowTime) {
    return "past";
  }
  //if time is in future make green
  if (timeIsAfterRowTime) {
    return "future";
  }
};

var displayPlanRow = function(i, row) {
  var rowEl = $("<div>")
    .addClass("row");
  var timeEl = $("<div>")
    .addClass("col-2 hour");
  var timeWrapper = $("<p>")
    .addClass("p-3")
    .text(row.time);
  var plansEl = $("<div>")
    .addClass("col-8 overflow p-3")
    .addClass(getRowColor(row.timeStamp))
    .attr("data-plan-index", i)
    .on("click", startEditPlans);
  var textEl = $("<p>")
    .addClass("description")
    .text(row.text);
  var saveEl = $("<div>")
    .addClass("col-2 saveBtn d-flex justify-content-center align-items-center")
    .attr("data-plan-index", i)
    .html('<i class="far fa-save"></i>')
    .on("click", savePlans);
  //appending the children to their parents 
  timeEl.append(timeWrapper); 
  plansEl.append(textEl);
  rowEl.append(timeEl);
  rowEl.append(plansEl);
  rowEl.append(saveEl);
  $("#container").append(rowEl);
};

var displayPlanner = function () {
  $.each(plans, displayPlanRow);
};

//save event to local storage
var savePlans = function () {
  var planIndex = $(this).attr("data-plan-index");
  // get plans from local storage
  var localStoragePlans = loadPlans();
  // use plan index to copy specific plan from global
  localStoragePlans[planIndex] = plans[planIndex]; // and set it in local storage

  // save local storage
  localStorage.setItem("plans", JSON.stringify(localStoragePlans));
};

//load plans from local storage
var loadPlans = function () {
  var localStoragePlans = JSON.parse(localStorage.getItem("plans"));

  // if nothing in localStorage, create a new object to track all task status arrays
  if (!localStoragePlans) {
    localStoragePlans =  [
      // i
      { // row
        time: "9AM", 
        timeStamp: `${moment().format("MM/DD/YYYY")} 09:00 am`,
        text: "", 
      },
      {
        time: "10AM",
        timeStamp: `${moment().format("MM/DD/YYYY")} 10:00 am`,
        text: "",
      },
      {
        time: "11AM",
        timeStamp: `${moment().format("MM/DD/YYYY")} 11:00 am`,
        text: "",
      },
      {
        time: "12PM",
        timeStamp: `${moment().format("MM/DD/YYYY")} 12:00 pm`,
        text: "",
      },
      {
        time: "1PM",
        timeStamp: `${moment().format("MM/DD/YYYY")} 01:00 pm`,
        text: "",
      },
      {
        time: "2PM",
        timeStamp: `${moment().format("MM/DD/YYYY")} 02:00 pm`,
        text: "",
      },
      {
        time: "3PM",
        timeStamp: `${moment().format("MM/DD/YYYY")} 03:00 pm`,
        text: "",
      },
      {
        time: "4PM",
        timeStamp: `${moment().format("MM/DD/YYYY")} 04:00 pm`,
        text: "",
      },
      {
        time: "5PM",
        timeStamp: `${moment().format("MM/DD/YYYY")} 05:00 pm`,
        text: "",
      }
    ]
  }
  return localStoragePlans;
};

var startApplication = function () {
  //will load data from local storage
  plans = loadPlans();
  //will display it on page
  displayPlanner();
  //display current day
  setInterval(currentTime, 1000); //added seconds to make responsive clock for learning experiment
};

startApplication();