/* global require:false, exports:true */

var noflo = require('noflo');

exports.getComponent = function() {
    'use strict';

    var component = new noflo.Component();

    component.inPorts.add('in', {datatype: 'string'}, function(event, isADependant) {
        switch (event) {
            case 'data':
                return component.outPorts.out.send(!isADependant ? 1 : 0);
        }
    });

    component.outPorts.add("out", {"datatype": "number"});


    return component;
};
