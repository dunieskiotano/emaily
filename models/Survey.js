const mongoose = require('mongoose');
const RecipientSchema = require('./Recipient');
// const Schema = mongoose.Schema;
const { Schema } = mongoose;

const surveySchema = new Schema({
  title: String,
  body: String,
  subject: String,
  // Here we have a list of recipients
  recipients: [RecipientSchema],
  yes: { type: Number, default: 0 },
  no: { type: Number, default: 0 },
  // this establishes a relationship between the survey and the user
  // to say which survey belongs to which user
  _user: {type: Schema.Types.ObjectId, ref: 'User'},
  dateSent: Date,
  lastResponded: Date
});

mongoose.model('surveys', surveySchema);
