const express = require('express');
const mongoose = require('mongoose');
const restaurantModel = require('../models/restaurant');

// Initialize Router
const router = express.Router();

// 4. API to return all restaurant details (select all columns)
// http://localhost:3000/restaurants
router.get('/restaurants', async (req, res) => {
  try {
    const restaurants = await restaurantModel.find();  // Get all columns for all restaurants
    if (restaurants.length === 0) {
      res.status(404).send({ status: false, message: "No restaurants found" });
    } else {
      res.status(200).send(restaurants);
    }
  } catch (err) {
    res.status(500).send({ status: false, message: "Error retrieving restaurants", error: err });
  }
});

// 5. API to return all restaurant details by cuisine (select all columns)
// http://localhost:3000/restaurants/cuisine/Japanese
router.get('/restaurants/cuisine/:cuisine', async (req, res) => {
  const cuisine = req.params.cuisine;
  try {
    const restaurants = await restaurantModel.find({ cuisine: cuisine });
    if (restaurants.length === 0) {
      res.status(404).send({ status: false, message: `No ${cuisine} restaurants found` });
    } else {
      res.status(200).send(restaurants);
    }
  } catch (err) {
    res.status(500).send({ status: false, message: "Error retrieving restaurants", error: err });
  }
});

// 6. API to return restaurants sorted by restaurant_id (ascending/descending)
// http://localhost:3000/restaurants?sortBy=ASC
// http://localhost:3000/restaurants?sortBy=DESC
router.get('/restaurants', async (req, res) => {
  const sortBy = req.query.sortBy === 'ASC' ? 1 : -1;  // 1 for Ascending, -1 for Descending
  try {
    const restaurants = await restaurantModel.find()
      .select('restaurant_id cuisine name city') // Select specific columns
      .sort({ restaurant_id: sortBy });  // Sorting by restaurant_id in Ascending or Descending order
    
    if (restaurants.length === 0) {
      res.status(404).send({ status: false, message: "No restaurants found" });
    } else {
      res.status(200).send(restaurants);
    }
  } catch (err) {
    res.status(500).send({ status: false, message: "Error retrieving restaurants", error: err });
  }
});

// 7. API to return restaurants with cuisine = Delicatessen and city != Brooklyn
// http://localhost:3000/restaurants/Delicatessen
router.get('/restaurants/:cuisine', async (req, res) => {
  const cuisine = req.params.cuisine;
  try {
    const restaurants = await restaurantModel.find({ 
      cuisine: cuisine, 
      city: { $ne: 'Brooklyn' } // Exclude restaurants in Brooklyn
    })
    .select('cuisine name city') // Select columns excluding the id
    .sort({ name: 1 });  // Sort by name in ascending order
    
    if (restaurants.length === 0) {
      res.status(404).send({ status: false, message: `No restaurants found for cuisine ${cuisine} excluding Brooklyn` });
    } else {
      res.status(200).send(restaurants);
    }
  } catch (err) {
    res.status(500).send({ status: false, message: "Error retrieving restaurants", error: err });
  }
});

// 8. Create a new restaurant (POST)
// http://localhost:3000/restaurants
router.post('/restaurants', async (req, res) => {
  const restaurant = new restaurantModel(req.body);
  try {
    await restaurant.save();
    res.status(201).send(restaurant);
  } catch (err) {
    res.status(500).send({ status: false, message: "Error creating restaurant", error: err });
  }
});

// 9. Update restaurant (PATCH)
// http://localhost:3000/restaurants/:id
router.patch('/restaurants/:id', async (req, res) => {
  try {
    const restaurant = await restaurantModel.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true });
    if (!restaurant) {
      res.status(404).send({ status: false, message: "Restaurant not found" });
    } else {
      res.status(200).send(restaurant);
    }
  } catch (err) {
    res.status(500).send({ status: false, message: "Error updating restaurant", error: err });
  }
});

// 10. Delete restaurant (DELETE)
// http://localhost:3000/restaurants/:id
router.delete('/restaurants/:id', async (req, res) => {
  try {
    const restaurant = await restaurantModel.findByIdAndDelete(req.params.id);
    if (!restaurant) {
      res.status(404).send({ status: false, message: "Restaurant not found" });
    } else {
      res.status(200).send({ status: true, message: "Record Deleted Successfully" });
    }
  } catch (err) {
    res.status(500).send({ status: false, message: "Error deleting restaurant", error: err });
  }
});

module.exports = router;
