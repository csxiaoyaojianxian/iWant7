class Ele extends egret.DisplayObjectContainer {

    // 容器
    private sprite: egret.Sprite = new egret.Sprite();

    // 用于布局
    private baseHeight:number = 220;

    // 记录当前元素信息
    public num:number;
    public indexX:number;
    public indexY:number;

    // 用于记录场景中格子的占用 初始化为null
    public static matrix:Ele[][] = [];

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
            7: [0xfb5944, 0xfb5944, 8, 0xfbfffb, 0xfbfffb, 63],
            8: [0xfb5944, 0xfb5944, 8, 0xf9da5f, 0xfbfffb, 63], // 两重合并的7
            9: [0xf3ae3d, 0xf3ae3d, 8, 0xf9da5f, 0xfbfffb, 63]  // 三重合并的7
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
        label.y = 5; // 用于真机适配的微调
        label.textColor = style[this.num][4];
        // label.fontFamily = "YaHei";
        label.textAlign = egret.HorizontalAlign.CENTER;
        label.verticalAlign = egret.VerticalAlign.MIDDLE;
        if( this.num == 8 || this.num == 9 ){
            label.text = "7";
        }else{
            label.text = this.num.toString();
        }
        this.sprite.addChild(label);

        // 位移
        this.sprite.x = 65 + 86 * this.indexX;
        this.sprite.y = this.baseHeight + 86 * this.indexY

        this.addChild(this.sprite);
    }

    // 移动到指定位置，并记录matrix
    public move(indexX:number,indexY:number,callback:Function=null,remove:boolean=false) {
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

        var tw = egret.Tween.get( this.sprite );
        var promise = new Promise((resolve,reject)=>{tw.to( {
            x:65 + 86 * indexX,
            y:this.baseHeight + 86 * indexY
        }, Math.sqrt(distance)*200,  egret.Ease.circIn )
        .call(()=>{
            if(remove){
                Main.vector.removeChild(this);
                Ele.matrix[indexX][indexY] = null;
            }
            if(callback){
                callback();
            }
            resolve();
        })});

        // 播放音效、震动
        var downSound:egret.Sound = RES.getRes("down_mp3");
        setTimeout(function() {
            downSound.play(0,1);
            // 震动
            platform.vibrateShort();
        }, distance*80);
        
        return promise;
    }

    // 只移动，无动画，且不计入matrix
    public moveWithOutAnimation(indexX:number,indexY:number){
        this.indexX = indexX;
        this.indexY = indexY;
        this.sprite.x = 65 + 86 * indexX;
        this.sprite.y = this.baseHeight + 86 * indexY;
        // 震动
        platform.vibrateShort();
    }

    // 下落到能下落的最低处
    public down(){
        console.log('down');
        var indexY = Ele.getDownLocation( this );
        return this.move(this.indexX,indexY);
    }

    // 创建新元素
    public static createPair(parent){
        console.log('createPair');
        // 获取num1   0-6 随机数
        var num1 = Math.floor(Math.random()*7);
        // 获取num2  num1+num2 != 7
        var num2 = Math.floor(Math.random()*7);
        while(num1 + num2 == 7){
            num2 = Math.floor(Math.random()*7);
        }
        var curEle:Ele[] = [];
        var ele1:Ele = Ele.create(num1, 2, 1);
        var ele2:Ele = Ele.create(num2, 3, 1);

        curEle.push(ele1);
        curEle.push(ele2);

        // 添加到面板
        curEle.forEach((ele) => {
            parent.addChild(ele);
        });

        return curEle;
    }
    public static create(num,indexX,indexY){
        console.log('create');
        var ele:Ele = new Ele(num, indexX, indexY);
        // TODO 添加事件
        ele.touchEnabled = true;
        // ele.addEventListener( egret.TouchEvent.TOUCH_TAP, Ele.remove, ele );
        // ele.addEventListener( egret.TouchEvent.TOUCH_TAP, ()=>ele.changeTo7(true,false,true,false), ele );
        return ele;
    }

    // 批量移除元素 [[indexX,indexY],[indexX,indexY]], 需要后续配合整理元素
    public static remove(locations:number[][]){
        console.log('remove');
        locations.forEach((location)=>{
            var curEle:Ele = Ele.matrix[location[0]][location[1]];
            if(curEle){
                Main.vector.removeChild(curEle);
                Ele.matrix[location[0]][location[1]] = null;
            }
        })
    }

    // 转化为7
    public async changeTo7(top:boolean,right:boolean,bottom:boolean,left:boolean, callback:Function=null){
        console.log('changeTo7');
        if(!top && !right && !bottom && !left){
            return;
        }

        var indexX:number = this.indexX;
        var indexY:number = this.indexY;
        // Ele.matrix[indexX][indexY].alpha = 0;
        var curEle:Ele = this;
        var curNum:number = Ele.getValueByNum(curEle.num);
        // 消除当前元素
        curEle.move(curEle.indexX, curEle.indexY, null, true);

        var eleTop:Ele, eleRight:Ele, eleBottom:Ele, eleLeft:Ele;

        let p1,p2,p3,p4;
        if(top && Ele.matrix[indexX][indexY-1]){
            eleTop = Ele.matrix[indexX][indexY-1];
            if( (Ele.getValueByNum(eleTop.num) + curNum) == 7 ){
                console.log('top');
                top = true;
                
                    p1 = Ele.matrix[indexX][indexY-1].move(indexX,indexY,null,true);
            }else{
                top = false;
            }
        }else{
            top = false;
        }
        if(right && Ele.matrix[indexX+1] && Ele.matrix[indexX+1][indexY]){
            eleRight = Ele.matrix[indexX+1][indexY];
            if( (Ele.getValueByNum(eleRight.num) + curNum) == 7 ){
                console.log('right');
                right = true;
                    p2 = Ele.matrix[indexX+1][indexY].move(indexX,indexY,null,true);
            }else{
                right = false;
            }
        }else{
            right = false;
        }
        if(bottom && Ele.matrix[indexX][indexY+1]){
            eleBottom = Ele.matrix[indexX][indexY+1];
            if( (Ele.getValueByNum(eleBottom.num) + curNum) == 7 ){
                console.log('bottom');
                bottom = true;
                    p3 = Ele.matrix[indexX][indexY+1].move(indexX,indexY,null,true);
            }else{
                bottom = false;
            }
        }else{
            bottom = false;
        }
        if(left && Ele.matrix[indexX-1] && Ele.matrix[indexX-1][indexY]){
            eleLeft = Ele.matrix[indexX-1][indexY];
            if( (Ele.getValueByNum(eleLeft.num) + curNum) == 7 ){
                console.log('left');
                left = true;
                    p4 = Ele.matrix[indexX-1][indexY].move(indexX,indexY,null,true);
            }else{
                left = false;
            }
        }else{
            left = false;
        }

        // 等待合并动画
        await Promise.all([p1, p2, p3, p4]).then(async ()=>{
            // 当前元素不为7则需要创建新元素
                // 计算有几次合并
                var times:boolean[] = [top,right,bottom,left].filter( (ele,index,array)=> {
                    if(ele){
                        return true;
                    }
                    return false;
                });
                
                var newEle:Ele;
                switch(times.length){
                    case 0:
                        return;
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
                await newEle.move(indexX,indexY);
                Main.vector.addChild(newEle);

            let pTidy1,pTidy2,pTidy3;
            pTidy1 = new Promise((resolve,reject)=>{
                Ele.tidyColumn(indexX-1,resolve);
            });
            pTidy2 = new Promise((resolve,reject)=>{
                Ele.tidyColumn(indexX,resolve);
            });
            pTidy3 = new Promise((resolve,reject)=>{
                Ele.tidyColumn(indexX+1,resolve);
            });
            Promise.all([pTidy1,pTidy2,pTidy3]).then(()=>{
                Ele.checkPuzzle([],callback);
            });
            
        });
    }

    // 清理某一列的空格
    public static async tidyColumn(indexX:number,callback:Function=null){
        if(indexX < 0 || indexX > 5){
            callback?callback():null;
            return;
        }
        // 记录可以放置的空位Y坐标
        var p1:number = 8;
        // 记录当前空位上方有元素的最低点坐标
        var p2:number = 8;
        while(1){
            console.log("indexX:"+indexX);
            while(p1>=0 && Ele.matrix[indexX][p1]!=null){
                p1--;
            }
            p2 = p1-1;
            while(p2>=0 && Ele.matrix[indexX][p2]==null){
                p2--;
            }
            if(p1<0 || p2<0){
                break;
            }
            if(p1>=2 && p2>=0){
                await Ele.matrix[indexX][p2].move(indexX,p1);
            }
        }
        callback?callback():null;

    }

    // 点击变换
    public static transform(ele1:Ele, ele2:Ele){
        // 同一行
        if(ele1.indexY == ele2.indexY){
            if(ele1.indexX < ele2.indexX){
                ele1.indexY -= 1;
                ele2.indexX -= 1;
            }else{
                ele2.indexY -= 1;
                ele1.indexX -= 1;
            }
        }
        // 同一列
        else{
            // 最后一列单独考虑
            if(ele1.indexX == 5){
                if(ele1.indexY < ele2.indexY){
                    ele1.indexY += 1;
                    ele2.indexX -= 1;
                }else{
                    ele1.indexX -= 1;
                    ele2.indexY += 1;
                }
            }else{
                if(ele1.indexY < ele2.indexY){
                    ele1.indexX += 1;
                    ele1.indexY += 1;
                }else{
                    ele2.indexX += 1;
                    ele2.indexY += 1;
                }
            }
        }
        ele1.moveWithOutAnimation(ele1.indexX, ele1.indexY);
        ele2.moveWithOutAnimation(ele2.indexX, ele2.indexY);
        var tapSound:egret.Sound = RES.getRes("tap_mp3");
        tapSound.play(0,1);
        // 震动
        platform.vibrateShort();
    }

    // 计算从初始状态下落的位置
    public static getDownLocation(ele:Ele):number{
        // 初始化，只初始化一次
        if(Ele.matrix.length == 0){
            for(var i = 0; i < 6; i++ ){
                Ele.matrix[i] = [];
                for(var j = 0; j < 9; j++ ){
                    Ele.matrix[i][j] = null;
                }
            }
        }

        // 查询落点位置
        var indexY:number = 8;
        console.log("ele.indexY:"+ele.indexY);
        for(var i = ele.indexY+1; i < 9; i++){
            console.log("i:"+i);
            // 如果当前位置有元素，则在上面一层放置
            if(Ele.matrix[ele.indexX][i]){
                indexY = i-1;
                break;
            }
            // 最底层
            if(i >= 8){
                indexY = 8;
            }
        }
        
        return indexY;
    }

    // 检查7的数量并移除
    public static check7(){
        // 计算全局
        for( var i = 0; i < 6; i++ ){
            for( var j = 8; j >= 0; j-- ){
                
            }
        }
    }

    // 检查队列，用于存放全图中可组成7的元素合并次数，找出最大值进行操作
    public static checkQueue:number[] = [];
    // 检查是否可以组成7，传入的参数为优先的元素 [ [indexX,indexY],[indexX,indexY] ]
    public static checkPuzzle(array:number[][]=[],callback:Function=null){
        console.log('checkPuzzle');
        // 存储最大的变换 [indexX, indexY, weight]
        var maxWeight:number[] = [0,0,0];
        // 优先计算传入的参数
        array.forEach((ele)=>{
            var i = ele[0];
            var j = ele[1];
            var k = 0;
            if(Ele.matrix[i][j] !== null){
                var curNum = Ele.getValueByNum(Ele.matrix[i][j].num);
                // top 
                if(Ele.matrix[i][j-1] && (curNum + Ele.getValueByNum(Ele.matrix[i][j-1].num) == 7)){
                    k++;
                }
                // right 
                if(Ele.matrix[i+1] && Ele.matrix[i+1][j] && (curNum + Ele.getValueByNum(Ele.matrix[i+1][j].num) == 7)){
                    k++;
                }
                // bottom
                if(Ele.matrix[i] && Ele.matrix[i][j+1] && (curNum + Ele.getValueByNum(Ele.matrix[i][j+1].num) == 7)){
                    k++;
                }
                // left
                if(Ele.matrix[i-1] && Ele.matrix[i-1][j] && (curNum + Ele.getValueByNum(Ele.matrix[i-1][j].num) == 7)){
                    k++;
                }
            }
            // 当前的变换次数 > 前面元素的最大变换次数
            if( k > maxWeight[2] ){
                maxWeight[0] = i;
                maxWeight[1] = j;
                maxWeight[2] = k;
            }
        });

        // 计算全局
        for( var i = 0; i < 6; i++ ){
            for( var j = 8; j >= 0; j-- ){
                var k = 0;
                if(Ele.matrix[i][j] !== null){
                    var curNum = Ele.getValueByNum(Ele.matrix[i][j].num);
                    // top 
                    if(Ele.matrix[i][j-1] && (curNum + Ele.getValueByNum(Ele.matrix[i][j-1].num) == 7)){
                        k++;
                    }
                    // right 
                    if(Ele.matrix[i+1] && Ele.matrix[i+1][j] && (curNum + Ele.getValueByNum(Ele.matrix[i+1][j].num) == 7)){
                        k++;
                    }
                    // bottom
                    if(Ele.matrix[i] && Ele.matrix[i][j+1] && (curNum + Ele.getValueByNum(Ele.matrix[i][j+1].num) == 7)){
                        k++;
                    }
                    // left
                    if(Ele.matrix[i-1] && Ele.matrix[i-1][j] && (curNum + Ele.getValueByNum(Ele.matrix[i-1][j].num) == 7)){
                        k++;
                    }
                }
                // 当前的变换次数 > 前面元素的最大变换次数
                if( k > maxWeight[2] ){
                    maxWeight[0] = i;
                    maxWeight[1] = j;
                    maxWeight[2] = k;
                }
            }

        }
        // // 排序, 权重越大的优先
        // weight.sort((ele1,ele2)=>{
        //     return ele2[2]-ele1[2];//down
        // });
        if(maxWeight[2] == 0){
            if(callback){
                callback();
            }
            return;
        }

        // 变换
        Ele.matrix[ maxWeight[0] ][ maxWeight[1] ].changeTo7(true,true,true,true,callback);
        
    }

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
    public static getValueByNum(num:number):number{
        if(num == 8 || num == 9){
            return 7;
        }else{
            return num;
        }
    }

}