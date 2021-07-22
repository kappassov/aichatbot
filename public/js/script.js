const btn = document.querySelector("button");
const outputme = document.querySelector(".output-you");
const outputbot = document.querySelector(".output-bot");

const socket = io();

const SpeechRecognition = window.SpeechRecognition;

const recognition = new SpeechRecognition();

recognition.lang = "en-US";
recognition.interimResults = false;

btn.addEventListener('click', ()=> {
  recognition.start();
});

recognition.onresult = function(event){
  const last = event.results.length-1;
  const text = event.results[last][0].transcript;
  console.log(text);

  outputme.textContent = text;
  socket.emit("chat msg", text);
}

