function animate(obj, target,rate,callback){
    clearInterval(obj.timer);
    obj.timer = setInterval(function(){
        var step = (target - obj.offsetLeft) / 10;
        step = step>0 ? Math.ceil(step) : Math.floor(step);
        if(obj.offsetLeft == target){
            clearInterval(obj.timer);
        }
        else{
            obj.style.left = obj.offsetLeft + step + 'px';
        }
    }, rate);
}