
jQuery(function(){

    $.get('server/categories.json')
        .done(function(data){

            $.each(data,function(){

                var category =

                    '<div class="col-lg-4 category">'+
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
            })

        })
        .fail(function(){
            console.log('Error');
        })
    ;


    $(document).on('click','a.category-link',function(e){
        e.preventDefault();

        var category = $(this).attr('data-category');

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
                        '    <div class="row product">'+
                        '        <div class="col-12 col-sm-12 col-md-2 text-center">'+
                        '            <img class="img-responsive" src="/imgs/'+this.image+'" alt="prewiew" width="120" height="80">'+
                        '        </div>'+
                        '        <div class="col-12 text-sm-center col-sm-12 text-md-left col-md-6">'+
                        '            <h4 class="product-name">'+
                        '                <strong>'+this.title+'</strong></h4>'+
                        '            <h4>'+
                        '                <small>'+this.description+'</small>'+
                        '            </h4>'+
                        '        </div>'+
                        '        <div class="col-12 col-sm-12 text-sm-center col-md-4 text-md-right row">'+
                        '            <div class="col-3 col-sm-3 col-md-6 text-md-right" style="padding-top: 5px">'+
                        '                <h6><strong>'+this.price+' <span class="text-muted">x</span></strong></h6>'+
                        '            </div>'+
                        '            <div class="col-4 col-sm-4 col-md-4">'+
                        '                <div class="quantity">'+
                        '                    <input type="button" value="+" class="plus">'+
                        '                    <input type="number" step="1" max="99" min="1" value="1" title="Qty" class="qty" size="4">'+
                        '                    <input type="button" value="-" class="minus">'+
                        '                </div>'+
                        '            </div>'+
                        '            <div class="col-2 col-sm-2 col-md-2 text-right">'+
                        '                <button type="button" class="btn btn-outline-danger btn-xs">'+
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


    $(document).on('click','.add_category>a',function(e){
        e.preventDefault();
        alert('add new category');
    });

    $(document).on('click','.add_product>a',function(e){
        e.preventDefault();
        alert('add new product');
    });

});
