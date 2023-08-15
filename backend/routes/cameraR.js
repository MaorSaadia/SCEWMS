const express = require('express');
const { CameraModel } = require('../models/CameraModel');
const router = express.Router();
const borrowController = require('../controllers/borrowConroller');

router.get('/', async (req, res) => {
  try {
    const data = await CameraModel.find({});
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

router.post('/', async (req, res) => {
  const camera = new CameraModel({
    id: req.body.id,
    name: req.body.name,
    available: req.body.available,
    studentID: req.body.studentID,
  });

  camera
    .save()
    .then(() => {
      res.send('Camera created successfully');
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error creating camera');
    });
});

router.delete('/:id', async (req, res) => {
  try {
    const camera = await CameraModel.findOneAndDelete({ id: req.params.id });
    if (!camera) {
      return res.status(404).send('Camera not found');
    }
    res.send('Camera deleted successfully');
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

router.put('/updateStatus/:params', borrowController.updateStatus);

module.exports = router;
