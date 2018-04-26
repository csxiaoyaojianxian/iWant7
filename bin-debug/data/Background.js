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
var Background = (function (_super) {
    __extends(Background, _super);
    function Background() {
        var _this = _super.call(this) || this;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    Background.prototype.onAddToStage = function (event) {
        // 绘制背景
        this.drawBg();
    };
    Background.prototype.drawBg = function () {
        var shp = new egret.Shape();
        shp.graphics.beginFill(0xcdcdcd, 1);
        shp.graphics.drawRect(0, 0, this.stage.stageWidth, this.stage.stageHeight);
        shp.graphics.endFill();
        shp.graphics.beginFill(0xc2e6f1, 1);
        shp.graphics.drawRoundRect(50, 205, 540, 800, 60);
        shp.graphics.endFill();
        //   |----50----|-15-|--80--|6|--80--|6|--80--|6|--80--|6|--80--|6|--80--|-15-|----50----|
        var baseHeight = 220;
        for (var i = 0; i < 6; i++) {
            for (var j = 0; j < 2; j++) {
                shp.graphics.beginFill(0xe5f4f9, 1);
                shp.graphics.drawRoundRect(65 + 86 * i, baseHeight + 86 * j, 80, 80, 40);
                shp.graphics.endFill();
            }
        }
        for (var i = 0; i < 6; i++) {
            for (var j = 0; j < 7; j++) {
                shp.graphics.beginFill(0xb3d8e8, 1);
                shp.graphics.drawRoundRect(65 + 86 * i, baseHeight + 86 * 2 + 86 * j, 80, 80, 40);
                shp.graphics.endFill();
            }
        }
        this.addChild(shp);
    };
    return Background;
}(egret.DisplayObjectContainer));
__reflect(Background.prototype, "Background");
//# sourceMappingURL=Background.js.map