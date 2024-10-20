const router = require("express").Router();
const { Product, Category, Tag, ProductTag } = require("../../models");

// The `/api/products` endpoint

// get all products
router.get("/", async (req, res) => {
  // find all products
  // be sure to include its associated Category and Tag data
  try {
    const products = await Product.findAll({
      include: [
        {
          model: Category,
          attributes: ["id", "category_name"],
        },
        {
          model: Tag,
          through: ProductTag,
          attributes: ["id", "tag_name"],
        },
      ],
    });
    res.status(200).json(products);
  } catch (err) {
    console.log("Product find all failed: ", err);
    res.status(500).json(err);
  }
});

// get one product
router.get("/:id", async (req, res) => {
  try {
    const products = await Product.findOne({
      where: {
        id: req.params.id,
      },
      include: [
        {
          model: Category,
          attributes: ["id", "category_name"], //
        },
        {
          model: Tag,
          through: ProductTag,
          attributes: ["id", "tag_name"], //
        },
      ],
    });
    res.status(200).json(products);
  } catch (err) {
    console.log("Category find failed: ", err);
    res.status(500).json(err);
  }
});

// create new product
router.post("/", async (req, res) => {
  try {
    const newProduct = await Product.create(req.body);
    res.status(200).json(newProduct);
  } catch (err) {
    console.log("Product creation failed: ", err);
    res.status(500).json(err);
  }
});

// update product
router.put("/:id", async (req, res) => {
  try {
    const updatedProduct = await Product.findByPk(req.params.id);
    await updatedProduct.update(req.body);
    res.status(200).json(updatedProduct);
  } catch (err) {
    console.log("Product update failed: ", err);
    res.status(500).json(err);
  }
});
// delete one product by its `id` value
router.delete("/:id", async (req, res) => {
  try {
    const deletedProduct = await Product.findByPk(req.params.id);
    await deletedProduct.destroy();
    res.status(200).json(deletedProduct);
  } catch (err) {
    console.log("Product deletion failed: ", err);
    res.status(500).json(err);
  }
});

module.exports = router;
