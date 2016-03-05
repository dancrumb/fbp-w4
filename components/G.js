/* global require:false, exports:true */

var noflo = require('noflo');

exports.getComponent = function() {
    'use strict';
    var totalIncome = 0;
    var numberOfKids = 0;
    var maritalStatus = "Single";

    var component = new noflo.Component();

    function calculateWitholding() {
        var witholding;
        var lowerLimit = (maritalStatus === "Single") ? 70000 : 100000;
        var upperLimit = (maritalStatus === "Single") ? 84000 : 119000;

        if(totalIncome > lowerLimit) {
            if(totalIncome <= upperLimit) {
                witholding = numberOfKids;
            } else {
                witholding = 0;
            }
        } else {
            witholding = 2 * numberOfKids;
            if(numberOfKids >= 5) {
                witholding = witholding - 2;
            } else if (numberOfKids >= 2) {
                witholding = witholding - 1;
            }
        }

        component.outPorts.out.send(witholding);
        return component.outPorts.out.disconnect();

    }

    component.inPorts.add('marital_status', {datatype: 'number'}, function(event, payload) {
        if(event === "data") {
            maritalStatus = payload;
            calculateWitholding();
        }
    });
    component.inPorts.add('total_income', {datatype: 'number'}, function(event, payload) {
        if(event === "data") {
            totalIncome = payload;
            calculateWitholding();
        }
    });
    component.inPorts.add('number_of_kids', {datatype: 'number'}, function(event, payload) {
        if(event === "data") {
            numberOfKids = payload;
            calculateWitholding();
        }
    });

    component.outPorts.add("out", {"datatype": "number"});


    return component;
};
