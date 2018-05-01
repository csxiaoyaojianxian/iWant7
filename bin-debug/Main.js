var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        var _this = _super.call(this) || this;
        _this.curEle = [];
        _this.bg = new Background();
        Main.vector = _this;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    Main.prototype.onAddToStage = function (event) {
        egret.lifecycle.addLifecycleListener(function (context) {
            // custom lifecycle plugin
            context.onUpdate = function () {
            };
        });
        egret.lifecycle.onPause = function () {
            egret.ticker.pause();
        };
        egret.lifecycle.onResume = function () {
            egret.ticker.resume();
        };
        this.runGame().catch(function (e) {
            console.log(e);
        });
    };
    Main.prototype.runGame = function () {
        return __awaiter(this, void 0, void 0, function () {
            var result, userInfo;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadResource()];
                    case 1:
                        _a.sent();
                        this.createGameScene();
                        return [4 /*yield*/, RES.getResAsync("description_json")
                            // this.startAnimation(result);
                        ];
                    case 2:
                        result = _a.sent();
                        // this.startAnimation(result);
                        return [4 /*yield*/, platform.login()];
                    case 3:
                        // this.startAnimation(result);
                        _a.sent();
                        return [4 /*yield*/, platform.getUserInfo()];
                    case 4:
                        userInfo = _a.sent();
                        console.log(userInfo);
                        return [2 /*return*/];
                }
            });
        });
    };
    Main.prototype.loadResource = function () {
        return __awaiter(this, void 0, void 0, function () {
            var loadingView, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        loadingView = new LoadingUI();
                        this.stage.addChild(loadingView);
                        return [4 /*yield*/, RES.loadConfig("resource/default.res.json", "resource/")];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, RES.loadGroup("preload", 0, loadingView)];
                    case 2:
                        _a.sent();
                        this.stage.removeChild(loadingView);
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _a.sent();
                        console.error(e_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 创建游戏场景
     * Create a game scene
     */
    Main.prototype.createGameScene = function () {
        console.log(this.stage.stageWidth);
        console.log(this.stage.stageHeight);
        this.bg = new Background();
        this.addChild(this.bg);
        this.curEle = Ele.createPair(this);
        //设置显示对象可以相应触摸事件
        this.bg.touchEnabled = true;
        this.bg.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
        this.bg.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
    };
    Main.prototype.onTouchBegin = function (evt) {
        this.startX = evt.stageX;
        this.startY = evt.stageY;
    };
    Main.prototype.onTouchEnd = function (evt) {
        var _this = this;
        this.endX = evt.stageX;
        this.endY = evt.stageY;
        this.direction = TouchCal.cal(this.startX, this.startY, this.endX, this.endY);
        var indexX;
        var indexY;
        switch (this.direction) {
            case 1:
                // 无操作
                console.log(1);
                break;
            case 3:
                // 下落
                this.bg.touchEnabled = false;
                var p1 = void 0, p2 = void 0;
                if (this.curEle[0].indexY > this.curEle[1].indexY) {
                    p1 = this.curEle[0].down();
                    p2 = this.curEle[1].down();
                }
                else {
                    p1 = this.curEle[1].down();
                    p2 = this.curEle[0].down();
                }
                Promise.all([p1, p2]).then(function () { return __awaiter(_this, void 0, void 0, function () {
                    var _this = this;
                    return __generator(this, function (_a) {
                        // 检查合并
                        Ele.checkPuzzle([[this.curEle[1].indexX, this.curEle[1].indexY], [this.curEle[0].indexX, this.curEle[0].indexY]], function () {
                            // 创建元素
                            _this.curEle = Ele.createPair(_this);
                            _this.bg.touchEnabled = true;
                        });
                        return [2 /*return*/];
                    });
                }); });
                break;
            case 2:
                // 向右移动一格
                indexX = this.curEle[0].indexX > this.curEle[1].indexX ? this.curEle[0].indexX : this.curEle[1].indexX;
                if (indexX < 5) {
                    this.curEle[0].moveWithOutAnimation(this.curEle[0].indexX + 1, this.curEle[0].indexY);
                    this.curEle[1].moveWithOutAnimation(this.curEle[1].indexX + 1, this.curEle[1].indexY);
                }
                break;
            case 4:
                // 向左移动一格
                indexX = this.curEle[0].indexX < this.curEle[1].indexX ? this.curEle[0].indexX : this.curEle[1].indexX;
                if (indexX > 0) {
                    this.curEle[0].moveWithOutAnimation(this.curEle[0].indexX - 1, this.curEle[0].indexY);
                    this.curEle[1].moveWithOutAnimation(this.curEle[1].indexX - 1, this.curEle[1].indexY);
                }
                break;
            case 0:
                // 变换
                console.log(0);
                Ele.transform(this.curEle[0], this.curEle[1]);
                break;
        }
    };
    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
    Main.prototype.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    /**
     * 描述文件加载成功，开始播放动画
     * Description file loading is successful, start to play the animation
     */
    Main.prototype.startAnimation = function (result) {
        var _this = this;
        var parser = new egret.HtmlTextParser();
        var textflowArr = result.map(function (text) { return parser.parse(text); });
        var textfield = this.textfield;
        var count = -1;
        var change = function () {
            count++;
            if (count >= textflowArr.length) {
                count = 0;
            }
            var textFlow = textflowArr[count];
            // 切换描述内容
            // Switch to described content
            textfield.textFlow = textFlow;
            var tw = egret.Tween.get(textfield);
            tw.to({ "alpha": 1 }, 200);
            tw.wait(2000);
            tw.to({ "alpha": 0 }, 200);
            tw.call(change, _this);
        };
        change();
    };
    return Main;
}(egret.DisplayObjectContainer));
__reflect(Main.prototype, "Main");
