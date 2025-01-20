// 1) Get all .word elements
let words = document.querySelectorAll(".word");

// 2) Convert each word's text into individual <span class="letter">
words.forEach(word => {
  let letters = word.textContent.split("");
  word.textContent = "";
  letters.forEach(letter => {
    let span = document.createElement("span");
    span.textContent = letter;
    span.className = "letter";
    word.append(span);
  });
});

// 3) Setup indexes
let currentWordIndex = 0;
let maxWordIndex = words.length - 1;

// Make the first word visible
words[currentWordIndex].style.opacity = "1";

// 4) Define the rotate function with the original transitions
function rotateText() {
  let currentWord = words[currentWordIndex];
  let nextWord = currentWordIndex === maxWordIndex ? words[0] : words[currentWordIndex + 1];
  document.querySelector('.rotating-names').style.width = nextWord.offsetWidth + 'px';

  // Rotate out letters of current word
  Array.from(currentWord.children).forEach((letter, i) => {
    setTimeout(() => {
      letter.className = "letter out";
    }, i * 80);
  });

  // Reveal & rotate in letters of next word
  nextWord.style.opacity = "1";
  Array.from(nextWord.children).forEach((letter, i) => {
    letter.className = "letter behind"; // start behind at -90deg
    setTimeout(() => {
      letter.className = "letter in";   // rotate to 0deg
    }, 340 + i * 80);
  });

  // Update index
  currentWordIndex =
    currentWordIndex === maxWordIndex ? 0 : currentWordIndex + 1;
}

// 5) Launch the rotation
rotateText();
setInterval(rotateText, 4000);