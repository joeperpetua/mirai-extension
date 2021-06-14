chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({openTab: true, searchLang: 'en'});
});

// Where we will expose all the data we retrieve from storage.sync.
const storageCache = {};
// Asynchronously retrieve data from storage.sync, then cache it.
const initStorageCache = getAllStorageSyncData().then(items => {
  // Copy the data retrieved from storage into storageCache.
  Object.assign(storageCache, items);
});



chrome.storage.onChanged.addListener(function (changes, namespace) {
    for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
        getAllStorageSyncData().then(items => {
            // Copy the data retrieved from storage into storageCache.
            Object.assign(storageCache, items);
        }).catch(e => console.log(e));
    }
});

chrome.contextMenus.create({
    id: "search",
    title: `Translate \"%s\" with MiraiTranslate`,
    contexts: ["selection"]
});

chrome.contextMenus.onClicked.addListener(async function(info, tab) {

    try {
        await initStorageCache;
        // console.log(storageCache);
    } catch (e) {
        // Handle error that occurred during storage initialization.
        console.log(e);
    }
      // Normal action handler logic.


    if (info.menuItemId == "search") {
        let miraiURL = `https://miraitranslate.com/trial/#ja/${storageCache.searchLang}/${info.selectionText}`;

        // console.log(storageCache.openTab, storageCache.searchLang);

        if (storageCache.openTab) {
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
                    // console.log(miraiURL);
                }else{
                    chrome.tabs.create({
                        url: miraiURL
                    });
                    // console.log(miraiURL);
                }
            });
        }else{
            chrome.windows.create({
                focused: true,
                height: 640,
                width: 640,
                state:"normal",
                url: miraiURL
            });
        }
    }
});


// Reads all data out of storage.sync and exposes it via a promise.
//
// Note: Once the Storage API gains promise support, this function
// can be greatly simplified.
function getAllStorageSyncData() {
    // Immediately return a promise and start asynchronous work
    return new Promise((resolve, reject) => {
      // Asynchronously fetch all data from storage.sync.
      chrome.storage.sync.get(null, (items) => {
        // Pass any observed errors down the promise chain.
        if (chrome.runtime.lastError) {
          return reject(chrome.runtime.lastError);
        }
        // Pass the data retrieved from storage down the promise chain.
        resolve(items);
      });
    });
}