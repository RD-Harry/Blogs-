from flask import Flask,render_template,request
import json



# 将Python文件变成flask应用
# 通过flask构建一个对象,构件对象的时候将模块名传进去
app=Flask(__name__)


# @app.route('/')
# def blog_view():
#     return render_template('./index.html')





@app.route('/')
@app.route('/index')
def index_view():
    return render_template('index.html')





# /* 将fader.data里面的数据提取出来,通过flask传递给浏览器 */
@app.route("/get_fader")
def get_fader():
    with open('fader.data','r')as f:
        data=f.read()
        print(type(data))#data是字符串
    # dumps()返回的是字符串
    # jsonStr=json.dumps(data)#还是字符串
    # return jsonStr


    all_data=json.loads(data)#列表
    print(all_data)
    print(type(all_data))
    return json.dumps({"code":200,"data":all_data})




@app.route("/get_data")
def get_data():
    size=request.args.get('size')
    # 接收客户端get格式传输的参数size
    # 打开blogs.data读取全部数据.转成JSON格式
        # 如果size==0或没有size
            # 获取全部数据的前5条
        # 如果size有值
            # 获取size位置开始的后面的3条数据
    # 将响应结果给浏览器{"code":200,"data":XXX}

    with open ("blogs.data","r") as f:
        # json.loads()将读取出来的全部数据转成JSON格式
        all_data =json.loads(f.read())
        if not size:
            # 如果没有请求,第一次请求获取前5条数据
            datas = all_data[:5]
        else:
            # size有数据
            # size---从前段获取到的数据是字符串,要先转成整数才能用
            size = int(size)
            # 有数据就获取指定位置后面再+3个
            # 知识点 切片
            # 容器[(开始索引):(结束索引)(:(步长))]
            datas = all_data[size :size+3]

        # 有可能数据全部返回,没有数据再能切片
        # 判断是否还有返回的数据
        if datas:
            # 如果datas是有值,返回正常的数据
            # dumps将dict转化为string
            return json.dumps({"code":200,"data":datas})
        else:
            return json.dumps({"code":201,"error":"没有数据!"})




    




# app.run(debug=True)

if __name__=='__main__':
    app.run(debug=True)


