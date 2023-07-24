module.exports = (mongoose) => {
  var schema = mongoose.Schema(
    {
      vehicleId: { type: String, required: true },
      date: { type: Date, required: true },
      odometer: { type: Number, required: true },
      operator: { type: String, required: true },
      questions: { type: Array },
      notes: { type: String },
      status: { type: Boolean },
    },
    { timestamps: true, version: false }
  );

  schema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Inspection = mongoose.model('inspection', schema);
  return Inspection;
};
