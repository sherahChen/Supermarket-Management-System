require(['config'], function() {
    require(['jquery', 'global'], function() {
        $.get(global.apiBaseUrl + 'purchase/stock_in', function(res) {
            showTr(res);
        })
        $('.search_btn').on('click', function() {
            $.post(global.apiBaseUrl + 'purchase/stock_in', {
                g_name: $('.search').val()
            }, function(res) {
                showTr(res);
            });
        })

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
                    <td>${item.gqty}</td>
                    <td>${item.s_qty}</td>
                    <td>${item.unit}</td>
                    <td>${item.stock_price}</td>
                    <td>${item.subtotal}</td>
                    <td>${item.stock_date}</td>
                </tr> `;
            }).join('');
            $('tbody').append(tr);
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
            var ox = evt.clientX-box2.offsetLeft;
            var oy = evt.clientY-box2.offsetTop;
            document.onmousemove = function(e) {
                box2.style.left = e.clientX - ox + 'px';
                box2.style.top = e.clientY - oy + 'px';
                e.preventDefault();
            }
        }
        header.onmouseup = function(e) {
            // e.preventDefault();
            document.onmousemove = null;
        }
        $('tbody').on('click', '.cbox', function() {
            if ($(this).is(':checked')) {
                var currentTr = $(this).parents('tr');
                var idx = $(this).parents('tr').attr('data-id');
                // 删除
                $('.control').on('click', '.del', function() {
                    $(this).css({'background-color':"#58bc58"}).siblings('span').css({'background-color':"orange"});

                    for (var i = 0; i < $('.cbox').length; i++) {
                        var tr = $('.cbox').eq(i).parents('tr').attr('data-id');
                        if (tr === idx) {
                            $('.cbox').eq(i).parents('tr').remove();
                            $.post(global.apiBaseUrl + 'purchase/stock_in', {
                                g_id: idx
                            }, function(res) {                                            
                            });
                        }
                    }
                }).on('click', '.edit', function() {
                     $(this).css({'background-color':"#58bc58"}).siblings('span').css({'background-color':"orange"});
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
                    $('#gqty').val(currentTr.find('td').eq(6).html());
                    $('#s_qty').val(currentTr.find('td').eq(7).html());
                    $('#unit').val(currentTr.find('td').eq(8).html());
                    $('#stock_price').val(currentTr.find('td').eq(9).html());
                    $('#subtotal').val(currentTr.find('td').eq(10).html());
                    $('#stock_date').val(currentTr.find('td').eq(11).html());
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
                var gqty = $('#gqty').val();
                currentTr.find('td').eq(6).html(gqty);
                var s_qty = $('#s_qty').val();
                currentTr.find('td').eq(7).html(s_qty);
                var unit = $('#unit').val();
                currentTr.find('td').eq(8).html(unit);
                var stock_price = $('#stock_price').val();
                currentTr.find('td').eq(9).html(stock_price);
                var subtotal = $('#subtotal').val();
                currentTr.find('td').eq(10).html(subtotal);
                var stock_date = $('#stock_date').val();
                currentTr.find('td').eq(11).html(stock_date);
                var newDate = {
                    gid: gid,
                    r_goods: r_goods,
                    barcode: barcode,
                    rid: rid,
                    s_merchant: s_merchant,
                    gqty: gqty,
                    s_qty: s_qty,
                    unit: unit,
                    stock_price: stock_price,
                    subtotal: subtotal,
                    stock_date: stock_date
                };
                newDate = JSON.stringify(newDate);
                $.post(global.apiBaseUrl + 'purchase/stock_in', {
                    products: newDate
                }, function(res) {
                    console.log(res)
                })
                e.stopPropagation();
            });
        });

        $('.add').on('click', function() {
            $(this).css({'background-color':"#58bc58"}).siblings('span').css({'background-color':"orange"});
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
                    <td></td>
                </tr>`;
            $('tbody').append(tr);
            var txt = $('<input/>').attr('type', 'text');
            var currentTr = $('.addtr');
            $('#save').click(function(e) {
                box2.style.display = 'none';
                $('#div').removeClass('opt');
                var gid = $('#gid').val();
                $('.addtr').attr({'data-id':gid});
                var r_goods = $('#r_goods').val();
                currentTr.find('td').eq(2).html(r_goods);
                var barcode = $('#barcode').val();
                currentTr.find('td').eq(3).html(barcode);
                var rid = $('#rid').val();
                currentTr.find('td').eq(4).html(rid);
                var s_merchant = $('#s_merchant').val();
                currentTr.find('td').eq(5).html(s_merchant);
                var gqty = $('#gqty').val();
                currentTr.find('td').eq(6).html(gqty);
                var s_qty = $('#s_qty').val();
                currentTr.find('td').eq(7).html(s_qty);
                var unit = $('#unit').val();
                currentTr.find('td').eq(8).html(unit);
                var stock_price = $('#stock_price').val();
                currentTr.find('td').eq(9).html(stock_price);
                var subtotal = $('#subtotal').val();
                currentTr.find('td').eq(10).html(subtotal);
                var stock_date = $('#stock_date').val();
                currentTr.find('td').eq(11).html(stock_date);
                var newDate = {
                    gid: gid,
                    r_goods: r_goods,
                    barcode: barcode,
                    rid: rid,
                    s_merchant: s_merchant,
                    gqty: gqty,
                    s_qty: s_qty,
                    unit: unit,
                    stock_price: stock_price,
                    subtotal: subtotal,
                    stock_date: stock_date
                };
                $.each(newDate,function(i,item){
                    if(item==''){
                        newDate='';
                        $('.addtr').remove();
                    }

                })
                newDate = JSON.stringify(newDate);
                $.post(global.apiBaseUrl + 'purchase/stock_in', {
                    addproducts: newDate
                }, function(res) {
                })
            })
        });
        
        $('#close').click(function(e) {
                box2.style.display = 'none';
                $('#div').removeClass('opt');  
                e.stopPropagation();
            });
    });
});