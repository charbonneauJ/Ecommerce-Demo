const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

router.get("/", async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tags = await Tag.findAll({
      include: [
        {
          model: Product,
          through: ProductTag,
          attributes: ["id", "product_name"],
        },
      ],
    });
    res.status(200).json(tags);
  } catch (err) {
    console.log("Tag search failed: ", err);
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tag = await Tag.findOne({
      where: {
        id: req.params.id,
      },
      include: [
        {
          model: Product,
          through: ProductTag,
          attributes: ["id", "product_name"],
        },
      ],
    });
    res.status(200).json(tag);
  } catch (err) {
    console.log("Category find failed: ", err);
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  console.log(req.body);

  try {
    const newTag = await Tag.create(req.body);
    res.status(200).json(newTag);
  } catch (err) {
    console.log("Tag creation failed: ", err);
    res.status(500).json(err);
  }
});

router.put("/:id", async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const updatedTag = await Tag.findByPk(req.params.id);
    await updatedTag.update(req.body);
    res.status(200).json(updatedTag);
  } catch (err) {
    console.log("Tag update failed: ", err);
    res.status(500).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  // delete on tag by its `id` value
  try {
    const deletedTag = await Tag.findByPk(req.params.id);
    await deletedTag.destroy();
    res.status(200).json(deletedTag);
  } catch (err) {
    console.log("Tag deletion failed: ", err);
    res.status(500).json(err);
  }
});

module.exports = router;
