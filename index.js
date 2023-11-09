
// DARK/LIGHT MODE

const themeButton = document.getElementById('theme-button')

let currentTheme = localStorage.getItem('theme')

const genBtn = document.getElementById('generate-button')

switch(currentTheme) {

    case 'dark':

        document.documentElement.setAttribute('data-bs-theme', 'dark');

        themeButton.innerHTML = '<i class="bi bi-moon-stars-fill"></i>';

        genBtn.classList.remove('btn-dark')

        genBtn.classList.add('btn-light')

        break;

    case 'light':

        document.documentElement.setAttribute('data-bs-theme', 'light');

        themeButton.innerHTML = `<i class="bi bi-brightness-high-fill"></i>`

        genBtn.classList.remove('btn-light')

        genBtn.classList.add('btn-dark')

        break;

    default:

        document.documentElement.setAttribute('data-bs-theme', 'light');

        themeButton.innerHTML = `<i class="bi bi-brightness-high-fill"></i>`

        localStorage.setItem('theme', 'light')

        genBtn.classList.add('btn-dark')

}

themeButton.addEventListener('click', () => {

    currentTheme = localStorage.getItem('theme');

    const genBtn1 = document.getElementById('generate-button')

    switch(currentTheme) {

        case 'dark':

            document.documentElement.setAttribute('data-bs-theme', 'light');

            localStorage.setItem('theme', 'light')

            themeButton.innerHTML = `<i class="bi bi-brightness-high-fill"></i>`

            genBtn1.classList.remove('btn-light')

            genBtn1.classList.add('btn-dark')

            break;

        case 'light':

            document.documentElement.setAttribute('data-bs-theme', 'dark');

            localStorage.setItem('theme', 'dark')

            themeButton.innerHTML = '<i class="bi bi-moon-stars-fill"></i>';

            genBtn1.classList.remove('btn-dark')

            genBtn1.classList.add('btn-light')

            break;

        default:

            localStorage.setItem('theme', 'light')

    }

})

// GET IMAGES

const url = "https://picsum.photos/300"

const imageContainer = document.getElementById('images-container')

const imageLimit = 20;

for (let i = 0; i < imageLimit; i++) {
    const img = document.createElement('img');

    img.classList.add('image')

    img.classList.add('rounded')

    fetch(url).then((res) => {
        img.src = res.url;

        imageContainer.appendChild(img);

    })
}

// GENERATE NEW IMAGES

const generateButton = document.getElementById('generate-button')

generateButton.addEventListener('click', () => {
    
        const images = document.getElementsByClassName('image')        
    
        for (let i = 0; i < images.length; i++) {

            images[i].src = '';

            const img = images[i];
    
            fetch(url).then((res) => {
                img.src = res.url;
            })
        }
    })