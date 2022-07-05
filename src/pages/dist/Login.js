"use strict";
exports.__esModule = true;
// Import FirebaseAuth and firebase.
var react_1 = require("react");
var StyledFirebaseAuth_1 = require("react-firebaseui/StyledFirebaseAuth");
var firebase_1 = require("firebase");
var react_router_1 = require("react-router");
var app_context_1 = require("../context/app-context");
// Configure FirebaseUI.
var uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: 'popup',
    // We will display Google and Facebook as auth providers.
    signInOptions: [
        firebase_1["default"].auth.PhoneAuthProvider.PROVIDER_ID,
        firebase_1["default"].auth.GoogleAuthProvider.PROVIDER_ID,
        firebase_1["default"].auth.FacebookAuthProvider.PROVIDER_ID
    ],
    callbacks: {
        // Avoid redirects after sign-in.
        signInSuccessWithAuthResult: function () { return false; }
    }
};
function Login() {
    var _a;
    var auth = react_1.useContext(app_context_1.AppContext).auth;
    var history = react_router_1.useHistory();
    // console.log(firebase.auth().currentUser?.providerData[0]?.uid===auth.user.uid)
    // console.log(auth,'///////////////////////')
    var signOut = function () {
        auth.signOut();
        history.push('/membership');
    };
    if (!auth.isAuth()) {
        return (react_1["default"].createElement("div", { className: 'h-screen flex flex-col justify-center' },
            react_1["default"].createElement("div", null,
                react_1["default"].createElement("div", { className: "text-center w-full space-x-2 -mt-24  h-64" },
                    react_1["default"].createElement("img", { src: "assets/machine.png", alt: "", className: "h-16 m-auto" }),
                    react_1["default"].createElement("div", { className: "text-2xl font-bold text-skin-accent" }, "DarzyApp"))),
            react_1["default"].createElement(StyledFirebaseAuth_1["default"], { uiConfig: uiConfig, firebaseAuth: firebase_1["default"].auth() })));
    }
    // console.log(firebase.auth().currentUser?.displayName,'////')
    return (react_1["default"].createElement("div", { className: "flex flex-col h-screen w-full  items-center justify-center" },
        react_1["default"].createElement("h1", { className: "text-xl" },
            "Welcome! ",
            react_1["default"].createElement("span", { className: "text-yellow-500  font-bold" },
                " ", (_a = firebase_1["default"].auth().currentUser) === null || _a === void 0 ? void 0 :
                _a.displayName,
                " ")),
        react_1["default"].createElement("button", { className: "bg-yellow-600 mb-32 mt-2 text-xl text-white w-11/12", onClick: function () { signOut(); } }, "Sign-out")));
}
exports["default"] = Login;
