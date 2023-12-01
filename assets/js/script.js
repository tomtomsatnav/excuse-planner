// TODO: Add html element selectors here:

// TODO: Dayjs functions - get current week and display correct dates

// TODO: Dayjs functions - highlight current day column?

// TODO: Dayjs functions - get next week and display next week dates

// TODO: Dayjs functions - get previous week dates and display previous week dates

// TODO: Holiday API functions - fetch and match date to holiday

// TODO: Holiday API functions - display holiday to calendar 

// TODO: Timeslot functions - generate unique id / generate the timeblock with id

// TODO: Event Creation functions - create pop up with user input fields
function showEventPopup() {
    const popup = document.createElement('div');
    popup.classList.add('event-popup');
    popup.innerHTML = `
      <h2>Create Event</h2>
      <label for="eventName">Event Name:</label>
      <input type="text" id="eventName" required>
      <label for="eventTime">Event Time:</label>
      <input type="time" id="eventTime" required>
      <label for="eventDate">Event Date:</label>
      <input type="date" id="eventDate" required>
      <button onclick="saveEvent()">Save Event</button>
      <button onclick="closePopup()">Cancel</button>
    `;
    document.body.appendChild(popup);
  }

// TODO: Event Creation functions - close popup
function closePopup() {
    const popup = document.querySelector('.event-popup');
    if (popup) {
        document.body.removeChild(popup);
    }
}

// TODO: Event Creation functions - save event details to local storage with specific timeslot and date
function saveEvent() {
    const eventName = document.getElementById('eventName').ariaValueMax;
    const eventDate = document.getElementById('eventDate').ariaValueMax;
    const eventTime = document.getElementById('eventTime').ariaValueMax;

    const eventDetails = {
        name: eventName,
        date: eventDate,
        time:eventTime
    };

    const eventDetailsJSON = JSON.stringify(eventDetails)

    localStorage.setItem('eventDetails', eventDetailsJSON)
};

// TODO: Event Creation functions - record and display user input event details on timeslot
function updateScheduleDisplay() {
    
}
// TODO: Event block functions - button to modify event function

// TODO: Event block functions - generate excuse function

// TODO: Event block functions - regenerate excuse function

// TODO: Out of Excuses functions - modal function to inform users they are out of excuses 

// TODO: Out of Excuses functions - function to let users input their own excuse

// TODO: Delete event functions - function to delete event from calendar

// TODO: Delete event functions - function to delete event from local storage
