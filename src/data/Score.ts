class Score extends egret.DisplayObjectContainer {
    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    private static label:egret.TextField;
    private static score:number;
    private resultTxt:egret.TextField;
    private tryAgainTxt:egret.TextField;
    private infoTxt:egret.TextField;
    private img_bg:egret.Bitmap;

    private onAddToStage(event: egret.Event) {
        // 绘制得分面板
        this.drawScore();
        // 绘制进度面板
        this.drawPanel();
    }
    private drawScore() {
        Score.label = new egret.TextField();
        Score.label.width = 400;
        Score.label.height = 70;

        Score.label.textColor = 0xa7a7a7;
        Score.label.size = 80;
        Score.label.x = 150;
        Score.label.y = 100;
        Score.label.textAlign = egret.HorizontalAlign.RIGHT;

        Score.label.text = "0";
        this.addChild(Score.label);
        Score.score = 0;
    }

    public static addScore(num){
        Score.score += num;
        Score.label.text = Score.score.toString();
    }

    public static setScore(num){
        Score.score = num;
        Score.label.text = Score.score.toString();
    }

    private drawPanel(){
        
        this.img_bg = new egret.Bitmap();
        this.img_bg.texture = RES.getRes("bg_png");
        this.img_bg.width = this.stage.stageWidth;
        this.img_bg.height = this.stage.stageHeight;

        this.resultTxt = new egret.TextField();
        this.resultTxt.text = "最终得分："+Score.score;
        this.resultTxt.textAlign = egret.HorizontalAlign.LEFT;
        this.resultTxt.width = 500;
        this.resultTxt.height = 50;
        this.resultTxt.textColor = 0xffffff;
        this.resultTxt.size = 50;
        this.resultTxt.x = 40;
        this.resultTxt.y = 50;

        this.tryAgainTxt = new egret.TextField();
        this.tryAgainTxt.text = "再试一次";
        this.tryAgainTxt.textAlign = egret.HorizontalAlign.LEFT;
        this.tryAgainTxt.width = 500;
        this.tryAgainTxt.height = 50;
        this.tryAgainTxt.textColor = 0xffffff;
        this.tryAgainTxt.size = 50;
        this.tryAgainTxt.x = 40;
        this.tryAgainTxt.y = 130;

        this.infoTxt = new egret.TextField();
        this.infoTxt.text = "UI设计中，逻辑优化中，道具开发中，这就是一个预览版，哈哈哈";
        this.infoTxt.textAlign = egret.HorizontalAlign.LEFT;
        this.infoTxt.width = 600;
        this.infoTxt.height = 50;
        this.infoTxt.textColor = 0xffffff;
        this.infoTxt.size = 20;
        this.infoTxt.x = 20;
        this.infoTxt.y = 1030;

        this.hidePanel();

        this.addChild(this.img_bg);
        this.addChild(this.resultTxt);
        this.addChild(this.tryAgainTxt);
        this.addChild(this.infoTxt);

        this.tryAgainTxt.touchEnabled = true;

    }

    public hidePanel(){
        this.img_bg.alpha = 0;
        this.resultTxt.alpha = 0;
        this.infoTxt.alpha = 0;
        this.tryAgainTxt.alpha = 0;
    }

    public showPanel(callback){
        this.img_bg.alpha = 1;
        this.resultTxt.alpha = 1;
        this.infoTxt.alpha = 1;
        this.tryAgainTxt.alpha = 1;
        this.resultTxt.text = "最终得分："+Score.score;
        this.tryAgainTxt.addEventListener( egret.TouchEvent.TOUCH_TAP, ()=>{
            callback();
            this.hidePanel();
        }, this.tryAgainTxt );
    }

}