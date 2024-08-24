const { productValidation } = require("../../middleware/joiValidation");
const productSchema = require("../../models/productSchema");

// display all products and category query also handling here
const adminAllProducts = async (req, res) => {
    try {
        const { category } = req.query;
        const query = {}
        if (category) {
            query.category = category
        }
        const productsList = await productSchema.find(query);
        res.status(200).json(productsList);
    } catch (error) {
        res.status(400).json(error.message);
    }
}

// Product with Id 
const adminProductWithId = async (req, res) => {
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

// Add a product 
const addProduct = async (req, res) => {
    try {
        const { title, price, category } = req.body;
        const validatedProduct = await productValidation.validateAsync(req.body);
        const existProducts = await productSchema.findOne({title});

        if(existProducts){
            return res.status(500).json({message:`Product already existed ${title}`})
        }

        if(title.trim().length === 0 || category.trim().length === 0 ){
            return res.status(500).json({message:`Spaces only not accepted`});
        }
        
        const newProduct = new productSchema(validatedProduct);

        await newProduct.save();
        res.status(200).json({ message: `Product added`  });
    } catch (error) {
        if(error.isJoi === true){
            return res.status(400).json({message:`Joi validation error ${error.message}`})
        }
        res.status(500).json({message:`Server error ${error.message}`});
    }
}

// Edit a product 
const editProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const updateData = req.body;

        const editedProduct = await productSchema.findByIdAndUpdate(productId, updateData);

        if (!editedProduct) {
            return res.status(500).json({ message: `Product not found` });
        }

        res.status(200).json(editedProduct);
    } catch (error) {
        res.status(500).json(error.message);
    }
}

// Delete a product 
const deleteProduct = async (req, res) => {
    try {
        const productId = req.params.id;

        const deletedProductList = await productSchema.findByIdAndDelete(productId);

        if (!deletedProductList) {
            return res.status(404).json({ message: `Product nor found` });
        }

        res.status(200).json({ message: `Product deleted` });
    } catch (error) {
        res.status(500).json(error.message);
    }
}

module.exports = { adminAllProducts, adminProductWithId, addProduct, editProduct, deleteProduct }