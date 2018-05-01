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
var Ele = (function (_super) {
    __extends(Ele, _super);
    function Ele(num, indexX, indexY) {
        var _this = _super.call(this) || this;
        // 容器
        _this.sprite = new egret.Sprite();
        // 用于布局
        _this.baseHeight = 220;
        _this.num = num;
        _this.indexX = indexX;
        _this.indexY = indexY;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    Ele.prototype.onAddToStage = function (event) {
        this.drawEle();
    };
    // 绘制一个元素
    Ele.prototype.drawEle = function () {
        //   |----50----|-15-|--80--|6|--80--|6|--80--|6|--80--|6|--80--|6|--80--|-15-|----50----|
        var shp = new egret.Shape();
        // bg inner borderWidth border text textsize
        var style = {
            0: [0x5e5e5e, 0x5e5e5e, 6, 0xcdcdcd, 0xcdcdcd, 60],
            1: [0xf9dbff, 0xae6cc6, 3, 0xfbfffb, 0xf9dbff, 46],
            2: [0xdbffc3, 0x79aa4e, 3, 0xfbfffb, 0xdbffc3, 46],
            3: [0xbbe5fd, 0x468cca, 3, 0xfbfffb, 0xbbe5fd, 46],
            4: [0xbbe5fd, 0xbbe5fd, 3, 0xfbfffb, 0x4a86c4, 55],
            5: [0xdbffc3, 0xdbffc3, 3, 0xfbfffb, 0x7bae51, 55],
            6: [0xf9dbff, 0xf9dbff, 3, 0xfbfffb, 0xaa6cc1, 55],
            7: [0xfb5944, 0xfb5944, 8, 0xfbfffb, 0xfbfffb, 63],
            8: [0xfb5944, 0xfb5944, 8, 0xf9da5f, 0xfbfffb, 63],
            9: [0xf3ae3d, 0xf3ae3d, 8, 0xf9da5f, 0xfbfffb, 63] // 三重合并的7
        };
        // 绘制元素背景
        shp.graphics.beginFill(style[this.num][0], 1);
        shp.graphics.lineStyle(style[this.num][2], style[this.num][3]);
        // shp.graphics.drawRoundRect(65 + 86 * this.indexX, this.baseHeight + 86 * this.indexY, 80, 80, 40);
        shp.graphics.drawRoundRect(0, 0, 80, 80, 40);
        shp.graphics.endFill();
        // 绘制元素小圆圈
        shp.graphics.beginFill(style[this.num][1], 1);
        shp.graphics.lineStyle(0, 0xffffff);
        // shp.graphics.drawCircle(65 + 86 * this.indexX + 40, this.baseHeight + 86 * this.indexY + 40, 30);
        shp.graphics.drawCircle(40, 40, 30);
        shp.graphics.endFill();
        this.sprite.addChild(shp);
        // 绘制文字
        var label = new egret.TextField();
        label.size = style[this.num][5];
        label.width = 80;
        label.height = 80;
        label.x = 0;
        label.y = 5; // 用于真机适配的微调
        label.textColor = style[this.num][4];
        // label.fontFamily = "YaHei";
        label.textAlign = egret.HorizontalAlign.CENTER;
        label.verticalAlign = egret.VerticalAlign.MIDDLE;
        if (this.num == 8 || this.num == 9) {
            label.text = "7";
        }
        else {
            label.text = this.num.toString();
        }
        this.sprite.addChild(label);
        // 位移
        this.sprite.x = 65 + 86 * this.indexX;
        this.sprite.y = this.baseHeight + 86 * this.indexY;
        this.addChild(this.sprite);
    };
    // 移动到指定位置，并记录matrix
    Ele.prototype.move = function (indexX, indexY, callback, remove) {
        var _this = this;
        if (callback === void 0) { callback = null; }
        if (remove === void 0) { remove = false; }
        console.log('move');
        var distanceX = indexX - this.indexX;
        var distanceY = indexY - this.indexY;
        var distance = distanceX > distanceY ? distanceX : distanceY;
        Ele.matrix[this.indexX][this.indexY] = null;
        Ele.matrix[indexX][indexY] = this;
        this.indexX = indexX;
        this.indexY = indexY;
        console.log(Ele.matrix);
        // 自由落体
        var tw = egret.Tween.get(this.sprite);
        var promise = new Promise(function (resolve, reject) {
            tw.to({
                x: 65 + 86 * indexX,
                y: _this.baseHeight + 86 * indexY
            }, Math.sqrt(distance) * 200, egret.Ease.circIn)
                .call(function () {
                if (remove) {
                    Main.vector.removeChild(_this);
                    Ele.matrix[indexX][indexY] = null;
                }
                if (callback) {
                    callback();
                }
                resolve();
            });
        });
        // 播放音效、震动
        var downSound = RES.getRes("down_mp3");
        setTimeout(function () {
            downSound.play(0, 1);
            // 震动
            platform.vibrateShort();
        }, distance * 80);
        return promise;
    };
    // 只移动，无动画，且不计入matrix
    Ele.prototype.moveWithOutAnimation = function (indexX, indexY) {
        this.indexX = indexX;
        this.indexY = indexY;
        this.sprite.x = 65 + 86 * indexX;
        this.sprite.y = this.baseHeight + 86 * indexY;
        // 震动
        platform.vibrateShort();
    };
    // 下落到能下落的最低处
    Ele.prototype.down = function () {
        console.log('down');
        var indexY = Ele.getDownLocation(this);
        return this.move(this.indexX, indexY);
    };
    // 创建新元素
    Ele.createPair = function (parent) {
        console.log('createPair');
        // 获取num1   0-6 随机数
        var num1 = Math.floor(Math.random() * 7);
        // 获取num2  num1+num2 != 7
        var num2 = Math.floor(Math.random() * 7);
        while (num1 + num2 == 7) {
            num2 = Math.floor(Math.random() * 7);
        }
        var curEle = [];
        var ele1 = Ele.create(num1, 2, 1);
        var ele2 = Ele.create(num2, 3, 1);
        curEle.push(ele1);
        curEle.push(ele2);
        // 添加到面板
        curEle.forEach(function (ele) {
            parent.addChild(ele);
        });
        return curEle;
    };
    Ele.create = function (num, indexX, indexY) {
        console.log('create');
        var ele = new Ele(num, indexX, indexY);
        // TODO 添加事件
        ele.touchEnabled = true;
        // ele.addEventListener( egret.TouchEvent.TOUCH_TAP, Ele.remove, ele );
        // ele.addEventListener( egret.TouchEvent.TOUCH_TAP, ()=>ele.changeTo7(true,false,true,false), ele );
        return ele;
    };
    // 批量移除元素 [[indexX,indexY],[indexX,indexY]], 需要后续配合整理元素
    Ele.remove = function (locations, callback) {
        if (callback === void 0) { callback = null; }
        console.log('remove');
        // locations.forEach((location)=>{
        //     var curEle:Ele = Ele.matrix[location[0]][location[1]];
        //     if(curEle){
        //         Main.vector.removeChild(curEle);
        //         Ele.matrix[location[0]][location[1]] = null;
        //     }
        // })
        if (locations.length == 0) {
            callback ? callback() : null;
        }
        return new Promise(function (resolve, reject) {
            for (var i = 0; i < locations.length; i++) {
                var location = locations[i];
                var curEle = Ele.matrix[location[0]][location[1]];
                if (curEle) {
                    Ele.matrix[location[0]][location[1]] = null;
                }
                var tw = egret.Tween.get(curEle);
                tw.to({ alpha: 0 }, 800).call(function () {
                    // Main.vector.removeChild(curEle);
                    resolve();
                });
            }
        });
    };
    // 转化为7
    Ele.prototype.changeTo7 = function (top, right, bottom, left, callback) {
        if (callback === void 0) { callback = null; }
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var indexX, indexY, curEle, curNum, eleTop, eleRight, eleBottom, eleLeft, p1, p2, p3, p4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log('changeTo7');
                        if (!top && !right && !bottom && !left) {
                            return [2 /*return*/];
                        }
                        indexX = this.indexX;
                        indexY = this.indexY;
                        curEle = this;
                        curNum = Ele.getValueByNum(curEle.num);
                        // 消除当前元素
                        curEle.move(curEle.indexX, curEle.indexY, null, true);
                        if (top && Ele.matrix[indexX][indexY - 1]) {
                            eleTop = Ele.matrix[indexX][indexY - 1];
                            if ((Ele.getValueByNum(eleTop.num) + curNum) == 7) {
                                console.log('top');
                                top = true;
                                p1 = Ele.matrix[indexX][indexY - 1].move(indexX, indexY, null, true);
                            }
                            else {
                                top = false;
                            }
                        }
                        else {
                            top = false;
                        }
                        if (right && Ele.matrix[indexX + 1] && Ele.matrix[indexX + 1][indexY]) {
                            eleRight = Ele.matrix[indexX + 1][indexY];
                            if ((Ele.getValueByNum(eleRight.num) + curNum) == 7) {
                                console.log('right');
                                right = true;
                                p2 = Ele.matrix[indexX + 1][indexY].move(indexX, indexY, null, true);
                            }
                            else {
                                right = false;
                            }
                        }
                        else {
                            right = false;
                        }
                        if (bottom && Ele.matrix[indexX][indexY + 1]) {
                            eleBottom = Ele.matrix[indexX][indexY + 1];
                            if ((Ele.getValueByNum(eleBottom.num) + curNum) == 7) {
                                console.log('bottom');
                                bottom = true;
                                p3 = Ele.matrix[indexX][indexY + 1].move(indexX, indexY, null, true);
                            }
                            else {
                                bottom = false;
                            }
                        }
                        else {
                            bottom = false;
                        }
                        if (left && Ele.matrix[indexX - 1] && Ele.matrix[indexX - 1][indexY]) {
                            eleLeft = Ele.matrix[indexX - 1][indexY];
                            if ((Ele.getValueByNum(eleLeft.num) + curNum) == 7) {
                                console.log('left');
                                left = true;
                                p4 = Ele.matrix[indexX - 1][indexY].move(indexX, indexY, null, true);
                            }
                            else {
                                left = false;
                            }
                        }
                        else {
                            left = false;
                        }
                        // 等待合并动画
                        return [4 /*yield*/, Promise.all([p1, p2, p3, p4]).then(function () { return __awaiter(_this, void 0, void 0, function () {
                                var times, newEle, pTidy1, pTidy2, pTidy3;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            times = [top, right, bottom, left].filter(function (ele, index, array) {
                                                if (ele) {
                                                    return true;
                                                }
                                                return false;
                                            });
                                            switch (times.length) {
                                                case 0:
                                                    return [2 /*return*/];
                                                case 1:
                                                    newEle = Ele.create(7, indexX, indexY);
                                                    break;
                                                case 2:
                                                    // 双重7
                                                    newEle = Ele.create(8, indexX, indexY);
                                                    break;
                                                case 3:
                                                    // 三重7
                                                    newEle = Ele.create(8, indexX, indexY);
                                                    break;
                                                default:
                                                    newEle = Ele.create(8, indexX, indexY);
                                            }
                                            // 原地移动，目的是为了记录matrix
                                            return [4 /*yield*/, newEle.move(indexX, indexY)];
                                        case 1:
                                            // 原地移动，目的是为了记录matrix
                                            _a.sent();
                                            Main.vector.addChild(newEle);
                                            pTidy1 = new Promise(function (resolve, reject) {
                                                Ele.tidyColumn(indexX - 1, resolve);
                                            });
                                            pTidy2 = new Promise(function (resolve, reject) {
                                                Ele.tidyColumn(indexX, resolve);
                                            });
                                            pTidy3 = new Promise(function (resolve, reject) {
                                                Ele.tidyColumn(indexX + 1, resolve);
                                            });
                                            Promise.all([pTidy1, pTidy2, pTidy3]).then(function () {
                                                Ele.checkPuzzle([], callback);
                                            });
                                            return [2 /*return*/];
                                    }
                                });
                            }); })];
                    case 1:
                        // 等待合并动画
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    // 清理某一列的空格
    Ele.tidyColumn = function (indexX, callback) {
        if (callback === void 0) { callback = null; }
        return __awaiter(this, void 0, void 0, function () {
            var p1, p2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (indexX < 0 || indexX > 5) {
                            callback ? callback() : null;
                            return [2 /*return*/];
                        }
                        p1 = 8;
                        p2 = 8;
                        _a.label = 1;
                    case 1:
                        if (!1) return [3 /*break*/, 4];
                        console.log("indexX:" + indexX);
                        while (p1 >= 0 && Ele.matrix[indexX][p1] != null) {
                            p1--;
                        }
                        p2 = p1 - 1;
                        while (p2 >= 0 && Ele.matrix[indexX][p2] == null) {
                            p2--;
                        }
                        if (p1 < 0 || p2 < 0) {
                            return [3 /*break*/, 4];
                        }
                        if (!(p1 >= 2 && p2 >= 0)) return [3 /*break*/, 3];
                        return [4 /*yield*/, Ele.matrix[indexX][p2].move(indexX, p1)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [3 /*break*/, 1];
                    case 4:
                        callback ? callback() : null;
                        return [2 /*return*/];
                }
            });
        });
    };
    // 重置
    Ele.reset = function () {
        for (var i = 0; i < 6; i++) {
            for (var j = 0; j < 9; j++) {
                Ele.matrix[i][j] = null;
            }
        }
    };
    // 点击变换
    Ele.transform = function (ele1, ele2) {
        // 同一行
        if (ele1.indexY == ele2.indexY) {
            if (ele1.indexX < ele2.indexX) {
                ele1.indexY -= 1;
                ele2.indexX -= 1;
            }
            else {
                ele2.indexY -= 1;
                ele1.indexX -= 1;
            }
        }
        else {
            // 最后一列单独考虑
            if (ele1.indexX == 5) {
                if (ele1.indexY < ele2.indexY) {
                    ele1.indexY += 1;
                    ele2.indexX -= 1;
                }
                else {
                    ele1.indexX -= 1;
                    ele2.indexY += 1;
                }
            }
            else {
                if (ele1.indexY < ele2.indexY) {
                    ele1.indexX += 1;
                    ele1.indexY += 1;
                }
                else {
                    ele2.indexX += 1;
                    ele2.indexY += 1;
                }
            }
        }
        ele1.moveWithOutAnimation(ele1.indexX, ele1.indexY);
        ele2.moveWithOutAnimation(ele2.indexX, ele2.indexY);
        var tapSound = RES.getRes("tap_mp3");
        tapSound.play(0, 1);
        // 震动
        platform.vibrateShort();
    };
    // 计算从初始状态下落的位置
    Ele.getDownLocation = function (ele) {
        // 初始化，只初始化一次
        if (Ele.matrix.length == 0) {
            for (var i = 0; i < 6; i++) {
                Ele.matrix[i] = [];
                for (var j = 0; j < 9; j++) {
                    Ele.matrix[i][j] = null;
                }
            }
        }
        // 查询落点位置
        var indexY = 8;
        console.log("ele.indexY:" + ele.indexY);
        for (var i = ele.indexY + 1; i < 9; i++) {
            console.log("i:" + i);
            // 如果当前位置有元素，则在上面一层放置
            if (Ele.matrix[ele.indexX][i]) {
                indexY = i - 1;
                break;
            }
            // 最底层
            if (i >= 8) {
                indexY = 8;
            }
        }
        return indexY;
    };
    // 检查7的数量并移除
    Ele.check7s = function () {
        var _this = this;
        // 计算全局
        var result = [];
        var tempQueue = [];
        outer: for (var i = 0; i < 6; i++) {
            for (var j = 8; j >= 0; j--) {
                result = [];
                tempQueue = [];
                if (Ele.matrix[i][j] != null && Ele.getValueByNum(Ele.matrix[i][j].num) == 7) {
                    tempQueue.push(Ele.matrix[i][j]);
                }
                while (tempQueue.length > 0) {
                    var tempEle = tempQueue.pop();
                    result.push(tempEle);
                    // 每次检查4个方向，并保证不再result中
                    if (tempEle.indexY > 0 && Ele.matrix[tempEle.indexX][tempEle.indexY - 1] != null && Ele.getValueByNum(Ele.matrix[tempEle.indexX][tempEle.indexY - 1].num) == 7 && result.indexOf(Ele.matrix[tempEle.indexX][tempEle.indexY - 1]) == -1) {
                        tempQueue.push(Ele.matrix[tempEle.indexX][tempEle.indexY - 1]);
                    }
                    if (tempEle.indexX < 5 && Ele.matrix[tempEle.indexX + 1][tempEle.indexY] != null && Ele.getValueByNum(Ele.matrix[tempEle.indexX + 1][tempEle.indexY].num) == 7 && result.indexOf(Ele.matrix[tempEle.indexX + 1][tempEle.indexY]) == -1) {
                        tempQueue.push(Ele.matrix[tempEle.indexX + 1][tempEle.indexY]);
                    }
                    if (tempEle.indexX < 8 && Ele.matrix[tempEle.indexX][tempEle.indexY + 1] != null && Ele.getValueByNum(Ele.matrix[tempEle.indexX][tempEle.indexY + 1].num) == 7 && result.indexOf(Ele.matrix[tempEle.indexX][tempEle.indexY + 1]) == -1) {
                        tempQueue.push(Ele.matrix[tempEle.indexX][tempEle.indexY + 1]);
                    }
                    if (tempEle.indexX > 0 && Ele.matrix[tempEle.indexX - 1][tempEle.indexY] != null && Ele.getValueByNum(Ele.matrix[tempEle.indexX - 1][tempEle.indexY].num) == 7 && result.indexOf(Ele.matrix[tempEle.indexX - 1][tempEle.indexY]) == -1) {
                        tempQueue.push(Ele.matrix[tempEle.indexX - 1][tempEle.indexY]);
                    }
                }
                if (result.length >= 3) {
                    break outer;
                }
            }
        }
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var param, pTidy, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(result.length >= 3)) return [3 /*break*/, 2];
                        param = [];
                        result.forEach(function (res) {
                            param.push([res.indexX, res.indexY]);
                        });
                        return [4 /*yield*/, Ele.remove(param)];
                    case 1:
                        _a.sent();
                        pTidy = [];
                        for (i = 0; i < 6; i++) {
                            new Promise(function (res, rej) {
                                Ele.tidyColumn(i, res);
                            });
                        }
                        Promise.all(pTidy).then(function () {
                            resolve(true);
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        resolve(false);
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        }); });
    };
    Ele.checkGameOver = function () {
        for (var i = 0; i < 6; i++) {
            for (var j = 0; j < 2; j++) {
                if (Ele.matrix[i][j] != null) {
                    return true;
                }
            }
        }
        return false;
    };
    // 检查是否可以组成7，传入的参数为优先的元素 [ [indexX,indexY],[indexX,indexY] ]
    Ele.checkPuzzle = function (array, callback) {
        if (array === void 0) { array = []; }
        if (callback === void 0) { callback = null; }
        return __awaiter(this, void 0, void 0, function () {
            var maxWeight, i, j, k, curNum, gameOver;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log('checkPuzzle');
                        maxWeight = [0, 0, 0];
                        // 优先计算传入的参数
                        array.forEach(function (ele) {
                            var i = ele[0];
                            var j = ele[1];
                            var k = 0;
                            if (Ele.matrix[i][j] !== null) {
                                var curNum = Ele.getValueByNum(Ele.matrix[i][j].num);
                                // top 
                                if (Ele.matrix[i][j - 1] && (curNum + Ele.getValueByNum(Ele.matrix[i][j - 1].num) == 7)) {
                                    k++;
                                }
                                // right 
                                if (Ele.matrix[i + 1] && Ele.matrix[i + 1][j] && (curNum + Ele.getValueByNum(Ele.matrix[i + 1][j].num) == 7)) {
                                    k++;
                                }
                                // bottom
                                if (Ele.matrix[i] && Ele.matrix[i][j + 1] && (curNum + Ele.getValueByNum(Ele.matrix[i][j + 1].num) == 7)) {
                                    k++;
                                }
                                // left
                                if (Ele.matrix[i - 1] && Ele.matrix[i - 1][j] && (curNum + Ele.getValueByNum(Ele.matrix[i - 1][j].num) == 7)) {
                                    k++;
                                }
                            }
                            // 当前的变换次数 > 前面元素的最大变换次数
                            if (k > maxWeight[2]) {
                                maxWeight[0] = i;
                                maxWeight[1] = j;
                                maxWeight[2] = k;
                            }
                        });
                        // 计算全局
                        for (i = 0; i < 6; i++) {
                            for (j = 8; j >= 0; j--) {
                                k = 0;
                                if (Ele.matrix[i][j] !== null) {
                                    curNum = Ele.getValueByNum(Ele.matrix[i][j].num);
                                    // top 
                                    if (Ele.matrix[i][j - 1] && (curNum + Ele.getValueByNum(Ele.matrix[i][j - 1].num) == 7)) {
                                        k++;
                                    }
                                    // right 
                                    if (Ele.matrix[i + 1] && Ele.matrix[i + 1][j] && (curNum + Ele.getValueByNum(Ele.matrix[i + 1][j].num) == 7)) {
                                        k++;
                                    }
                                    // bottom
                                    if (Ele.matrix[i] && Ele.matrix[i][j + 1] && (curNum + Ele.getValueByNum(Ele.matrix[i][j + 1].num) == 7)) {
                                        k++;
                                    }
                                    // left
                                    if (Ele.matrix[i - 1] && Ele.matrix[i - 1][j] && (curNum + Ele.getValueByNum(Ele.matrix[i - 1][j].num) == 7)) {
                                        k++;
                                    }
                                }
                                // 当前的变换次数 > 前面元素的最大变换次数
                                if (k > maxWeight[2]) {
                                    maxWeight[0] = i;
                                    maxWeight[1] = j;
                                    maxWeight[2] = k;
                                }
                            }
                        }
                        if (!(maxWeight[2] == 0)) return [3 /*break*/, 2];
                        return [4 /*yield*/, Ele.check7s()];
                    case 1:
                        _a.sent();
                        gameOver = Ele.checkGameOver();
                        if (gameOver == true) {
                            console.log('game over');
                        }
                        if (callback) {
                            callback(gameOver);
                        }
                        return [2 /*return*/];
                    case 2:
                        // 变换
                        Ele.matrix[maxWeight[0]][maxWeight[1]].changeTo7(true, true, true, true, callback);
                        return [2 /*return*/];
                }
            });
        });
    };
    /*
    // 检查队列，用于存放待检查元素的位置 [indexX,indexY]
    public static checkQueue:number[][] = [];
    // 检查是否可以组成7，每次需要传入至少一个元素加入待检查队列
    public static checkPuzzle(eleList:Ele[] = []){
        var top:boolean, right:boolean, bottom:boolean, left:boolean;
        // 加入队列
        eleList.forEach(function(ele){
            Ele.checkQueue.push([ele.indexX, ele.indexY]);
        })

        var timer = setInterval(function(){
            if(Ele.checkQueue.length <= 0){
                clearInterval(timer);
            }else{
                var curPosition:number[] = Ele.checkQueue.pop();
                var curEle:Ele = Ele.matrix[ curPosition[0] ][ curPosition[1] ];
                if(!curEle){
                    return;
                }
                var curNum:number = curEle.num;
                if( curNum >=0 && curNum <=9 ){
                    if(curNum == 8 || curNum == 9){
                        curNum = 7;
                    }
                }else{
                    return;
                }

                // top
                top = false;
                if( (curEle.indexY-1) >= 0 ){
                    var topEle:Ele = Ele.matrix[curEle.indexX][curEle.indexY-1];
                    var topEleNum:number;
                    if( topEle && topEle.num >=0 && topEle.num <=9 ){
                        if(topEle.num == 8 || topEle.num == 9){
                            topEleNum = 7;
                        }else{
                            topEleNum = topEle.num;
                        }
                        if( (topEleNum + curNum) == 7 ){
                            top = true;
                            Ele.checkQueue.push([curEle.indexX, curEle.indexY-1]);
                        }
                    }
                }
                
                // right
                right = false;
                if( (curEle.indexX+1) <= 5 ){
                    var rightEle:Ele = Ele.matrix[curEle.indexX+1][curEle.indexY];
                    var rightEleNum:number;
                    if( rightEle && rightEle.num >=0 && rightEle.num <=9 ){
                        if(rightEle.num == 8 || rightEle.num == 9){
                            rightEleNum = 7;
                        }else{
                            rightEleNum = rightEle.num;
                        }
                        if( (rightEleNum + curNum) == 7 ){
                            right = true;
                            Ele.checkQueue.push([curEle.indexX+1, curEle.indexY]);
                        }
                    }
                }
                
                // bottom
                bottom = false;
                if( (curEle.indexY+1) <= 8 ){
                    var bottomEle:Ele = Ele.matrix[curEle.indexX][curEle.indexY+1];
                    var bottomEleNum:number;
                    if( bottomEle && bottomEle.num >=0 && bottomEle.num <=9 ){
                        if(bottomEle.num == 8 || bottomEle.num == 9){
                            bottomEleNum = 7;
                        }else{
                            bottomEleNum = bottomEle.num;
                        }
                        if( (bottomEleNum + curNum) == 7 ){
                            bottom = true;
                            Ele.checkQueue.push([curEle.indexX, curEle.indexY+1]);
                        }
                    }
                }

                // left
                left = false;
                if( (curEle.indexX-1) >= 0 ){
                    var leftEle:Ele = Ele.matrix[curEle.indexX-1][curEle.indexY];
                    var leftEleNum:number;
                    if( leftEle && leftEle.num >=0 && leftEle.num <=9 ){
                        if(leftEle.num == 8 || leftEle.num == 9){
                            leftEleNum = 7;
                        }else{
                            leftEleNum = leftEle.num;
                        }
                        if( (leftEleNum + curNum) == 7 ){
                            left = true;
                            Ele.checkQueue.push([curEle.indexX-1, curEle.indexY]);
                        }
                    }
                }

                curEle.changeTo7(top,right,bottom,left);
            }
        },350);
        

    }*/
    // 根据num取得元素实际值
    Ele.getValueByNum = function (num) {
        if (num == 8 || num == 9) {
            return 7;
        }
        else {
            return num;
        }
    };
    // 用于记录场景中格子的占用 初始化为null
    Ele.matrix = [];
    // 检查队列，用于存放全图中可组成7的元素合并次数，找出最大值进行操作
    Ele.checkQueue = [];
    return Ele;
}(egret.DisplayObjectContainer));
__reflect(Ele.prototype, "Ele");
