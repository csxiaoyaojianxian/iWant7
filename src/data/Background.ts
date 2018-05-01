class Background extends egret.DisplayObjectContainer {
    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    private onAddToStage(event: egret.Event) {
        // 绘制背景
        this.drawBg();
    }
    private drawBg() {
        var shp: egret.Shape = new egret.Shape();

        shp.graphics.beginFill(0xfffaf0, 1); 
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
        for( var i = 0; i < 6; i++ ){
            for( var j = 0; j < 7; j++ ){
                shp.graphics.beginFill(0xb3d8e8, 1);
                shp.graphics.drawRoundRect(65 + 86 * i, baseHeight + 86*2 + 86*j, 80, 80, 40);
                shp.graphics.endFill();
            }
        }

        this.addChild(shp);
    }
}