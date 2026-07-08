// ===== script.js - shared across all pages =====

// Display current local date and time
function showDateTime() {
  var el = document.getElementById("datetime");
  if (el) {
    el.innerHTML = new Date().toLocaleString();
  }
}
setInterval(showDateTime, 1000);

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
  var colorSelect = document.getElementById("bgColorSelect");
  if (colorSelect && savedColor) {
    colorSelect.value = savedColor;
  }
  var fontSelect = document.getElementById("fontSizeSelect");
  if (fontSelect && savedSize) {
    fontSelect.value = savedSize;
  }
}

// ===================================================================
// Shared data helpers.
// The assignment asks us to "store in a JSON file" and "update the file".
// A page opened from disk (file://) cannot write real files, so we keep
// the same data in the browser's localStorage, which acts as our JSON
// store: it persists across pages and page reloads just like a file.
// ===================================================================

// A single unique user-id for this browser (the "user who booked").
function getUserId() {
  var id = localStorage.getItem("userId");
  if (!id) {
    id = "U" + Math.floor(100000 + Math.random() * 900000);
    localStorage.setItem("userId", id);
  }
  return id;
}

// Unique booking number generator.
function newBookingNumber() {
  var n = parseInt(localStorage.getItem("bookingCounter") || "1000", 10) + 1;
  localStorage.setItem("bookingCounter", n);
  return "BK" + n;
}

// ---- Cart (list of items waiting to be booked) ----
function getCart() {
  try {
    return JSON.parse(localStorage.getItem("cart") || "[]");
  } catch (e) {
    return [];
  }
}
function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}
function addToCart(item) {
  var cart = getCart();
  cart.push(item);
  saveCart(cart);
}

// ---- Booked items (our "bookings JSON file") ----
function getBookings() {
  try {
    return JSON.parse(localStorage.getItem("bookings") || "[]");
  } catch (e) {
    return [];
  }
}
function saveBookings(list) {
  localStorage.setItem("bookings", JSON.stringify(list));
}
function addBooking(record) {
  var list = getBookings();
  list.push(record);
  saveBookings(list);
}

// ---- Contact submissions (our "contact JSON file") ----
function saveContact(record) {
  var list;
  try {
    list = JSON.parse(localStorage.getItem("contactData") || "[]");
  } catch (e) {
    list = [];
  }
  list.push(record);
  localStorage.setItem("contactData", JSON.stringify(list));
}

// Return all stored contact submissions.
function getContacts() {
  try {
    return JSON.parse(localStorage.getItem("contactData") || "[]");
  } catch (e) {
    return [];
  }
}

// Download data as a .json file 
// Uses only JavaScript + JSON (within the allowed tools). The file lands in
// the browser's Downloads folder; move it into the project folder if needed.
function downloadJSON(filename, data) {
  var text = JSON.stringify(data, null, 2);
  var blob = new Blob([text], { type: "application/json" });
  var url = URL.createObjectURL(blob);
  var a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// ---- Seat / room / car inventory overrides ----
// We can't rewrite flights.json / hotels.xml / cars.xml on disk, so any change to available seats/rooms is stored here and merged in when read.
function getInventory() {
  try {
    return JSON.parse(localStorage.getItem("inventory") || "{}");
  } catch (e) {
    return {};
  }
}
function saveInventory(inv) {
  localStorage.setItem("inventory", JSON.stringify(inv));
}
// Return the current available count for an id, using the override if set.
function currentAvailability(id, defaultVal) {
  var inv = getInventory();
  if (inv.hasOwnProperty(id)) return inv[id];
  return defaultVal;
}
function setAvailability(id, val) {
  var inv = getInventory();
  inv[id] = val;
  saveInventory(inv);
}

// ---- Car booking history (used by cars page to suggest cars) ----
function getCarHistory() {
  try {
    return JSON.parse(localStorage.getItem("carHistory") || "[]");
  } catch (e) {
    return [];
  }
}
function addCarHistory(pref) {
  var list = getCarHistory();
  list.push(pref);
  localStorage.setItem("carHistory", JSON.stringify(list));
}