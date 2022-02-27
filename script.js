'use strict';

///////////////////////////////////////
// Modal window
const nav=document.querySelector(".nav");
const tab=document.querySelectorAll(".operations__tab");
const tabContainer=document.querySelector(".operations__tab-container");
const tabContent=document.querySelectorAll(".operations__content");

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});
// NAVIGATION----------------------------------method 1
// document.querySelectorAll(".nav__link").forEach(function(el){
//   el.addEventListener("click",function(e){
//     e.preventDefault();
//     console.log("link");
//     console.log(this.href);
//     const id=this.getAttribute("href");
//     document.querySelector(id).scrollIntoView({behavior:"smooth"});
//   })
// })
// Method 2
document.querySelector(".nav__links").addEventListener("click",function(e){
  console.log(e.target);
  e.preventDefault();
  if(e.target.classList.contains("nav__link")){
    const id=e.target.getAttribute("href");
    document.querySelector(id).scrollIntoView({behavior:"smooth"});
  }
})
// tabbed content---------------------------------------

// tab.forEach(t=>t.addEventListener("click",t=>console.log("click")))
// tabContainer.addEventListener("click",function(e){
//   const clicked=e.target.closest(".operations__tab");
//   // clicked.classList.add("operations__tab--active");
//   console.log(clicked);
//   if(!clicked)return; 
//   tab.forEach(function(t){
//     console.log("ooo");
//     return t.classList.remove("opertaions__tab--active");

//     // clicked.classList.remove("opertaions__tab--active");
//   });
//   clicked.classList.add("operations__tab--active");
// })
tabContainer.addEventListener("click",function(e){
  const clicked=e.target.closest(".operations__tab");
  if(!clicked) return;
  tab.forEach(function(v){
    v.classList.remove("operations__tab--active");
  })
  tabContent.forEach(t=>t.classList.remove("operations__content--active"));
  clicked.classList.add("operations__tab--active");
  document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add("operations__content--active");

})
// menu fade away hover-------------------

const handleFuntion=function(e,o){
  if(e.target.classList.contains("nav__link")){
    const link=e.target;
    const siblings=link.closest(".nav").querySelectorAll(".nav__link");
    const logo=link.closest(".nav").querySelector("img");

    siblings.forEach(function(e){
      if(e!==link){
        e.style.opacity=o;
        logo.style.opacity=o;
        
      }
    })
  } 
}
nav.addEventListener("mouseover",function(el){
 handleFuntion(el,0.5);
});
nav.addEventListener("mouseout",function(el){
  handleFuntion(el,1);
});

// sticky nav bar----------------------------
const section1=document.querySelector("#section--1");
const header=document.querySelector(".header");
// const initialCoordinates=section1.getBoundingClientRect();
// const link=nav.getBoundingClientRect();
// console.log(link.top);
// console.log(link);
// window.addEventListener("scroll",function(){
//   if(initialCoordinates.top<window.scrollY){
//     nav.classList.add("sticky");
//   }
//   else
//   nav.classList.remove("sticky");
// })

//////////////////////////////////////////another method
// const observCallback=function (entries,observer){
// entries.forEach(en=>{
//   console.log(en);
// })
// };
// const observeOption={
//   root:null,
//   threshold:0.1,
// }

// const observer=new IntersectionObserver(observCallback,observeOption);
// observer.observe(section1);
const HeadCallback=function(entries,headerObserver){
  const [entry]=entries;
  // console.log(entry);
  if(!entry.isIntersecting){
    nav.classList.add("sticky");
  }
  else
  nav.classList.remove("sticky");
};
const headOption={
  root:null,
  threshold:0,
  rootMargin:"-90px",
};
const headerObserver=new IntersectionObserver(HeadCallback,headOption);
headerObserver.observe(header);



// reveal new section with animation
const section=document.querySelectorAll(".section");
const revealSection=function(entries,observer){
const [entry]=entries;
if(!entry.isIntersecting) return;
entry.target.classList.remove("section--hidden");
observer.unobserve(entry.target);
};
const sectionReveal=new IntersectionObserver(revealSection,{
  root:null,
  threshold:0.15,
});
section.forEach(function(f){
sectionReveal.observe(f);
f.classList.add("section--hidden");
});

// lazy loading--------------------
const img=document.querySelectorAll("img[data-src]")
const imgReveal=function(entries,observer){
const [entry]=entries;
if(!entry.isIntersecting) return;
entry.target.src=entry.target.dataset.src;

entry.target.addEventListener("load",function(){
  entry.target.classList.remove("lazy-img");
});
observer.unobserve(entry.target)  ;
};
const imgObserver=new IntersectionObserver(imgReveal,{
  root:null,
  threshold:0,
  rootMargin:"-200px",
});
img.forEach(function(e){
  imgObserver.observe(e);
  // img.classList.add("")
})
// slider -------------------------------------
let currSlide=0;
const slides=document.querySelectorAll(".slide");
const maxslide=slides.length-1;
const dotContainer=document.querySelector(".dots");
const createdots=function(){
slides.forEach(function(_,i){
  dotContainer.insertAdjacentHTML("beforeend",`<button class="dots__dot" data-slide="${i}"></button>`);
})
};
// createdots();
const activateDots=function(slide){
document.querySelectorAll(".dots__dot").forEach(function(e){
e.classList.remove("dots__dot--active");
document.querySelector(`.dots__dot[data-slide="${slide}"]`).classList.add("dots__dot--active");
})
}
const slideFunction=function (slide){
  slides.forEach(function(e,i){
    e.style.transform=`translateX(${100*(i-slide)}%)`;
  })
}



activateDots(0);
slideFunction(0);
createdots();



const nextSlide=function (){
  if(currSlide==maxslide){
    currSlide=0;
  }
  else{
    currSlide++;
  };
  slideFunction(currSlide);
  activateDots(currSlide);
};
const prevSlide=function(){
  if(currSlide==0){
    currSlide=maxslide;
  }
  else{
    currSlide--;
  }
  slideFunction(currSlide);
  activateDots(currSlide);
}
const leftButton=document.querySelector(".slider__btn--left");
const rightButton=document.querySelector(".slider__btn--right");
rightButton.addEventListener("click",nextSlide);
leftButton.addEventListener("click",prevSlide);
document.addEventListener("keydown",function(e){
  if(e.key==="ArrowLeft") prevSlide();
  if(e.key==="ArrowRight") nextSlide();
  // console.log(e);
})
dotContainer.addEventListener("click",function(e){
  if(e.target.classList.contains("dots__dot")){
  const slide=e.target.dataset.slide; 
  slideFunction(slide);
  activateDots(slide);
  }
})

// ----------------------------------------------------

// const message=document.createElement("div");
// message.classList.add("cookie-message");
// message.innerHTML="we use for vongchong <button class='btn btn--close--cookie'>got it</button>"
// // document.querySelector(".header").prepend(message);
// // document.querySelector(".header").append(message.cloneNode(true));

// // ///////////////////////////////////
// console.log(getComputedStyle(message).color);
// console.log(getComputedStyle(message).background);
// message.height
// const heading=document.querySelector("h1");
// // heading.addEventListener("mouseenter",function(e){
// //   alert("congratulation");
// // })

// heading.onmouseenter=function(e){
//   alert("congrta");
// }

// ---------------------

// const randomInt=function(min,max){
// return (Math.floor(Math.random()*(max-min+1)+min));
// }
// console.log(randomInt(0,255));
// const randomColor=()=>
// `rgb(${randomInt(0,255)},${randomInt(0,255)},${randomInt(0,255)})`;
// const num=randomColor();
// console.log(num);
// document.querySelector(".nav__link").addEventListener("click",function(){
// this.style.background=randomColor();
// })
// document.querySelector(".nav__links").addEventListener("click",function(){
// this.style.color=randomColor();
// })
// document.querySelector(".nav").addEventListener("click",function(){
// this.style.color=randomColor();
// })


// dom traverse--------------
// const h1=document.querySelector("h1");
// console.log(h1.childNodes);
// console.log(h1.children);
// console.log(h1.parentNode);
// console.log(h1.parentElement);
// h1.firstElementChild.style.color="white";
// h1.lastElementChild.style.color="blue";


