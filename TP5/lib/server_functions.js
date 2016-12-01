function cleanString(stringInput) {
    var map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    
    return isNull(stringInput.replace(/[&<>"']/g, function(m) { return map[m]; }));
}

function isNull(input) {
    return input || 0;
}

module.exports.validateStringInput = cleanString;
module.exports.validateInput = isNull;

