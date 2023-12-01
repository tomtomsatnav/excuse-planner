dayjs.extend(window.dayjs_plugin_weekOfYear); //adds dayjs week of year api plugin

// TODO: Add html element selectors here:
// TODO: Timeslot functions - generate unique id / generate the timeblock with id
var weekContainer = document.querySelector('#week-container');
var sunTimeSection = document.querySelector('#sun-hours');
var monTimeSection = document.querySelector('#mon-hours');
var tueTimeSection = document.querySelector('#tue-hours');
var wedTimeSection = document.querySelector('#wed-hours');
var thurTimeSection = document.querySelector('#thur-hours');
var friTimeSection = document.querySelector('#fri-hours');
var satTimeSection = document.querySelector('#sat-hours');

var timeSlotSections = [sunTimeSection, monTimeSection, tueTimeSection, wedTimeSection, thurTimeSection, friTimeSection, satTimeSection];

function generateTimeSlots() {
    for (let j = 0; j < timeSlotSections.length; j++) {
        if (timeSlotSections[j].children.length > 0) {
            while (timeSlotSections[j].firstChild) {
                timeSlotSections[j].removeChild(timeSlotSections[j].lastChild);
            };
        };
    }

    var selectedDates = weekContainer.getAttribute('data-dateIDs').split(',')
    for (let j = 0; j < timeSlotSections.length; j++) {
        for (let i = 0; i < 24; i++) {
            // create time slot div
            var newTimeSlot = document.createElement('div');
            timeSlotID = selectedDates[j] + i
            newTimeSlot.textContent = timeSlotID;
            newTimeSlot.setAttribute("id", timeSlotID)
            newTimeSlot.setAttribute("class", "time-slot");
            timeSlotSections[j].appendChild(newTimeSlot);
        };
    };
};

// TODO: Dayjs functions - get current week and display correct formattedDates
// TODO: Dayjs functions - get next week and display next week formattedDates
// TODO: Dayjs functions - get previous week formattedDates and display previous week formattedDates
weekContainer.setAttribute('data-week-change', 0);

function generateWeek() {
    // **checks and removes any existing divs to recreate new week**//
    if (weekContainer.children.length > 0) {
        while (weekContainer.firstChild) {
            weekContainer.removeChild(weekContainer.lastChild);
        };
    };

    // ** variables to store important date data **//
    var weekChange = weekContainer.getAttribute('data-week-change')
    var thisWeek = dayjs().week();
    var selectedWeek = thisWeek + parseInt(weekChange)
    var selectedDates = []
    // console.log("selected week is:" + selectedWeek);
    // console.log("change week tracker is:" +weekChange);

    // ** creates selected week dates, stores it into an array and displays formatted date **//
    for (let i = 0; i < 7; i++) {
        formattedDate = dayjs().week(selectedWeek).startOf('week').add(i, 'day').format('ddd D.M.YY');
        dateID = 'd' + dayjs().week(selectedWeek).startOf('week').add(i, 'day').format('DDMMYY')
        // console.log(formattedDate);
        // console.log(dateID);
        selectedDates.push(dateID)
        var newDayDiv = document.createElement('div')
        newDayDiv.textContent = formattedDate
        weekContainer.append(newDayDiv)
    }

    // console.log(selectedDates.toString());
    weekContainer.setAttribute('data-dateIDs', selectedDates.toString())

    // ** creates previous and next buttons **//
    var previousWeekButton = document.createElement('button')
    var leftArrowIcon = document.createElement('i')
    leftArrowIcon.setAttribute('class', 'fa-solid fa-chevron-left')
    previousWeekButton.append(leftArrowIcon)
    weekContainer.prepend(previousWeekButton)
    previousWeekButton.addEventListener('click', previousWeek)

    var nextWeekButton = document.createElement('button')
    var rightArrowIcon = document.createElement('i')
    rightArrowIcon.setAttribute('class', 'fa-solid fa-chevron-right')
    nextWeekButton.append(rightArrowIcon)
    weekContainer.append(nextWeekButton)
    nextWeekButton.addEventListener('click', nextWeek)
};

function previousWeek() {
    var weekChange = weekContainer.getAttribute('data-week-change')
    weekChange -= 1
    // console.log("previous week clicked: " + weekChange);
    weekContainer.setAttribute('data-week-change', weekChange)
    generateWeek()
    generateTimeSlots()
    if (weekChange == 0) {
        highlightCurrentDay()
    }
};

function nextWeek() {
    var weekChange = weekContainer.getAttribute('data-week-change')
    weekChange = parseInt(weekChange) + 1
    // console.log("next week clicked: " + weekChange);
    weekContainer.setAttribute('data-week-change', weekChange)
    generateWeek()
    generateTimeSlots()
    if (weekChange == 0) {
        highlightCurrentDay()
    }
};

// TODO: Dayjs functions - highlight current day column?
function highlightCurrentDay() {
    currentDay = dayjs().format('DDMMYY')
    for (let i = 0; i < 24; i++) {
        var currentDayID = '#d' + currentDay + i
        // console.log(currentDayID);
        var currentTimeSlot = document.querySelector(currentDayID)
        currentTimeSlot.setAttribute('class', 'bg-secondary')
    }
};


// TODO: Holiday API functions - fetch and match formattedDate to holiday

// TODO: Holiday API functions - display holiday to calendar 



generateWeek();
generateTimeSlots();
highlightCurrentDay();

// console.log(dayjs('2018-06-27').week()); // 26
// console.log(dayjs('2018-06-27').week(5)); // set week
// console.log(dayjs().week());
// console.log(dayjs().week(49).startOf('week'));
// console.log(dayjs().startOf('week').format('ddd D.M'));
// console.log(dayjs().startOf('week').add(1, 'day').format('DD/MM/YYYY'));





// TODO: Event Creation functions - create pop up with user input fields

// TODO: Event Creation functions - record and display user input event details on timeslot

// TODO: Event Creation functions - save event details to local storage with specific timeslot and formattedDate

// TODO: Event block functions - button to modify event function

// TODO: Event block functions - generate excuse function

// TODO: Event block functions - regenerate excuse function

// TODO: Out of Excuses functions - modal function to inform users they are out of excuses 

// TODO: Out of Excuses functions - function to let users input their own excuse

// TODO: Delete event functions - function to delete event from calendar

// TODO: Delete event functions - function to delete event from local storage
