const Product = require("../models/Product");

//Create Product
const createProduct = async (req, res) => {
    try {
        const product = await Product.create(req.body);

        res.status(201).json(product);
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};

//Get All Products
const getAllProducts = async (req, res) => {
    try {
        const {
            search,
            category,
            page = 1,
            limit = 10
        } = req.query;

        const filter = {};

        //search by product name
        if (search) {
            filter.name = {
                $regex: search,
                $options: "i"
            };
        }

        //filter by category
        if (category) {
            filter.category = category;
        }

        const skip = (page - 1) * limit;

        const products = await Product.find(filter)
            .skip(skip)
            .limit(Number(limit));

        const totalProducts = await Product.countDocuments(filter);

        const totalPages = Math.ceil(
            totalProducts / limit
        );

        res.status(200).json({
            products,
            currentPage: Number(page),
            totalPages,
            totalProducts
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

//Get Single Product

const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                message: "Product Not Found"
            });
        }

        res.status(200).json(product);
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};


//Update Product

const updateProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!product) {
            return res.status(404).json({
                message: "Product Not Found"
            });
        }

        res.status(200).json(product);

    } catch (err) {
        res.status(400).json({
            message: err.message
        });
    }
};


//Delete Product
const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(
            req.params.id
        );

        if (!product) {
            return res.status(404).json({
                message: "Product Not Found"
            });
        }

        res.status(200).json({
            message: "Product deleted successfully"
        });
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};


//Get Product Stats
const getProductStats = async (req, res) => {
    try {
        const stats = await Product.aggregate([
            {
                $group: {
                    _id: "$category",
                    totalProducts: {
                        $sum: 1
                    },
                    averagePrice: {
                        $avg: "$price"
                    },
                    totalStock: {
                        $sum: "$stock"
                    }
                }
            },
            {
                $sort: {
                    totalProducts: -1
                }
            }
        ]);

        res.status(200).json(stats);

    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};

module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    getProductStats
};