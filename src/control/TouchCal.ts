class TouchCal {
    // 上1 右2 下3 左4 tap0
    // public static direction;
    public static cal(startX:number, startY:number, endX:number, endY:number) {
        var direction:number;
        var distanceX:number = endX - startX;
        var distanceY:number = endY - startY;
        if( Math.abs(distanceX) > Math.abs(distanceY) && distanceX > 50 ){
            direction = 2;
        } else if ( Math.abs(distanceX) > Math.abs(distanceY) && distanceX < -50 ){
            direction = 4;
        } else if ( Math.abs(distanceX) < Math.abs(distanceY) && distanceY < -50 ){
            direction = 1;
        } else if ( Math.abs(distanceX) < Math.abs(distanceY) && distanceY > 50 ){
            direction = 3;
        }else{
            direction = 0;
        }
        return direction;
    }
}