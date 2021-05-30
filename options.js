// let tabRadio = document.querySelector('#tab-radio');
let openRadio = document.querySelectorAll('input[name="open-radio"]');
// let popupRadio = document.querySelector('#popup-radio');
let langSelect = document.querySelector('#lang-select');

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

openRadio[0].onchange = () => {
    if (openRadio[0].checked === true) {
        chrome.storage.sync.set({openTab: true});
        chrome.storage.sync.get(['openTab'], result => console.log(result.openTab));
    }
};

openRadio[1].onchange = () => {
    if (openRadio[1].checked === true) {
        chrome.storage.sync.set({openTab: false});
        chrome.storage.sync.get(['openTab'], result => console.log(result.openTab));
    }
};

langSelect.onchange = () => {
    chrome.storage.sync.set({searchLang: langSelect.value});
    chrome.storage.sync.get(['searchLang'], result => console.log(result.searchLang));
};










