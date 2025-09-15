import './style.css'

const hamburguesa = document.querySelector('.hamburguesa')
const nav = document.querySelector('nav')

hamburguesa.addEventListener(
    'click',
    ()=>
    {
        nav.classList.toggle('show')
    }
)