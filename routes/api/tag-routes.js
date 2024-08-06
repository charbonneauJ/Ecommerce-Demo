const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  console.log({ req, res });

  const tags = await Tag.findAll({});
  console.log(tags);
  if (!tags) {
    res.status(400).send("No tags available.");
    return;
  }

  res.status(200).json(tags);
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  console.log(req.params);

  const tag = await Tag.findOne({
    where: {
      id: req.params.id,
    },
  })


if (!tag) {
  res.status(400).send(`No tag with ID ${req.params.id} found.`);
  return;
}

res.status(200).json(tag);
});


router.post('/', (req, res) => {
  // create a new tag
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
});

module.exports = router;
