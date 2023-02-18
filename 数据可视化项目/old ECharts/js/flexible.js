// 立即执行函数
(function flexible(window, document) {

    //这个是HTML的根元素
    var docE1 = document.documentElement;

    //dpr 物理像素比
    var dpr = window.devicePixelRatio || 1;

    //设置body的字体大小


    function setBodyFontSize() {
        if (document.body) {
            document.body.style.fontSize = (12 * dpr + 'px')
        } else {

            //如果页面中没有body这个元素,则等页面中主要的DOM元素加载完毕再去设置body的字体大小
            document.addEventListener('DOMContentLoaded', setBodyFontSize)
        }
    }
    setBodyFontSize();

    //设置html元素的文字大小   set 1rem=viewwidth/10
    // clientWidth 读取元素的宽度,包含padding值的


    function setRemUnit() {
        var rem = docE1.clientWidth / 24 //pink老师将窗口划分24等份
        docE1.style.fontSize = rem + 'px'
    }
    setRemUnit()
    //reset rem unit on page resize  当页面尺寸大小发生变化时就重新设置rem的大小
    window.addEventListener('resize', setRemUnit);
    //pageshow:重新加载页面(a\f5 \ 前进后退)触发的事件 都ok
    // load:重新加载页面(a\f5 \ 前进后退)触发的事件  火狐不兼容
    window.addEventListener('pageshow', function(e) {
        //e.persisted返回的是true   
        // 意思是如果 这个页面是从缓存取过来的,也需要重新计算一下rem值 
        if (e.persisted) {
            setRemUnit()
        }
    })
    //detect 0.5px supports
    //有些浏览器不支持0.5px写法
    if (dpr >= 2) {
        var fakeBody = document.createElement('body')
        var testElement = document.createElement('div')
        testElement.style.border = '5px solid transparent'
        fakeBody.appendChild(fakeBody)
        if (testElement.offsetHeight === 1) {
            docE1.classList.add('hairlines')
        }
        docE1.removeChild(fakeBody)
    }
})(window, document); //这个小括号里的参数就表明调用了这个函数
