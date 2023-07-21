var siteNameInp = document.getElementById("siteName");
var siteUrlInp = document.getElementById("siteUrl");
var nameRegx = /^.{3,}$/;
var urlRegx = /^https:\/\/.*\.[a-zA-Z]{2,}$/;
var allSiteNames = [];

if (localStorage.getItem("mySite") != null) {
  allSiteNames = JSON.parse(localStorage.getItem("mySite"));
  displaySite(allSiteNames);
} else {
  console.log("no data");
}

function addWeb() {
  var mySites = {
    nameSite: siteNameInp.value,
    nameUrl: siteUrlInp.value,
  };
  if (
    urlRegx.test(siteUrlInp.value) &&
    nameRegx.test(siteNameInp.value) === true
  ) {
    allSiteNames.push(mySites);
    localStorage.setItem("mySite", JSON.stringify(allSiteNames));
    displaySite(allSiteNames);
    clear();
  } else {
    var bg = document.getElementById("myBg");
    bg.classList.add("myBgGray");
    document.getElementById("warning").innerHTML = `
    <div class="box-warning bg-white shadow-lg">
    <button onclick="closeBtnMsg()">
      <i class="fa-regular fa-circle-xmark fs-4"></i>
    </button>
    <p class="fs-4">
      Site Name or Url is not valid, Please follow the rules below :
    </p>
    <p class="text-danger">
      <i class="fa-solid fa-star-of-life pe-2 fs-6 text-danger"></i>Site
      name must contain at least 3 characters
    </p>
    <p class="text-danger">
      <i class="fa-solid fa-star-of-life pe-2 text-danger"></i>Site URL must
      be a valid one
    </p>
  </div>
    `;
  }
}

function clear() {
  siteNameInp.value = "";
  siteUrlInp.value = "";
  var redName = document.getElementById("siteName");
  var greenName = document.getElementById("siteName");
  var red = document.getElementById("siteUrl");
  var green = document.getElementById("siteUrl");
  red.classList.remove("is-invalid");
  green.classList.remove("is-valid");
  redName.classList.remove("is-invalid");
  greenName.classList.remove("is-valid");
  document.getElementById("validationTest").innerHTML = "";
  document.getElementById("validationTestUrl").innerHTML = "";
}

function displaySite() {
  var box = ``;
  for (i = 0; i < allSiteNames.length; i++) {
    box += `
    <tr>
    <td>${i + 1}</td>
    <td>${allSiteNames[i].nameSite}</td>
    <td><a href="${
      allSiteNames[i].nameUrl
    }" target="_blank"><button onclick="editItem()" class="btn btn-outline-warning"><i class="fa-solid fa-eye me-2"></i>Visit</button></a></td>
    <td><button onclick="deletItem(${i})" class="btn btn-outline-danger"><i class="fa-solid fa-trash-can me-2"></i>Delete</button></td>
    </tr>
    `;
  }
  document.getElementById("userData").innerHTML = box;
}

function deletItem(siteNumber) {
  allSiteNames.splice(siteNumber, 1);
  localStorage.setItem("mySite", JSON.stringify(allSiteNames));
  displaySite(allSiteNames);
}

function validateSiteName() {
  // var nameRegx = /^.{3,}$/;
  if (nameRegx.test(siteNameInp.value)) {
    document.getElementById(
      "validationTest"
    ).innerHTML = `<span class="text-success"><i class="fa-solid fa-circle-check px-2 my-3"></i>Valid Site Name</span>`;
    var green = document.getElementById("siteName");
    green.classList.remove("is-invalid");
    green.classList.add("is-valid");
  } else if (siteNameInp.value === "") {
    var red = document.getElementById("siteName");
    var green = document.getElementById("siteName");
    red.classList.remove("is-invalid");
    green.classList.remove("is-valid");
    document.getElementById("validationTest").innerHTML = `<span></span>`;
  } else {
    var red = document.getElementById("siteName");
    var green = document.getElementById("siteName");
    red.classList.add("is-invalid");
    green.classList.remove("is-valid");
    document.getElementById(
      "validationTest"
    ).innerHTML = `<span class="text-danger">
    <i class="fa-solid fa-circle-xmark px-2 my-3"></i> Please Enter a Valid Site Name With 3 letters Or More</span>`;
  }
}

function validateSiteUrl() {
  var urlRegx = /^https:\/\/.*\.[a-zA-Z]{2,}$/;
  if (urlRegx.test(siteUrlInp.value)) {
    document.getElementById(
      "validationTestUrl"
    ).innerHTML = `<span class="text-success"><i class="fa-solid fa-circle-check px-2 my-3"></i>Valid Site Name</span>`;
    var green = document.getElementById("siteUrl");
    green.classList.remove("is-invalid");
    green.classList.add("is-valid");
  } else if (siteUrlInp.value === "") {
    var red = document.getElementById("siteUrl");
    var green = document.getElementById("siteUrl");
    red.classList.remove("is-invalid");
    green.classList.remove("is-valid");
    document.getElementById("validationTestUrl").innerHTML = `<span></span>`;
  } else {
    var red = document.getElementById("siteUrl");
    var green = document.getElementById("siteUrl");
    red.classList.add("is-invalid");
    green.classList.remove("is-valid");
    document.getElementById(
      "validationTestUrl"
    ).innerHTML = `<span class="text-danger">
      <i class="fa-solid fa-circle-xmark px-2 my-3"></i> Please Enter a Valid Site URL Start With https:// and ends with "." and Followed by Two or More Letters</span>`;
  }
}

function warningMsg() {
  // var regx = /^.{3,}$/;
  // var regx = /^https:\/\/.*\.[a-zA-Z]{2,}$/;
  if (
    urlRegx.test(siteUrlInp.value) ||
    nameRegx.test(siteNameInp.value) === false
  ) {
    var bg = document.getElementById("myBg");
    bg.classList.add("myBgGray");
    document.getElementById("warning").innerHTML = `
    <div class="box-warning bg-white shadow-lg">
    <button onclick="closeBtnMsg()">
      <i class="fa-regular fa-circle-xmark fs-4"></i>
    </button>
    <p class="fs-4">
      Site Name or Url is not valid, Please follow the rules below :
    </p>
    <p class="text-danger">
      <i class="fa-solid fa-star-of-life pe-2 fs-6 text-danger"></i>Site
      name must contain at least 3 characters
    </p>
    <p class="text-danger">
      <i class="fa-solid fa-star-of-life pe-2 text-danger"></i>Site URL must
      be a valid one
    </p>
  </div>
    `;
  } else {
    addWeb();
  }
}

function closeBtnMsg() {
  document.getElementById("warning").innerHTML = "";
  var bg = document.getElementById("myBg");
  var redName = document.getElementById("siteName");
  var greenName = document.getElementById("siteName");
  var red = document.getElementById("siteUrl");
  var green = document.getElementById("siteUrl");
  bg.classList.remove("myBgGray");
  red.classList.remove("is-invalid");
  green.classList.remove("is-valid");
  redName.classList.remove("is-invalid");
  greenName.classList.remove("is-valid");
  document.getElementById("validationTest").innerHTML = "";
  document.getElementById("validationTestUrl").innerHTML = "";
  clear();
}
