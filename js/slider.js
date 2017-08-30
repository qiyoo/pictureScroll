$(function(){
      //设置图片显示区域和图片的宽度
       var showPicWid = $(document.body).width();
       $('#show').css('width',showPicWid);
       $('#show .focusImg').css('width',showPicWid);
       $('#show .focusImg img').css('width',showPicWid);
       $('#show .focusImg .masks').css('width',showPicWid)

        //按钮切换图片
        var $show = $("#show"),
            show_w = $show.width(),
            picPar = $show.find("> div.focusImg >.img");//图片组的父元素
            pic_len = picPar.children().length,   
            dotsBtn = $(".dots i"),//圆按钮对象
            curIndex = 0,//当前图片的下标
            maxLen = pic_len - 1,//图片下标的最大值
            click_time = 0,//在按钮点击事件中是否去掉自动切换图片的标记
            stay_time = 5 * 1000, //图片停留时间
            dur_time = .6 * 1000;//图片过度时间

            //将第一张图片放置在最后，结果最后一张滑动到第一张时会出现空白的现象
            picPar.children().eq(0).clone().appendTo(picPar);

           
            //按钮显示高亮
            function showBtn(index){
              dotsBtn.eq(index).addClass("active");
              dotsBtn.eq(index).siblings().removeClass("active");
            }

            //图片切换
            function doPicChange(index,comp){
              var idx = index > maxLen ? 0 : index ;
              showBtn(idx);
              curIndex = idx;
              picPar.stop().animate({left: -1 * show_w * index}, {duration: dur_time, complete: comp});
            }

            // dir 图片切换方向，last:是否是最后一张图片,在滑动过程中 last一直为true，在初始化的时候为false
            //执行这个函数，可以切换图片
            function PicChange(dir,last){
              
              click_time = +new Date();
              if(dir === 0){//初始化
                showBtn(curIndex);
                picPar.animate({left: -1 * show_w * curIndex});
                return;
              }
              var index;
              if(dir>0){//往右
                index = curIndex+1;//每次点击一次index+1
                if(index > maxLen && !last){
                  index=0;
                }
                
                if(index <= maxLen){
                  return doPicChange(index);
                }

                //当index>maxLen时，即滑动到最后一张的时候，取消动画效果，直接切换到第一张
                return doPicChange(index, function(){
                  picPar.css({left: 0});
                });
              }else {
                  index = curIndex - 1;
                  
                  //当从第一张开始往左滑动时，index=-1，将index复制为4，设置picPar的left，然后执行图片切换事件
                  if (index < 0) {
                    index = maxLen;
                    picPar.css({left: -1 * show_w * (maxLen + 1)});
                    
                      return doPicChange(index);
                  } else {
                      return doPicChange(index);
                  }
              }
            }
            //刷新或者打开页面的时候由第一张过渡到第二张，如果要显示第一张 PicChange(0);
            PicChange(1);

            //圆按钮点击事件
            // $(".dots i").click(function(){
            //   var index = $(this).index();
            //   doPicChange(index);
            // });
            
            //左右按钮点击事件
            $(".btns").click(function(){
              PicChange($(this).is('.prev') ? -1 : 1,true);
            });

            //自动滑动事件
            var picAutoChange = setInterval(function(){
                var auto_time = +new Date();
                if (auto_time - click_time < stay_time) {//解决点击按钮滑动事件和自动切换事件同事发生
                  return;
                }
                //打开或刷新页面的时候显示第二张图片
                PicChange(1,true);
            },5000);

            //滑入图片区域事件：停止自动切换事件，显示对应的图片
            picPar.hover(function(){
              clearInterval(picAutoChange);
            },function(){
              picAutoChange = setInterval(function(){
              var auto_time = +new Date();
              if (auto_time - click_time < stay_time) {//解决点击按钮滑动事件和自动切换事件同事发生
                return;
              }
              //打开或刷新页面的时候显示第二张图片
              PicChange(1,true);
              },5000);
            });
            //圆按钮事件：停止自动切换事件，显示对应的图片
            dotsBtn.hover(function(){
              clearInterval(picAutoChange);
              var index = $(this).index();
              doPicChange(index);
            },function(){
              picAutoChange = setInterval(function(){
              var auto_time = +new Date();
              if (auto_time - click_time < stay_time) {//解决点击按钮滑动事件和自动切换事件同事发生
                return;
              }
              //打开或刷新页面的时候显示第二张图片
              PicChange(1,true);
              },5000);
            });
})