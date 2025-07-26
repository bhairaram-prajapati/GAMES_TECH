// Simple form alert
document.addEventListener('DOMContentLoaded', function () {
  const bottomForm = document.getElementById('bottomForm');

  if (bottomForm) {
    bottomForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const formData = new FormData(bottomForm);

      fetch(bottomForm.action, {
        method: 'POST',
        body: formData,
        headers: {
          Accept: 'application/json'
        }
      })
        .then(response => {
          if (response.ok) {
            alert('✅ Thank you for contacting us!');
            bottomForm.reset();
          } else {
            alert('⚠️ Submission failed. Please try again.');
          }
        })
        .catch(error => {
          alert('🚫 Network error. Please try again.');
        });
    });
  }
});




// Tic Tac Toe Game Script
let boxes=document.querySelectorAll(".box");
let resetBtn=document.querySelector("#reset-btn");
let newGamebtn=document.querySelector("#new-btn");
let msgContainer=document.querySelector(".msg-container");
let msg=document.querySelector("#msg");

let turnO=true;//playerX, playerO;

const winPatterns=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
];
const resetGame=()=>{
    turnO=true;
    enableBoxes();
    msgContainer.classList.add("hide");

}

boxes.forEach((box)=>{
    box.addEventListener("click",()=>{
        console.log("Box was clicked");
        if(turnO){
            box.innerText="O";
            turnO=false;
        }else{
            box.innerText="X";
            turnO=true;
        }
        box.disabled=true;
        checkWinner();

    });
});
let disableBoxes=()=>{
    for (let box of boxes){
        box.disabled=true;
    }
};


let enableBoxes=()=>{
    for (let box of boxes){
        box.disabled=false;
        box.innerText="";
        box.classList.remove("winning-box");
    }
};

const showWinner=(Winner)=>{
    msg.innerText=`Congratulation! Winner is: ${Winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();

    confetti({
    particleCount: 150,
    spread: 70,
    origin: { y: 0.6 },
  });
  let duration = 1000;
  let end = Date.now() + duration;

  (function frame() {
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { x: Math.random(), y: Math.random() * 0.5 },
    });
    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();

};


const checkWinner=()=>{
    for(let pattern of winPatterns){//pattetrn is index

        let pos1val=boxes[pattern[0]].innerText;
        let pos2val=boxes[pattern[1]].innerText;
        let pos3val=boxes[pattern[2]].innerText;
        if (pos1val!=""&& pos2val!=""&& pos3val!=""){
            if(pos1val===pos2val&& pos2val==pos3val){
                 pattern.forEach((index) => {
                boxes[index].classList.add("winning-box");
      });
                console.log("Winner ",pos1val);
                showWinner(pos1val);
                
            }
        }
  
    };

};
newGamebtn.addEventListener("click",resetGame);
resetBtn.addEventListener("click",resetGame);

// Hamburger menu functionality
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger-btn');
    const nav = document.getElementById('main-nav');
    if (hamburger && nav) {
        hamburger.addEventListener('click', function() {
            nav.classList.toggle('open');
            document.body.classList.toggle('menu-open', nav.classList.contains('open'));
        });
        nav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('open');
                document.body.classList.remove('menu-open');
            });
        });
    }
});

// star filling
const stars = document.querySelectorAll(".star-rating .star");
const ratingDisplay = document.getElementById("rating-value");
let currentRating = 0;

stars.forEach((star, index) => {
  star.addEventListener("mouseover", () => {
    fillStars(index);
  });

  star.addEventListener("mouseout", () => {
    fillStars(currentRating - 1);
  });

  star.addEventListener("click", () => {
    currentRating = index + 1;
    ratingDisplay.textContent = `Your rating: ${currentRating}`;
  });
});

function fillStars(index) {
  stars.forEach((star, i) => {
    if (i <= index) {
      star.innerHTML = "&#9733;"; // filled star ★
      star.classList.add("filled");
    } else {
      star.innerHTML = "&#9734;"; // hollow star ☆
      star.classList.remove("filled");
    }
  });
}

