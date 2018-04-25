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
    function Ele(num, indexX, indexY) {
        var _this = _super.call(this) || this;
        _this.sprite = new egret.Sprite();
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
            7: [0xfb5944, 0xfb5944, 8, 0xfbfffb, 0xfbfffb, 63]
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
        label.y = 0;
        label.textColor = style[this.num][4];
        // label.fontFamily = "YaHei";
        label.textAlign = egret.HorizontalAlign.CENTER;
        label.verticalAlign = egret.VerticalAlign.MIDDLE;
        label.text = this.num.toString();
        this.sprite.addChild(label);
        // 位移
        this.sprite.x = 65 + 86 * this.indexX;
        this.sprite.y = this.baseHeight + 86 * this.indexY;
        this.addChild(this.sprite);
    };
    Ele.prototype.move = function (indexX, indexY) {
        var tw = egret.Tween.get(this.sprite);
        var distanceY = indexY - this.indexY;
        this.indexX = indexX;
        this.indexY = indexY;
        tw.to({
            x: 65 + 86 * indexX,
            y: this.baseHeight + 86 * indexY
        }, distanceY * 100, egret.Ease.circIn);
        var downSound = RES.getRes("down_mp3");
        setTimeout(function () {
            downSound.play(0, 1);
        }, distanceY * 100 + 80);
    };
    Ele.prototype.moveWithOutAnimation = function (indexX, indexY) {
        this.indexX = indexX;
        this.indexY = indexY;
        this.sprite.x = 65 + 86 * indexX;
        this.sprite.y = this.baseHeight + 86 * indexY;
    };
    // 创建新元素
    Ele.create = function () {
        // 获取num1   0-6 随机数
        var num1 = Math.floor(Math.random() * 7);
        // 获取num2  num1+num2 != 7
        var num2 = Math.floor(Math.random() * 7);
        while (num1 + num2 == 7) {
            num2 = Math.floor(Math.random() * 7);
        }
        var curEle = [];
        curEle.push(new Ele(num1, 2, 1));
        curEle.push(new Ele(num2, 3, 1));
        return curEle;
    };
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
            if (ele1.indexY < ele2.indexY) {
                ele1.indexX += 1;
                ele1.indexY += 1;
            }
            else {
                ele2.indexX += 1;
                ele2.indexY += 1;
            }
        }
        ele1.moveWithOutAnimation(ele1.indexX, ele1.indexY);
        ele2.moveWithOutAnimation(ele2.indexX, ele2.indexY);
        var tapSound = RES.getRes("tap_mp3");
        tapSound.play(0, 1);
    };
    return Ele;
}(egret.DisplayObjectContainer));
__reflect(Ele.prototype, "Ele");
