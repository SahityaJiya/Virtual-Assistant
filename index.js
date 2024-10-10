let btn = document.querySelector("#btn");
let content = document.querySelector("#content");

function speak(text) {
  let text_speak = new SpeechSynthesisUtterance(text);

  text_speak.rate = 1; 
  text_speak.pitch = 1.5; 
  text_speak.volume = 1; 
  text_speak.lang = "hi-GB"; 

  let voices = window.speechSynthesis.getVoices();
  let femaleVoice = voices.find(
    (voice) =>
      voice.name.toLowerCase().includes("female") || voice.name.includes("Zira")
  );

  if (femaleVoice) {
    text_speak.voice = femaleVoice;
  }

  window.speechSynthesis.speak(text_speak);
}

//-------------------------------------------------------------
function websites(data) {
  if (data.split(" ")[0] === "open") {
    window.open(`https://www.${data.split(" ")[1]}.com/`, "_blank");
  }
}

//-------------------------------------------------------------
function wishMe() {
  let day = new Date();
  let hours = day.getHours();
  if (hours >= 0 && hours < 12) {
    speak("Good Morning Dear");
  } else if (hours >= 12 && hours < 16) {
    speak("Good Afternoon dear");
  } else {
    speak("Good Evening Dear");
  }
}

window.addEventListener("load", () => {
  window.speechSynthesis.onvoiceschanged = () => {
    wishMe();
  };
});

let speechRecognition =
  window.speechRecognition || window.webkitSpeechRecognition;
let recognition = new speechRecognition();
recognition.onresult = (event) => {
  let currentIndex = event.resultIndex;
  let transcript = event.results[currentIndex][0].transcript;
  content.innerText = transcript;
  takeCommand(transcript);
};

btn.addEventListener("click", () => {
  recognition.start();
});

function takeCommand(message) {
  message = message.toLowerCase();
  if (message.includes("hello")) {
    speak("Hello dear, what can I help you with?");
  } else if (message.includes("how are you")) {
    speak("I'm doing great, thank you! How can I assist you?");
  } else if (message.includes("what is your name")) {
    speak("My name is Chimtim, your virtual assistant, made by Sahitya Jiya!");
  } else if (message.includes("time")) {
    let now = new Date();
    let time = now.toLocaleTimeString();
    speak(`The time is ${time}`);
  } else if (message.includes("date")) {
    let now = new Date();
    let date = now.toLocaleDateString();
    speak(`Today's date is ${date}`);
  } else if (message.includes("thank you")) {
    speak("You're welcome! I'm happy to help.");
  } else if (message.split(" ")[0] === "open") {
    websites(message);
  } else {
    speak(`This is what I found on the internet regarding ${message}...`);
    window.open(`https://www.google.co.in/search?q=${message}/`, "_blank");
  }
}
