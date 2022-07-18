// Fill category
$(document).ready(function(){

    $.getJSON('/category/getcategory',function(data){
        data.map((item)=>{
            console.log("------------",item)
            $('#category').append($('<option>').text(item.category).val(item.categoryid))
    
        }) 
    })
})