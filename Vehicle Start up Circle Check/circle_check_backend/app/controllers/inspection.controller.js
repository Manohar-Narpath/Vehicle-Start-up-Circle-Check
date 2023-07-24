const db = require('../models');
const Inspection = db.inspections;

// Create and Save a new Inspection
exports.create = (req, res) => {
  // Validate request
  if (!req.body.vehicleId) {
    res.status(400).send({ message: 'id can not be empty!' });
    return;
  }

  // Create a Inspection
  const inspection = new Inspection({
    vehicleId: req.body.vehicleId,
    date: req.body.date,
    operator: req.body.operator,
    odometer: req.body.odometer,
    questions: req.body.questions,
    notes: req.body.notes,
  });

  // Save Inspection in the database
  inspection
    .save(inspection)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while creating the Inspection.',
      });
    });
};

// Retrieve all Inspections from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title
    ? { title: { $regex: new RegExp(title), $options: 'i' } }
    : {};

  Inspection.find(condition)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while retrieving inspections.',
      });
    });
};

// Find a single Inspection with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Inspection.findById(id)
    .then((data) => {
      if (!data)
        res.status(404).send({ message: 'Not found Inspection with id ' + id });
      else res.send(data);
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: 'Error retrieving Inspection with id=' + id });
    });
};

// Update a Inspection by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: 'Data to update can not be empty!',
    });
  }

  const id = req.params.id;

  Inspection.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Inspection with id=${id}. Maybe Inspection was not found!`,
        });
      } else res.send({ message: 'Inspection was updated successfully.' });
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error updating Inspection with id=' + id,
      });
    });
};

// Delete a Inspection with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Inspection.findByIdAndRemove(id, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Inspection with id=${id}. Maybe Inspection was not found!`,
        });
      } else {
        res.send({
          message: 'Inspection was deleted successfully!',
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Could not delete Inspection with id=' + id,
      });
    });
};

// Delete all Inspections from the database.
exports.deleteAll = (req, res) => {
  Inspection.deleteMany({})
    .then((data) => {
      res.send({
        message: `${data.deletedCount} Inspections were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while removing all inspections.',
      });
    });
};

// Find all published Inspections
exports.findAllPublished = (req, res) => {
  Inspection.find({ published: true })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while retrieving inspections.',
      });
    });
};
