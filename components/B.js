/* global require:false, exports:true */

var noflo = require('noflo');

exports.getComponent = function() {
    'use strict';
    var maritalStatus = "Single";
    var numberOfJobs = 0;
    var workingSpouse = false;
    var additionalWages = 0;

    var component = new noflo.Component();

    function calculateWitholding() {
        var witholding;
        if( (maritalStatus === "Single") ||
            (maritalStatus === "Married" && numberOfJobs===1 && !workingSpouse) ||
            (additionalWages <= 1500)) {
            witholding =  1;
        } else {
            witholding = 0;
        }
        component.outPorts.out.send(witholding);
        return component.outPorts.out.disconnect();

    }

    component.inPorts.add('marital_status', {datatype: 'boolean'}, function(event, payload) {
        if(event === "data") {
                maritalStatus = payload;
                calculateWitholding();
        }
    });
    component.inPorts.add('num_jobs', {datatype: 'number'}, function(event, payload) {
        if(event === "data") {
                numberOfJobs = payload;
                calculateWitholding();
        }
    });
    component.inPorts.add('working_spouse', {datatype: 'boolean'}, function(event, payload) {
        if(event === "data") {
                workingSpouse = payload;
                calculateWitholding();
        }
    });
    component.inPorts.add('additional_wages', {datatype: 'number'}, function(event, payload) {
        if(event === "data") {
                additionalWages = payload;
                calculateWitholding();
        }
    });

    component.outPorts.add("out", {"datatype": "number"});


    return component;
};
