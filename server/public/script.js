const socket = io('http://localhost:5000')
    socket.on('connection', () => {
        console.log('connected to socket')
    })
    socket.on('messageFromServer', (data) => {
      appendMessage(data, '', 'yellow')
    })

    document.querySelector('#send-message').addEventListener('submit', (event) => {
      event.preventDefault();
      const message = document.querySelector('#message-text').value;
      appendMessage(message, 'ml-auto', 'blue')
      socket.emit('messageFromClient', message)
      document.querySelector('#message-text').value = ''
    })

    function appendMessage(text, prop, color) {
      const msgHtml = `<div class="p-6 pb-2 bg-${color}-200 w-1/2 rounded-3xl ml-5 my-2 ${prop} hover:bg-${color}-400">
        <h1 class="text-xl break-words">${text}</h1>
        <p class="text-sm text-right">${new Date().getHours()} : ${new Date().getMinutes()}</p>
      </div>`

      document.querySelector('#message-list').insertAdjacentHTML('beforeend', msgHtml)
    }
