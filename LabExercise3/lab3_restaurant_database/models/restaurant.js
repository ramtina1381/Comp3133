// models/restaurant.js
const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  cuisine: {
    type: [String], // Array of strings to hold multiple cuisines
    required: true,
  },
  restaurant_id: {
    type: String,
    required: true,
    unique: true, // Ensures restaurant_id is unique
  },
  created: {
    type: Date,
  },
  updatedat: {
    type: Date,
  },
});

// Custom Schema Methods
restaurantSchema.methods.formatRestaurantInfo = function () {
  return `${this.name} serves delicious ${this.cuisine.join(", ")} cuisine in ${this.city}.`;
};

// Static method to find restaurants by cuisine
restaurantSchema.statics.findByCuisine = function (cuisine) {
  return this.find({ cuisine: cuisine });
};

// Query Helpers
restaurantSchema.query.byCity = function (city) {
  return this.find({ city: city });
};

// Pre-save Hook
restaurantSchema.pre('save', function (next) {
  console.log("Before Save");
  let now = Date.now();

  this.updatedat = now;
  if (!this.created) {
    this.created = now;
  }

  next();
});

// Pre-update Hook
restaurantSchema.pre('findOneAndUpdate', function (next) {
  console.log("Before findOneAndUpdate");
  let now = Date.now();
  this._update.updatedat = now;
  console.log(this._update.updatedat);
  next();
});

// Post-save Hook
restaurantSchema.post('save', (doc) => {
  console.log('%s has been saved', doc._id);
});

// Post-remove Hook
restaurantSchema.post('remove', (doc) => {
  console.log('%s has been removed', doc._id);
});

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

module.exports = Restaurant;
