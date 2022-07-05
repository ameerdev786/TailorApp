"use strict";
exports.__esModule = true;
var react_1 = require("react");
var types_1 = require("../types");
var icons_1 = require("ionicons/icons");
var react_2 = require("@ionic/react");
var react_router_1 = require("react-router");
var util_1 = require("../helpers/util");
var components_1 = require("../components");
var OrderStatus = function (_a) {
    var status = _a.status;
    var getStyle = function (st) {
        if (st === types_1.EStatus.ready)
            return 'text-green-600';
        if (st === types_1.EStatus.delivered)
            return 'text-gray-400';
    };
    return (react_1["default"].createElement("div", { className: "rounded-full text-xs bg-skin-base  p-1 px-4 " + getStyle(status) }, status));
};
var OrderCard = function (_a) {
    var order = _a.order;
    var history = react_router_1.useHistory();
    var toggle = util_1.useToggle(false);
    return (react_1["default"].createElement("div", { className: "card" },
        react_1["default"].createElement("div", { className: "flex items-center" },
            react_1["default"].createElement("div", { onClick: function (e) { return history.push("/order-form?id=" + order.id); }, className: "text-white rounded bg-gray-100 rounded-full text-xs text-skin-accent font-bold flex items-center p-1 px-2" },
                react_1["default"].createElement(react_2.IonIcon, { className: "mr-1", icon: icons_1.createOutline }),
                react_1["default"].createElement("div", null,
                    " # ",
                    order.naap.naapId)),
            react_1["default"].createElement("div", { className: "pl-2" },
                react_1["default"].createElement(OrderStatus, { status: order.status })),
            react_1["default"].createElement("div", { className: "flex-grow" }),
            react_1["default"].createElement(components_1.ToggleChevron, { className: "self-end", onChage: function (show) { return toggle.setShow(!show); } })),
        react_1["default"].createElement("div", { className: "flex justify-between items-center" },
            react_1["default"].createElement("div", { className: "font-bold  capitalize" }, order.naap.customerName),
            react_1["default"].createElement("div", { className: "flex items-center -space-x-2  " },
                react_1["default"].createElement("div", { className: "flex -space-x-4" }, order.images &&
                    order.images.map(function (item, i) {
                        return react_1["default"].createElement("img", { src: item, key: i, className: "h-8 w-8 transform object-cover rounded-full", alt: "" });
                    })),
                react_1["default"].createElement("div", { className: "rounded-full h-8 w-8 bg-gray-200 flex relative z-20" },
                    react_1["default"].createElement("div", { className: "font-bold m-auto text-gray-600 " }, order.numberOfSuits)))),
        react_1["default"].createElement("div", { className: 'flex font-bold text-gray-400 text-xs  justify-between items-center' },
            react_1["default"].createElement("div", { className: "flex items-center space-x-2 text-gray-600" },
                react_1["default"].createElement(react_2.IonIcon, { className: "text-gray-400", icon: icons_1.callOutline }),
                react_1["default"].createElement("div", { className: "text-gray-400" }, order.naap.customerPhone)),
            react_1["default"].createElement("div", { className: "flex items-center space-x-2" },
                react_1["default"].createElement(react_2.IonIcon, { icon: icons_1.timeOutline }),
                react_1["default"].createElement("div", null, util_1.format(order.dueDate)))),
        toggle.isShow &&
            react_1["default"].createElement("div", { className: "pt-4" },
                react_1["default"].createElement("div", { className: "flex items-center font-bold text-xs text-gray-600" },
                    react_1["default"].createElement("div", { className: "w-1/3" }, "Total"),
                    react_1["default"].createElement("div", { className: "w-1/3 text-center" }, "Paid"),
                    react_1["default"].createElement("div", { className: "w-1/3 text-right" }, "Remaining")),
                react_1["default"].createElement("div", { className: "flex items-center text-xs text-gray-500" },
                    react_1["default"].createElement("div", { className: "w-1/3" },
                        order.totalAmount,
                        " Rs"),
                    react_1["default"].createElement("div", { className: "w-1/3 text-center" },
                        order.paidAmount,
                        " Rs"),
                    react_1["default"].createElement("div", { className: "w-1/3 text-right" },
                        order.remainingAmount,
                        " Rs")))));
};
var Orders = function () {
    var _a = react_1.useState([]), list = _a[0], setList = _a[1];
    var _b = react_1.useState([]), filtered = _b[0], setFiltered = _b[1];
    var history = react_router_1.useHistory();
    react_1.useEffect(function () {
        util_1.collectionSnapshot(types_1.ECollection.orders, function (list) {
            setList(list);
            setFiltered(list);
        });
    }, []);
    var onSearch = function (searchTerm) {
        var filteredList = list.filter(function (item) { return item.naap.customerName.toLowerCase().includes(searchTerm.toLowerCase()); });
        setFiltered(filteredList);
    };
    return (react_1["default"].createElement("div", { className: "w-full overflow-scroll h-screen" },
        react_1["default"].createElement("div", { className: "flex items-center space-x-2 mb-2" },
            react_1["default"].createElement("div", { className: "flex-grow" },
                react_1["default"].createElement("input", { type: "text", placeholder: "Search", className: "w-full font-bold text-white text-skin-accent", onChange: function (e) { return onSearch(e.target.value); } })),
            react_1["default"].createElement("div", null,
                react_1["default"].createElement("button", { className: "btn-accent px-4", onClick: function (e) { return history.push('/order-form'); } }, "New"))),
        react_1["default"].createElement("div", { className: "space-y-4" }, filtered.map(function (item, index) { return (react_1["default"].createElement(OrderCard, { order: item, key: index })); }))));
};
exports["default"] = Orders;
