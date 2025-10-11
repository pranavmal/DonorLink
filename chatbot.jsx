// src/chatbot.jsx
import "./index.css";

const messagesDiv = document.getElementById("messages");
const input = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");

function scrollToBottom() {
  // Always scroll to latest message
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

async function sendMessage() {
  const text = input.value.trim();
  if (!text) return;

  addMessage("user", text);
  input.value = "";

  try {
    const res = await fetch("http://localhost:5000/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: text }),
    });

    const data = await res.json();
    addMessage("bot", data.reply);
  } catch (err) {
    addMessage("bot", "⚠️ Error: Could not connect to server");
    console.error(err);
  }
}

function addMessage(role, text) {
  const div = document.createElement("div");
  div.className = `message ${role}`;
  div.style.margin = "0.5rem 0";
  div.style.padding = "0.75rem 1rem";
  div.style.borderRadius = "1rem";
  div.style.maxWidth = "80%";
  div.style.wordWrap = "break-word";
  div.style.whiteSpace = "pre-wrap"; // preserve newlines

  if (role === "user") {
    div.style.backgroundColor = "#0d9488"; // teal
    div.style.color = "white";
    div.style.alignSelf = "flex-end";
    div.style.marginLeft = "auto";
  } else {
    div.style.backgroundColor = "#e5e7eb"; // light gray
    div.style.color = "#111827";
    div.style.alignSelf = "flex-start";
  }

  // Preserve line breaks & bullet formatting
  div.innerHTML = text
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\n/g, "<br>")
    .replace(/^- /gm, "• ")
    .replace(/(\d+)\. /g, "<br>$1. ");

  messagesDiv.appendChild(div);

  // ✅ Scroll to bottom after message is added
  scrollToBottom();
}

// Event listeners
sendBtn.addEventListener("click", sendMessage);
input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") sendMessage();
});