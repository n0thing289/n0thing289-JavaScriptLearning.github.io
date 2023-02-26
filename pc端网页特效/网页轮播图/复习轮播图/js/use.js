window.addEventListener('load',function(){
    var lunbo = document.querySelector('.lunbo');
    var aleft = document.querySelector('.aleft');
    var aright = document.querySelector('.aright');

    var lunboWidth = lunbo.offsetWidth;
    //鼠标经过显示隐藏按钮
    mouse(lunbo,aleft,aright);

    // 2. 动态生成小圆圈
    /**
     * 1. 获取图片数量 -> li的数量
     * 2. 根据数量生成小圆圈
     */
    var ul = document.querySelector('.imgs');
    var ul_li = ul.children;// li的个数
    // console.log(ul_li);
    var ol = document.querySelector('.circlesBox');// 获取ol节点lunbo.children[lunbo.children.length - 1]
    for(var i = 0; i<ul_li.length; i++){
        var li = document.createElement('li');
        ol.appendChild(li);
        // 记录当前索引号,设置自定义属性
        li.setAttribute('index', i);
        // 3. 小圆圈排他思想
        li.addEventListener('click', function(){
            // 用for循环把所有兄弟li的类选择器指空
            for(var i = 0;i<ol.children.length;i++){
                ol.children[i].className = '';
            }
            // 把被点击的那个li的样式设置成current
            this.className = 'current';
            
            // 4. 点击小圆圈滚动图片
            // var lunboWidth = lunbo.offsetWidth;// 602 ,左右有边框各1px
            // console.log(lunboWidth);
            var index = this.getAttribute('index');// 一点击,就拿到当前这个li的索引号
            // console.log(index);
            num = index; //点击了小li,那么要给num何circle
            circle = index;
            animate(ul, -index*lunboWidth,15);
        })
        ////小圆圈排他思想
    }
    // 把第一个li默认选中效果
    ol.children[0].className = 'current';


    // 小圆圈排他思想
    /**
     * 1. 先给ol下的每一个li增加点击事件
     * 2. 把所有li的类选择器指空
     * 3. 把被点击的那个li的样式设置成current
     * 细节:因为这样的需求,其实可以放在创建ol的小li时一起绑定事件
     */

    
    // 5. 右侧无缝滚动
    // 6. 克隆第一张图片
    var firstLi = ul.children[0].cloneNode(true);
    ul.appendChild(firstLi);
    var num = 0;
    var circle = 0;// 控制小圆圈的样式
    aright.addEventListener('click', function(){
        if(num == ul.children.length-1){ // 无缝滚动技术
            ul.style.left = 0;
            num = 0;
        }
        num++;
        animate(ul, -num*lunboWidth,15);

        // 7. 点击右侧按钮,小圆圈跟着一起变化,在声明一个circle变量控制小圆圈的播放
        circle++;
        if(circle == ol.children.length){// 如果circle 等于4,说明走到了我们克隆的最后一张图片
            circle = 0;
        }
        
        // 先清除其余小圆圈的current类名
        for(var i=0;i<ol.children.length;i++){
            ol.children[i].className = ''
        }
        ol.children[circle].className = 'current'; 
    });

    // 8. 左侧按钮实现
    aleft.addEventListener('click',function(){
        if(num == 0){ // 无缝滚动技术
            ul.style.left = -(ul.children.length-1) * lunboWidth + 'px';
            num = ul.children.length-1;
        }
        num--;
        animate(ul, -num*lunboWidth,15);

        //  点击右侧按钮,小圆圈跟着一起变化,在声明一个circle变量控制小圆圈的播放
        circle--;
        if(circle < 0){// 如果circle 等于4,说明走到了我们克隆的最后一张图片
            circle = ol.children.length-1;
        }
        
        // 先清除其余小圆圈的current类名
        for(var i=0;i<ol.children.length;i++){
            ol.children[i].className = ''
        }
        ol.children[circle].className = 'current'; 
    
    });


})

// 1. 鼠标经过显示隐藏按钮
function mouse(lunbo,aleft, aright){
    lunbo.addEventListener('mousemove', function(){
        aleft.style.display = 'block';
        aright.style.display = 'block';
    })
    lunbo.addEventListener('mouseleave', function(){
        aleft.style.display = 'none';
        aright.style.display = 'none';
    })
}