"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = __importDefault(require("@actions/core"));
const github_1 = __importDefault(require("@actions/github"));
const glob_1 = __importDefault(require("@actions/glob"));
const exec_1 = __importDefault(require("@actions/exec"));
const run = () => __awaiter(void 0, void 0, void 0, function* () {
    var e_1, _a;
    const name = core_1.default.getInput("name");
    console.log(`Hello ${name}!`);
    const payload = JSON.stringify(github_1.default.context.payload, null, 2);
    console.log(`The event payload: ${payload}`);
    yield exec_1.default.exec("pwd");
    const globber = yield glob_1.default.create("**/README.md");
    try {
        for (var _b = __asyncValues(globber.globGenerator()), _c; _c = yield _b.next(), !_c.done;) {
            const file = _c.value;
            if (file.includes("node_modules")) {
                continue;
            }
            let stdout = "";
            let stderr = "";
            const options = {
                listeners: {
                    stdout: (data) => {
                        stdout += data.toString();
                    },
                    stderr: (data) => {
                        stderr += data.toString();
                    },
                },
                cwd: file.replace("README.md", ""),
            };
            yield exec_1.default.exec("tree", ["."], options);
            console.log("stdout: ", stdout);
            console.log("stderr: ", stderr);
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b.return)) yield _a.call(_b);
        }
        finally { if (e_1) throw e_1.error; }
    }
});
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield run();
    }
    catch (e) {
        if (e instanceof Error) {
            core_1.default.setFailed(e.message);
        }
        else {
            console.error(e);
            core_1.default.setFailed("See console.error message.");
        }
    }
});
main();
