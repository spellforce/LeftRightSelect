$(function () {
    $json = [{"userId": "138910", "name": "916728"}, {"userId": "138929", "name": "df01"}, {
        "userId": "138930",
        "name": "df02"
    }, {"userId": "138931", "name": "df03"}, {"userId": "138932", "name": "df04"}, {
        "userId": "138933",
        "name": "df05"
    }, {"userId": "138934", "name": "df06"}, {"userId": "138935", "name": "df07"}, {
        "userId": "138949",
        "name": "张里平"
    }, {"userId": "138948", "name": "唐毅"}, {"userId": "139826", "name": "李莉"}, {
        "userId": "139827",
        "name": "huang"
    }, {"userId": "139861", "name": "zhujian"}, {"userId": "139884", "name": "王伟"}, {
        "userId": "139231",
        "name": "郭贺"
    }, {"userId": "139233", "name": "张振振"}, {"userId": "139234", "name": "杨霆"}, {
        "userId": "139235",
        "name": "安诗全"
    }, {"userId": "139236", "name": "陈培"}, {"userId": "139237", "name": "张进奇"}, {
        "userId": "139267",
        "name": "王总"
    }, {"userId": "139304", "name": "teacher_12"}, {"userId": "139305", "name": "王秀燕"}, {
        "userId": "139278",
        "name": "胡莹莹"
    }, {"userId": "139281", "name": "徐从瑾"}];
    $item = ListToJson($json);
    initMyLeftSelect();

    function initMyLeftSelect() {
        createLi($item);
        createIndex();
        autoSearch($item);
    }

    function createLi(obj) {
        $('#leftUlSelect').html('');
        $.each(obj, function (n, value) {
            if (n) {
                $li = '<li value="' + value.id + '" select=0 data-id="' + n + '">' +
                    '<span>' + value.value + '</span>' +
                    '<div class="icon_close"></div>' +
                    '</li>';
                $('#leftUlSelect').append($li);
            }
        });
    }

    function createIndex() {
        $('#leftUlSelect').listnav({
            includeOther: true,
            noMatchText: '没有内容',
            includeAll: false,  //包括'all'这个按钮，默认true
            includeNums: false, //包括'0-9'这个按钮，默认true
            includeOther: false,//包括 '...' 选项来过滤非英语字符的
            showCounts: false //显示鼠标悬浮时列表项的数目
        });
    }
    function autoSearch(data){
        $('#to_search').AutoComplete({
            'data': data,
            'width': 195,
            'listStyle': 'custom',
            'maxHeight': 400,
            'createItemHandler': function (index, data) {
                var div = $("<li class='LeftRight_search_result' value=" + data.id + " select=0 ><span>" + data.value + "</span><div class='icon_close'></div></li>");
                return div;
            }
        }).AutoComplete('show');
    }
    //选择多项
    $("#addOne").click(function () {
        $leftSelected = $("#leftUlSelect li[select=1]");
        $leftSelected.attr('select', '0').removeClass('hover');
        $leftSelected.clone().attr('style', 'display:block').appendTo("#rightUlSelect");
        $leftSelected.attr('style', 'display:none');
        $leftSelected.attr('selected','');
    });


    function getRValue() {
        var rValue = [];
        $("#rightUlSelect li").each(function () {
            rValue.push($(this).attr('value'));
        });
        return rValue;
    }

    function getLValue() {
        var lValue = [];
        $("#leftUlSelect li").each(function () {
            lValue.push($(this).attr('value'));
        });
        return lValue;
    }

    //移除一项
    $('#rightUlSelect').hover(function () {
        $('#rightUlSelect').find('.icon_close').mouseover(function () {
            $(this).parent('li').attr('select', '1');
        });
        $('#rightUlSelect').find('.icon_close').mouseout(function () {
            $(this).parent('li').attr('select', '0');
        });
        $('#rightUlSelect').find('.icon_close').click(function () {
            $rightSelected = $("#rightUlSelect li[select=1]");
            $value = $rightSelected.attr('value');
            var lValue = getLValue();
            var flag = 0;
            for (var i = 0; i <= lValue.length; i++) {
                if (lValue[i] == $value) {
                    $("#leftUlSelect li[value=" + $value + "]").attr('style', 'display:list-item').removeAttr('selected');
                    $rightSelected.remove();
                    flag = 1;
                    break;
                }
            }
            if (flag == 0) {
                $rightSelected.attr('select', '0').clone().appendTo('#leftUlSelect');
                $rightSelected.remove();
            }
        });
    });


    //左选择器选中效果
    $('#leftUlSelect').hover(function () {
        $('#leftUlSelect').find('li').click(function () {
            $select = $(this).attr('select');
            if ($select == 0) {
                $(this).addClass('hover');
                $(this).attr('select', '1');
            } else {
                $(this).removeClass('hover');
                $(this).attr('select', '0');
            }
        });
    });

    //搜索框选中添加一项
    $('.ac').hover(function () {
        $(this).find('.LeftRight_search_result').on('click', function () {
            $value = $(this).attr('value');
            $leftU = $("#leftUlSelect li[value=" + $value + "]");
            var rValue = getRValue();
            var flag = 0;
            for (var i = 0; i <= rValue.length; i++) {
                if (rValue[i] == $value) {
                    flag = 1;
                    break;
                }
            }
            if (flag == 0) {
                $(this).clone().appendTo("#rightUlSelect");
                $leftU.attr('style', 'display:none');
                $leftU.attr('selected');
            }
        });
    });
});

//转换为后台json对象保存选择好的数据
function ToJson() {
    var jsonAll;
    var jsonAllS = new Array();
    var name = null;
    var id = null;
    $("#rightUlSelect li").each(function () {
        id = $(this).val();
        name = $(this).children('span').text();

        var json = new Object();
        json.id = id;
        json.name = name;
        jsonAllS.push(json);
    });
    jsonAll = JSON.stringify(jsonAllS)

    return jsonAll;
}

//格式化json对象
function ListToJson(e) {
    return $.map(e, function (row) {
        return {
            label: row.name,
            value: row.name,
            id   : row.userId
        }
    })
}