
document.addEventListener('mouseup', function (event) {
    if (event.target?.id === 'search-button' || event.target?.id === 'copy-button')
        return
    var scrollTop = (window.scrollY !== undefined) ? window.scrollY : (document.documentElement || document.body.parentNode || document.body).scrollTop;

    const posX = event.clientX - 110;
    const posY = event.clientY + 20 + scrollTop;
    const selectedText = window.getSelection().toString().trim();
    if (selectedText.length > 0) {
        showPopup(selectedText, posX, posY);
        setTimeout(removePopup, 3000)
    } else {
        removePopup()
    }
});

function showPopup(selectedText, posX, posY) {
    removePopup();
    const popup = document.createElement('div');
    popup.id = 'selection-popup';
    popup.innerHTML = `
      <div class="popup-content">
        <button id="search-button">Search</button>
        <button id="copy-button">Copy</button>
      </div>
    `;
    popup.style.left = posX + 'px';
    popup.style.top = posY + 'px';

    document.body.appendChild(popup);

    document.querySelector("div.popup-content button#search-button").onclick = function () {
        browser.runtime.sendMessage({ action: 'search', text: selectedText });
        removePopup();
    };

    document.querySelector("div.popup-content button#copy-button").onclick = function () {
        navigator.clipboard.writeText(selectedText).then(() => {
        }).catch(err => {
            console.error("Failed to copy text: ", err);
        }).finally(removePopup);
    };
}

function removePopup() {
    const existingPopup = document.getElementById('selection-popup');
    if (existingPopup) {
        document.body.removeChild(existingPopup);
    }
}