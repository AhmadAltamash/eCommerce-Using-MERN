const Category = require("../models/categoryModels")

const categoryControl = {
    getCategory: async(req,res) => {
        try {
            const categories = await Category.find()
            res.json(categories)

        } catch (error) {
            return res.status(500).json({msg: error.message})
        }
    },
    createCategory: async(req,res) => {
        try {
            const {name} = req.body;
            const category = Category.findOne({name})

            if(!category) return res.status(400).json({msg: 'Category Already exist'})

            const newCategory = new Category({name})
            await newCategory.save()
            res.json({msg: 'Created a Category'})
        } catch (error) {
            return res.status(500).json({msg: error.message})
        }
    },
    deleteCategory: async(req,res) => {
        try {
            await Category.findByIdAndDelete(req.params.id)
            res.json({msg: 'Category Deleted'})
        } catch (error) {
            return res.status(500).json({msg: error.message})
        }
    },
    updateCategory: async(req,res) => {
        try {
            const {name} = req.body;
            await Category.findByIdAndUpdate({_id:req.params.id},{name})

            res.json({msg: 'Updated Category'})
        } catch (error) {
            return res.status(500).json({msg: error.message})
        }
    }
}

module.exports = categoryControl