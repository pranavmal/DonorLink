import React, { useState, useRef } from "react";
// import ollama from "ollama";
import './index.css'

// const messagesDiv = document.getElementById("messages");
// const input = document.getElementById("user-input");
// const sendBtn = document.getElementById("send-btn");

// async function sendMessage() {
//   const text = input.value.trim();
//   if (!text) return;

//   addMessage("user", text);
//   input.value = "";

//   try {
//     const response = await ollama.chat({
//       model: "llama3.1:8b",
//       messages: [{ role: "user", content: "Role: You are a assistant helping people about donating blood and organs on a website called DonorLink. DonorLink is a platform that informs others to donate and doesn't take part in the actual donation process. Be short and concise but accurate. No decorators for text styling (such as asterisks). Prompt: " + text }],
//     });
//     const data = await response.message.content;
//     addMessage("bot", data || "No response from bot.");
//   } catch (error) {
//     addMessage("bot", "Could not connect to server");
//     console.error("Fetch error:", error);
//   }
// }

// function addMessage(role, text) {
//   const div = document.createElement("div");
//   div.className = `message ${role}`;
//   div.textContent = text;
//   messagesDiv.appendChild(div);
//   messagesDiv.scrollTop = messagesDiv.scrollHeight;
// }

// sendBtn.addEventListener("click", sendMessage);
// input.addEventListener("keypress", (e) => {
//   if (e.key === "Enter") sendMessage();
// });

