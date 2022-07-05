"use strict";
exports.__esModule = true;
exports.AppLayout = void 0;
var icons_1 = require("ionicons/icons");
var react_1 = require("react");
var SideMenu_1 = require("./SideMenu");
exports.AppLayout = function (props) {
    var _a = react_1.useState([{
            icon: icons_1.settingsOutline,
            name: 'Settings',
            link: '/settings'
        }]), menu = _a[0], setMenu = _a[1];
    return (React.createElement("div", { className: "h-screen w-full text-skin-mainDark" },
        React.createElement(SideMenu_1.SideMenu, { list: menu }),
        React.createElement("div", { className: "flex flex-col" }, props.children)));
};
