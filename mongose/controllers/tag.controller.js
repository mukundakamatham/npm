const express = require("express");

const Tag = require("../models/tag.model");

const crudController = require("./crud.controller");

const router = express.Router();

router.post("", crudController.post(Tag)) 
router.get("", crudController.get(Tag))
router.get("/:id", crudController.getOne(Tag))
router.patch("/:id", crudController.updateOne(Tag))
router.delete("/:id", crudController.deleteOne(Tag));

module.exports = router;