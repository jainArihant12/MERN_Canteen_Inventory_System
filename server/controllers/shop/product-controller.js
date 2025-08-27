const product = require("../../models/product");

const fetchFilteredProduct = async (req, res) => {
  try {
    const { category = [], food = [], sortBy = 'price_low_high' } = req.query;
    let filters = {};
    if (category?.length) {
      filters.category = { $in: category.split(',') }
    }

    if (food?.length) {
      filters.food = { $in: food.split(',') }
    }
    const sort = {}

    switch (sortBy) {
      case 'price_low_high':
        sort.price = 1;
        break;
      case 'price_high_low':
        sort.price = -1;
        break;
      case 'name_asc':
        sort.title = 1;
        break;
      case 'name_desc':
        sort.title = -1;
        break;
      default:
        sort.price = 1;
        break;
    }


    const ListOfProduct = await product.find(filters).sort(sort);

    res.status(200).json({ success: true, data: ListOfProduct });

  } catch (error) {
    console.error("Error to Fetch Product:", error);
    res
      .status(500)
      .json({ success: false, message: error.message || "Error Occurred" });
  }
};

const getProductDetails = async (req, res) => {

  try {
    const { id } = req.params
    const selectProduct = await product.findById(id);
    if (!selectProduct) {
      res
        .status(404)
        .json({ success: false, message: `Product Not Found` });
    }

    res
      .status(200)
      .json({ success: true, data: selectProduct });
  }
  catch (error) {
    console.error("Error to Fetch Product:", error);
    res
      .status(500)
      .json({ success: false, message: error.message || "Error Occurred" });
  }
}

module.exports = { fetchFilteredProduct, getProductDetails }