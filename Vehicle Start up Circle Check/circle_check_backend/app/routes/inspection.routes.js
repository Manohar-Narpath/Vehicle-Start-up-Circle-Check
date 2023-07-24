module.exports = (app) => {
  const inspections = require('../controllers/inspection.controller.js');

  var router = require('express').Router();

  // Create a new Inspection
  router.post('/', inspections.create);

  // Retrieve all Inspections
  router.get('/', inspections.findAll);

  // Retrieve all published Inspections
  router.get('/published', inspections.findAllPublished);

  // Retrieve a single Inspection with id
  router.get('/:id', inspections.findOne);

  // Update a Inspection with id
  router.put('/:id', inspections.update);

  // Delete a Inspection with id
  router.delete('/:id', inspections.delete);

  // Create a new Inspection
  router.delete('/', inspections.deleteAll);

  app.use('/api/inspections', router);
};
