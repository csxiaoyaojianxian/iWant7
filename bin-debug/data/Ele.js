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
var Ele = (function (_super) {
    __extends(Ele, _super);
    function Ele() {
        var _this = _super.call(this) || this;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    Ele.prototype.onAddToStage = function (event) {
        // this.drawEle();
    };
    Ele.prototype.drawEle = function (num, indexX, indexY) {
        var shp = new egret.Shape();
        //   |----50----|-15-|--80--|6|--80--|6|--80--|6|--80--|6|--80--|6|--80--|-15-|----50----|
        var baseHeight = 220;
        // bg inner borderWidth border text textsize
        var style = {
            0: [0x5e5e5e, 0x5e5e5e, 6, 0xcdcdcd, 0xcdcdcd, 65],
            1: [0xf9dbff, 0xae6cc6, 3, 0xfbfffb, 0xf9dbff, 50],
            2: [0xdbffc3, 0x79aa4e, 3, 0xfbfffb, 0xdbffc3, 50],
            3: [0xbbe5fd, 0x468cca, 3, 0xfbfffb, 0xbbe5fd, 50],
            4: [0xbbe5fd, 0xbbe5fd, 3, 0xfbfffb, 0x4a86c4, 60],
            5: [0xdbffc3, 0xdbffc3, 3, 0xfbfffb, 0x7bae51, 60],
            6: [0xf9dbff, 0xf9dbff, 3, 0xfbfffb, 0xaa6cc1, 60],
            7: [0xfb5944, 0xfb5944, 8, 0xfbfffb, 0xfbfffb, 70]
        };
        // 绘制元素背景
        shp.graphics.beginFill(style[num][0], 1);
        shp.graphics.lineStyle(style[num][2], style[num][3]);
        shp.graphics.drawRoundRect(65 + 86 * indexX, baseHeight + 86 * indexY, 80, 80, 40);
        shp.graphics.endFill();
        // 绘制元素小圆圈
        shp.graphics.beginFill(style[num][1], 1);
        shp.graphics.lineStyle(0, 0xffffff);
        shp.graphics.drawCircle(65 + 86 * indexX + 40, baseHeight + 86 * indexY + 40, 30);
        shp.graphics.endFill();
        this.addChild(shp);
        // 绘制文字
        var label = new egret.TextField();
        label.size = style[num][5];
        label.width = 80;
        label.height = 80;
        label.x = 65 + 86 * indexX;
        label.y = baseHeight + 86 * indexY;
        label.textColor = style[num][4];
        // label.fontFamily = "YaHei";
        label.textAlign = egret.HorizontalAlign.CENTER;
        label.verticalAlign = egret.VerticalAlign.MIDDLE;
        label.text = num.toString();
        this.addChild(label);
    };
    return Ele;
}(egret.DisplayObjectContainer));
__reflect(Ele.prototype, "Ele");
//# sourceMappingURL=Ele.js.map