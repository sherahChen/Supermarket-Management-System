require(['config'],function(){
    require(['common','jquery'],function(){
        // 向后台请求数据写入页面
        $.post(global.apiBaseUrl + 'supplier',function(res){
             
            $('tbody').get(0).innerHTML = res.data.map(function(item){
                return `<tr>
                    <td class="edit">编辑</td>
                    <td class="v_code">${item.id}</td>
                    <td class="v_name">${item.name}</td>
                    <td class="linkname">${item.linkname}</td>
                    <td class="tel">${item.tel}</td>
                    <td class="address">${item.address}</td>
                    <td class="v_type">${item.type}</td>
                    <td class="payment">${item.payment}</td> 
                </tr>`
            }).join('');

            // asideTable_ys起初是隐藏的，点击新增时才出现
            $('.addItem_ys').on('click',function(){
                $('.asideTable_ys').show(500);
                // 删除按钮要去掉
                $('.del').hide();
                $('.cancel').click(function(){
                    $('.asideTable_ys').hide(500);
                })

                // 点保存新增项目
                $('.addSave').off().on('click',function(){
               
                    var v_code1 = $('input.v_code').val();
                    var v_name1 = $('input.v_name').val();
                    var linkname1 = $('input.linkname').val();
                    var tel1 = $('input.tel').val();
                    var address1 = $('textarea.address').val();
                    var v_type1 = $('.v_type').children(':selected').text();
                    var payment1 = $('.payment').children(':selected').text();
                    var $tr = $('<tr></tr>');
                    $tr.html(`
                           
                        <td class="edit">编辑</td>
                        <td class="v_code">${v_code1}</td>
                        <td class="v_name">${v_name1}</td>
                        <td class="linkname">${linkname1}</td>
                        <td class="tel">${tel1}</td>
                        <td class="address">${address1}</td>
                        <td class="v_type">${v_type1}</td>
                        <td class="payment">${payment1}</td> 
                        
                    `).appendTo('tbody');
                    $('.asideTable_ys').hide(500);

                    

                    // 发送数据给后台增加项目
                    var data = {
                        id:v_code1,
                        name:v_name1,
                        linkname:linkname1,
                        tel:tel1,
                        address:address1,
                        type:v_type1,
                        payment:payment1
                    }
                    $.post(global.apiBaseUrl + 'add',data,function(res){
                        
                    })
                    editEvent();
                })
            })

           editEvent();

        })
        var editEvent = function(){
            // 点击编辑出现
            $('.edit').click(function(){

                console.log(555)
                $('.del').show();

                $('.asideTable_ys').show(500);
                $('.cancel').click(function(){
                    $('.asideTable_ys').hide(500);

                })
                // 点删除按钮，删除当前tr并且删除数据库中的数据
                $('.del').off().click(function(){

                    $(this).parent().remove();
console.log($(this).next().text())
                    // 发送数据给后台删除该项
                    $.post(global.apiBaseUrl + 'del',{id:$(this).next().text()},function(res){
                        console.log(res);
                    })

                }.bind(this));

                // 编辑框中显示对应的信息
                var v_code = $(this).nextAll('.v_code').text();
                $('input.v_code').val(v_code);

                var v_name = $(this).nextAll('.v_name').text();
                $('input.v_name').val(v_name);

                var linkname = $(this).nextAll('.linkname').text();
                $('input.linkname').val(linkname);

                var tel = $(this).nextAll('.tel').text();
                $('input.tel').val(tel);

                var address = $(this).nextAll('.address').text();
                $('textarea.address').val(address);

                var v_type = $(this).nextAll('.v_type').text();
                var length1 = $('select.v_type').children().get().length;

                for(var i=0;i<length1;i++){
                
                    if($('select.v_type').children().get(i).text == v_type){

                        $('select.v_type').children().get(i).selected = true;
                    }                    
                }

                var payment = $(this).nextAll('.payment').text();
                var length2 = $('select.payment').children().get().length;

                for(var i=0;i<length2;i++){
                
                    if($('select.payment').children().get(i).text == payment){

                        $('select.payment').children().get(i).selected = true;
                    }                    
                }

                // 点击保存时。要将当前输入框中的内容重新赋值给当前tr
                $('.save').off().click(function(){
                    var v_code2 = $('input.v_code').val();
                    var v_name2 = $('input.v_name').val();
                    var linkname2 = $('input.linkname').val();
                    var tel2 = $('input.tel').val();
                    var address2 = $('textarea.address').val();
                    var v_type2 = $('.v_type').children(':selected').text();
                    var payment2 = $('.payment').children(':selected').text();
                    $(this).nextAll('.v_code').text(v_code2);
                    $(this).nextAll('.v_name').text(v_name2);
                    $(this).nextAll('.linkname').text(linkname2);
                    $(this).nextAll('.tel').text(tel2);
                    $(this).nextAll('.address').text(address2);
                    $(this).nextAll('.v_type').text(v_type2);
                    $(this).nextAll('.payment').text(payment2);
                    $('.asideTable_ys').hide(500);

                }.bind(this));
            })

        }

         editEvent();   

        
        
    });
});