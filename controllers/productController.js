const productModel = require("../models/product");

const getAllStatic = async (req,res) => {
    const products = await productModel.find().sort();
    res.status(200).send({products,nbHits:products.length})
}

const getAll = async (req,res) => {
    const {featured,company,name,sort,fields,numericFilters} = req.query;
    const queryObj = {};
    
    if(featured){
        queryObj.featured = featured === "true" ? true : false;
    }

    if(company){
        queryObj.company= {$regex:company,$options:"i"};
    }

    if(name){
        queryObj.name = {$regex:name,$options:"i"};
    }

    if(numericFilters){
        const operatorMap = {
            ">":"$gt",
            ">=":"$gte",
            "=":"$eq",
            "<=":"$lte",
            "<":"$lt"
        };
        const pattern = /\b(>|>=|=|<=|<)\b/g;

        const filters = numericFilters.replace(pattern,match=>
            "-" + operatorMap[match] + "-"
        )

        const options = ["price","rating"];    
        filters.split(",").forEach(filter=>{
            const [field,operator,value] = filter.split("-");
            if(options.includes(field)){
                queryObj[field] = {[operator]:Number(value)};
            }
        }) 
    }

    let result = productModel.find(queryObj);

    if(sort){
        const sortList = sort.split(",").join(" ");
        result = result.sort(sortList);
    }else{
        result = result.sort("createdAt");
    }

    if(fields){
        const fieldlist = fields.split(",").join(" ");
        result = result.select(fieldlist);
    }

    const limit = Number(req.query.limit) || 10;
    const page = Number(req.query.page) || 1 ;
    const skip = (page-1)*limit;

    const products = await result.skip(skip).limit(limit);
    res.status(200).json({products,numHits:products.length})
}

module.exports = {
    getAll,
    getAllStatic
}