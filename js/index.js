
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
                    '        <a class="btn btn-secondary" data-category="'+this.name+'" href="/'+this.name+'" role="button">'+
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
});
