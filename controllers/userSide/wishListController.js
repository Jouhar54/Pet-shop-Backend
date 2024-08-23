const wishSchema = require('../models/wishSchema');

// Add to wish list 
const addToWish = async (req, res) => {
    try {
        const userId = req.params.id;
        const { productId } = req.body;
        let wishlist = await wishSchema.findOne({ userId });

        if (!wishlist) {
            wishlist = new wishSchema({
                userId,
                products: [
                    { productId }
                ]
            })
        } else {
            wishlist.products.push({ productId })
        }

        await wishlist.save();

        res.status(200).json(wishlist)
    } catch (error) {
        res.status(400).json({ message: `Failed ${error.message}` })
    }
}

// Display all wish 
const allWishList = async (req, res) => {
    try {
        const userId = req.params.id;
        const wishlist = await wishSchema.findOne({ userId }).populate('products.productId');

        if (!wishlist) {
            return res.status(400).json({ message: `You don't have any Wish list` })
        }
        res.status(200).json(wishlist.products);
    } catch (error) {
        res.status(400).json({ message: `Sever error` });
    }
}

// Delete from wish list 
const deleteWish = async (req, res) => {
    try {
        const userId = req.params.id;
        const {productId} = req.body;
        const updateWishlist = await wishSchema.findOneAndUpdate(
            { userId },
            {$pull:{products:{productId:productId}}},
            {new:true}
        );

        if(!updateWishlist){
            return res.status(400).json({message:`This product is not in your wish list`})
        }
        
        res.status(200).json(`Product removed`);
    } catch (error) {
        res.status(400).json({ message: `server error ${error.message}` });
    }
}

module.exports = {addToWish, allWishList, deleteWish}