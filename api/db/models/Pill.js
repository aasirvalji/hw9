const mongoose = require('mongoose');

const PillSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'patient',
  },
  url: {
    type: String,
    validate: {
      validator: function (v) {
        var re =
          /\b(https?|ftp|file):\/\/[\-A-Za-z0-9+&@#\/%?=~_|!:,.;]*[\-A-Za-z0-9+&@#\/%=~_|]/;
        return !v || !v.trim().length || re.test(v);
      },
      message: 'Image URL is invalid.',
    },
  },
  longtext: {
    type: String,
  },
  tokens: [
    {
      type: String,
    },
  ],
  uploading: {
    type: Boolean,
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('pill', PillSchema);
