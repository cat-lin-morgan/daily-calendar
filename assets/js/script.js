//daily planner to create a schedule
//data structure
var plans = [];

//in the header it will display current day
var currentTime = function () {
  var now = moment().format("MM ddd, YYYY hh:mm:ss a");
  //append the current time and date to the header
}

var getRowColor = function (rowTime) {
  
  //if time is before now then grey

  //if time is current make red
  //if time is in future make green
  debugger;
} 

var displayPlanRow = function(i, row) {
  console.log(row);
  var rowEl = $("<div>")
    .addClass("row");
  var timeEl = $("<div>")
    .addClass("col-2")
    .text(row.time);
  var plansEl = $("<div>")
    .addClass("col-8")
    .addClass(getRowColor(row.time))
    .attr("id", row.time);
  var saveEl = $("<div>")
    .addClass("col-2");
  var saveBtn = $("<button>")
    .addClass("saveBtn")
    .html('<svg viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" width="15" height="15"><path d="M4.5 14.5v-3a1 1 0 011-1h4a1 1 0 011 1v3m3 0h-12a1 1 0 01-1-1v-12a1 1 0 011-1h8.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V13.5a1 1 0 01-1 1z" stroke="currentColor"></path></svg>');

  saveEl.append(saveBtn);
  rowEl.append(timeEl);
  rowEl.append(plansEl);
  rowEl.append(saveEl);
  $("#container").append(rowEl);

  //call function that makes plan input
  createPlan(row);
};


//function that creates each plan 
var createPlan = function (row) {
  
}

var displayPlanner = function () {
  $.each(plans, displayPlanRow);
}

//each time block will be color coated for current time, past, and future
//check the date
//label time grey if past
//label 

// when you click on time block there is input 
//you can save event or delete

// you can edit event or date
var auditTime = function () {

}

var auditPlan = function () {

}

//save event to local storage
var savePlans = function () {
  localStorage.setItem("plans", JSON.stringify(plans));
};

//load plans from local storage
var loadPlans = function () {
  plans = JSON.parse(localStorage.getItem("plans"));

  // if nothing in localStorage, create a new object to track all task status arrays
  if (!plans) {
    plans =  [
      // i
      { // row
        time: "9AM", 
        plans: [], 
      },
      {
        time: "10AM",
        plans: [],
      },
      {
        time: "11AM",
        plans: [],
      },
      {
        time: "12PM",
        plans: [],
      },
      {
        time: "1PM",
        plans: [],
      },
      {
        time: "2PM",
        plans: [],
      },
      {
        time: "3PM",
        plans: [],
      },
      {
        time: "4PM",
        plans: [],
      },
      {
        time: "5PM",
        plans: [],
      }
    ]
  }
};

var startApplication = function () {
  //will load data from local storage
  loadPlans();
  //will display it on page
  displayPlanner();
  //display current day
  currentTime();
};

startApplication();