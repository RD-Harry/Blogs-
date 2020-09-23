//发送axax请求 将轮播图加载到页面
// url /get_fader
// get请求
// 响应数据类型json
// 成功:遍历响应中的data数据
// 将页面中#fader中的内容重写
$(function(){
    // 定义一个全局URL,data文件里面只写图片名字,没有写死路径
    // 防止要修改图片路径
    // 这里写的是图片的路径
    var BASE_URL ='../static/images/'
    // 指定静态资源图片的路径


    $.ajax({
        url:'/get_fader',
        type:'get',
        dataType:'json',//响应结果JSON格式
        // 响应成功就遍历data中数据
        success:function(res){
            console.log(res)
            // 接收响应的内容
            // 响应的数据会通过第一个参数传到function中

            // 如果响应的状态码是200
            if(res.code==200){
                // 建立一个空的html然后将要显示的页面拼接到里面
                var html='';
                // 数据在res.data中
                // function是回调函数
                // i:索引值
                // obj:当前遍历的对象
                $.each(res.data,function(i,obj){
                    // obj 就是fader.data里面的内容,
                    // "img_url"只是写了图片的名称,并没有写详细地址


                    // ul fader部分重写,
                    // 重写成大字符串,然后再拼到ul fader里面

                    // 拼接时 注意不要敲回车
                    html+='<li class="slide">'
                    html+='<a href="#">'
                    //html+='<img src="../static/images/banner01.jpg" alt="">'
                    
                    
                    // 图片路径不能写死,   指定的静态资源图片的路径,拼上图片名称
                    //BASE_URL是图片文件夹,
                    //obj是fader.data里面键为
                    //img_url
                    html+='<img src="'+BASE_URL+obj.img_url+'" alt="">'

                    // html+='<span class="img_info">爬虫</span>'
                    // 图片描述也不能写死,再fader.data里面有图片描述
                    // 再fader.data里面图片的描述是"img_info"
                    html+='<span class="img_info">'+obj.img_info+'</span>'
                    html+='</a></li>'    
                            
                                                       
                })
                // 将箭头和小圆点的样式也添加进来
                html+='<li class="fader_controls">'
                // html +='<div class="prev page" >&lsaquo;</div>'
                // 添加data-target属性让框架识别，点击切换图片
                html+='<div class="page prev" data-target="prev">&lsaquo;</div>'
                // html +='<div class="next page" >&rsaquo;</div>'
                html+='<div class="page next" data-target="next">&rsaquo;</div>'
                html+='<ul class="pager_list"></ul>'//原来设置小圆点样式
                // 原来这里 <li></li>用来设置小圆点样式
                // 后面框架里面会自动添加就没必要写li
                html+='</li>'

                // jquery.easyfader.min.js提供easyFader()
                // 添上easyFader()轮播图效果出来
                $('#fader').html(html).easyFader()
                // 框架会自动添加li 并且自动给li添加page类,
                // 在css文件里面设置了page类,设置了样式,同样生效
                // 为避开样式,在设置page属性时,将page直接改成div,小圆点恢复框架默认样式
                // 框架的默认样式里面是小圆点+数字形式
                // 去除默认数字样式,采用缩进很远样式text-indent: -9999px;超出屏幕边界

            }
        }
    })
    // 页面随着滚动条滚动还要继续添加数据


    function add_blogs(data){
        var html ='';
        if (data){
        // 如果有数据,遍历数据
            $.each(data,function(i,obj){

                // ①标题部分
                html+='<div class="blogs">'
                html+='<h3 class="blogtitle">'
                html+='<a href="#">'
                // blogs里面键为blogtitle的值
                html+=obj.blogtitle
                html+='</a></h3>'

                // ②图片部分
                html+='<span class="blogpic">'  
                html+='<a href="#" >'
                html+='<img src='+BASE_URL+obj.blogpic+' alt="">'
                html+='</a></span>'
                   
                    
                        
                    
                
                //③文章部分
                html+='<p class="blogtext">' 
                html+=obj.blogtext
                html+='</p>'
                
                 
                //④信息列表
                html+='<div class="blogsinfo">'
                html+='<ul><li class="author">'
                html+='<a href="#">'
                html+=obj.bloginfo.author
                html+='</a></li>'
                html+='<li class="lmname">'
                html+='<a href="#">'
                html+=obj.bloginfo.lmname
                html+='</a></li>'
                html+='<li class="timer" ><span>'
                html+=obj.bloginfo.timer
                html+='</span></li>'    
                html+='<li class="view"><span>'        
                html+=obj.bloginfo.view           
                html+='</span>已阅读</li>'        
                html+='<li class="like"><span>'       
                html+=obj.bloginfo.like           
                html+='</span></li>'        
                html+='</ul></div>'        
                html+=' </div>'            
                           

            })
            // 前面代码重写后,再父元素里面追加,
            // 一天开始只有5条内容,后面还有其他的内容,所以要追加
            // 追加元素原本的元素就不需要了
            $('#blogsbox').append(html)


        }



    }

    // 向页面发请求
    // ①页面加载完成,先显示5条数据
    $.ajax({
        url:'/get_data',
        type:'get',
        dataType:'json',
        // 得到响应成功后
        success:function(res){
            if(res.code==200){
                // 如果得到的响应码是200,执行add_blogs函数
                // 将响应得到的数据传到函数里面运行
                add_blogs(res.data)
            }

        }
    })


    var canLoad=true;//用于判断能否继续加载数据
    // 不能加载就主动设置成false

    $(document).scroll(function(){
        // 滚动条触发事件

        //  测试console.log('hello')
        // 滚动条滚动时.不停打印hello
        

        // ①获取滚动条已经下滑的距离
        var scrollTop = Math.ceil($(document).scrollTop())
        // $(document).scrollTop(),随着浏览器缩放,这个数值有时是浮点数
        // 因此取整
        // console.log(scrollTop)

        // ②获取可视窗口的高度,当前窗口
        var windowHeight = $(window).height();


        // ③获取完整文档高度,整体高度
        var documentHeight = $(document).height();


        // if(scrollTop+windowHeight ==documentHeight){
        //     console.log('到底了')
        // }

        if (documentHeight-(windowHeight+scrollTop)<1){
            // 还没到底,执行
            // console.log("快到底了")

            //向服务器端获取数据
            var size = $('.blogs').length
            if(canLoad){
                // 开始时canLoad默认为true
                // 发请求
                $.ajax({
                    // 发请求时已有博客的个数(已加载博客数长度)发给服务器
                    url:'/get_data?size='+size,
                    type:'get',
                    dataType:'json',
                    // 若没问题得到响应结果
                    success:function(res){
                        if(res.code==200){
                            add_blogs(res.data)
                        }else if(res.code==201){
                            alert(res.error)
                            // 不加载数据了
                            canLoad=false
                        }
                    },
                })
            }



        }



    })


})

