// let tabRadio = document.querySelector('#tab-radio');
let openRadio = document.querySelectorAll('input[name="open-radio"]');
// let popupRadio = document.querySelector('#popup-radio');
let langSelect = document.querySelector('#lang-select');

let saveBtn = document.querySelector('.btn.btn-success');

// initialize default values
chrome.storage.sync.get(['openTab', 'searchLang'], function(result) {

    if (result.openTab) {
        openRadio[0].checked = true;
    }else{
        openRadio[1].checked = true;
    }

    for (let option = 0; option < langSelect.length; option++) {
        if (langSelect[option].value === result.searchLang) {
            langSelect.selectedIndex = langSelect[option].index;
        }
    }
});

saveBtn.onclick = () => {
    let success = false;
    if (openRadio[0].checked === true) {
        chrome.storage.sync.set({openTab: true}, () => {
            let confirmation = document.querySelector('.text');
            confirmation.innerHTML = "The changes have been successfully saved";

            setTimeout(() => {
                confirmation.innerHTML = '';
            }, 3000);
        });
        //chrome.storage.sync.get(['openTab'], result => console.log(result.openTab));
    }

    if (openRadio[1].checked === true) {
        chrome.storage.sync.set({openTab: false}, () => {
            let confirmation = document.querySelector('.text');
            confirmation.innerHTML = "The changes have been successfully saved";

            setTimeout(() => {
                confirmation.innerHTML = '';
            }, 3000);
            });
        //chrome.storage.sync.get(['openTab'], result => console.log(result.openTab));
    }

    chrome.storage.sync.set({searchLang: langSelect.value}, () => {
        let confirmation = document.querySelector('.text');
        confirmation.innerHTML = "The changes have been successfully saved";

        setTimeout(() => {
            confirmation.innerHTML = '';
        }, 3000);
    });
    //chrome.storage.sync.get(['searchLang'], result => console.log(result.searchLang));console.log(success);
    
};











