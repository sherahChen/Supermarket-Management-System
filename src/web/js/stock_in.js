require(['config'], function() {
    require(['jquery'], function() {
        $('.search_btn').click(function(){
            console.log(666)
            $.get(global.apiBaseUrl+'purchase/stock_in',{g_name:$('.search').val()},function(res){
                console.log(res)
                var tr='';
                res.data.map(function(item){
                     tr+=` <tr>
                    <td><input type="checkbox" /></td> 
                    <td>${item.id}</td>
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
                </tr> ` ;
                }).join('');
                $('tbody').append(tr);
           })
        })
        
    });
});