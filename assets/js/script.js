// TODO: Add html element selectors here:

// TODO: Dayjs functions - get current week and display correct dates

// TODO: Dayjs functions - highlight current day column?

// TODO: Dayjs functions - get next week and display next week dates

// TODO: Dayjs functions - get previous week dates and display previous week dates

// TODO: Holiday API functions - fetch and match date to holiday

// TODO: Holiday API functions - display holiday to calendar 

// TODO: Timeslot functions - generate unique id / generate the timeblock with id

// TODO: Event Creation functions - create pop up with user input fields
function showEventPopup(event) {
    
    var existingPopup = document.querySelector('.event-popup');
    if (existingPopup) {
        document.body.removeChild(existingPopup);
    }

    var popup = document.createElement('div');
    popup.classList.add('event-popup');

    var mouseX = event.clientX;
    var mouseY = event.clientY;
    popup.style.position = 'fixed';
    popup.style.top = `${mouseY}px`;
    popup.style.left = `${mouseX}px`;

    popup.innerHTML = `
      <h2>Create Event</h2>
      <label for="eventName">Event Name:</label>
      <input type="text" id="eventName" required>
      <label for="eventTime">Event Time:</label>
      <input type="time" step="3600000" id="eventTime" required>
      <label for="eventDate">Event Date:</label>
      <input type="date" id="eventDate" required>
      <label for="eventDescription">Event Description:</label>
      <input type="text" id="eventDescription" required>
      <button onclick="saveEvent()">Save Event</button>
      <button onclick="closePopup()">Cancel</button>
    `;
    document.body.appendChild(popup);
  }

  var listItems = document.getElementsByClassName('time-slot');

  for (var i = 0; i < listItems.length; i++) {
      listItems[i].addEventListener('click', function(event) {
          showEventPopup(event);
      });
  }

// TODO: Event Creation functions - close popup
function closePopup() {
    var popup = document.querySelector('.event-popup');
    if (popup) {
        document.body.removeChild(popup);
    }
}

// TODO: Event Creation functions - save event details to local storage with specific timeslot and date
function saveEvent() {
    var eventName = document.getElementById('eventName').value;
    var eventDate = document.getElementById('eventDate').value;
    var eventTime = document.getElementById('eventTime').value;
    var eventDescription = document.getElementById('eventDescription').value;
    
    var eventDetails = {
        name: eventName,
        date: eventDate,
        time: eventTime,
        description: eventDescription
    };
    
    var eventHour = parseInt(eventTime.substring(0, 2), 10);
    var eventDay = parseInt(eventDate.substring(8, 10), 10);
    var eventMonth = parseInt(eventDate.substring(5, 7), 10);
    var eventYear = parseInt(eventDate.substring(2, 4), 10);

    console.log(eventHour, eventDay, eventMonth, eventYear);
    var eventDetailsJSON = JSON.stringify(eventDetails);
    localStorage.setItem('eventDetails', eventDetailsJSON);
    return { eventHour, eventDay, eventMonth, eventYear };
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
