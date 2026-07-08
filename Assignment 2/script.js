// Display current local date and time
function showDateTime() {
  var el = document.getElementById("datetime");
  if (el) {
    el.innerHTML = new Date().toLocaleString();
  }
}
setInterval(showDateTime, 1000);

// Also run as soon as the page content is ready (more reliable than window.onload)
document.addEventListener("DOMContentLoaded", function () {
  showDateTime();
  applySavedSettings();
});

// Change font size of main content (and remember it)
function changeFontSize(size) {
  var main = document.querySelector(".main");
  if (main) {
    main.style.fontSize = size + "px";
  }
  localStorage.setItem("fontSize", size);
}

// Change background color of the application (and remember it)
function changeBgColor(color) {
  document.body.style.backgroundColor = color;
  localStorage.setItem("bgColor", color);
}

// Apply saved settings when each page loads
function applySavedSettings() {
  var savedColor = localStorage.getItem("bgColor");
  if (savedColor) {
    document.body.style.backgroundColor = savedColor;
  }

  var savedSize = localStorage.getItem("fontSize");
  if (savedSize) {
    var main = document.querySelector(".main");
    if (main) {
      main.style.fontSize = savedSize + "px";
    }
  }

  // If the Settings dropdowns exist, show the saved choice
  var colorSelect = document.getElementById("bgColorSelect");
  if (colorSelect && savedColor) {
    colorSelect.value = savedColor;
  }
  var fontSelect = document.getElementById("fontSizeSelect");
  if (fontSelect && savedSize) {
    fontSelect.value = savedSize;
  }
}
