const chatWindow = document.getElementById("chatWindow");
const userInput = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");
const quickBtns = document.querySelectorAll(".quick-btn");

function addMessage(text, sender) {
  const msg = document.createElement("div");
  msg.className = `msg ${sender}`;
  msg.textContent = text;
  chatWindow.appendChild(msg);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

function getBotReply(message) {
  const msg = message.toLowerCase();


  if (
    msg.includes("hello") ||
    msg.includes("hi") ||
    msg.includes("hey") ||
    msg.includes("good morning") ||
    msg.includes("good evening")
  ) {
    return "Hello! I am your landslide safety assistant. Ask me about safety tips, risk, preparedness, emergency steps, or what to do before, during, and after a landslide.";
  }


  if (msg.includes("safety") || msg.includes("tips") || msg.includes("safe")) {
    return "Stay alert during heavy rainfall, avoid steep slopes, keep an emergency kit ready, and follow local weather warnings.";
  }

  if (msg.includes("before") || msg.includes("prepare") || msg.includes("preparedness")) {
    return "Before a landslide, identify safe routes, keep important documents ready, store emergency supplies, and monitor rainfall alerts regularly.";
  }


  if (msg.includes("during") || msg.includes("what to do during") || msg.includes("immediate")) {
    return "During a landslide, move away from slopes immediately, avoid river valleys and low areas, and move to higher stable ground if possible.";
  }

 
  if (msg.includes("after") || msg.includes("post landslide")) {
    return "After a landslide, stay away from the affected area, check for injuries, avoid broken roads and unstable slopes, and follow official instructions.";
  }


  if (msg.includes("emergency") || msg.includes("help") || msg.includes("sos")) {
    return "Contact local emergency services immediately and move to a safe shelter. Keep your phone charged and share your location if possible.";
  }


  if (msg.includes("risk") || msg.includes("danger") || msg.includes("warning")) {
    return "Landslide risk increases during heavy rainfall, soil saturation, and in hilly or unstable areas. Check your risk page and alerts regularly.";
  }


  if (msg.includes("rain") || msg.includes("rainfall") || msg.includes("weather") || msg.includes("monsoon")) {
    return "Heavy rainfall is a major trigger for landslides. During monsoon season, stay alert and avoid travel near steep slopes if warnings are active.";
  }


  if (msg.includes("himachal") || msg.includes("uttarakhand") || msg.includes("himalaya") || msg.includes("mountain")) {
    return "Mountain regions can face higher landslide risk, especially during heavy rainfall. Stay updated with local alerts and avoid risky routes.";
  }


  if (msg.includes("kit") || msg.includes("supplies") || msg.includes("bag")) {
    return "An emergency kit should include water, dry food, flashlight, batteries, power bank, first aid, medicines, and important documents.";
  }


  if (msg.includes("shelter") || msg.includes("evacuate") || msg.includes("evacuation") || msg.includes("safe zone")) {
    return "Move to a safe zone away from slopes, streams, and debris paths. Use your nearest shelter or evacuation route if available.";
  }


  if (msg.includes("report") || msg.includes("submit") || msg.includes("community")) {
    return "Use the report page to share landslide-related issues, suspicious slope movement, or damage so others can stay informed.";
  }


  return "I am not fully sure about that. Try asking about safety tips, risk, emergency steps, preparedness, rainfall, shelter, or landslide response.";
}

function sendMessage(text) {
  const message = text.trim();
  if (!message) return;

  addMessage(message, "user");
  userInput.value = "";

  const typing = document.createElement("div");
  typing.className = "msg bot typing";
  typing.textContent = "Thinking...";
  chatWindow.appendChild(typing);
  chatWindow.scrollTop = chatWindow.scrollHeight;

  setTimeout(() => {
    typing.remove();
    const reply = getBotReply(message);
    addMessage(reply, "bot");
  }, 550);
}

sendBtn.addEventListener("click", () => {
  sendMessage(userInput.value);
});

userInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    sendMessage(userInput.value);
  }
});

quickBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    sendMessage(btn.dataset.msg);
  });
});

addMessage("Hi, I am your landslide safety assistant. Ask me anything.", "bot");