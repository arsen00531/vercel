const load = () => {
    const messageContainer = document.querySelector('.messages')
    const input = document.querySelector('.form input')
    const form = document.querySelector('.form')
    const socket = io.connect();
    const name = atob(document.cookie.split('=')[1].split('.')[1])
    const body = document.querySelector('body')

    socket.on('add mess', data => {
        const message = document.createElement('div')
        const time = document.createElement('div')
        const p = document.createElement('p')

        p.textContent = data.mess
        time.textContent = `${data.time} ${data.name}`
        message.classList.add('message', data.name === name ? 'out' : 'in')
        messageContainer.append(message)
        message.append(time)
        message.append(p)
        window.scrollTo({
            top: body.scrollHeight,
            behavior: 'smooth'
        })
    })

    form.addEventListener('submit', (e) => {
        e.preventDefault()

        if (input.value === '') return
        
        socket.emit('send mess', {mess: input.value, name, time: new Date().toLocaleTimeString()})
        input.value = ''
    })

    
    setTimeout(function() {
        window.scrollTo(0, document.body.scrollHeight);
    }, 200)
}

window.addEventListener('load', load)