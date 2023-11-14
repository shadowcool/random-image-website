
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

// CREATE MODAL

// Update your createModal function with this simplified version

function createModal(url, position) {
    const modal = document.createElement('div');
    modal.id = `m${position}`;
    modal.classList.add('modal', 'fade');
    modal.innerHTML = `
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5">Image</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="modal-image-container">
            <img src="${url}" class="rounded">
          </div>
          <div class="modal-image-info">
            <label for="modal-link-${position}" class="form-label">Link:</label>
            <div class="modal-link-container">
              <input type="text" id="modal-link-${position}" class="form-control modal-link" value="${url}" disabled>
              <a class="copy-btn" data-url="${url}">
                <i class="bi copy-logo bi-clipboard"></i>
              </a>
            </div>
            <div class="modal-html-container">
              <label for="modal-html-${position}" class="form-label">HTML Embed:</label>
              <div class="html-code-container">
                <div class="d-flex justify-content-between align-items-center">
                  <code>
                    <textarea id="modal-html-${position}" class="form-control modal-html-code" disabled>&lt;img src="${url}"&gt;</textarea>
                  </code>
                  <a class="copy-html-btn" data-url="${url}">
                    <i class="bi copy-logo bi-clipboard"></i>
                  </a>
                </div>
              </div>
            </div>
            <div class="modal-info-buttons">
              <label>Tools:</label>
              <br><br>
              <div class="buttons-container modal-info-button">
                <a data-url="${url}" download="image" class="btn download-btn btn-success btn-1 rounded order-1">
                  <i class="bi bi-download"></i>
                </a>
                <a href="${url}" target="_blank" class="btn btn-danger btn-2 rounded order-2">
                  <i class="bi bi-arrow-right-circle"></i>
                </a>
              </div>
            </div>                              
          </div>
        </div>
      </div>
    </div>
    `

    return modal;
}


// GET IMAGES

const url = "https://picsum.photos/300"

const imageContainer = document.getElementById('images-container')

const imageLimit = 20;

for (let i = 0; i < imageLimit; i++) {

    const imgContainer = document.createElement('div');

    imgContainer.classList.add('image-container')

    const img = document.createElement('img');

    const btn = document.createElement('button');

    img.classList.add('image')

    img.classList.add('rounded')

    btn.classList.add('btn')

    btn.classList.add('button')

    btn.type = "button";

    fetch(url).then((res) => {
        img.src = res.url;

        btn.dataset.bsTarget = `#m${i}`;

        const modal = createModal(res.url, i);

        btn.dataset.bsToggle = 'modal';

        imageContainer.appendChild(modal);

        imageContainer.appendChild(imgContainer);

        imgContainer.appendChild(img);

        imgContainer.appendChild(btn);

        const copyBtn = document.querySelector(`a[data-url="${res.url}"].copy-btn`);

        // COPY IMAGE URL

        copyBtn.addEventListener('click', () => {
            const url = copyBtn.getAttribute('data-url')
            navigator.clipboard.writeText(url);
            copyBtn.innerHTML = '<i class="bi copy-logo bi-clipboard-check"></i>';
            copyBtn.classList.add('copied-btn')
            setTimeout(() => {
                copyBtn.classList.remove('copied-btn')
                copyBtn.innerHTML = '<i class="bi copy-logo bi-clipboard"></i>';
            }, 1000)
        });

        // DOWNLOAD IMAGE
            const downloadBtn = document.querySelector(`a[data-url="${res.url}"].download-btn`);

            downloadBtn.addEventListener('click', () => {
            const url = downloadBtn.getAttribute('data-url');
            const filename = url.split('/').pop();
            fetch(url).then((res) => {
                res.blob().then((blob) => {
                    const a = document.createElement('a');
                    a.href = URL.createObjectURL(blob);
                    a.download = "image";
                    a.click();
                })
            })
        })

        // COPY HTML EMBED CODE
        const copyHtmlBtn = document.querySelector(`a[data-url="${res.url}"].copy-html-btn`);
        copyHtmlBtn.addEventListener('click', () => {
            const url = copyHtmlBtn.getAttribute('data-url');
            navigator.clipboard.writeText(`<img src="${url}">`);
            copyHtmlBtn.innerHTML = '<i class="bi copy-logo bi-clipboard-check"></i>';
            copyHtmlBtn.classList.add('copied-btn')
            setTimeout(() => {
                copyHtmlBtn.classList.remove('copied-btn')
                copyHtmlBtn.innerHTML = '<i class="bi copy-logo bi-clipboard"></i>';
            }, 1000)
        });
    })
}

// GENERATE NEW IMAGES

const generateButton = document.getElementById('generate-button')

generateButton.addEventListener('click', () => {

    const imgs = document.getElementsByClassName('image-container');

    while (imgs.length > 0) {
        imgs[0].remove();
    }

    for (let i = 0; i < imageLimit; i++) {            
        const imgContainer = document.createElement('div');
    
        imgContainer.classList.add('image-container')
    
        const img = document.createElement('img');
    
        const btn = document.createElement('a');
    
        img.classList.add('image')
    
        img.classList.add('rounded')
    
        btn.classList.add('btn')

        btn.classList.add('button')
    
        btn.innerHTML = '<i class="bi bi-download"></i>'
    
        fetch(url).then((res) => {
            img.src = res.url;

            btn.dataset.bsTarget = `#m${i}`;
    
            const modal = createModal(res.url, i);
    
            btn.dataset.bsToggle = 'modal';
    
            imageContainer.appendChild(modal);
    
            imageContainer.appendChild(imgContainer);
    
            imgContainer.appendChild(img);
    
            imgContainer.appendChild(btn);
    
            const copyBtn = document.querySelector(`a[data-url="${res.url}"].copy-btn`);
    
            // COPY IMAGE URL
    
            copyBtn.addEventListener('click', () => {
                const url = copyBtn.getAttribute('data-url')
                navigator.clipboard.writeText(url);
                copyBtn.innerHTML = '<i class="bi copy-logo bi-clipboard-check"></i>';
                copyBtn.classList.add('copied-btn')
                setTimeout(() => {
                    copyBtn.classList.remove('copied-btn')
                    copyBtn.innerHTML = '<i class="bi copy-logo bi-clipboard"></i>';
                }, 1000)
            });
    
            // DOWNLOAD IMAGE
                const downloadBtn = document.querySelector(`a[data-url="${res.url}"].download-btn`);
    
                downloadBtn.addEventListener('click', () => {
                const url = downloadBtn.getAttribute('data-url');
                const filename = url.split('/').pop();
                fetch(url).then((res) => {
                    res.blob().then((blob) => {
                        const a = document.createElement('a');
                        a.href = URL.createObjectURL(blob);
                        a.download = "image";
                        a.click();
                    })
                })
            })
    
            // COPY HTML EMBED CODE
            const copyHtmlBtn = document.querySelector(`a[data-url="${res.url}"].copy-html-btn`);
            copyHtmlBtn.addEventListener('click', () => {
                const url = copyHtmlBtn.getAttribute('data-url');
                navigator.clipboard.writeText(`<img src="${url}">`);
                copyHtmlBtn.innerHTML = '<i class="bi copy-logo bi-clipboard-check"></i>';
                copyHtmlBtn.classList.add('copied-btn')
                setTimeout(() => {
                    copyHtmlBtn.classList.remove('copied-btn')
                    copyHtmlBtn.innerHTML = '<i class="bi copy-logo bi-clipboard"></i>';
                }, 1000)
            });
        })
    }
});