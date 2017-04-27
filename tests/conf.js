
exports.config = {
    onPrepare: function() {
        // implicit and page load timeouts
        browser.manage().timeouts().pageLoadTimeout(40000);
        browser.manage().timeouts().implicitlyWait(25000);

        // for non-angular page
        browser.ignoreSynchronization = true;
        const protractorImageComparison = require('protractor-image-comparison');
        browser.protractorImageComparison = new protractorImageComparison(
            {
                baselineFolder: '/home/travis/build/noamamit92/primo-explore-location-item-after-google-maps-demo/node_modules/primo-explore-devenv/primo-explore/custom/primo-explore-location-item-after-google-maps-demo/tests/',
                screenshotPath: '/home/travis/build/noamamit92/primo-explore-location-item-after-google-maps-demo/node_modules/primo-explore-devenv/primo-explore/custom/primo-explore-location-item-after-google-maps-demo/tests/',
                ignoreColors: true,
                formatImageName:'base',
                debug: true
            }
        );


    },
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
        'browserName': 'firefox',
        /*"chromeOptions": {
         binary: 'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
         args: [
         '--start-maximized'
         ],
         extensions: [],
         }*/
    }

};
