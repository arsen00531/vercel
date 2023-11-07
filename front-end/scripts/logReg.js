const load = () => {
    const form = document.querySelector('form')
    const name = document.querySelector('.name')
    const password = document.querySelector('.password')

    form.addEventListener('submit', (e) => {
        e.preventDefault()
        if (name.value === '' || password.value === '' || name.value === ' ' || password.value === ' ') {
            const p = document.createElement('p')
            p.classList.add('error')
            p.textContent = 'Вы не ввели имя или пароль!'
            form.append(p)
        }
        else form.submit()
    })
}

window.addEventListener('load', load)