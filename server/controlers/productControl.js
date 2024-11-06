const Products = require("../models/productModels")

//Filter, Sorting or Pagination

class APIfeature{
    constructor(query,queryString){
        this.query = query;
        this.queryString = queryString;
    }
    filtering(){
        const queryObj = {...this.queryString}
        const excludedField = ['page', 'sort', 'limit']
        excludedField.forEach(el => delete(queryObj[el]))

        let queryStr = JSON.stringify(queryObj)
        queryStr = queryStr.replace(/\b(gte|gt|lt|lte|regex)\b/g, match => '$' + match)


        this.query.find(JSON.parse(queryStr))
        return this
    }
    
    
    sorting(){
        if(this.queryString.sort){
            const sortBy = this.queryString.sort.split(',').join('')

            this.query = this.query.sort(sortBy)

            console.log(sortBy)
        }else{
            this.query = this.query.sort('-createdAt')
        }
        return this
    }
    pagination(){

        const page = this.queryString.page * 1 || 1;

        const limit = this.queryString.limit * 1 || 9;

        const skip = (page-1) * limit;

        this.query = this.query.skip(skip).limit(limit)

        return this
    }
}


const productControl ={
    getProduct: async(req,res)=>{
        try {
            console.log(req.query)
            const feature = new APIfeature(Products.find(), req.query)
            const products = await feature.query
            res.json({products})
        } catch (error) {
            return res.status(500).json({msg: error.message})
        }
    },
    createProduct: async(req,res)=>{
        try {
            const {product_id,title,price, description, contents, images, category} = req.body;

            if(!images) res.status(400).json({msg: 'Image Not Found'});

            const product = await Products.findOne({product_id})
            if(product) return res.status(400).json({msg: 'Product Already Exist'})

            const newProduct = new Products({
                product_id, title: title.toLowerCase(),price , description, contents, images, category
            })
            
            await newProduct.save()

            res.json({msg:'created a product'})
        } catch (error) {
            return res.status(500).json({msg: error.message})
        }
    },
    deleteProduct: async(req,res)=>{
        try {
            await Products.findByIdAndDelete(req.params.id)
            res.json({msg: 'Product Deleted'})
        } catch (error) {
            return res.status(500).json({msg: error.message})
        }
    },
    updateProduct: async(req,res)=>{
        try {
            const {title,price, description, contents, images, category} = req.body;

            if(!images) return res.status(400).json({msg:'No Image Upload'})

            await Products.findByIdAndUpdate({_id:req.params.id},{
                title:title.toLowerCase(),
                price,
                description,
                contents,
                images,
                category
            })

            res.json({msg: 'Product Updated'})
        } catch (error) {
            return res.status(500).json({msg: error.message})
        }
    }
}

module.exports = productControl