const _flatten  = require('lodash/flatten');
const protractorImageComparison = require('protractor-image-comparison');

describe('test primo-explore-location-item-after', function() {
    let geoMapping = {
        '(stack no.127 )NBPER': '52.938960, -1.196906',
        '(864.a.421(30) )44CAM_864A+85Z2': '52.938942, -1.197074',

    };

    it('General snapshot regression tests', function() {
        browser.get('http://localhost:8003/primo-explore/fulldisplay?docid='+browser.params.query+'&context=L&vid='+browser.params.vid+'&lang=en_US&query=any,contains,'+browser.params.query+'&sortby=rank&offset=0');
        browser.waitForAngular();
        browser.sleep(10000);

        expect(browser.protractorImageComparison.checkScreen(browser.params.scenario)).toBeGreaterThan(browser.params.gt);
        expect(browser.protractorImageComparison.checkScreen(browser.params.scenario)).toBeLessThan(browser.params.lt);
    });

    it('The following should show a google maps iframe consistent with the location library', function() {
        browser.get('http://localhost:8003/primo-explore/search?query=any,contains,'+browser.params.query+'&vid='+browser.params.vid+'&lang=en_US&offset=0&noSilentLogin=true');
        browser.waitForAngular();
        element.all(by.tagName('prm-search-result-availability-line')).each(function(e1){
            browser.waitForAngular();
            e1.all(by.css('.arrow-link-button')).each(function(e2){
                e2.click().then(function(){
                    element(by.tagName('prm-location-items')).isDisplayed().then(function (isVisible) {
                        if (isVisible) {
                            let items = element.all(by.tagName('prm-location-items'));
                            /**********This is the actual tested logic start**********/
                            let geoLocation = geoMapping[browser.params.loc] || '40.689237, -74.044546';
                            /**********This is the actual tested logic end**********/
                            element.all(by.tagName('prm-location-items-after')).each(function(e3){
                                e3.element(by.tagName('iframe')).getAttribute('src').then(function(source){
                                    console.log(source);
                                    /**********This is the assertion part start**********/
                                    expect(source).toContain(encodeURI(geoLocation));
                                    /**********This is the assertion part end**********/
                                });
                            });
                        } else {
                            element(by.css('.close-button')).click();
                            browser.sleep(3000);//wait for dialog
                        }
                    });


                });
            });
        })
    });







});
