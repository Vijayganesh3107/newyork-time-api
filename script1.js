var url =
  "https://api.nytimes.com/svc/topstories/v2/home.json?api-key=SfN8FKM2KmZV9qfswkuL24yW8fdxRxhM";
var sectionArr = [
  "arts",
  "automobiles",
  "books",
  "business",
  "fashion",
  "food",
  "health",
  "home",
  "insider",
  "magazine",
  "movies",
  "nyregion",
  "obituaries",
  "opinion",
  "politics",
  "realestate",
  "science",
  "sports",
  "sundayreview",
  "technology",
  "theater",
  "t-magazine",
  "travel",
  "upshot",
  "us",
  "world",
];
var select = document.querySelector("#Section");
var option = document.createElement("option");
option.value = null;
option.innerHTML = "Select a Section";
select.appendChild(option);

for (let i = 0; i < sectionArr.length; i++) {
  var option = document.createElement("option");
  option.value = sectionArr[i];
  option.innerHTML = sectionArr[i];
  select.appendChild(option);
}
var dropdown = document.getElementById("Section");
dropdown.addEventListener("change", () => {
  var sec = dropdown.value;
  displaySectionWise(sec);
});
var card = document.querySelector(".display");

var container = document.querySelector(".container");
let id = 1;
let accordid = 1;
async function displaySectionWise(section) {
  var url = `https://api.nytimes.com/svc/topstories/v2/${section}.json?api-key=SfN8FKM2KmZV9qfswkuL24yW8fdxRxhM`;
  var dataRequest = await fetch(url);
  var data = await dataRequest.json();
  var divaccordian = document.createElement("div");
  divaccordian.setAttribute("class", "panel-group group");
  divaccordian.setAttribute("id", "accordion" + accordid);
  data.results.forEach((item) => {
    var heading = document.createElement("div");
    heading.setAttribute("class", "panel panel-default box");
    var pannelheading = document.createElement("div");
    pannelheading.setAttribute("class", "panel-heading");
    var h4 = document.createElement("h4");
    h4.setAttribute("class", "panel-title");
    var target = "#" + id;
    var link = document.createElement("a");
    link.setAttribute("data-toggle", "collapse");
    link.setAttribute("data-parent", "#accordion" + accordid);
    link.setAttribute("href", target);
    if (item.byline.length != 0)
      link.innerHTML = `${item.item_type}-${item.byline}`;
    else link.innerHTML = `${item.item_type}`;
    h4.appendChild(link);
    pannelheading.appendChild(h4);
    heading.appendChild(pannelheading);
    var Datadiv = document.createElement("div");
    Datadiv.setAttribute("id", id);
    Datadiv.setAttribute("class", "panel-collapse collapse");
    var Datadiv = document.createElement("div");
    Datadiv.setAttribute("id", id);
    Datadiv.setAttribute("class", "panel-collapse collapse");
    var pannelbody = document.createElement("div");
    pannelbody.setAttribute("class", "display");

    var rowdiv = document.createElement("div");
    rowdiv.setAttribute("class", "row");
    var rowdiv = document.createElement("div");
    rowdiv.setAttribute("class", "row");
    var contentleftdiv = document.createElement("div");
    contentleftdiv.setAttribute("class", "col-xl-6 content");
    var sectioname = document.createElement("p");
    sectioname.setAttribute("id", "sectioname");
    sectioname.innerHTML = item.section;
    contentleftdiv.appendChild(sectioname);
    var title = document.createElement("h2");
    title.setAttribute("id", "Title");
    title.innerHTML = item.title;
    contentleftdiv.appendChild(title);
    var date = document.createElement("p");
    date.setAttribute("id", "Date");
    date.innerHTML = item.created_date.substring(0, 10);
    contentleftdiv.appendChild(date);
    var abstarct = document.createElement("p");
    abstarct.setAttribute("id", "Abstract");
    abstarct.innerHTML = item.abstract;
    contentleftdiv.appendChild(abstarct);
    var shortlink = document.createElement("a");
    shortlink.setAttribute("id", "ShortUrl");
    shortlink.innerHTML = "Continue Reading";
    shortlink.href = item.short_url;
    contentleftdiv.appendChild(shortlink);
    rowdiv.appendChild(contentleftdiv);
    var contnentright = document.createElement("div");
    contnentright.setAttribute("class", "col-xl-5");
    var imagediv = document.createElement("div");
    imagediv.setAttribute("class", "image col-xl-6");
    var thumbnail = document.createElement("img");
    thumbnail.setAttribute("class", "image");
    if (item.multimedia != null)
      thumbnail.setAttribute("src", item.multimedia[0].url);
    else thumbnail.setAttribute("alt", "Image Not Found");
    imagediv.appendChild(thumbnail);
    contnentright.appendChild(imagediv);
    pannelbody.appendChild(contentleftdiv);
    pannelbody.appendChild(contnentright);

    // pannelbody.innerHTML =
    //   "Lorem ipsum dolor sit amet, consectetur adipisicing elit,sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat";
    id++;
    Datadiv.appendChild(pannelbody);
    heading.appendChild(Datadiv);
    divaccordian.appendChild(heading);
    // divaccordian.classList.add("displaynone");
    container.appendChild(divaccordian);
  });

  document.body.append(container);
  accordid++;
  var accordinall = document.querySelectorAll(".panel-group");
  for (let i = accordinall.length - 1; i >= 0; i--) {
    if (i == accordinall.length - 1) continue;
    else accordinall[i].classList.add("displaynone");
  }
}
