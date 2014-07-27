var mongoose = require('mongoose'),
OfficeHour = mongoose.model('OfficeHour');

exports.findAll = function(req, res){
  OfficeHour.find({},function(err, results) {
    return res.send(results);
  });
};
exports.findById = function() {};

exports.getTodays = function(req, res) {
	res.send({
    id: '1',
    start:'Sat Jul 26 2014 20:00:00 GMT-0400 (EDT)',
    end:'Sat Jul 26 2014 23:00:00 GMT-0400 (EDT)',
    instructor: app.instructors.britt,
    location: {
      latLong: '',
      name: 'The Bean',
      address: '30 2nd Ave at 3rd St East Village 10003'
    },
    schedule: [
      {
        time: '8:30pm - 9:00pm'
      },
      {
        time: '9:00pm - 9:30pm',
        email:'b.kernan@bigspaceship.com'
      },
      {
        time: '9:30pm - 10:00pm'
      },
      {
        time: '10:00pm - 10:30pm'
      },
      {
        time: '10:30pm - 11:00pm'
      },
    ],
    trains:'f'
  });
};

exports.add = function() {};
exports.update = function(req, res) {
	res.send({
    status: 'success'
  });
};
exports.delete = function() {};