dayjs.extend(window.dayjs_plugin_weekOfYear); //adds dayjs week of year api plugin

// TODO: Add html element selectors here:
var timeContainer = document.querySelector("#time-container");
var buttonsContainer = document.querySelector("#buttons-container");
var sunTimeSection = document.querySelector("#sun-hours");
var monTimeSection = document.querySelector("#mon-hours");
var tueTimeSection = document.querySelector("#tue-hours");
var wedTimeSection = document.querySelector("#wed-hours");
var thurTimeSection = document.querySelector("#thur-hours");
var friTimeSection = document.querySelector("#fri-hours");
var satTimeSection = document.querySelector("#sat-hours");
var sunHeader = document.querySelector("#sun-header");
var monHeader = document.querySelector("#mon-header");
var tueHeader = document.querySelector("#tue-header");
var wedHeader = document.querySelector("#wed-header");
var thurHeader = document.querySelector("#thur-header");
var friHeader = document.querySelector("#fri-header");
var satHeader = document.querySelector("#sat-header");
var timeSlotSections = [
  sunTimeSection,
  monTimeSection,
  tueTimeSection,
  wedTimeSection,
  thurTimeSection,
  friTimeSection,
  satTimeSection,
];
var weekHeaders = [
  sunHeader,
  monHeader,
  tueHeader,
  wedHeader,
  thurHeader,
  friHeader,
  satHeader,
];
var hoursArray = [
  "12am",
  "1am",
  "2am",
  "3am",
  "4am",
  "5am",
  "6am",
  "7am",
  "8am",
  "9am",
  "10am",
  "11am",
  "12pm",
  "1pm",
  "2pm",
  "3pm",
  "4pm",
  "5pm",
  "6pm",
  "7pm",
  "8pm",
  "9pm",
  "10pm",
  "11pm",
];

// TODO: Time slot functions - generate unique id / generate the timeblock with id
// TODO: retrieve saved local storage events and display when generating timeslots
function generateTimeSlots() {
  // *removes any existing timeslots first*//
  for (let j = 0; j < timeSlotSections.length; j++) {
    if (timeSlotSections[j].children.length > 0) {
      while (timeSlotSections[j].firstChild) {
        timeSlotSections[j].removeChild(timeSlotSections[j].lastChild);
      }
    }
  }

  var selectedDates = timeContainer.getAttribute("data-dateIDs").split(","); // gets selected week dates from stored data-dateIDs

  // *generates timeslots: outer loop goes through each column(Sun-Sat) and nested loop goes through each hour(12am-11pm)*//
  for (let j = 0; j < timeSlotSections.length; j++) {
    for (let i = 0; i < 25; i++) {
      // create time slot list element
      var newTimeSlot = document.createElement("li");
      if (i == 0) {
        timeSlotID = selectedDates[j]; // first list element is for holiday dates
        newTimeSlot.setAttribute("id", timeSlotID); // unique ID for each time slot
        newTimeSlot.setAttribute("class", "list-group-item holiday"); // adds bootstrap classes and holiday class
        timeSlotSections[j].appendChild(newTimeSlot); //append to column
      } else {
        timeSlotID = selectedDates[j] + (i - 1); // the remaining hours (0 - 24)
        newTimeSlot.setAttribute("id", timeSlotID); // unique ID for each time slot
        newTimeSlot.setAttribute("class", "time-slot list-group-item"); // adds bootstrap classes and .time-slot class

        // create hour div for mobile responsiveness and event div
        var newHourDiv = document.createElement("div");
        var newEventDiv = document.createElement("div");
        newHourDiv.setAttribute("class", "slot-hour d-block d-lg-none");
        newEventDiv.setAttribute("class", "slot-event");
        newHourDiv.textContent = hoursArray[i - 1];
        newTimeSlot.append(newHourDiv, newEventDiv);
        // newEventDiv.textContent = timeSlotID;

        timeSlotSections[j].appendChild(newTimeSlot); //append to column

        //** to retrieve localstorage data **//
        if (localStorage.getItem(timeSlotID)) {
          console.log("there's an item in " + timeSlotID);
          var informationFromID = timeSlotID.split("-");
          // console.log(informationFromID);
          updateScheduleDisplay(
            informationFromID[4],
            informationFromID[1],
            informationFromID[2],
            informationFromID[3]
          );
          excuseID = timeSlotID + "excuse";
          if (localStorage.getItem(excuseID)) {
            var excuseButton = newTimeSlot.querySelector(".excuse-button");
            excuseButton.click();
          }
          newTimeSlot.addEventListener("click", showModifyEventPopup);
        } else {
          newTimeSlot.addEventListener("click", showEventPopup);
        }
      }

      //   newTimeSlot.addEventListener("click", function (event) {
      //     if (localStorage.getItem(timeSlotID)) {
      //       showModifyEventPopup(event);
      //     } else {
      //       showEventPopup(event);
      //     }
      //   });
    }
  }
}

// TODO: Dayjs functions - get current week and display correct formattedDates
// TODO: Dayjs functions - get next week and display next week formattedDates
// TODO: Dayjs functions - get today's week and display today's week formattedDates
// TODO: Dayjs functions - get previous week formattedDates and display previous week formattedDates
timeContainer.setAttribute("data-week-change", 0); // keeps track of week changes from today's week

function generateWeek() {
  // ** variables to store important date data **//
  var weekChange = timeContainer.getAttribute("data-week-change");
  var thisWeek = dayjs().week();
  var selectedWeek = thisWeek + parseInt(weekChange);
  var selectedDates = [];
  var datesForHolidayAPI = [];
  // console.log("selected week is:" + selectedWeek);
  // console.log("change week tracker is:" +weekChange);

  // ** creates selected week dates, stores it into an array and displays formatted date **//
  for (let i = 0; i < 7; i++) {
    formattedDate = dayjs()
      .week(selectedWeek)
      .startOf("week")
      .add(i, "day")
      .format("ddd D.M.YY");
    dateID =
      "d" +
      dayjs()
        .week(selectedWeek)
        .startOf("week")
        .add(i, "day")
        .format("-DD-MM-YYYY-");
    dateHolidayFormat = dayjs()
      .week(selectedWeek)
      .startOf("week")
      .add(i, "day")
      .format("YYYY-MM-DD");
    // console.log(formattedDate);
    // console.log(dateID);
    selectedDates.push(dateID);
    datesForHolidayAPI.push(dateHolidayFormat);
    weekHeaders[i].textContent = formattedDate;
  }

  // console.log(selectedDates.toString());
  timeContainer.setAttribute("data-dateIDs", selectedDates.toString());
  timeContainer.setAttribute(
    "data-datesHoliday",
    datesForHolidayAPI.toString()
  );
}

function createPreviousWeekButton() {
  var previousWeekButton = document.createElement("button");
  var leftArrowIcon = document.createElement("i");
  leftArrowIcon.setAttribute("class", "fa-solid fa-chevron-left");
  previousWeekButton.setAttribute("class", "btn");
  previousWeekButton.append(leftArrowIcon);
  buttonsContainer.append(previousWeekButton);
  previousWeekButton.addEventListener("click", previousWeek);
}

function createTodayWeekButton() {
  var TodayWeekButton = document.createElement("button");
  TodayWeekButton.textContent = "Today's Week";
  TodayWeekButton.setAttribute("class", "btn");
  buttonsContainer.append(TodayWeekButton);
  TodayWeekButton.addEventListener("click", todayWeek);
}

function createNextWeekButton() {
  var nextWeekButton = document.createElement("button");
  var rightArrowIcon = document.createElement("i");
  rightArrowIcon.setAttribute("class", "fa-solid fa-chevron-right");
  nextWeekButton.setAttribute("class", "btn");
  nextWeekButton.append(rightArrowIcon);
  buttonsContainer.append(nextWeekButton);
  nextWeekButton.addEventListener("click", nextWeek);
}

function previousWeek() {
  var weekChange = timeContainer.getAttribute("data-week-change");
  removeCurrentDayHighlight();
  weekChange -= 1;
  // console.log("previous week clicked: " + weekChange);
  timeContainer.setAttribute("data-week-change", weekChange);
  generateWeek();
  generateTimeSlots();
  fetchHolidays();
  if (weekChange == 0) {
    highlightCurrentDay();
  }
  closePopup();
}

function todayWeek() {
  var weekChange = timeContainer.getAttribute("data-week-change");
  weekChange = 0;
  // console.log("next week clicked: " + weekChange);
  timeContainer.setAttribute("data-week-change", weekChange);
  generateWeek();
  generateTimeSlots();
  fetchHolidays();
  if (weekChange == 0) {
    highlightCurrentDay();
  }
  closePopup();
}

function nextWeek() {
  var weekChange = timeContainer.getAttribute("data-week-change");
  removeCurrentDayHighlight();
  weekChange = parseInt(weekChange) + 1;
  // console.log("next week clicked: " + weekChange);
  timeContainer.setAttribute("data-week-change", weekChange);
  generateWeek();
  generateTimeSlots();
  fetchHolidays();
  if (weekChange == 0) {
    highlightCurrentDay();
  }
  closePopup();
}

// TODO: Dayjs functions - highlight current day column
function highlightCurrentDay() {
  var currentDay = dayjs().format("-DD-MM-YYYY-");
  // for (let i = 0; i < 25; i++) {
  //     if (i == 0) {
  var currentDayID = "#d" + currentDay;
  // } else {
  //     var currentDayID = '#d' + currentDay + (i - 1)
  // }
  // console.log(currentDayID);
  var currentTimeSlot = document.querySelector(currentDayID);
  currentTimeSlot.parentElement.parentElement.setAttribute(
    "class",
    "card daycard border-success border-2"
  );
  // currentTimeSlot.setAttribute('class', 'time-slot list-group-item current-day')
  // }
}

function removeCurrentDayHighlight() {
  var weekChange = timeContainer.getAttribute("data-week-change");
  if (weekChange == 0) {
    var currentDay = dayjs().format("-DD-MM-YYYY-");
    var currentDayID = "#d" + currentDay;
    var currentTimeSlot = document.querySelector(currentDayID);
    currentTimeSlot.parentElement.parentElement.setAttribute(
      "class",
      "card daycard"
    );
  }
}

// TODO: Holiday API functions - fetch and match formattedDate to holiday
// TODO: Holiday API functions - display holiday to calendar
function fetchHolidays() {
  var holidaysURL = "https://www.gov.uk/bank-holidays.json";
  fetch(holidaysURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var datesForHolidayAPI = timeContainer
        .getAttribute("data-datesHoliday")
        .split(","); // gets selected week dates from stored data-datesHoliday
      var selectedDates = timeContainer.getAttribute("data-dateIDs").split(","); // gets selected week dates from stored data-dateIDs
      // console.log(data);
      // console.log(data["england-and-wales"]);
      for (let j = 0; j < datesForHolidayAPI.length; j++) {
        // loops through a 7-day array to check for any holidays
        for (let i = 0; i < data["england-and-wales"].events.length; i++) {
          // loops through the holidayAPI data to check for a date match
          if (
            datesForHolidayAPI[j] == data["england-and-wales"].events[i].date
          ) {
            // Check for a date match
            var holidayID = "#" + selectedDates[j]; // get the correct unique date ID
            var holidayDiv = document.querySelector(holidayID); // selects correct holidayDiv
            holidayDiv.textContent = data["england-and-wales"].events[i].title; // updates text to show the holiday name
          }
        }
      }
    });
}

// TODO: Event Creation functions - create pop up with user input fields
function showEventPopup(event) {
  // console.log(event.target.getAttribute('id'));
  var existingPopup = document.querySelector(".event-popup");
  if (existingPopup) {
    document.body.removeChild(existingPopup);
  }

  var popup = document.createElement("div");
  popup.setAttribute("class", "event-popup bg-white border-primary mb-3 p-3");

  var mouseX = event.clientX;
  var mouseY = event.clientY;

  var popupWidth = 300; // Adjust the popup width as needed
  var popupHeight = 600; // Adjust the popup height as needed

  var maxX = window.innerWidth - popupWidth;
  var maxY = window.innerHeight - popupHeight;

  var adjustedX = Math.min(mouseX, maxX);
  var adjustedY = Math.min(mouseY, maxY);

  popup.style.position = "fixed";
  popup.style.top = `${adjustedY}px`;
  popup.style.left = `${adjustedX}px`;

  // console.log(event.target);
  var eventID = event.target.getAttribute("id");
  // console.log(eventID);

  // popup.setAttribute("data-storageID", eventID);

  var informationFromID = eventID.split("-");
  console.log(informationFromID);
  selectedEventDate = `${informationFromID[3]}-${informationFromID[2]}-${informationFromID[1]}`;
  if (informationFromID[4] < 10) {
    selectedEventTime = `0${informationFromID[4]}:00`;
  } else {
    selectedEventTime = `${informationFromID[4]}:00`;
  }

  popup.innerHTML = `
        <h2>Create Event</h2>
        <label for="eventName">Event Name:</label>
        <input type="text" id="eventName" required><br>
        <label for="eventTime">Event Time:</label>
        <input type="time" step="3600000" id="eventTime" value=${selectedEventTime} required><br>
        <label for="eventDate">Event Date:</label>
        <input type="date" id="eventDate" value=${selectedEventDate} required><br>
        <label for="eventCategory">Category:</label>
        <select id="eventCategory" name="category">
        <option value="family">Family</option>
        <option value="office">Office</option>
        <option value="children">Children</option>
        <option value="college">College</option>
        <option value="party">Party</option>
        <option value="funny">Funny</option>
        <option value="unbelievable">Unbelievable</option>
        <option value="developers">Developer</option>
        <option value="gaming">Gaming</option>
        </select>
        <button onclick="saveEvent(event)">Save Event</button>
        <button onclick="closePopup()">Cancel</button>
    `;
  document.body.appendChild(popup);
}

// TODO: Event Creation functions - close popup
function closePopup() {
  var popup = document.querySelector(".event-popup");
  if (popup) {
    document.body.removeChild(popup);
  }
}

// TODO: Event Creation functions - save event details to local storage with specific timeslot and date
function saveEvent(event) {
  var eventName = document.getElementById("eventName").value;
  var eventDate = document.getElementById("eventDate").value;
  var eventTime = document.getElementById("eventTime").value;
  var eventCategory = document.getElementById("eventCategory").value;
  var eventID = event.target.parentElement.getAttribute("data-storageID");

  var eventDetails = {
    name: eventName,
    date: eventDate,
    time: eventTime,
    category: eventCategory,
  };

  if (parseInt(eventDate.substring(8, 10), 10) < 10) {
    var eventDay = "0" + parseInt(eventDate.substring(8, 10), 10);
  } else {
    var eventDay = parseInt(eventDate.substring(8, 10), 10);
  }
  var eventHour = parseInt(eventTime.substring(0, 2), 10);
  var eventMonth = parseInt(eventDate.substring(5, 7), 10);
  var eventYear = parseInt(eventDate.substring(2, 4), 10);
  var eventID =
    "d-" + eventDay + "-" + eventMonth + "-20" + eventYear + "-" + eventHour;
  console.log(eventID);

  console.log(eventHour, eventDay, eventMonth, eventYear);
  var eventDetailsJSON = JSON.stringify(eventDetails);
  localStorage.setItem(eventID, eventDetailsJSON);
  updateScheduleDisplay(eventHour, eventDay, eventMonth, eventYear);
  closePopup();
  return { eventHour, eventDay, eventMonth, eventYear };
}

// TODO: Event Creation functions - record and display user input event details on timeslot
function updateScheduleDisplay(eventHour, eventDay, eventMonth, eventYear) {
  if (eventYear < 100) {
    eventYear = "20" + eventYear;
  }
  var eventID =
    "d" + "-" + eventDay + "-" + eventMonth + "-" + eventYear + "-" + eventHour;
  console.log(eventID);
  var eventSlot = document.querySelector("#" + eventID);
  console.log(eventSlot);
  if (eventSlot == null) {
    console.log("oh nooooo");
    return;
  }
  eventSlot.removeChild(eventSlot.lastChild);

  console.log(eventID);

  eventDetails = JSON.parse(localStorage.getItem(eventID));
  console.log(eventDetails);

  var newEventDiv = document.createElement("div");
  newEventDiv.setAttribute("class", "slot-event");
  // newEventDiv.innerHTML = `
  //     <h5 class="card-title">${eventDetails.name}</h5>
  // `
  newEventDiv.textContent = eventDetails.name;
  eventSlot.removeEventListener("click", showEventPopup);
  eventSlot.addEventListener("click", showModifyEventPopup);
  createExcuseButton(newEventDiv);
  eventSlot.append(newEventDiv);
}

// TODO: Modify event functions - function to modify event details

function showModifyEventPopup(event) {
  var existingPopup = document.querySelector(".event-popup");
  if (existingPopup) {
    document.body.removeChild(existingPopup);
  }
  var popup = document.createElement("div");
  popup.setAttribute("class", "event-popup bg-white border-primary mb-3 p-3");

  var mouseX = event.clientX;
  var mouseY = event.clientY;

  var popupWidth = 300;
  var popupHeight = 600;

  var maxX = window.innerWidth - popupWidth;
  var maxY = window.innerHeight - popupHeight;

  var adjustedX = Math.min(mouseX, maxX);
  var adjustedY = Math.min(mouseY, maxY);

  popup.style.position = "fixed";
  popup.style.top = `${adjustedY}px`;
  popup.style.left = `${adjustedX}px`;

  if (event.target.matches(".slot-event")) {
    var eventID = event.target.parentElement.getAttribute("id");
  } else if (event.target.matches(".time-slot")) {
    var eventID = event.target.getAttribute("id");
  } else if (event.target.matches("i") || event.target.matches("button")) {
    return;
  } else {
    var eventID = event.target.parentElement.parentElement.getAttribute("id");
  }
  console.log(event.target.parentElement.parentElement);
  var eventDetails = JSON.parse(localStorage.getItem(eventID));
  console.log(eventDetails.name);

  popup.innerHTML = `
        <h2>Modify Event</h2>
        <label for="eventName">Event Name:</label>
        <input type="text" id="eventName" value="${
          eventDetails.name
        }" required><br>
        <label for="eventTime">Event Time:</label>
        <input type="time" step="3600000" id="eventTime" value="${
          eventDetails.time
        }" required><br>
        <label for="eventDate">Event Date:</label>
        <input type="date" id="eventDate" value="${
          eventDetails.date
        }" required><br>
        <label for="eventCategory">Category:</label>
        <select id="eventCategory" name="category">
            <option value="family" ${
              eventDetails.category === "family" ? "selected" : ""
            }>Family</option>
            <option value="office" ${
              eventDetails.category === "office" ? "selected" : ""
            }>Office</option>
            <option value="children" ${
              eventDetails.category === "children" ? "selected" : ""
            }>Children</option>
            <option value="college" ${
              eventDetails.category === "college" ? "selected" : ""
            }>College</option>
            <option value="party" ${
              eventDetails.category === "party" ? "selected" : ""
            }>Party</option>
            <option value="funny" ${
              eventDetails.category === "funny" ? "selected" : ""
            }>Funny</option>
            <option value="unbelievable" ${
              eventDetails.category === "unbelievable" ? "selected" : ""
            }>Unbelievable</option>
            <option value="developers" ${
              eventDetails.category === "developers" ? "selected" : ""
            }>Developer</option>
            <option value="gaming" ${
              eventDetails.category === "gaming" ? "selected" : ""
            }>Gaming</option>
        </select>
        <button onclick="saveModifiedEvent(event, '${eventID}')">Save Changes</button>
        <button onclick="deleteEvent('${eventID}')">Delete Event</button>
        <button onclick="closePopup()">Cancel</button>
    `;
  document.body.appendChild(popup);
}

function saveModifiedEvent(event, eventID) {
  var eventName = document.getElementById("eventName").value;
  var eventDate = document.getElementById("eventDate").value;
  var eventTime = document.getElementById("eventTime").value;
  var eventCategory = document.getElementById("eventCategory").value;

  var eventDetails = {
    name: eventName,
    date: eventDate,
    time: eventTime,
    category: eventCategory,
  };

  if (parseInt(eventDate.substring(8, 10), 10) < 10) {
    var eventDay = "0" + parseInt(eventDate.substring(8, 10), 10);
  } else {
    var eventDay = parseInt(eventDate.substring(8, 10), 10);
  }
  var eventHour = parseInt(eventTime.substring(0, 2), 10);
  var eventMonth = parseInt(eventDate.substring(5, 7), 10);
  var eventYear = parseInt(eventDate.substring(2, 4), 10);

  console.log(eventHour, eventDay, eventMonth, eventYear);
  var newEventID =
    "d-" + eventDay + "-" + eventMonth + "-20" + eventYear + "-" + eventHour;
  var eventDetailsJSON = JSON.stringify(eventDetails);
  if (eventID != newEventID) {
    localStorage.setItem(newEventID, eventDetailsJSON);
    // localStorage.removeItem(eventID);
    deleteEvent(eventID);
  }
  localStorage.setItem(eventID, eventDetailsJSON);
  updateModifiedScheduleDisplay(eventHour, eventDay, eventMonth, eventYear);
  closePopup();
  return { eventHour, eventDay, eventMonth, eventYear };
}

function updateModifiedScheduleDisplay(
  eventHour,
  eventDay,
  eventMonth,
  eventYear
) {
  if (eventYear < 100) {
    eventYear = "20" + eventYear;
  }
  var eventID =
    "d" + "-" + eventDay + "-" + eventMonth + "-" + eventYear + "-" + eventHour;
  console.log(eventID);
  var eventSlot = document.querySelector("#" + eventID);
  if (eventSlot == null) {
    return;
  }
  console.log(eventSlot);
  eventSlot.removeChild(eventSlot.lastChild);

  console.log(eventID);

  eventDetails = JSON.parse(localStorage.getItem(eventID));
  console.log(eventDetails);

  var newEventDiv = document.createElement("div");
  newEventDiv.setAttribute("class", "slot-event");
  newEventDiv.setAttribute("class", "slot-event");

  newEventDiv.textContent = eventDetails.name;
  eventSlot.removeEventListener("click", showEventPopup);
  eventSlot.addEventListener("click", showModifyEventPopup);
  createExcuseButton(newEventDiv);
  eventSlot.append(newEventDiv);
}

// TODO: Delete event functions - function to delete event from calendar
function deleteEvent(eventID) {
  var eventTime = document.getElementById("eventTime").value;
  var eventHour = parseInt(eventTime.substring(0, 24), 10);
  var eventHourConverted = hoursArray[eventHour - 1];

  var newTimeSlot = document.createElement("li");
  newTimeSlot.setAttribute("id", eventID); // unique ID that was deleted and need to be replaced
  newTimeSlot.setAttribute("class", "time-slot list-group-item");
  var newHourDiv = document.createElement("div");
  var newEventDiv = document.createElement("div");
  newHourDiv.setAttribute("class", "slot-hour d-block d-lg-none");
  newEventDiv.setAttribute("class", "slot-event");
  newHourDiv.textContent = eventHourConverted; // get eventHour from the deleted div
  newTimeSlot.append(newHourDiv, newEventDiv);

  var eventSlot = document.querySelector("#" + eventID);
  eventSlot.parentNode.replaceChild(newTimeSlot, eventSlot);
  newTimeSlot.addEventListener("click", showEventPopup);
  localStorage.removeItem(eventID);
  eventExcuse = eventID + "excuse";
  localStorage.removeItem(eventExcuse);

  closePopup();
}

// TODO: Event block functions - generate excuse function
// TODO: Event block functions - regenerate excuse function
function createExcuseButton(newEventDiv) {
  var generateExcuseButton = document.createElement("button");
  generateExcuseButton.setAttribute("type", "button");
  generateExcuseButton.setAttribute(
    "class",
    "btn btn-outline-primary excuse-button"
  );
  generateExcuseButton.textContent = "Generate excuse!";
  generateExcuseButton.addEventListener("click", generateExcuse);
  newEventDiv.append(generateExcuseButton);
}

function generateExcuse(event) {
  if (event.target.parentElement.parentElement.matches(".time-slot")) {
    var eventID = event.target.parentElement.parentElement.getAttribute("id");
  } else {
    var eventID =
      event.target.parentElement.parentElement.parentElement.getAttribute("id");
  }
  // console.log(event.target.parentElement.parentElement);
  var eventDetails = JSON.parse(localStorage.getItem(eventID));
  var excuseStorageID = eventID + "excuse";

  // console.log(eventDetails);
  var excuserURL =
    "https://excuser-three.vercel.app/v1/excuse/" + eventDetails.category;
  fetch(excuserURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // console.log(data);
      // console.log(data[0].excuse);
      if (event.target.matches("i")) {
        selectedEventSlotDiv = event.target.parentElement.parentElement;
      } else {
        selectedEventSlotDiv = event.target.parentElement;
      }
      // console.log(selectedEventSlotDiv);
      if (selectedEventSlotDiv.querySelector("button")) {
        selectedEventSlotDiv.removeChild(
          selectedEventSlotDiv.querySelector("button")
        );
        if (localStorage.getItem(excuseStorageID)) {
          var randomExcuse = localStorage.getItem(excuseStorageID);
        } else {
          var randomExcuse = data[0].excuse;
        }
      } else if (selectedEventSlotDiv.querySelector("p")) {
        selectedEventSlotDiv.removeChild(
          selectedEventSlotDiv.querySelector("p")
        );
        randomExcuse = data[0].excuse;
      }

      refreshIcon = document.createElement("i");
      refreshIcon.setAttribute("class", "fa-solid fa-arrows-rotate");

      newExcuse = document.createElement("p");
      newExcuse.setAttribute("class", "text-secondary excuse-text");
      newExcuse.innerHTML = `
            ${randomExcuse} <i class='fa-solid fa-arrows-rotate'>
            `;
      refreshIcon = newExcuse.querySelector("i");
      refreshIcon.addEventListener("click", generateExcuse);
      selectedEventSlotDiv.append(newExcuse);

      // store excuse to local storage
      localStorage.setItem(excuseStorageID, randomExcuse);
    });
}

//* All of the called functions on start up *//
generateWeek();
generateTimeSlots();
highlightCurrentDay();
createPreviousWeekButton();
createTodayWeekButton();
createNextWeekButton();
fetchHolidays();