"use strict";
exports.__esModule = true;
exports.EStatus = exports.ECollection = exports.UserType = void 0;
var UserType;
(function (UserType) {
    UserType["tailor"] = "tailor";
    UserType["customer"] = "customer";
    UserType["kareegar"] = "kareegar";
})(UserType = exports.UserType || (exports.UserType = {}));
var ECollection;
(function (ECollection) {
    ECollection["users"] = "users";
    ECollection["naaps"] = "naaps";
    ECollection["orders"] = "orders";
    ECollection["customer"] = "customers";
    ECollection["tailorInfo"] = "tailorInfo";
    ECollection["membership"] = "membership";
})(ECollection = exports.ECollection || (exports.ECollection = {}));
var EStatus;
(function (EStatus) {
    EStatus["inprogress"] = "In Progress";
    EStatus["ready"] = "Ready";
    EStatus["delivered"] = "Delivered";
})(EStatus = exports.EStatus || (exports.EStatus = {}));
