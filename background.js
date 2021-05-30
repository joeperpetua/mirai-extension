let options = {
    openTab: true,
    searchLang: 'en'
};

chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({openTab: true, searchLang: 'en'});
});

chrome.storage.onChanged.addListener(function (changes, namespace) {
    for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
        switch (key) {
            case 'openTab':
                options.openTab = newValue;
                break;

            case 'searchLang':
                options.searchLang = newValue;
                break;

            default:
                break;
        }

      // console.log(options.openTab, options.searchLang);
    }
});

chrome.contextMenus.create({
    id: "search",
    title: `Translate \"%s\" with MiraiTranslate`,
    contexts: ["selection"]
});

chrome.contextMenus.onClicked.addListener(async function(info, tab) {
    if (info.menuItemId == "search") {
        let miraiURL = `https://miraitranslate.com/trial/#ja/${options.searchLang}/${info.selectionText}`;

        if (options.openTab) {
            // get all tabs
            await chrome.tabs.query({}, function(tabs) {
                let alreadyExists = {
                    status: false,
                    id: 0
                };

                // if mirai tab exists save its ID
                for (let tab = 0; tab < tabs.length; tab++) {
                    if(tabs[tab].url.includes('https://miraitranslate.com/trial')) {
                        alreadyExists = {
                            status: true,
                            id: tabs[tab].id
                        };
                    }
                }

                // if the tab exists delete it and create another one
                if(alreadyExists.status) {
                    chrome.tabs.remove(alreadyExists.id);
                    chrome.tabs.create({
                        url: miraiURL
                    });
                    console.log(miraiURL);
                }else{
                    chrome.tabs.create({
                        url: miraiURL
                    });
                    console.log(miraiURL);
                }
            });
        }else{
            chrome.windows.create({
                focused: true,
                height: 640,
                width: 640,
                state:"normal",
                incognito: true,
                url: miraiURL
            });
        }
    }
});

