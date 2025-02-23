const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Employee = require("../models/Employee");
require('dotenv').config();
const resolvers = {
  Query: {
    login: async (_, { username, password }) => {
      try {
        const user = await User.findOne({ username });
        if (!user || !(await bcrypt.compare(password, user.password))) {
          throw new Error("Invalid Credentials");
        }
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });
        return { token, user };
      } catch (error) {
        throw new Error(error.message);
      }
    },

    getAllEmployees: async () => {
      try {
        return await Employee.find();
      } catch (error) {
        throw new Error("Error retrieving employees");
      }
    },

    searchEmployeeById: async (_, { id }) => {
      try {
        const employee = await Employee.findById(id);
        if (!employee) throw new Error("Employee not found");
        return employee;
      } catch (error) {
        throw new Error(error.message);
      }
    },

    searchEmployeeByDesignationOrDept: async (_, { designation, department }) => {
      try {
        const filter = {};
        if (designation) filter.designation = designation;
        if (department) filter.department = department;
        return await Employee.find(filter);
      } catch (error) {
        throw new Error("Error searching employees");
      }
    },
  },

  Mutation: {
    signup: async (_, { username, email, password }) => {
      try {
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) throw new Error("Username or email already taken");

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, email, password: hashedPassword });
        return await user.save();
      } catch (error) {
        throw new Error(error.message);
      }
    },

    addEmployee: async (_, args) => {
      try {
        const employee = new Employee(args);
        return await employee.save();
      } catch (error) {
        throw new Error("Error adding employee");
      }
    },

    updateEmployee: async (_, { id, ...updates }) => {
      try {
        const employee = await Employee.findByIdAndUpdate(id, updates, { new: true });
        if (!employee) throw new Error("Employee not found");
        return employee;
      } catch (error) {
        throw new Error(error.message);
      }
    },

    deleteEmployee: async (_, { id }) => {
      try {
        const employee = await Employee.findByIdAndDelete(id);
        if (!employee) throw new Error("Employee not found");
        return "Employee successfully deleted";
      } catch (error) {
        throw new Error(error.message);
      }
    },
  },
};

module.exports = resolvers;
