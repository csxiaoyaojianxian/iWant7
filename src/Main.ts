//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////

class Main extends egret.DisplayObjectContainer {



    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event: egret.Event) {

        egret.lifecycle.addLifecycleListener((context) => {
            // custom lifecycle plugin

            context.onUpdate = () => {

            }
        })

        egret.lifecycle.onPause = () => {
            egret.ticker.pause();
        }

        egret.lifecycle.onResume = () => {
            egret.ticker.resume();
        }

        this.runGame().catch(e => {
            console.log(e);
        })



    }

    private async runGame() {
        await this.loadResource()
        this.createGameScene();
        const result = await RES.getResAsync("description_json")
        // this.startAnimation(result);
        await platform.login();
        const userInfo = await platform.getUserInfo();
        console.log(userInfo);

    }

    private async loadResource() {
        try {
            const loadingView = new LoadingUI();
            this.stage.addChild(loadingView);
            await RES.loadConfig("resource/default.res.json", "resource/");
            await RES.loadGroup("preload", 0, loadingView);
            this.stage.removeChild(loadingView);
        }
        catch (e) {
            console.error(e);
        }
    }

    private textfield: egret.TextField;
    private curEle: Ele[] = [];
    /**
     * 创建游戏场景
     * Create a game scene
     */
    private createGameScene() {

        console.log(this.stage.stageWidth);
        console.log(this.stage.stageHeight);

        var bg = new Background();

        // var ele0:Ele = new Ele(0, 4, 2);
        // var ele1:Ele = new Ele(1, 2, 2);
        // var ele2:Ele = new Ele(2, 0, 6);
        // var ele3:Ele = new Ele(3, 1, 3);
        // var ele4:Ele = new Ele(4, 2, 4);
        // var ele5:Ele = new Ele(5, 3, 5);
        // var ele6:Ele = new Ele(6, 3, 2);
        // var ele7:Ele = new Ele(7, 1, 2);

        this.addChild(bg);
        // this.addChild(ele0);
        // this.addChild(ele1);
        // this.addChild(ele2);
        // this.addChild(ele3);
        // this.addChild(ele4);
        // this.addChild(ele5);
        // this.addChild(ele6);
        // this.addChild(ele7);

        // this.curEle.push(ele7);
        // this.curEle.push(ele3);

        this.curEle = Ele.create();
        this.curEle.forEach((ele) => {
            this.addChild(ele);
        });
        
        // ele0.move(4,8);

        //设置显示对象可以相应触摸事件
        bg.touchEnabled = true;
        bg.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
        bg.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);

    }

    private startX:number;
    private startY:number;
    private endX:number;
    private endY:number;
    private direction:number;
    private onTouchBegin( evt:egret.TouchEvent ) {
        this.startX = evt.stageX;
        this.startY = evt.stageY;
    }
    private onTouchEnd( evt:egret.TouchEvent ) {
        this.endX = evt.stageX;
        this.endY = evt.stageY;
        this.direction = TouchCal.cal(this.startX,this.startY,this.endX,this.endY);
        var indexX;
        var indexY;
        switch(this.direction){
            case 1:
                // 无操作
                console.log(1);
                break;
            case 3:
                // 下落
                if(this.curEle[0].indexY > this.curEle[1].indexY){
                    this.curEle[0].down();
                    this.curEle[1].down();
                }else{
                    this.curEle[1].down();
                    this.curEle[0].down();
                }
                setTimeout(() => {
                    this.curEle = Ele.create();
                    this.curEle.forEach((ele)=>{
                        this.addChild(ele);
                    });
                }, 600);
                break;
            case 2:
                // 向右移动一格
                indexX = this.curEle[0].indexX > this.curEle[1].indexX ? this.curEle[0].indexX : this.curEle[1].indexX
                if(indexX < 5 ){
                    this.curEle[0].move(this.curEle[0].indexX+1,this.curEle[0].indexY);
                    this.curEle[1].move(this.curEle[1].indexX+1,this.curEle[1].indexY);
                }
                break;
            case 4:
                // 向左移动一格
                indexX = this.curEle[0].indexX < this.curEle[1].indexX ? this.curEle[0].indexX : this.curEle[1].indexX
                if(indexX > 0 ){
                    this.curEle[0].move(this.curEle[0].indexX-1,this.curEle[0].indexY);
                    this.curEle[1].move(this.curEle[1].indexX-1,this.curEle[1].indexY);
                }
                break;
            case 0:
                // 变换
                console.log(0);
                Ele.transform(this.curEle[0],this.curEle[1]);
                break;
        }
    }

    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
    private createBitmapByName(name: string) {
        let result = new egret.Bitmap();
        let texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }

    /**
     * 描述文件加载成功，开始播放动画
     * Description file loading is successful, start to play the animation
     */
    private startAnimation(result: string[]) {
        let parser = new egret.HtmlTextParser();

        let textflowArr = result.map(text => parser.parse(text));
        let textfield = this.textfield;
        let count = -1;
        let change = () => {
            count++;
            if (count >= textflowArr.length) {
                count = 0;
            }
            let textFlow = textflowArr[count];

            // 切换描述内容
            // Switch to described content
            textfield.textFlow = textFlow;
            let tw = egret.Tween.get(textfield);
            tw.to({ "alpha": 1 }, 200);
            tw.wait(2000);
            tw.to({ "alpha": 0 }, 200);
            tw.call(change, this);
        };

        change();
    }
}