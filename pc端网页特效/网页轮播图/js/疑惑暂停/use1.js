window.addEventListener('load',function(){
    // 1.获取左右按钮,和大盒子
    var lunbo = document.querySelector('.lunbo');
    var aleft = document.querySelector('.aleft');
    var aright = document.querySelector('.aright');

    //2. 鼠标经过大盒子显示按钮
    lunbo.addEventListener('mouseenter',function(){
        aleft.style.display = 'block';
        aright.style.display = 'block';
    })
    lunbo.addEventListener('mouseleave',function(){
        aleft.style.display = 'none';
        aright.style.display = 'none';
    })

    //TOdo 动态增加小圆圈
    var ul = document.querySelector('.imgs');
    var imgslis = ul.children;
    var ol = document.querySelector('.circls');
    var circlslis = ol.children;
    for(var i = 0;i<imgslis.length;i++){
        // var li = document.createElement('li');
        // ol.appendChild(li);
        // TODO 为什么新加的会粘一起,这四个不会

        
    }
    ol.children[0].className = 'current';

    

})