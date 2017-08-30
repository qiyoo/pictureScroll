## 思路： ##
## 1.以left来实现滑动 ##
1.滑动图片组的父元素（.img）的宽度要设置为所有图片宽度的总和，所有的图片相当于都是在滑动组图片的父元素（.img）一行上排列，多余的内容隐藏，这样切换的时候就相当于切换图片组（.img）的left

## 2.在图片组的最后添加第一张图片 ##
1.初始化的时候先在图片组（.img）中最后添加第一张图片，实现最后一张图片切换到第一张时，不会出现空白等现象，最后一张切换到第一张时，显示的是添加的在图片组最后的第一张图片，然后位置left切换为0，这样再继续进行切换的时候就是从left=0.过渡到left=-imgWidth，即第二张图片的位置

    return doPicChange(index, function(){
    	picPar.css({left: 0});
    });

## 3.左滑动，第一张切换到最后一张 ##
1.当左滑时，如果index=-1，也就是由第一张滑动到最后一张时，直接给index复制为图片组所有的图片长度（不包括最后添加的那一张），设置picpar的left设置为-1 * show_w * (maxLen + 1)，作为一个过渡，然后执行doPicChange进行图片的切换

    if (index < 0) {
    	index = maxLen;
    	picPar.css({left: -1 * show_w * (maxLen + 1)});
     	return doPicChange(index);
     }


## 4.点击左右按钮的时候，停止自动切换图片的定时器 ##

1.在图片的切换执行函数中定义一个变量，获取当前的时间click_time

2.定时器函数中也定义一个变量获取当前的时间auto_time

3.当两者的差值小于定时器的时间时，就停止定时器，这样可避免点击按钮事件和定时器同时触发

## 5.使用gulp压缩js和css ##

1.使用的js和css，图片在src文件夹中