$(document).ready(function(){

    $.getJSON('/category/getcategory',function(data){
        data.map((item)=>{
            $('#category').append($('<option>').text(item.category).val(item.categoryid))
    
        }) 
    })

    $('#category').change(function()
    {
        $('#subcategory').empty()
        $('#subcategory').append($('<option>').text('Choose your option'))


    $.getJSON('/category/getsubcategory',{categoryid:$('#category').val()},function(data){
        
        

        data.map((item)=>{
            $('#subcategory').append($('<option>').text(item.subcategory).val(item.subcategoryid))
    
        }) 
    })
})


})


 