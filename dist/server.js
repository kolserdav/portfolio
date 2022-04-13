"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
/* eslint-disable @typescript-eslint/no-var-requires */
var express_1 = __importDefault(require("express"));
var next_1 = __importDefault(require("next"));
var port = parseInt(process.env.PORT, 10) || 3000;
var dev = process.env.NODE_ENV !== 'production';
var app = (0, next_1["default"])({ dev: dev });
var handle = app.getRequestHandler();
app.prepare().then(function () {
    var server = (0, express_1["default"])();
    server.all('*', function (req, res) {
        return handle(req, res);
    });
    server.listen(port, function () {
        console.log("> Ready on http://localhost:".concat(port));
    });
});
