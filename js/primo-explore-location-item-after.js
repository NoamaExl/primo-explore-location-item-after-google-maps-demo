

app.controller('prmLocationItemAfterController', [ '$sce', 'angularLoad', function ($sce, angularLoad) {
    let vm = this;

    vm.getCurrentLoc = getCurrentLoc;
    vm.getCoordinates = getCoordinates;
    vm.getLink = getLink;
    vm.$sce = $sce;

    function getCurrentLoc(){
        return vm.parentCtrl.currLoc;
    }

    function getLink(){
        if(vm.parentCtrl.currLoc) {
            return vm.$sce.trustAsResourceUrl('https://www.google.com/maps/embed/v1/place?q='+vm.getCoordinates()+'&zoom=55&key=AIzaSyCA672SP7hP5HQw1OokdC5-VHuKYHcUge4');
        }else{
            return '';
        }

    }
    function getCoordinates(){
        let callNumber = vm.parentCtrl.currLoc.location.callNumber;
        let libraryCode = vm.parentCtrl.currLoc.location.libraryCode;
        console.log(vm.geoMapping[callNumber+libraryCode]);
        return vm.geoMapping[callNumber+libraryCode] || '40.689237, -74.044546';
    }






    vm.geoMapping = {
        '(stack no.127 )NBPER': '52.938960, -1.196906',
        '(864.a.421(30) )44CAM_864A+85Z2': '52.938942, -1.197074',

    };


    /*vm.$onInit = function () {

     }*/


}]);

/*http://dc03kg0084eu.hosted.exlibrisgroup.com:8991/pds*/

app.component('prmLocationItemsAfter', {
    bindings: {parentCtrl: '<'},
    controller: 'prmLocationItemAfterController',
    template: `<div layout="row" class="layout-full-width"><iframe width="100%" height="450" frameborder="0" style="border:0" 
        src="{{::$ctrl.getLink()}}" 
        allowfullscreen></iframe></div>`
});
