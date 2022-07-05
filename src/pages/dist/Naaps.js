"use strict";
exports.__esModule = true;
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var types_1 = require("../types");
var icons_1 = require("ionicons/icons");
var react_2 = require("@ionic/react");
var util_1 = require("../helpers/util");
var components_1 = require("../components");
var getSizeUi = function (item, key) {
    return (react_1["default"].createElement("div", { className: "flex bg-skin-base rounded-xl p-2" },
        react_1["default"].createElement("div", { className: "font-bold flex-grow capitalize" }, key),
        react_1["default"].createElement("div", null,
            item[key].inch,
            " ",
            item[key].fraction,
            "\"")));
};
var NaapCard = function (_a) {
    var item = _a.item, history = _a.history;
    var toggle = util_1.useToggle(false);
    var sizes = react_1.useState(['lambai', 'bazoo', 'teera', 'kalar', 'chatee', 'geera', 'pancha'])[0];
    return (react_1["default"].createElement("div", { className: 'card mb-2' },
        react_1["default"].createElement("div", { className: "flex items-start space-x-4" },
            react_1["default"].createElement("div", { className: "" },
                react_1["default"].createElement("img", { src: "assets/tape.png", alt: "tape", className: "h-14" })),
            react_1["default"].createElement("div", { className: "capitalize font-bold flex-grow space-y-2" },
                react_1["default"].createElement("div", { className: "flex justify-between text-gray-600 " },
                    react_1["default"].createElement("div", null, item.customerName),
                    react_1["default"].createElement("div", { className: "font-bold  flex items-center", onClick: function (e) { return history.push("/naap-form?id=" + item.id); } },
                        react_1["default"].createElement("div", { className: "mr-2" }, item.naapId),
                        react_1["default"].createElement(react_2.IonIcon, { icon: icons_1.createOutline, className: "m-auto" }))),
                react_1["default"].createElement("div", { className: "text-xs flex items-center space-x-1" },
                    react_1["default"].createElement("div", { className: "h-4 w-4 rounded-full flex bg-green-600 text-white" },
                        react_1["default"].createElement(react_2.IonIcon, { icon: icons_1.call, className: "m-auto" })),
                    react_1["default"].createElement("div", { className: "text-gray-500 flex-grow" }, item.customerPhone),
                    react_1["default"].createElement("div", { className: "text-xl" },
                        react_1["default"].createElement(components_1.ToggleChevron, { onChage: function (show) { return toggle.setShow(!show); } }))))),
        react_1["default"].createElement("div", { hidden: !toggle.isShow },
            react_1["default"].createElement("div", { className: "flex flex-wrap" }, sizes.map(function (s, i) { return (react_1["default"].createElement("div", { className: "w-1/2 p-1", key: i },
                " ",
                getSizeUi(item, s),
                " ")); })))));
};
var Naaps = function () {
    var _a = react_1.useState([]), list = _a[0], setList = _a[1];
    var _b = react_1.useState([]), filtered = _b[0], setFiltered = _b[1];
    var history = react_router_dom_1.useHistory();
    react_1.useEffect(function () {
        util_1.collectionSnapshot(types_1.ECollection.naaps, function (list) {
            setList(list);
            setFiltered(list);
        });
    }, []);
    var onSearch = function (searchTerm) {
        var filteredList = list.filter(function (item) {
            return util_1.isMatched(item, 'customerName', searchTerm) ||
                util_1.isMatched(item, 'naapId', searchTerm);
        });
        setFiltered(filteredList);
    };
    return (react_1["default"].createElement("div", { className: "w-full overflow-scroll h-screen pb-24" },
        react_1["default"].createElement("div", { className: "flex items-center space-x-2 mb-2" },
            react_1["default"].createElement("div", { className: "flex-grow" },
                react_1["default"].createElement("input", { type: "text", placeholder: "Search", className: "w-full font-bold text-white text-skin-accent", onChange: function (e) { return onSearch(e.target.value); } })),
            react_1["default"].createElement("div", null,
                react_1["default"].createElement("button", { className: "btn-accent px-4", onClick: function (e) { return history.push('/naap-form'); } }, "New"))),
        react_1["default"].createElement("div", { className: "mb-32" }, filtered.map(function (item, index) { return (item &&
            item.customerName &&
            react_1["default"].createElement(NaapCard, { key: index, item: item, history: history })); }))));
};
exports["default"] = Naaps;
