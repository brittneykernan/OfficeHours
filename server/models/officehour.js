var mongoose = require('mongoose'),
Schema = mongoose.Schema;

var OfficeHourSchema = new Schema({
  start: String,
  end: String,
  instructor: {
		name: String,
		img: String,
		email: String
  },
  location: {
    latLong: String,
    name: String,
    address: String
  },
  schedule: Array,
  trains: String
});

mongoose.model('OfficeHour', OfficeHourSchema);