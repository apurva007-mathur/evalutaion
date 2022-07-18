$('#document').ready(function()
{

    
    $.getJSON('/home/getcart',function(data)
    {
        $('#cartcount').html(data.length)
    })
    


    $('.cartbtn').click(function()
    {
        $.getJSON('/home/cart',{productid:$(this).attr('productid'),productname:$(this).attr('productname'),productmodel:$(this).attr('productmodel'),total:$(this).attr('total'),picture:$(this).attr('picture')},function(data)
        {
            location.reload(true)
        })
    })





})