//SMOOTH SCROLL:

// accessing all the anchor tags in nav-menu:
var navMenuAnchorTags = document.querySelectorAll('.nav-menu a');
// console.log(navMenuAnchorTags);
var currentPos;
var si;
//adding eventListener to each one of them:
for (var i = 0; i < navMenuAnchorTags.length; i++) {
  navMenuAnchorTags[i].addEventListener('click', myFunction);
}

// Closures and let:
// for (var i = 1; i <= 5; i++){
//   setTimeout(function(){
//     console.log('i:', i);
//   }, 1000);
// }
//
// console.log("After for loop:", i);


//implementing scrollFunction:
function myFunction(event){
  // As we know, anchor tags have a default behaviour of taking us to the section on which we have clicked. So we need to cancel that default behaviour:
  event.preventDefault();

  //accessing the element which we have clicked. We want the name of element we have clicked:
  var targetSectionName = event.target.innerText;
  //accessing the section to move to:
  var targetSection = document.getElementById(targetSectionName);
  //to get the coordinates of the target Section:
  var sectionCoordinates = targetSection.getBoundingClientRect();

  currentPos = 0;
  si = setInterval(scrollFunction, 07, sectionCoordinates); //this function will be called every 0.007 secs later
  // si = setInterval(function(){
  //   scrollFunction(sectionCoordinates, currentPos);
  // }, 07);

}
function scrollFunction(sectionCoordinates){
  if (currentPos >= sectionCoordinates.y) {
    //we have reached:
    clearInterval(si); //stop the setInterval
    return;
  }
  currentPos += 20;
  window.scrollBy(0, 20); //scroll by 20px in y direction
}


//FILL SKILL-BAR:

/*
//accessing the skills section:
var skillSection = document.getElementById('skills-container');
//accessing all the progress-bars:
var progressBars = document.querySelectorAll('.skill-progress > div');

//initialise all the bars width to 0:
function initialiseBars(){
  for (let bar of progressBars) {
    bar.style.width = 0 + '%';
  }
}
initialiseBars();

//Adding eventListener to window, as ofc window is being scrolled:
window.addEventListener('scroll', checkScroll);
var fillingBarsDone = false;

function checkScroll(){
  //check whether skills section is visible:
  var coordinates = skillSection.getBoundingClientRect();
  // console.log(coordinates.top, window.innerHeight);

  if (!fillingBarsDone && (coordinates.top < window.innerHeight)) {
    //skills section is visible now
    fillingBarsDone = true;
    fillBars();
  }else if (coordinates.top > window.innerHeight) {
    fillingBarsDone = false;
    initialiseBars();
  }
}

function fillBars(event){
  for (let bar of progressBars) {
    //get the value of their progress width whch we have specified:
    let progressWidth = bar.getAttribute('data-bar-width');
    var currentWidth = 0;

    var si = setInterval(function(){
      if (currentWidth >= progressWidth) {
        //stop the progress bar:
        clearInterval(si);
        return;
      }
      currentWidth+=0.5;
      bar.style.width = currentWidth + '%';
    }, 40);

  }
}
*/

//accessing particular elements:
var skillElements = document.getElementsByClassName('skill-progress');
//accessing all the progress bars:
var progressBars = document.querySelectorAll('.skill-progress > div');

//initialise progress of progress bars to 0:
function initialiseBars(){
  for (var bar of progressBars) {
    bar.style.width = 0 + '%';
  }
}
initialiseBars();

//marking all fillingBarDone boolean to false initially:
//here we are taking 8 booleans, one for each progress bar.
var fillingBarDone = [];
for (var i = 0; i < progressBars.length; i++) {
  fillingBarDone[i] = false;
}

//adding eventListener to window:
window.addEventListener('scroll', checkScroll);

function checkScroll(){
  //check which skillElements are visible:
  for (let i = 0; i < progressBars.length; i++) {
    // console.log('i', i);
    var coordinates = progressBars[i].getBoundingClientRect();

    if (!fillingBarDone[i] && (coordinates.top < window.innerHeight)) {
      //any of the progress bar is visible now:
      //fill the visible progress bar now:
      fillingBarDone[i] = true; //mark the visible progess bar as DONE! -> so we won't fill that again
      fillBar(progressBars[i]);
    }
  }


}

function fillBar(bar){
  // console.log('bar', bar);
  let progressWidth = bar.getAttribute('data-bar-width');
  var currentWidth = 0;

  var si = setInterval(function(){
    if (currentWidth >= progressWidth) {
      //stop the progress bar
      clearInterval(si);
      return;
    }
    currentWidth+=1;
    bar.style.width = currentWidth + '%';
  }, 20);
}


//PERCENTAGE VIEWED:

//accessing the percentage-scrolled-box:
var per_Scrolled_box = document.querySelector('#percentage-scrolled-box span');

//height of viewport:
var winHeight = window.innerHeight;

//height of the entire document (including margins):
var docHeight = document.documentElement.scrollHeight;
// (excluding margin: document.body.scrollHeight);

//The scrollable length would be:
/* The visible window (i.e viewport) CANNOT be scrolled further.
  Hence we deduce that length from the height of entire document */
var scrollableLength = docHeight-winHeight;

//Adding 'scroll' eventListener to window:
window.addEventListener('scroll', pctScroll);
function pctScroll(){
  //To know how much we have scrolled from the top (in pixels):
  var scrollTop = window.pageYOffset;

  //to know how much user has scrolled from the top (in %):
  var percentageScrolled = Math.round((scrollTop/scrollableLength) * 100);

  if (percentageScrolled > 100) {
    percentageScrolled = 100;
  }
  //change the text in div:
  per_Scrolled_box.innerText = percentageScrolled + "% Viewed";
}
