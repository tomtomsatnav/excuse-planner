// TODO: Add html element selectors here:
var weekContainer = document.querySelector('#week-container')


// TODO: Dayjs functions - get current week and display correct dates
// TODO: Dayjs functions - get next week and display next week dates
// TODO: Dayjs functions - get previous week dates and display previous week dates
dayjs.extend(window.dayjs_plugin_weekOfYear)
weekContainer.setAttribute('data-week-change', 0)

function generateWeek() {
    if (weekContainer.children.length > 0) {
        while (weekContainer.firstChild) {
            weekContainer.removeChild(weekContainer.lastChild);
        };
    };

    var weekChange = weekContainer.getAttribute('data-week-change')
    var thisWeek = dayjs().week();
    var selectedWeek = thisWeek + parseInt(weekChange)
    // console.log("selected week is:" + selectedWeek);
    // console.log("change week tracker is:" +weekChange);

    for (let i = 0; i < 7; i++) {
        date = dayjs().week(selectedWeek).startOf('week').add(i, 'day').format('ddd D.M');
        console.log(date);
        var newDayDiv = document.createElement('div')
        newDayDiv.textContent = date
        weekContainer.append(newDayDiv)
    }

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
}

function previousWeek() {
    var weekChange = weekContainer.getAttribute('data-week-change')
    weekChange -= 1
    // console.log("previous week clicked: " + weekChange);
    weekContainer.setAttribute('data-week-change', weekChange)
    generateWeek()
}

function nextWeek() {
    var weekChange = weekContainer.getAttribute('data-week-change')
    weekChange = parseInt(weekChange) + 1
    // console.log("next week clicked: " + weekChange);
    weekContainer.setAttribute('data-week-change', weekChange)
    generateWeek()
}

generateWeek()

// TODO: Dayjs functions - highlight current day column?



// TODO: Holiday API functions - fetch and match date to holiday

// TODO: Holiday API functions - display holiday to calendar 

// TODO: Timeslot functions - generate unique id / generate the timeblock with id
// var mondayTimeSection = document.querySelector('#mon-hours')

// function createTimeblocks() {
//     for (let i = 0; i < 24; i++) {
//         // create time block div
//         var newTimeBlock = document.createElement('div');
//         newTimeBlock.setAttribute("class", "time-block");
//         // newTimeBlock.textContent = "test " + i;
//         mondayTimeSection.appendChild(newTimeBlock);
//         console.log("I append!");
//     };
// };

// createTimeblocks()

// console.log(dayjs('2018-06-27').week()); // 26
// console.log(dayjs('2018-06-27').week(5)); // set week
// console.log(dayjs().week());
// console.log(dayjs().week(49).startOf('week'));
// console.log(dayjs().startOf('week').format('ddd D.M'));
// console.log(dayjs().startOf('week').add(1, 'day').format('DD/MM/YYYY'));





// TODO: Event Creation functions - create pop up with user input fields

// TODO: Event Creation functions - record and display user input event details on timeslot

// TODO: Event Creation functions - save event details to local storage with specific timeslot and date

// TODO: Event block functions - button to modify event function

// TODO: Event block functions - generate excuse function

// TODO: Event block functions - regenerate excuse function

// TODO: Out of Excuses functions - modal function to inform users they are out of excuses 

// TODO: Out of Excuses functions - function to let users input their own excuse

// TODO: Delete event functions - function to delete event from calendar

// TODO: Delete event functions - function to delete event from local storage
