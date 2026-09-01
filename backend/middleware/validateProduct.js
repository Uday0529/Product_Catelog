const validateProduct = (req, res, next) =>{
    const {
        name,
        description,
        price,
        category,
        stock
    } = req.body;

    if(!name || !name.trim()){
        return res.status(400).json({
            message: "Product name is required"
        });
    }

    if(!description || !description.trim()){
        return res.status(400).json({
            message: "Product description is required"
        });
    }

    if(price === undefined || price === null || price < 0){
        return res.status(400).json({
            message: "Price must ba a valid positive number"
        });
    }

    if(!category || !category.trim()){
        return res.status(400).json({
            message: "Category is required"
        });
    }

    if(stock === undefined || stock === null || stock < 0){
        return res.status(400).json({
            message: "Stock must be a valid positive number"
        });
    }

    next();
    
};

module.exports = validateProduct;