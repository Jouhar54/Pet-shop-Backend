const { productValidation } = require("../../middleware/joiValidation");
const productSchema = require("../../models/productSchema");

// display all products and category query also handling here
const adminAllProducts = async (req, res) => {
  try {
    const { category } = req.query;
    const productsList = await productSchema.find({ category });
    res
      .status(200)
      .json({
        success: true,
        message: `All products fetched`,
        data: productsList,
      });
  } catch (error) {
    res.status(400).json({ success: false, message:`server error ${error.message}` });
  }
};

// Product with Id
const adminProductWithId = async (req, res) => {
  try {
    const productId = req.params.id;
    const productById = await productSchema.findById(productId);

    if (!productById) {
      return res.status(400).json({success:false, message: "product not available" });
    }

    res.status(200).json({success:true, message:`Product fetched with id ${productById}`});
  } catch (error) {
    res.status(400).json({success:false, message: `${error.message}` });
  }
};

// Add a product
const addProduct = async (req, res) => {
  try {
    const { title, category } = req.body;
    const validatedProduct = await productValidation.validateAsync(req.body);
    const existProducts = await productSchema.findOne({ title });

    if (existProducts) {
      return res
        .status(500)
        .json({ success: false, message: `Product already existed ${title}` });
    }

    if (title.trim().length === 0 || category.trim().length === 0) {
      return res.status(500).json({success: false, message: `Spaces only not accepted` });
    }

    const newProduct = new productSchema(validatedProduct);

    await newProduct.save();
    res
      .status(200)
      .json({ success: true, message: `Product added`, data: newProduct });
  } catch (error) {
    if (error.isJoi === true) {
      return res
        .status(400)
        .json({success: false, message: `Joi validation error ${error.message}` });
    }
    res.status(500).json({success: false, message: `Server error ${error.message}` });
  }
};

// Edit a product
const editProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const updateData = req.body;

    const editedProduct = await productSchema.findByIdAndUpdate(
      productId,
      updateData
    );

    if (!editedProduct) {
      return res.status(500).json({success: false, message: `Product not found` });
    }

    res.status(200).json({success: true, message:`product edited`, data:editedProduct});
  } catch (error) {
    res.status(500).json({success: false, message:error.message});
  }
};

// Delete a product
const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    const deletedProductList = await productSchema.findByIdAndDelete(productId);

    if (!deletedProductList) {
      return res.status(404).json({ success: false, message: `Product nor found` });
    }

    res.status(200).json({ success: true, message: `Product deleted` });
  } catch (error) {
    res.status(500).json({success: false, message: error.message});
  }
};

module.exports = {
  adminAllProducts,
  adminProductWithId,
  addProduct,
  editProduct,
  deleteProduct,
};