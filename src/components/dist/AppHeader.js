"use strict";
exports.__esModule = true;
exports.AppHeader = void 0;
var react_1 = require("@ionic/react");
var icons_1 = require("ionicons/icons");
var react_2 = require("react");
var react_router_1 = require("react-router");
var app_context_1 = require("../context/app-context");
exports.AppHeader = function () {
    var _a = react_2.useContext(app_context_1.AppContext), sideMenuToggle = _a.sideMenuToggle, auth = _a.auth;
    var history = react_router_1.useHistory();
    // useEffect(() => {
    //     try {
    //         history.push('/');
    //     } catch (error:any) {
    //         console.log(error.message);
    //     }
    // }, [auth.user]);
    return (auth.isAuth() ?
        React.createElement("div", { className: "text-skin-main pt-3 px-4  font-bold text-sm  flex items-center p-2 justify-between" },
            React.createElement("div", { onClick: function (e) { return sideMenuToggle.toggle(); } },
                React.createElement(react_1.IonIcon, { icon: icons_1.menu, className: "text-2xl" })),
            React.createElement("div", { className: "space-x-4 text-xl" },
                React.createElement(react_1.IonIcon, { icon: icons_1.search }),
                React.createElement(react_1.IonIcon, { icon: icons_1.filter }))) :
        React.createElement("div", null));
};
