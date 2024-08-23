const productSchema = require('../../models/productSchema');

// display all products 
const allProducts = async (req, res) => {
    try {
        const productsList = await productSchema.find();
        res.status(200).json(productsList);
    } catch (error) {
        res.status(400).json(error.message);
    }
}

// Product with Id 
const productWithId = async (req, res) => {
    try {
        const productId = req.params.id;
        const productById = await productSchema.findById(productId);

        if (!productById) {
            return res.status(400).json({ message: "product not available" });
        }

        return res.status(200).json(productById);
    } catch (error) {
        return res.status(400).json({ message: `${error.message}` });
    }
}

// Product with category 
const productWithCategory = async (req, res) => {
    try {
        const categoryId = req.params.id;
        const productsWithCategory = await productSchema.find({ category: categoryId });

        if (!productsWithCategory) {
            return res.status(400).json({ message: "Category not exist" })
        }
        return res.status(200).json(productsWithCategory);
    } catch (error) {
        return res.status(400).json({ message: `Server issue ${error.message}` });
    }
}

module.exports = {allProducts, productWithId, productWithCategory}