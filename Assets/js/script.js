
$(function () {
  var currentDate = dayjs().format("dddd, MMMM D, YYYY"); // Display current date in the header
  $("#currentDay").text(currentDate); // Set the text of the current day to the current date

  // Color code time blocks
  var currentHour = dayjs().hour(); // Get the current hour in time
  $(".time-block").each(function () { // For each time block
    var blockHour = parseInt($(this).attr("id").split("-")[1]);  // Extract the hour from the id attribute of the time block
    // add classes based on the current hour in time (removes class based on)
    if (blockHour < currentHour) { // If in the past
      $(this).removeClass("present future").addClass("past"); // If in the past, remove present and future classes, add past class
    } else if (blockHour === currentHour) { // If in the present
      $(this).removeClass("past future").addClass("present"); // If in the present, remove past and future classes, add present class
    } else { // If in the future
      $(this).removeClass("past present").addClass("future"); // If in the future, remove past and present classes, add future class
    }
  });

  // Save event to local storage
  $(".saveBtn").on("click", function () { // When save button is clicked
    var timeBlockId = $(this).parent().attr("id"); // Get the id of the time block
    var eventDescription = $(this).siblings(".description").val(); // Get the value of the description

    // Save to local storage
    localStorage.setItem(timeBlockId, eventDescription); // Save the event description to local storage
  });

  // Load events from local storage
  $(".time-block").each(function () { // For each time block
    var timeBlockId = $(this).attr("id"); // Get the id of the time block
    var savedEvent = localStorage.getItem(timeBlockId); // Get the event description from local storage

    if (savedEvent) { // If there is an event description in local storage
      $(this).find(".description").val(savedEvent); // Set the value of the description to the event description
    }
  });
});

