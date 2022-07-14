
// image fade

const frontpg = document.getElementById('intro');

const fadeOutOnScroll = (element)=> {
  if (!element) {
    return;
  }
  
  var distanceToTop = window.pageYOffset + element.getBoundingClientRect().top;
  var elementHeight = element.offsetHeight;
  var scrollTop = document.documentElement.scrollTop;
  
  var opacity = 1;
  
  if (scrollTop > distanceToTop) {
    opacity = 1 - (scrollTop - distanceToTop) / elementHeight;
  }
  
  if (opacity >= 0) {
    element.style.opacity = opacity;
  }
}


// scroll animation JS

const scrollElements = document.querySelectorAll(".js-scroll");

const elementInView = (el, dividend = 1) => {
  const elementTop = el.getBoundingClientRect().top;

  return (
    elementTop <=
    (window.innerHeight || document.documentElement.clientHeight) / dividend
  );
};

const elementOutofView = (el) => {
  const elementTop = el.getBoundingClientRect().top;

  return (
    elementTop > (window.innerHeight || document.documentElement.clientHeight)
  );
};

const displayScrollElement = (element) => {
  element.classList.add("scrolled");
};

const hideScrollElement = (element) => {
  element.classList.remove("scrolled");
};

const handleScrollAnimation = () => {
  scrollElements.forEach((el) => {
    if (elementInView(el, 1.25)) {
      displayScrollElement(el);
    } else if (elementOutofView(el)) {
      hideScrollElement(el)
    }
  })
}

window.addEventListener("scroll", () => { 
  handleScrollAnimation();
  fadeOutOnScroll(frontpg);
});

// end of scroll animation JS

// Moving title text.
// Wrap every letter in a span
var textWrapper = document.querySelector('.ml3');
textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

anime.timeline({loop: false})
  .add({
    targets: '.ml3 .letter',
    opacity: [0,1],
    easing: "easeInOutQuad",
    duration: 2250,
    delay: (el, i) => 150 * (i+1)
  });

//setting a notification that email has been sent :D
const form = document.querySelector("#form");
const inputName = document.querySelector("#sendername");
const inputEmail = document.querySelector("#senderemail");
const inputMsg = document.querySelector("#message");


form.addEventListener("submit", function(e) {
    e.preventDefault();

//    create jSON package to send to server/flask
    const mail = JSON.stringify({name: inputName.value, email: inputEmail.value, message: inputMsg.value})
    $.ajax({
        url:"/",
        type:"POST",
        contentType: "application/json",
        data: mail,

        success: function(){
          let alert= document.getElementById("alert");
          alert.classList.remove("hide");
          setTimeout(()=>{
            alert.classList.add("fade-in");
            setTimeout(()=>{
              alert.classList.remove("fade-in");
              setTimeout(()=>{
                alert.classList.add("hide");
              },1000)
            },4000)
          })

          inputName.value="";
          inputEmail.value="";
          inputMsg.value="";
          }
        });

})

