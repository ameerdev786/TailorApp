"use strict";
exports.__esModule = true;
exports.SideMenu = void 0;
var react_1 = require("@ionic/react");
var icons_1 = require("ionicons/icons");
var react_2 = require("react");
var react_router_1 = require("react-router");
var app_context_1 = require("../context/app-context");
var util_1 = require("../helpers/util");
var types_1 = require("../types");
function SideMenu(_a) {
    var list = _a.list;
    var history = react_router_1.useHistory();
    var sideMenuToggle = react_2.useContext(app_context_1.AppContext).sideMenuToggle;
    var _b = react_2.useState([]), info = _b[0], setInfo = _b[1];
    react_2.useEffect(function () {
        util_1.collectionSnapshot(types_1.ECollection.tailorInfo, (function (list) {
            setInfo(list);
        }));
    }, []);
    return (React.createElement("div", null, sideMenuToggle.isShow &&
        React.createElement("div", { style: {
                backdropFilter: 'blur(2px)'
            }, className: "absolute  bg-skin-base bg-opacity-80 z-40 h-screen w-full", onClick: function (e) { return sideMenuToggle.hide(); } },
            React.createElement("div", { className: "t-0 h-full left-0 w-2/3 z-40  space-y-4  bg-white bg-opacity-90 shadow-2xl", onClick: function (e) { return e.stopPropagation(); } },
                info.map(function (item) { return (React.createElement("div", { key: item.id, className: "flex space-x-2 border-b bg-skin-main text-skin-base py-4 p-4 rounded-br-2xl" },
                    React.createElement("div", null,
                        React.createElement("div", { onClick: function () { return history.push('/settings'); }, className: "h-12 w-12 rounded-full bg-skin-base" },
                            React.createElement("img", { className: "w-12 h-12 rounded-full", src: item.banner, alt: item.banner }))),
                    React.createElement("div", null,
                        React.createElement("h1", { className: "text-md font-bold mb-2" }, item.tailorName),
                        React.createElement("div", { className: "text-xs " },
                            " ",
                            React.createElement(react_1.IonIcon, { icon: icons_1.locationOutline }),
                            " ",
                            item.adress,
                            " "),
                        React.createElement("div", { className: "text-xs " },
                            " ",
                            React.createElement(react_1.IonIcon, { icon: icons_1.callOutline }),
                            " ",
                            item.phone)))); }),
                list.map(function (item) {
                    return React.createElement("div", { key: item.name, className: "flex items-center text-skin-main text-sm space-x-2 ml-2", onClick: function (e) { return history.push(item.link); } /* || (item && item.event(e) ) */ },
                        React.createElement("div", { className: "h-4" },
                            React.createElement(react_1.IonIcon, { icon: item.icon })),
                        React.createElement("div", null, item.name));
                }),
                React.createElement("button", { className: "w-11/12 ml-2 text-blue-700", onClick: function () { history.push('/membership'); } }, "MemberShip"),
                React.createElement("button", { className: "w-11/12 ml-2 text-blue-700", onClick: function () { history.push('/login'); } }, "login"),
                React.createElement("button", { className: "w-11/12 ml-2 text-blue-700", onClick: function () { history.push('/pay'); } }, "Pay"),
                React.createElement("button", { className: "w-11/12 ml-2 text-blue-700", onClick: function () { history.push('success'); } }, "success")))));
}
exports.SideMenu = SideMenu;
