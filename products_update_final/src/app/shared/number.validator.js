"use strict";
var NumberValidators = (function () {
    function NumberValidators() {
    }
    //TODO: custom validator (en esta caso método estático)
    NumberValidators.range = function (min, max) {
        return function (c) {
            if (c.value && (isNaN(c.value) || c.value < min || c.value > max)) {
                return { 'range': true };
            }
            return null;
        };
    };
    return NumberValidators;
}());
exports.NumberValidators = NumberValidators;
//# sourceMappingURL=number.validator.js.map