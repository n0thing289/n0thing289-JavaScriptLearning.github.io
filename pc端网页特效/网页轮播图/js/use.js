window.addEventListener('load',function(){
    // 1.获取左右按钮,和大盒子
    var lunbo = document.querySelector('.lunbo');
    var aleft = document.querySelector('.aleft');
    var aright = document.querySelector('.aright');

    //2. 鼠标经过大盒子显示按钮
    lunbo.addEventListener('mouseenter',function(){
        aleft.style.display = 'block';
        aright.style.display = 'block';
        // clearInterval(timer);
    }) 
    // 鼠标离开
    lunbo.addEventListener('mouseleave',function(){
        aleft.style.display = 'none';
        aright.style.display = 'none';
        // timer = setInterval(function(){
        //     //手动调用点击事件
        //     aright.click();
        // },2000)
    })
    var audio = document.querySelector('audio');

    
    // 动态增加小圆圈
    var ul = document.querySelector('.imgs');
    var imgslis = ul.children;
    var ol = document.querySelector('.circls');
    var circlslis = ol.children;
    for(var i = 0;i<imgslis.length;i++){
        // 创建小li
        var li = document.createElement('li');
        //记录小圆圈的索引号, 通过自定义属性(setAttribute())
        li.setAttribute('index', i);
        // 插入ol
        ol.appendChild(li);
        //  为什么新加的会粘一起,这四个不会
        // TODO 动态居中小圆圈

        // 1.添加小圆圈的点击事前-排他思想
        // 2.点击后还要移动ul
        function own(){
            for(var i = 0;i<ol.children.length;i++){
                //干掉所有人
                ol.children[i].className = '';
            }
            //留下我自己
            this.className = 'current';
            //ul的移动距离就是小圆圈的索引号* 图片的宽度,注意赋值
            var lunbowidth = lunbo.offsetWidth;
            //此时需要小圆圈的索引号,因此可以考虑自定义属性记录当前的索引号(生成小圆点的时候顺便生成i索引)
            // 拿到当前的index自定义属性(getAttribute)
            var index = this.getAttribute('index');
            //当我们点击了某个小li就拿到当前小li的所有值
            num = index;
            //当我们点了小圆点也要把所有给circle(核心是控制num circe与index一致)
            circle = index;
            console.log("index:" + index);
            // console.log(lunbowidth);
            // console.log(index);
            animate(ul, -index*lunbowidth,15 );
        }
        //创建点点的时候就绑定点击事件
        ol.children[i].addEventListener('click', own);
                
    }
    ol.children[0].className = 'current';

    //克隆第一种图片
    var first = ul.children[0].cloneNode(true);
    ul.appendChild(first);
///////////////////////////////////////////////////////////////////////////
    //给右按钮点击事件
    var num = 0;
    // 小圆点跟随的变量
    var circle = 0;
    var flag = true;
    aright.addEventListener('click', function(){
        
        if(flag){//节流阀,防止用户疯狂点击
            flag = false;
            //判断是否是最后一张
            if(num == (ul.children.length-1)){
                ul.style.left = 0;
                num = 0;
                // return;
            }
            num++;
            console.log("num:"+num);
            
            var lunbowidth = lunbo.offsetWidth;
            animate(ul,-num*lunbowidth,15,callback);
            //点完了最后一张图片此时再次点击o会出现在第二张music图,没有返回到第一张
            //此时需要无缝滚动原理(把ul第一个图片克隆一份到最后,然后再点的时候不作动画将偏移直接改成0)

            circle++;
            console.log("circle:"+circle);
            if(circle == ol.children.length){//如果circle走到了4(第五张,最后面的克隆那张)那么让他归零
                circle = 0;
            }
            //先清除其余小圆点的current类名
            circlechange()
        }

        audio.play();

        
    })

    //左侧按钮做法
    aleft.addEventListener('click', function(){
        
        if(flag){
            flag = false;
            //判断是否是第一张,如果此时再按下那么应该去最后一个图片
            if(num == 0){
                ul.style.left = -(ul.children.length-1) * lunbowidth;//不作动画直接跳最后(轮播图移动公式(当前索引号*图片宽度),图片宽度要和父盒子宽度一样)
                num = ul.children.length-1;
            }
            //
            num--;
            console.log("num:"+num);
            
            var lunbowidth = lunbo.offsetWidth;
            animate(ul,-num*lunbowidth,15,callback);
            //点完了最后一张图片此时再次点击o会出现在第二张music图,没有返回到第一张
            //此时需要无缝滚动原理(把ul第一个图片克隆一份到最后,然后再点的时候不作动画将偏移直接改成0)

            circle--;
            
            // if(circle < 0){//如果circle<0说明是第一张图片,则小圆圈要改为第四个小圆圈
            //     circle = ol.children.length-1;
            //     console.log("circle:"+circle);
            // }
            circle = circle < 0 ? ol.children.length-1 : circle;
            circlechange()
        }
        
    })
    function circlechange(){
        for(var i = 0;i<ol.children.length;i++){
            //干掉所有人
            ol.children[i].className = '';
        }
        
        ol.children[circle].className = 'current';
    }
    
    // 自动播放轮播图(新语法手动调用事件)
    // var timer = setInterval(function(){
    //     //手动调用点击事件
    //     aright.click();
    // },2000)

    function callback(){
        flag = true;
    }
})