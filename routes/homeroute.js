var express = require('express')
var router = express.Router()
var pool = require("./pool")
var upload=require("./multer")

router.get('/displayhome', function (req, res)
{
    pool.query("select * from products;", function (error, result)
    {
        if (error) 
        {
            res.render("home", { result: [], msg: 'Server Error' })
        }
            else 
            {
                res.render("home", { result: result, msg: '' })
            }
    })

})




router.get("/productdetail", function (req, res)
{
    pool.query("select * from products where productid=?", [req.query.productid],function (error, result)
    {
        if (error) 
        {
            res.render("productdetail", { result: [], msg: 'Server Error' })
        }
            else 
            {
                res.render("productdetail", { result: result, msg: '' })
            }
    })

})



router.get("/cart", function(req, res) {

    console.log(req.query)

pool.query('insert into cart (productid,productname,productmodel,total,picture) values (?,?,?,?,?)',[req.query.productid,req.query.productname,req.query.productmodel,req.query.total,req.query.picture],function(error,result)
{
    if(error)
    {
        console.log(error)
    }

    else
    {
        res.status(200).json("Success")    
    }
})

})



router.get('/getcart',function(req,res)
{

    pool.query('select * from cart',function(error,result)
    {
        if(error)
        {
            console.log(error)
            res.status(500).json([])
        }
        else{
            res.status(200).json(result)
        }
    })
})

router.get('/getcart',function(req,res)
{
    pool.query('select * from cart', function(error,result)
    {
        if(error)
        {
            console.log(error)
            res.status(500).json([])
        }
        else
        {
            res.status(200).json(result)
        }
    })
})


router.get('/showcart',function(req,res)
{
    res.render('cart')
})

module.exports = router;