async function processIdea() {
    const inputField = document.getElementById("user-input");
    const input = inputField.value;

    if (input.trim() === "") return;

    addMessage(input, "user-msg");
    inputField.value = "";

    const response = await fetch("/evaluate", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ idea: input })
    });

    const data = await response.json();
    addMessage(data.result, "ai-msg");
}

function addMessage(text, className) {
    const chatBox = document.getElementById("chat-box");
    const message = document.createElement("div");
    message.className = `message ${className}`;
    message.textContent = text;
    chatBox.appendChild(message);
    chatBox.scrollTop = chatBox.scrollHeight;
}
