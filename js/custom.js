(function(){
"use strict";
'use strict';

var app = angular.module('viewCustom', ['angularLoad']);

app.controller('prmLocationItemAfterController', ['$sce', 'angularLoad', function ($sce, angularLoad) {
    var vm = this;

    vm.getCurrentLoc = getCurrentLoc;
    vm.getCoordinates = getCoordinates;
    vm.getLink = getLink;
    vm.$sce = $sce;

    function getCurrentLoc() {
        return vm.parentCtrl.currLoc;
    }

    function getLink() {
        if (vm.parentCtrl.currLoc) {
            return vm.$sce.trustAsResourceUrl('https://www.google.com/maps/embed/v1/place?q=' + vm.getCoordinates() + '&zoom=55&key=AIzaSyCA672SP7hP5HQw1OokdC5-VHuKYHcUge4');
        } else {
            return '';
        }
    }
    function getCoordinates() {
        var callNumber = vm.parentCtrl.currLoc.location.callNumber;
        var libraryCode = vm.parentCtrl.currLoc.location.libraryCode;
        console.log(vm.geoMapping[callNumber + libraryCode]);
        return vm.geoMapping[callNumber + libraryCode] || '40.689237, -74.044546';
    }

    vm.geoMapping = {
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

    /*vm.$onInit = function () {
       }*/
}]);

/*http://dc03kg0084eu.hosted.exlibrisgroup.com:8991/pds*/

app.component('prmLocationItemsAfter', {
    bindings: { parentCtrl: '<' },
    controller: 'prmLocationItemAfterController',
    template: '<div layout="row" class="layout-full-width"><iframe width="100%" height="450" frameborder="0" style="border:0" \n        src="{{::$ctrl.getLink()}}" \n        allowfullscreen></iframe></div>'
});
})();