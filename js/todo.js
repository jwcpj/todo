$(function() {
    //按下回车，把完整数据存储到本地存储里面
    // 存储数据格式 var todolist = [{title: "xxx",done:false}]
    //加载数据
    load();
    $("#title").on("keydown", function(event) {
        if (event.keyCode === 13) {
            if ($(this).val() == "") {
                alert("请输入您的待办事项：");
            } else {

                //读取本地存储原来的数据
                var local = getData();
                console.log(local);
                //把local数组进行数据更新，把最新的数据给local数组
                local.push({ title: $(this).val(), done: false });
                //把数组local存储给本地存储
                saveData(local);
                //加载数据
                load();
                $(this).val("");
            }
        }
    });
    //删除数据操作
    $("ul,ol").on("click", "a", function() {
        //获取本地存储数据
        var data = getData();
        //修改数据
        var index = $(this).attr("id");
        data.splice(index, 1);
        //保存到本地存储
        saveData(data);
        //渲染加载数据
        load();
    });
    // 正在进行和已完成选项操作
    $("ol,ul").on("click", "input", function() {
            //获取本地存储数据
            var data = getData();
            //修改数据
            var index = $(this).siblings("a").attr("id");
            data[index].done = $(this).prop("checked");
            //保存到本地存储
            saveData(data);
            // 渲染加载数据
            load();
        })
        // 读取本地存储的数据
    function getData() {
        var data = localStorage.getItem("todolist");
        if (data !== null) {
            // 本地存储里面的数据是字符串格式的 但是我们需要的是对象格式的
            return JSON.parse(data);
        } else {
            return [];
        }
    }
    //保存本地存储
    function saveData(data) {
        localStorage.setItem("todolist", JSON.stringify(data));
    }
    //渲染加载数据
    function load() {
        //读取本地存储的数据
        var data = getData();
        // 遍历之前清空ol里的元素
        $("ul,ol").empty();
        var todoCount = 0; //正在完成的个数
        var doneCount = 0; //已经完成的个数
        //遍历数据
        $.each(data, function(i, n) {
            if (n.done) {
                $("ul").prepend("<li><input type='checkbox' checked='checked'><p>" + n.title + "</p><a href='javascript:;' id=" + i + "></a>")
                doneCount++;
            } else {
                $("ol").prepend("<li><input type='checkbox'><p>" + n.title + "</p><a href='javascript:;' id=" + i + "></a>")
                todoCount++;
            }
        });
        $("#todocount").text(todoCount);
        $("#donecount").text(doneCount);
    }

})