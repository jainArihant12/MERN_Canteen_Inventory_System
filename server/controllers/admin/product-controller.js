const { ImageUploadUtils } = require("../../helpers/cloudinary");
const product = require("../../models/product");

const handleImageUpload = async (req, res) => {
  try {
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "No file uploaded" });
    }

    const b64 = req.file.buffer.toString("base64");
    const dataURI = `data:${req.file.mimetype};base64,${b64}`;

    const result = await ImageUploadUtils(dataURI);
    console.log("Cloudinary upload result:", result);

    res.status(200).json({ success: true, result });
  } catch (error) {
    console.error("Image Upload Error:", error);
    res
      .status(500)
      .json({ success: false, message: error.message || "Error Occurred" });
  }
};

//add new product

const addProduct = async (req, res) => {
  try {
    const {
      image,
      title,
      description,
      category,
      food,
      price,
      salePrice,
      totalStock,
    } = req.body;

    const newProductCreated = new product({
      image,
      title,
      description,
      category,
      food,
      price,
      salePrice,
      totalStock,
    });

    await newProductCreated.save();
    res
      .status(200)
      .json({ success: true, message: "Product Added Successfully" });
  } catch (e) {
    console.error("Image Upload Error:", error);
    res
      .status(500)
      .json({ success: false, message: error.message || "Error Occurred" });
  }
};

// fetch product

const fetchProduct = async (req, res) => {
  try {
    const ListOfProduct = await product.find({});
    res.status(200).json({ success: true, data: ListOfProduct });
  } catch (e) {
    console.error("Error to Fetch Product:", error);
    res
      .status(500)
      .json({ success: false, message: error.message || "Error Occurred" });
  }
};

// edit product

const editProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      image,
      title,
      description,
      category,
      food,
      price,
      salePrice,
      totalStock,
    } = req.body;

    const findProduct = await product.findById(id);

    if (!findProduct) {
      return res
        .status(404)
        .json({ success: false, message: "Product Not Found" });
    }

    findProduct.title = title ?? findProduct.title;
    findProduct.description = description ?? findProduct.description;
    findProduct.category = category ?? findProduct.category;
    findProduct.food = food ?? findProduct.food;
    findProduct.price = price ?? findProduct.price;
    findProduct.salePrice = salePrice ?? findProduct.salePrice;
    findProduct.totalStock = totalStock ?? findProduct.totalStock;

    await findProduct.save();

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product: findProduct,
    });
  } catch (e) {
    console.error("Error in edit Product:", error);
    res
      .status(500)
      .json({ success: false, message: error.message || "Error Occurred" });
  }
};
// delete product

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedProduct = await product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res
        .status(404)
        .json({ success: false, message: "Product Not Found" });
    }

    res
      .status(200)
      .json({ success: true, message: "Product deleted successfully" });
  } catch (e) {
    console.error("Delete error:", e);
    res.status(500).json({ success: false, message: "Error Occurred" });
  }
};

module.exports = {
  handleImageUpload,
  addProduct,
  fetchProduct,
  editProduct,
  deleteProduct,
};
