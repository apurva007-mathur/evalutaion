var express = require('express')
var router = express.Router()
var pool = require("./pool")
var upload=require("./multer")

// Category interface
router.get("/categoryinterface", function (req, res) {
    res.render("categoryinterface", { message: '' })
})


// Category insertion 
router.post("/categorysubmit", function (req, res) {
    pool.query("insert into category (category)values(? )", [req.body.category], function (error, result) {
        if (error) {
            console.log(error, "******************")
            res.render("categoryinterface", { "message": "server error" })
        }
        else {
            console.log(result)
            res.render("categoryinterface", { "message": "Record submitted successfully" })
        }
    })
})



// Category display
router.get('/displaycategory', function (req, res) {
    pool.query("select * from category", function (error, result) {
        if (error) {
            res.render("displayallcategory", { result: [], msg: 'Server Error' })
        }
        else {
            if (result.length == 0) {
                res.render("displayallcategory", { result: [], msg: 'No record Founds' })
            }
            else {
                res.render("displayallcategory", { result: result, msg: '' })
            }
        }

    })

})


// Category display by Id
router.get("/displaycategorybyid", function (req, res) {
    pool.query("SELECT * from category where categoryid=?;", [req.query.categoryid], function (error, result) {
        if (error) {
            res.render("displaycategorybyID", { result: [] })
        }
        else {
            res.render("displaycategorybyID", { result: result })
        }
    })

})
// update and delete category
router.post("/updatecategory", function (req, res) {

    if(req.body.btn=='update')
    {
    console.log("request body in update category", req.body);
    pool.query("update category set category=? where categoryid=?", [req.body.category, req.body.categoryid], function (error, result) {
        if (error) {
            console.log(error, "******************")
            res.redirect("/category/displaycategory")
        }
        else {
            console.log(result)
            res.redirect("/category/displaycategory")
        }
    })
}

else
{

    pool.query("delete from category where categoryid=?", [req.body.categoryid], function (error, result) {
        if (error) {
            console.log(error, "******************")
            res.redirect("/category/displaycategory")
        }
        else {
            console.log(result)
            res.redirect("/category/displaycategory")
        }
    })
}
})
// **********************************************Sub category***************************************************

// Subcategory interface
router.get("/subcategoryinterface", function (req, res) {
    res.render("subcategoryinterface", { message: '' })
})


// Json for subcategory
router.get("/getcategory",function(req,res){
    pool.query("SELECT * FROM category  ",function(error,result){
        
        if(error)

        {
            res.status(500).json(["error"])
        }
        else
        {
            res.status(200).json(result)
        }
    })
    })
// Subcatgeory insert
    router.post("/subcategorysubmit", function (req, res) {
        pool.query("insert into subcategory (subcategory,categoryid)values(?,? )", [req.body.subcategory,req.body.category], function (error, result) {
            if (error) {
                console.log(error, "******************")
                res.render("subcategoryinterface", { result: [], message: 'Server Error' })
            }
            else {
                console.log(result)
                res.render("subcategoryinterface", { result:result, message: "Record submitted successfully" })
            }
        })
    })
// Display subcategory 
    router.get('/displaysubcategory', function (req, res) {
        pool.query("select s.*, (select c.category from category c where s.categoryid=c.categoryid) as categoryname from subcategory s;", function (error, result) {
            if (error) {
                res.render("displayallsubcategory", { result: [], msg: 'Server Error' })
            }
            else {
                if (result.length == 0) {
                    res.render("displayallsubcategory", { result: [], msg: 'No record Founds' })
                }
                else {
                    res.render("displayallsubcategory", { result: result, msg: '' })
                }
            }
    
        })
    
    })
// SubCategory display by Id
router.get("/displaysubcategorybyid", function (req, res) {
    pool.query("select s.*, (select c.category from category c where s.categoryid=c.categoryid) as categoryname from subcategory s where s.subcategoryid=?;", [req.query.subcategoryid], function (error, result) {
        if (error) {
            res.render("displaysubcategorybyID", { result: [],message:"Server Error" })
        }
        else {
            res.render("displaysubcategorybyID", { result: result,message:"" })
        }
    })

})
 

// update and delete subcategory
router.post("/updatesubcategory", function (req, res) {
    console.log("Body---",req.body)
    if(req.body.btn=='update')
    {
       var qry = 'update subcategory set subcategory=?, categoryid=? where subcategoryid=?' 
       pool.query(qry, [req.body.subcategory,req.body.categoryid, req.body.subcategoryid], function (error, result) {
       
        console.log("==========>",qry)
        if (error) {
            console.log(error, "******************")
            res.redirect("/category/displaysubcategory")
        }
        else {
            console.log(result)
            res.redirect("/category/displaysubcategory")
        }
    })
}

else
{

    pool.query("delete from subcategory where subcategoryid=?", [req.body.subcategoryid], function (error, result) {
        if (error) {
            console.log(error, "******************")
            res.redirect("/category/displaysubcategory")
        }
        else {
            console.log(result)
            res.redirect("/category/displaysubcategory")
        }
    })
}
})
// *********************Product Crud*************************

// product interface
router.get("/productinterface", function (req, res) {
    res.render("productinterface", { message: '' })
})

// Product insertion 
router.post("/productsubmit",upload.single('picture'),function(req,res){
    
    pool.query("insert into products (productname,productmodel,categoryid,subcategoryid,price,stock,picture,discount)values(?,?,?,?,?,?,?,?)",[req.body.Productname,req.body.productmodel,req.body.categoryid,req.body.subcategoryid,req.body.price,req.body.stock,req.filename,req.body.discount],function(error,result){
    
        if(error)
    {
        console.log(error,"******************")
        res.render("productinterface",{"message":"server error"})
    }
    else
    {console.log(result)
        res.render("productinterface",{"message":"Record submitted successfully"})
    }
})
})


// Json for subcategory
router.get("/getsubcategory",function(req,res){

    pool.query("select * from subcategory where categoryid=?",[req.query.categoryid],function(error,result){
        
        if(error)
        {
            res.status(500).json(["error"])
        }
        else
        {
            res.status(200).json(result)
        }
    })
    })

    
// Display product 
router.get('/displayproduct', function (req, res) {
    pool.query("select p.*, (select c.category from category c where p.categoryid=c.categoryid) as categoryname,(select su.subcategory from subcategory su where p.subcategoryid=su.subcategoryid) as subcategoryname from products p ;", function (error, result) {
        if (error) {
            res.render("displayproduct", { result: [], msg: 'Server Error' })
        }
        else {
            if (result.length == 0) {
                res.render("displayproduct", { result: [], msg: 'No record Founds' })
            }
            else {
                res.render("displayproduct", { result: result, msg: '' })
            }
        }

    })

})
// product by Id
router.get("/displayproductbyid", function (req, res) {
pool.query("select p.*, (select c.category from category c where p.categoryid=c.categoryid) as categoryname,(select su.subcategory from subcategory su where p.subcategoryid=su.subcategoryid) as subcategoryname from products p where p.productid=?;", [req.query.productid], function (error, result) {
    if (error) {
        res.render("displayproductbyID", { result: [],message:"Server Error" })
    }
    else {
        res.render("displayproductbyID", { result: result,message:"" })
    }
})

})




router.post("/updateproduct", function (req, res) {

    if(req.body.btn=='update')
    {
    console.log(req.body);
    pool.query("update products set productname=?, productmodel=?,categoryid=?,subcategoryid=?,price=?,stock? where productid=?", [req.body.Productname,req.body.productmodel,req.body.categoryid,req.body.subcategoryid,req.body.price,req.body.stock,req.body.productid], function (error, result) {
        if (error) {
            console.log(error, "******************")
            res.redirect("/category/displayproduct")
        }
        else {
            console.log(result)
            res.redirect("/category/displayproduct")
        }
    })
}

else
{

    pool.query("delete from products where productid=?", [req.body.productid], function (error, result) {
        if (error) {
            console.log(error, "******************")
            res.redirect("/category/displayproduct")
        }
        else {
            console.log(result)
            res.redirect("/category/displayproduct")
        }
    })
}
})



router.get("/editpicture",function(req,res){
  
    
        res.render("editpicture",req.query)
    
})

router.post("/uploadnewimage",upload.single('picture'),function(req,res){
    pool.query("update products set picture=? where productid=?",[req.filename,req.body.productid],function(error,result){
        if (error) {
            console.log(error, "******************")
            res.redirect("/category/displayproduct")
        }
        else {
            console.log(result)
            res.redirect("/category/displayproduct")
        }
})
})










module.exports = router;