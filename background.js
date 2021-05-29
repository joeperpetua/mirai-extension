chrome.contextMenus.create({
    id: "search",
    title: `Translate \"%s\" with MiraiTranslate`,
    contexts: ["selection"]
});

chrome.contextMenus.onClicked.addListener(async function(info, tab) {
    if (info.menuItemId == "search") {
        let miraiURL = "https://miraitranslate.com/trial/#ja/en/" + info.selectionText;


        await chrome.tabs.query({}, function(tabs) {
            let alreadyExists = {
                status: false,
                id: 0
            };

            for (let tab = 0; tab < tabs.length; tab++) {
                if(tabs[tab].url.includes('https://miraitranslate.com/trial')) {
                    alreadyExists = {
                        status: true,
                        id: tabs[tab].id
                    };

                    console.log(alreadyExists)
                }
            }

            if(alreadyExists.status) {
                console.log(alreadyExists)
                chrome.tabs.remove(alreadyExists.id);
                chrome.tabs.create({
                    url: miraiURL
                });
            }else{
                chrome.tabs.create({
                    url: miraiURL
                });
                console.log('else')
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

