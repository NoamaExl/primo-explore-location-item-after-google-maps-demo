exports.config = {
    specs: ['todo-spec.js'],
    allScriptsTimeout: 100000,
    // Options to be passed to Jasmine-node.
    jasmineNodeOpts: {
        showColors: true,
        defaultTimeoutInterval: 100000,
        isVerbose: true
    },
    capabilities: {
        /*onPrepare: function () {
            browser.executeScript('window.name = "NG_ENABLE_DEBUG_INFO"');
        },*/
        'browserName': 'chrome',
        "chromeOptions": {
            binary: 'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
            args: [
                '--start-maximized'
            ],
            extensions: [],
        }
    }

};