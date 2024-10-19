const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", async (req, res) => {
  // find all categories
  try {
    const categories = await Category.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(categories);
  } catch (err) {
    console.log("Category creation failed: ", err);
    res.status(500).json(err);
  }
  // be sure to include its associated Products
});

router.get("/:id", async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categories = await Category.findOne({
      where: {
        id: req.params.id,
      },
      include: [{ model: Product }],
    });
    res.status(200).json(categories);
  } catch (err) {
    console.log("Category find failed: ", err);
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  // create a new category
  try {
    const newCategory = await Category.create(req.body);
    res.status(200).json(newCategory);
  } catch (err) {
    console.log("Category creation failed: ", err);
    res.status(500).json(err);
  }
});

router.put("/:id", async (req, res) => {
  // update a category by its `id` value
  try {
    const updatedCategory = await Category.findByPk(req.params.id);
    await updatedCategory.update(req.body);
    res.status(200).json(updatedCategory);
  } catch (err) {
    console.log("Category update failed: ", err);
    res.status(500).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  // delete a category by its `id` value
  try {
    const deletedCategory = await Category.findByPk(req.params.id);
    await deletedCategory.destroy();
    console.log("===============================");
    console.log(req.params.id);
    console.log("===============================");

    res.status(200).json(deletedCategory);
  } catch (err) {
    console.log("Category deletion failed: ", err);
    res.status(500).json(err);
  }
});

module.exports = router;
