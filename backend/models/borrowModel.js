const mongoose = require('mongoose');

const borrowSchema = mongoose.Schema(
  {
    // user: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   required: true,
    //   ref: 'User',
    // },

    userID: {
      type: String,
      required: true,
    },

    type: {
      type: String,
      required: true,
    },

    equipmentID: {
      type: String,
      required: true,
    },

    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },

    borrowDate: {
      type: String,
      required: true,
    },

    returnDate: {
      type: String,
      required: true,
    },

    isAvailable: {
      type: Boolean,
      default: false,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Borrow', borrowSchema);
