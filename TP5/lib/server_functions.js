var Entities = require('html-entities').AllHtmlEntities;
var html = new Entities();

function cleanString(input) {
    return isNull(emphasis(html.encode(input)));
}

function emphasis(input) {
    return input.replace(/`([^`]+)`/g, '<span class="special">$1</span>');
}

function isNull(input) {
    return input || 0;
}

module.exports.validateInput = isNull;
module.exports.validateStringInput = cleanString;

