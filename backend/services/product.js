const Product = require("../models/product");

// Yeni ürün oluştur
exports.createProduct = async (data) => {
  const product = new Product(data);
  return await product.save();
};

// Tüm ürünleri listele
exports.getAllProducts = async ({ filter, sort, page, limit }) => {
  const skip = (page - 1) * limit;

  const products = await Product.find(filter)
    .sort(sort)
    .skip(skip)
    .limit(limit);

  const total = await Product.countDocuments(filter);

  return { products, total };
};

// Belirli bir ürünü ID ile getir
exports.getProductById = async (id) => {
  return await Product.findById(id);
};

exports.updateProduct = async (id, data) => {
  return await Product.findByIdAndUpdate(
      id,
      { $set: data },
      { new: true, runValidators: true }
  );
};

// Ürünü sil
exports.deleteProduct = async (id) => {
  return await Product.findByIdAndDelete(id);
};
