"use strict";
var NumberValidators = (function () {
    function NumberValidators() {
    }
    // Null  : significa que ha validado
    // !Null : significa que no ha validado
    NumberValidators.range = function (min, max) {
        return function (c) {
            if (c.value && (isNaN(c.value) || c.value < min || c.value > max)) {
                return { 'range': true };
            }
        };
    };
    return NumberValidators;
}());
exports.NumberValidators = NumberValidators;
//# sourceMappingURL=number.validator.js.map