chrome.contextMenus.create({
    id: "search",
    title: `Translate \"%s\" with MiraiTranslate`,
    contexts: ["selection"]
});

chrome.contextMenus.onClicked.addListener(async function(info, tab) {
    if (info.menuItemId == "search") {
        let miraiURL = "https://miraitranslate.com/trial/#ja/en/" + info.selectionText;

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
            }else{
                chrome.tabs.create({
                    url: miraiURL
                });
            }
        });
        

        // chrome.windows.create({
        //     focused: true,
        //     height: 640,
        //     width: 640,
        //     state:"normal",
        //     incognito: true,
        //     url: miraiURL
        // });
    }
});

