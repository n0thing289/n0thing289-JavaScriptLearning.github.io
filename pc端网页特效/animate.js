function animate(obj, target,rate,callback){
    //先清除之前的定时器,就不会导致越点越多的定时器
    clearInterval(obj.timer);

    //一计算步长
    //二强转一下
    // var step = (target - obj.offsetLeft) / 10;
    // step = step > 0? Math.ceil(step) : Math.floor(step);
    obj.timer = setInterval(function fn(){
    if(obj.offsetLeft == target){
        clearInterval(obj.timer);
        if(callback){
            callback();
        }
    }else{
        obj.style.left = obj.offsetLeft + 1 + 'px';
        console.log(obj.offsetLeft);
    }
    
    },rate);
}