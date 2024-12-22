const productService = require("../services/product");

// Yeni ürün oluşturma
exports.createProduct = async (req, res) => {
    try {
        const { name, description, price, stock, category, theme } = req.body;
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ message: "At least one image is required." });
        }


        const images = req.files.map(file => `/uploads/${file.filename}`);

        const product = await productService.createProduct({
            name,
            description,
            price,
            stock,
            category,
            theme,
            images,
        });

        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Tüm ürünleri listeleme
exports.getAllProducts = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 12,
      sort = "recommended",
      minPrice,
      maxPrice,
      categories,
      themes,
      search,
    } = req.query;

    // Query parametrelerini parse etme
    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);

    // Filtreler için bir nesne oluşturma
    const filter = {};

    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = parseFloat(minPrice);
      if (maxPrice) filter.price.$lte = parseFloat(maxPrice);
    }

    if (categories) {
      // categories parametresi virgülle ayrılmış olabilir
      const categoryArray = categories.split(",");
      filter.category = { $in: categoryArray };
    }

    if (themes) {
      const themeArray = themes.split(",");
      filter.theme = { $in: themeArray };
    }

    if (search) {
      filter.name = { $regex: search, $options: "i" };
    }

    // Sıralama için bir nesne oluşturma
    let sortOption = {};
    if (sort === "price_asc") {
      sortOption.price = 1;
    } else if (sort === "price_desc") {
      sortOption.price = -1;
    } else {
      // Varsayılan olarak oluşturulma tarihine göre sıralama
      sortOption.createdAt = -1;
    }

    const { products, total } = await productService.getAllProducts({
      filter,
      sort: sortOption,
      page: pageNumber,
      limit: limitNumber,
    });

    res.status(200).json({
      products,
      total,
      page: pageNumber,
      pages: Math.ceil(total / limitNumber),
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Belirli bir ürünü ID'ye göre getir
exports.getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await productService.getProductById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Ürünü güncelle
exports.updateProduct = async (req, res) => {
  try {
    const { name, description, price, stock, category, theme } = req.body;

    // Prepare the data to be updated
    const updateData = { name, description, price, stock, category, theme };

    // Update the product without modifying images
    const updatedProduct = await productService.updateProduct(req.params.id, updateData);
    if (!updatedProduct) return res.status(404).json({ message: 'Product not found' });

    res.json(updatedProduct);
  } catch (error) {
    console.error(error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: error.message });
  }
};
// Ürünü sil
exports.deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedProduct = await productService.deleteProduct(id);
    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
