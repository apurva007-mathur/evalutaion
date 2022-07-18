$('#document').ready(function()
{

    
    $.getJSON('/home/getcart',function(data)
    {
        var h=""
        var bill= 50
        
            data.map((item)=>{
                bill+=parseInt(item.total)
                h+="<tr><td><div class='row'>"
                h+="<div class='col s6'>"
                h+="<img src='/images/"+item.picture+"'width='200px;'>"
                h+="</div>"
                h+="<div class='col s6'><div class='row'>"
                h+="<b>"+item.productname+"</b>"
                h+="</div><div class='row'>"
                h+="<b> Rs."+item.total+"</b>"
                h+="</div><div class='row'>"
                h+="<div class='col s12'><fieldset style='font-size:14px;'>"
                h+="<b> Quantity: </b>"
                h+="<input type='number' name='qty' value='1'></fieldset>"
                h+="</div></div></div></div></td></tr>"
            })

            $('#tbody').html(h)
            $('#bill').html(bill)


    })


})