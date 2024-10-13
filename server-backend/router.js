const express = require('express');
const router = express.Router();

// In-memory array to store user data
let users = [];

// Create (POST) a new user
router.post('/users', (req, res) => {
  const user = req.body;

  // Automatically assign an ID to the user based on the current length of the users array
  user.id = users.length + 1;  // This ensures IDs are 1, 2, 3, ...

  users.push(user);
  console.log("POST METHOD: New User Created", user);
  res.status(201).json(user);
});

// Read (GET) all users
router.get('/users', (req, res) => {
  console.log("GET METHOD: Fetching All Users");
  console.log("Current Users List:", users);
  res.json(users);
});

//put
router.put('/users/:id', (req, res) => {
  const { id } = req.params;
  const updatedUser = req.body;  // Expect the updated user data in the body

  console.log(`Received PUT request for user ID ${id} with data:`, updatedUser);

  const userId = Number(id);
  const userIndex = users.findIndex(user => user.id === userId);

  if (userIndex !== -1) {
    users[userIndex] = { ...users[userIndex], ...updatedUser };
    console.log("Updated user:", users[userIndex]);
    res.json(users[userIndex]);  // Send the updated user back
  } else {
    console.log("User not found");
    res.status(404).json({ message: "User not found" });
  }
});

// Delete (DELETE) a user by ID
router.delete('/users/:id', (req, res) => {
  const { id } = req.params;
  console.log(`DELETE METHOD: Deleting User with ID ${id}`);

  // Convert ID to a number since it's coming from URL params
  const userId = Number(id);

  // Find the index of the user to delete
  const userIndex = users.findIndex(user => user.id === userId);

  if (userIndex !== -1) {
    users.splice(userIndex, 1);  // Remove the user from the array
    console.log("User Deleted Successfully");
    console.log("Current Users List:", users);
    res.status(204).send();
  } else {
    console.log("DELETE METHOD: User not found");
    res.status(404).json({ message: "User not found" });
  }
});

module.exports = router;
