import Product from "../models/Product.js";
import ProductStat from '../models/ProductStat.js'

export const getProducts = async(req, res) => {
    try {
        const Products = await Product.find()
        const ProductWithStat = await Promise.all(
            Products.map(async(product) => {
                const stat = await ProductStat.find({
                    productId: product._id
                })
                return {
                    ...product._doc,
                    stat
                }
            })

        )
        res.status(200).json(ProductWithStat)
    } catch (error) {
        res.status(404).json({message:error.message})
    }
}