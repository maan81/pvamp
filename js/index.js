function update_categories(){

    $.get('server/categories.json')
        .done(function(data){

            $('.categories').children('.category').remove();

            $('#new_product_category').children('option').remove();

            $.each(data,function(){

                var category =

                    '<div class="col-lg-4 category" data-category-name="'+this.name+'">'+
                    '    <img class="bd-blaceholder-img rounded-circle" width="140" height="140" src="/imgs/no_img.png">'+
                    '    <rect width="100%" height="100%" fill="#777"/>'+
                    '    <h2>'+this.title+'</h2>'+
                    '    <p>'+this.description+'</p>'+
                    '    <p>'+
                    '        <a class="btn btn-secondary category-link" data-category="'+this.name+'" href="/'+this.name+'" role="button">'+
                    '            View'+
                    '        </a>'+
                    '    </p>'+
                    '</div>'+
                    '<!-- /.col-lg-4 -->'
                ;

                $('.categories').append(category);


                var product_category = $('<option>').attr('value',this.name).text(this.title);

                $('#new_product_category').append(product_category[0]);
            })

        })
        .fail(function(){
            console.log('Error');
        })
        .always(function(){
            $('#new_product_category').prepend(
                '<option selected> -- Select One -- </option>'
            );
        })
    ;
}

function update_checkout(){
    if(!$('#checkout_amount').val()) {
        $('#checkout_btn')
            .addClass('disabled')
            .css('cursor','not-allowed')
        ;
    }else{
        if($('#checkout_amount').val()>0){
            $('#checkout_btn')
                .removeClass('disabled')
                .css('cursor','')
            ;
        }else{
            $('#checkout_btn')
                .addClass('disabled')
                .css('cursor','not-allowed')
            ;
        }
    }
}

jQuery(function(){

    update_categories();
    update_checkout();

    $(document).on('click','a.category-link',function(e){
        e.preventDefault();

        var category = $(this).attr('data-category');

        $('#total_price').text('0.00');

        $.get('server/products.json',{category:category})
            .done(function(data){

                $('.product_wrapper').remove();

                $.each(data,function(){

                    if(this.category!==category){
                        return true;
                    }

                    var product =
                        '<!-- PRODUCT -->'+
                        '<div class="product_wrapper">'+
                        '    <div class="row product" data-product-name="'+this.name+'">'+
                        '        <div class="col-12 col-sm-12 col-md-2 text-center">'+
                        '            <img class="img-responsive" src="/imgs/'+this.image+'" alt="prewiew" width="120" height="80">'+
                        '        </div>'+
                        '        <div class="col-12 text-sm-center col-sm-12 text-md-left col-md-6">'+
                        '            <h4 class="product-title">'+
                        '                <strong>'+this.title+'</strong></h4>'+
                        '            <h4>'+
                        '                <small>'+this.description+'</small>'+
                        '            </h4>'+
                        '        </div>'+
                        '        <div class="col-12 col-sm-12 text-sm-center col-md-4 text-md-right row">'+
                        '            <div class="col-3 col-sm-3 col-md-6 text-md-right" style="padding-top: 5px">'+
                        '                <h6><strong class="product_price">'+this.price+' <span class="text-muted">x</span></strong></h6>'+
                        '            </div>'+
                        '            <div class="col-4 col-sm-4 col-md-4">'+
                        '                <div class="quantity">'+
                        '                    <input type="button" value="+" class="plus">'+
                        '                    <input type="number" step="1" max="99" min="0" value="0" title="Qty" class="qty" size="4">'+
                        '                    <input type="button" value="-" class="minus">'+
                        '                </div>'+
                        '            </div>'+
                        '            <div class="col-2 col-sm-2 col-md-2 text-right">'+
                        '                <button type="button" class="delete_product btn btn-outline-danger btn-xs">'+
                        '                    <i class="fa fa-trash" aria-hidden="true"></i>'+
                        '                </button>'+
                        '            </div>'+
                        '        </div>'+
                        '    </div>'+
                        '    <hr>'+
                        '</div>'+
                        '<!-- END PRODUCT -->'+
                        ''
                    ;

                    $(product).insertBefore($('.add_category'));
                })

            })
            .fail(function(){
                console.log('Error')
            })
        ;

    });

    $(document).on('change','.qty',function(){

        var total = 0;

        $('.qty').each(function(index){

            total += $(this).val() * parseFloat($('.product_price').eq(index).text());
        });

        $('#total_price').text(total);

        $('#checkout_amount').val(total);

        update_checkout();

    });


    $(document).on('click','#new_category_submit',function(e){
        e.preventDefault();

        var data = {

            "name": $('#new_category_name').val(),
            "title": $('#new_category_title').val(),
            "description": $('#new_category_description').val(),
            "image": "120x80.png",

        };


        $.post('/server/new_category.php', data, function(res){

            $('#new_category').modal('hide');

            update_categories();

        });
    });

    $(document).on('click','#new_product_submit',function(e){
        e.preventDefault();

        var data = {

            "name": $('#new_product_name').val(),
            "category": $('#new_product_category').val(),
            "title": $('#new_product_title').val(),
            "description": $('#new_product_description').val(),
            "image": "120x80.png",
            "price": $('#new_product_price').val()

        };


        $.post('/server/new_product.php', data, function(res){

            $('#new_product').modal('hide');

            console.log(res);

            $('a.category-link').trigger('click');
        });

    });

    $(document).on('click','.delete_product',function(e){
        e.preventDefault();

        var cur_product = $(this).closest('.product_wrapper');

        var data = {
            "name": cur_product.children('.product').eq(0).attr('data-product-name')
        };

        $.post('/server/delete_product.php', data, function(res){

            cur_product.remove();

        });

    });

    $(document).on('click','#checkout_btn',function(e){

        if($(this).hasClass('disabled') ) {
            return false;
        }
    })

});
