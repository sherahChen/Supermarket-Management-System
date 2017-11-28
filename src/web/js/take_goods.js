require(['config'], function() {
    require(['jquery', 'global'], function() {
        $.get(global.apiBaseUrl + 'purchase/take_goods', function(res) {
            showTr(res);
        })
        $('.search_btn').on('click', function() {
            $.post(global.apiBaseUrl + 'purchase/take_goods', {
                g_name: $('.search').val()
            }, function(res) {
                showTr(res);
            })
        });

        function showTr(res) {
            $('tbody').html('');
            var tr = '';
            var i = 0;
            res.data.map(function(item) {
                i++;
                tr += ` <tr data-id="${item.gid}">
                    <td><input type="checkbox" class="cbox"/></td> 
                    <td>${i}</td>
                    <td>${item.r_goods}</td>
                    <td>${item.barcode}</td>
                    <td>${item.rid}</td>
                    <td>${item.s_merchant}</td>
                    <td>${item.s_qty}</td>
                    <td>${item.real_qty}</td>
                    <td>${item.stock_price}</td>
                    <td>${item.t_date}</td>
                    <td>${item.t_pay}</td>
                    <td><button class="reback">退货</button></td>
                </tr> `;
            }).join('');
            $('tbody').append(tr);
            // 退货 
             var $p= $('<p/>').attr('id', "r_qty");
            var $label = $('<label/>').html('退货数量：'); 
            var $input = $('<input/>').attr('type', 'number');
            $('.reback').on('click', function() {
                $('#t_date').prev('label').html('退货日期：');
                var currentTr = $(this).parents('tr');
                var idx = currentTr.attr('data-id');
               $p.appendTo('#box2');
                $label.appendTo($p);
               $input.appendTo($p);
                $('#div').addClass('opt');
                $('#box2').addClass('enter').css({
                    'display': 'block'
                });
                $('#gid').attr({
                    "disabled": "disabled"
                }).val(currentTr.attr('data-id'));
                $('#r_goods').attr({
                    "disabled": "disabled"
                }).val(currentTr.find('td').eq(2).html());
                $('#barcode').attr({
                    "disabled": "disabled"
                }).val(currentTr.find('td').eq(3).html());
                $('#rid').attr({
                    "disabled": "disabled"
                }).val(currentTr.find('td').eq(4).html());
                $('#s_merchant').attr({
                    "disabled": "disabled"
                }).val(currentTr.find('td').eq(5).html());
                $('#s_qty').attr({
                    "disabled": "disabled"
                }).val(currentTr.find('td').eq(6).html());
                $('#real_qty').attr({
                    "disabled": "disabled"
                }).val(currentTr.find('td').eq(7).html());
                $('#stock_price').attr({
                    "disabled": "disabled"
                }).val(currentTr.find('td').eq(8).html());
                $('#t_date').val(currentTr.find('td').eq(9).html());
                $('#t_pay').attr({
                    "disabled": "disabled"
                }).val(currentTr.find('td').eq(10).html());
                $('#save').click(function() {
                    var num = $('#real_qty').val();
                    $('#r_qty').css({
                        'position': 'relative'
                    });
                    var $span = $('<span/>').css({
                        'color': "red",
                        'position': 'absolute',
                        'top': '30px',
                        'left': '100px'
                    }).html('数量超出收货范围！');
                    var value = $('#r_qty').find('input').val();
                    if (value > Number(num)) {
                        $span.appendTo('#r_qty');
                        $('#r_qty').find('input')[0].focus();
                    }
                    var rebData = {
                        rid: $('#rid').val(),
                        s_merchant: $('#s_merchant').val(),
                        r_goods: $('#r_goods').val(),
                        r_price: $('#stock_price').val(),
                        r_qty: value,
                        r_date: $('#t_date').val()
                    };
                    rebData = JSON.stringify(rebData);
                    $.post(global.apiBaseUrl + 'purchase/take_goods', {
                        rebData: rebData
                    }, function(res) {})

                    box2.style.display = 'none';
                    $('#div').removeClass('opt');
                })
            })
        }
        var box2 = document.querySelector('#box2');
        var header = box2.querySelector('header');
        autoPosition();
        window.onresize = function() {
                autoPosition();
            }
            //定位到页面中心
        function autoPosition() {
            var left = (window.innerWidth - box2.offsetWidth) / 2;
            var top = (window.innerHeight - box2.offsetHeight) / 2;
            // 改变弹窗的top,left值
            box2.style.left = left + 'px';
            box2.style.top = top + 'px';
        }
        header.onmousedown = function(evt) {
            var ox = evt.offsetX;
            var oy = evt.offsetY;
            document.onmousemove = function(e) {
                box2.style.left = e.clientX - ox + 'px';
                box2.style.top = e.clientY - oy + 'px';
                e.preventDefault();
            }
            evt.stopPropagation();
        }
        header.onmouseup = function(e) {
                e.preventDefault();
                document.onmousemove = null;
            }
            // 编辑
        $('tbody').on('click', '.cbox', function() {
            if ($(this).is(':checked')) {
                var currentTr = $(this).parents('tr');
                var idx = $(this).parents('tr').attr('data-id');
                $('.control').on('click', '.edit', function() {
                    $(this).css({
                        'background-color': "#58bc58"
                    }).siblings('span').css({
                        'background-color': "orange"
                    });
                    $('#div').addClass('opt');
                    $('#box2').addClass('enter').css({
                        'display': 'block'
                    });
                    // console.log(currentTr.find('td').eq(2).html())
                    $('#gid').val(currentTr.attr('data-id'));
                    $('#gid').attr({
                        "disabled": "disabled"
                    });
                    $('#r_goods').val(currentTr.find('td').eq(2).html());
                    $('#barcode').val(currentTr.find('td').eq(3).html());
                    $('#rid').val(currentTr.find('td').eq(4).html());
                    $('#s_merchant').val(currentTr.find('td').eq(5).html());
                    $('#s_qty').val(currentTr.find('td').eq(6).html());
                    $('#real_qty').val(currentTr.find('td').eq(7).html());
                    $('#stock_price').val(currentTr.find('td').eq(8).html());
                    $('#t_date').val(currentTr.find('td').eq(9).html());
                    $('#t_pay').val(currentTr.find('td').eq(10).html());
                });
            }
            $('#save').click(function(e) {
                box2.style.display = 'none';
                $('#div').removeClass('opt');
                var gid = $('#gid').val();
                var r_goods = $('#r_goods').val();
                currentTr.find('td').eq(2).html(r_goods);
                var barcode = $('#barcode').val();
                currentTr.find('td').eq(3).html(barcode);
                var rid = $('#rid').val();
                currentTr.find('td').eq(4).html(rid);
                var s_merchant = $('#s_merchant').val();
                currentTr.find('td').eq(5).html(s_merchant);
                var s_qty = $('#s_qty').val();
                currentTr.find('td').eq(6).html(s_qty);
                var real_qty = $('#real_qty').val();
                currentTr.find('td').eq(7).html(real_qty);
                var stock_price = $('#stock_price').val();
                currentTr.find('td').eq(8).html(stock_price);
                var t_date = $('#t_date').val();
                currentTr.find('td').eq(9).html(t_date);
                var t_pay = $('#t_pay').val();
                currentTr.find('td').eq(10).html(t_pay);
                var newDate = {
                    gid: gid,
                    r_goods: r_goods,
                    barcode: barcode,
                    rid: rid,
                    s_merchant: s_merchant,
                    s_qty: s_qty,
                    real_qty: real_qty,
                    stock_price: stock_price,
                    t_date: t_date,
                    t_pay: t_pay
                };
                newDate = JSON.stringify(newDate);
                $.post(global.apiBaseUrl + 'purchase/take_goods', {
                    products: newDate
                }, function(res) {})
                e.stopPropagation();
            });
        })
        $('.add').on('click', function() {
            $(this).css({
                'background-color': "#58bc58"
            }).siblings('span').css({
                'background-color': "orange"
            });
            $('#div').addClass('opt');
            $('#box2').addClass('enter').css({
                'display': 'block'
            });
            var i = $('tr').length;
            var tr = `<tr class="addtr">
                    <td><input type="checkbox" class="cbox"/></td> 
                    <td>${i}</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td><button class="reback">退货</button></td>
                </tr>`;
            $('tbody').append(tr);
            var txt = $('<input/>').attr('type', 'text');
            var currentTr = $('.addtr');
            $('#save').click(function(e) {
                box2.style.display = 'none';
                $('#div').removeClass('opt');
                var gid = $('#gid').val();
                $('.addtr').attr({
                    'data-id': gid
                });
                var r_goods = $('#r_goods').val();
                currentTr.find('td').eq(2).html(r_goods);
                var barcode = $('#barcode').val();
                currentTr.find('td').eq(3).html(barcode);
                var rid = $('#rid').val();
                currentTr.find('td').eq(4).html(rid);
                var s_merchant = $('#s_merchant').val();
                currentTr.find('td').eq(5).html(s_merchant);
                var s_qty = $('#s_qty').val();
                currentTr.find('td').eq(6).html(s_qty);
                var real_qty = $('#real_qty').val();
                currentTr.find('td').eq(7).html(real_qty);
                var stock_price = $('#stock_price').val();
                currentTr.find('td').eq(8).html(stock_price);
                var t_date = $('#t_date').val();
                currentTr.find('td').eq(9).html(stock_price);
                var t_pay = $('#t_pay').val();
                currentTr.find('td').eq(10).html(t_pay);
                var newDate = {
                    gid: gid,
                    r_goods: r_goods,
                    barcode: barcode,
                    rid: rid,
                    s_merchant: s_merchant,
                    s_qty: s_qty,
                    real_qty: real_qty,
                    stock_price: stock_price,
                    t_date: t_date,
                    t_pay: t_pay
                };
                data = newDate;
                $.each(newDate, function(i, item) {
                    if (item == '') {
                        newDate = '';
                        $('.addtr').remove();
                    }
                })
                newDate = JSON.stringify(newDate);
                $.post(global.apiBaseUrl + 'purchase/take_goods', {
                    addproducts: newDate
                }, function(res) {})
            })
        });
        $('#close').click(function(e) {
            box2.style.display = 'none';
            $('#div').removeClass('opt');
            e.stopPropagation();
        });
    })
})