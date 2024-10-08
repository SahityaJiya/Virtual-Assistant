let btn = document.querySelector("#btn");
let content = document.querySelector("#content");

function speak(text) {
  let text_speak = new SpeechSynthesisUtterance(text);

  // Set speech properties
  text_speak.rate = 1; // Speed of speech
  text_speak.pitch = 1.5; // Pitch to make the voice sound higher
  text_speak.volume = 1; // Volume of speech
  text_speak.lang = "hi-GB"; // Language set to Hindi (UK)

  // Select a female voice if available
  let voices = window.speechSynthesis.getVoices();
  let femaleVoice = voices.find(
    (voice) =>
      voice.name.includes("female") ||
      voice.name.includes("Female") ||
      voice.name.includes("Zira")
  );

  if (femaleVoice) {
    text_speak.voice = femaleVoice;
  }

  window.speechSynthesis.speak(text_speak);
}

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
    speak("My name is chimtim, your virtual assistant, made by sahitya jiya!");
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
  } else if (message.includes("open youtube")) {
    speak("opening youtube");
     window.open("https://www.youtube.com","_blank");
   
  } else if (message.includes("open google")) {
    speak("opening google");
     window.open("https://www.google.com","_blank");
   
  } else if (message.includes("open chrome")) {
    speak("opening chrome");
     window.open("https://www.chrome.com","_blank");
   
  } else if (message.includes("open facebook")) {
    speak("opening facebook");
     window.open("https://www.facebook.com","_blank");
   
  }
  else if (message.includes("open chatgpt")) {
    speak("opening chatgpt");
     window.open("https://www.chatgpt.com","_blank");
   
  }
  else {
    speak("Sorry, I didn't understand that. Can you please repeat?");
  }
}
