// Efeito de digitação
function typeWriter(element, text, speed = 30) {
    let i = 0;
    element.innerHTML = '';
    function typing() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(typing, speed);
        }
    }
    typing();
}

document.getElementById('send-btn').addEventListener('click', async () => {
    const input = document.getElementById('user-input');
    if (!input.value.trim()) return;

    // Adiciona mensagem do usuário
    const userMsg = document.createElement('div');
    userMsg.className = 'user-message';
    userMsg.innerHTML = `<strong>Você:</strong> ${input.value}`;
    document.getElementById('chat-messages').appendChild(userMsg);

    // Resposta da IA (simulada ou via API)
    const aiMsg = document.createElement('div');
    aiMsg.className = 'ai-message';
    document.getElementById('chat-messages').appendChild(aiMsg);
    
    // Simula processamento
    aiMsg.innerHTML = '<div class="typing-indicator"><span></span><span></span><span></span></div>';

    // Chamada API real (descomente para usar)
    /*
    const response = await fetch('http://localhost:5000/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: input.value })
    });
    const data = await response.json();
    typeWriter(aiMsg, `<strong>IA:</strong> ${data.response}`);
    */
    
    // Simulação (remova quando conectar à API)
    setTimeout(() => {
        typeWriter(aiMsg, `<strong>IA:</strong> Esta é uma resposta gerada pela IA em linguagem neutra. Elu pode adaptar textos conforme necessário.`);
    }, 1500);

    input.value = '';
    document.getElementById('chat-messages').scrollTop = document.getElementById('chat-messages').scrollHeight;
});