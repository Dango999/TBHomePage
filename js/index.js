//声明一个变量，下面的时候通过算术方法改变变量的值
var current = 0;
//初始化数据
var timer = null;
var pre = null;
var nex = null;
$(document).ready(function() {
    var li_v = $('.wrap .img');
    var i_v = $('.circle em');
    //设置自动播放
    function mover() {
        //首先清除当前current以外的li_v的样式显示和伪圆标i_v的效果, 以下的同上
        li_v.hide();
        i_v.removeClass("active");
        current = (current + 1) % (li_v.length);
        //当鼠标点击伪圆标时候获取当前的索引值，并把它赋给current从而实现了鼠标点击的时候跳转到下一个图片轮播
        i_v.click(function() {
            current = $(this).index();
        });
        //当鼠标点击伪圆标时候获取当前的索引值，并把它赋给current从而实现下一个图片轮播
        li_v.eq(current).show();
        i_v.eq(current).addClass("active");
    };
    //设置自动轮播
    timer = setInterval(mover, 5000);
    //鼠标划入的时候停止轮播
    li_v.mouseover(function() {
        clearInterval(timer);
    });
    //鼠标移出的时候继续轮播
    li_v.mouseout(function() {
        timer = setInterval(mover, 5000);
    });
    //实现左右按钮事件
    //点击左按钮事件
    $(".LBtn").click(function() {
        //    首先清除定时器
        clearInterval(timer);
        clearInterval(pre);
        //实现点击按钮显示上一个图片代码
        function last_v() {
            li_v.hide();
            i_v.removeClass("active");
            current = (current - 1 + li_v.length) % (li_v.length);
            li_v.eq(current).show();
            i_v.eq(current).addClass("active");
        };
        pre = setTimeout(last_v, 10);
        timer = setInterval(mover, 5000);
    });
    //点击右按钮事件
    //只需继续轮播就可以
    $(".RBtn").click(function() {
        //    首先清除定时器
        clearInterval(timer);
        clearInterval(nex);
        //调用自动轮播的代码和点击上一张图片代码的setTimeout
        nex = setTimeout(mover, 10);
        timer = setInterval(mover, 5000);
    });
    //添加伪类下标圆标动事件
    //鼠标点击伪圆标的时候显示所对应的图片并且停止页面。
    i_v.click(function() {
        clearInterval(timer);
        i_v.removeClass("active");
        li_v.hide();
        li_v.eq($(this).index()).show();
        $(this).addClass("active");
    });
});