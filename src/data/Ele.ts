class Ele extends egret.DisplayObjectContainer {

    private sprite: egret.Sprite = new egret.Sprite();
    private baseHeight:number = 220;
    private num:number;
    private indexX:number;
    private indexY:number;

    public constructor(num:number,indexX:number,indexY:number) {
        super();
        this.num = num;
        this.indexX = indexX;
        this.indexY = indexY;
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    private onAddToStage(event: egret.Event) {
        this.drawEle();
    }
    
    // 绘制一个元素
    public drawEle() {
        //   |----50----|-15-|--80--|6|--80--|6|--80--|6|--80--|6|--80--|6|--80--|-15-|----50----|
        var shp: egret.Shape = new egret.Shape(); 
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
        }

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
        var label: egret.TextField = new egret.TextField();
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
        this.sprite.y = this.baseHeight + 86 * this.indexY

        this.addChild(this.sprite);
    }

    public move(indexX:number,indexY:number){
        this.sprite.x = 65 + 86 * indexX;
        this.sprite.y = this.baseHeight + 86 * indexY;
    }

}