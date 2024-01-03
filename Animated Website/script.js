
const scroll = new LocomotiveScroll({
  el: document.querySelector('#main'),
  smooth: true
});

function firstPageAn(){
  var tl=gsap.timeline()
  tl.from("#nav",{
    y:-10,
    opacity:0,
    duration:1.5,
    ease:Expo.easeInOut
  })
  .to(".bounding-elem",{
    y:0,
    ease:Expo.easeInOut,
    duration:2,
    delay:-1,
    stagger:.2
  })
  .from("#hero-footer",{
    y:-10,
    opacity:0,
    duration:1.5,
    delay:-1,
    ease:Expo.easeInOut
  })
}

var timeOut;
// jab mouse ho toh hum distort kar paye circle ko
function circleChaptaKaro(){
  // define default scale value
   var xscale=1;
   var yscale=1;
   var xprev=0;
   var yprev=0;
   window.addEventListener("mousemove",(dets)=>{
     var xdiff=dets.clientX-xprev;
     var ydiff=dets.clientY-yprev;
     clearTimeout(timeOut)
     xprev=dets.clientX;
     yprev=dets.clientY;
     xscale=gsap.utils.clamp(.8,1.2,xdiff)
     yscale=gsap.utils.clamp(.8,1.2,ydiff)
     circleMouseFollower(xscale,yscale)
    timeOut= setTimeout(()=>{
      document.querySelector("#mini-circle").style.transform=`translate(${dets.clientX}px, ${dets.clientY}px) scale(1,1)`
     },100)
    //  console.log(xdiff,ydiff)
   })
}

function circleMouseFollower(xscale,yscale){
  window.addEventListener("mousemove",(det)=>{
    // console.log(det.clientX,det.clientY)
    document.querySelector("#mini-circle").style.transform=`translate(${det.clientX}px, ${det.clientY}px) scale(${xscale},${yscale})`
  })
}

circleMouseFollower()
firstPageAn()
circleChaptaKaro()

document.querySelectorAll('.elem').forEach((elem)=>{
  // console.log(elem)
  let rotate=0;
  let diffRot=0;

  elem.addEventListener("mouseleave",(dets)=>{
    gsap.to(elem.querySelector("img"),{
      opacity:0,
      ease:Power3,
      duration:.5
     
    });
    });

  elem.addEventListener("mousemove",(dets)=>{

  let diff=dets.clientY-elem.getBoundingClientRect().top;
  diffRot=dets.clientX-rotate;
  rotate=dets.clientX
  // console.log(diff)
  gsap.to(elem.querySelector("img"),{
    opacity:1,
    ease: Power3,
    top:diff,
    left:dets.clientX,
    rotate:gsap.utils.clamp(-15,15,diffRot)
  });
  });
});
