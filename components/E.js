/* global require:false, exports:true */

var noflo = require('noflo');

exports.getComponent = function() {
    'use strict';

    var component = new noflo.Component();

    component.inPorts.add('head_of_household', {datatype: 'boolean'}, function(event, payload) {
        switch (event) {
            case 'data':
                return component.outPorts.out.send(payload ? 1 : 0);
        }
    });

    component.outPorts.add("out", {"datatype": "number"});


    return component;
};
