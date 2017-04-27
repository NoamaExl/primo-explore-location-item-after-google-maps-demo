const _flatten  = require('lodash/flatten');
const protractorImageComparison = require('protractor-image-comparison');

describe('test primo-explore-location-item-after', function() {
    let geoMapping = {
        '(stack no.118 )NBPER': '52.938960, -1.196906',
        'NVET': '52.938960, -1.196906',
        '(289.6 9ZAR10D11S05TBT F906 )SMLAC': '52.938960, -1.196906',
        '(301.06 9ZAR03D01S06TFW T573 )SMLAC': '52.938942, -1.197074',
        '(Z286.S37 S38x 1997 )NWILS': '52.938764, -1.197330',
        '(Journal of cell science. ; 4. )NBPER': '52.939000, -1.197417',
        '(JK141 1893 )MAIN': '52.938960, -1.196906',
        '(320.975 A23 )MAIN': '52.938960, -1.196906',
        '(Journal of otolaryngology. Supplement ; no. 6. )NBPER': '52.938960, -1.196906',
        '(Journal of endocrinology ; v. 155, suppl. 1. )NBPER': '52.938942, -1.197074',
        '(Journal of rheumatology. Supplement ; no. 51 )NBPER': '52.938764, -1.197330',
        'NWPR': '52.938960, -1.196906',
        '(Mfiche 2 Journal of chemical research. Synopses. )NSCI': '52.938960, -1.196906',
        '(Quarto QD1 .J9425x )NSCI': '52.938942, -1.197074',
        '(Quarto QD1 .J9425x )NINTE': '52.938764, -1.197330',
        '(Quarto QD1 .J9425x )NMAGR': '52.939000, -1.197417'
    };

    it('General snapshot regression tests', function() {
        browser.get('http://localhost:8003/primo-explore/fulldisplay?docid=DEMO-ALEPH001399130&context=L&vid=NORTH&lang=en_US&search_scope=LC&adaptor=Local%20Search%20Engine&tab=all_resources&query=any,contains,DEMO-ALEPH001399130&sortby=rank&offset=0');
        browser.waitForAngular();
        browser.sleep(10000);

        expect(browser.protractorImageComparison.checkScreen('locationsMaps')).not.toBeCloseTo(1);
    });



    it('The following should show a google maps iframe consistent with the location library', function() {
        browser.get('http://localhost:8003/primo-explore/search?query=any,contains,DEMO-ALEPH001399130&tab=all_resources&search_scope=LC&vid=NORTH&lang=en_US&offset=0&noSilentLogin=true');
        //browser.sleep(3000);//wait for sso
        browser.waitForAngular();
        /*element(by.css('#searchBar')).clear().sendKeys('Journal of');/!*Blue_Bay_Aleph001886410*!/
         browser.actions().sendKeys(protractor.Key.TAB).perform();
         element(by.css('.search-actions .button-confirm')).click();*/

        element.all(by.tagName('prm-search-result-availability-line')).each(function(e1){
            browser.waitForAngular();
            e1.all(by.css('.arrow-link-button')).each(function(e2){
                e2.click().then(function(){
                    element(by.tagName('prm-location-items')).isDisplayed().then(function (isVisible) {
                        if (isVisible) {
                            let items = element.all(by.tagName('prm-location-items'));
                            /**********This is the actual tested logic start**********/
                            let geoLocation = geoMapping['(stack no.127 )'+'NBPER'] || '40.689237, -74.044546';
                            /**********This is the actual tested logic end**********/
                            element.all(by.tagName('prm-location-items-after')).each(function(e3){
                                //browser.waitForAngular();
                                //browser.sleep(10000);
                                e3.element(by.tagName('iframe')).getAttribute('src').then(function(source){
                                    //browser.waitForAngular();
                                    //browser.sleep(10000);
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
