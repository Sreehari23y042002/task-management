const db = require("../models");
const User = db.user;
const Role = db.role;
const Task = require('../models/Task');


exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

exports.moderatorBoard = (req, res) => {
  res.status(200).send("Moderator Content.");
};

exports.listUser = async (req, res) => {
  const users = await User.find()
  return res.send(users)
}

exports.updateUser = async (req, res) => {
  const userId = req.params.id;
  const { roles } = req.body; // Roles passed in the request body  
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Step 2: If roles are provided in the request body
    if (roles && roles.length > 0) {
      // Find the roles in the database
      const foundRoles = await Role.find({
        name: { $in: roles }
      });


      // Step 3: Update the user's roles array
      user.roles = foundRoles.map(role => role._id);
    }

    // Step 4: Save the updated user
    await user.save();

    // Step 5: Respond with success
    res.status(200).json({ message: "User roles updated successfully", user });

  } catch (err) {
    console.error(err);
    // Catch any error and send server error response
    return res.status(500).json({ message: 'Server error' });
  }
};


exports.deleteUser = async (req, res) => {
  const userId = req.params.id;

  try {
    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Delete the user from the database
    await user.deleteOne(); // This will remove the user from the database
    console.log(`User with ID: ${userId} deleted`);

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};


exports.taskUpload = async (req, res) => {
  const { title, description, assignedTo, assignedBy } = req.body;

  try {
    // Find the user by email (assignedTo is an email address)
    const assignedUser = await User.findOne({ email: assignedTo });

    if (!assignedUser || assignedUser.roles === 'employee') {
      return res.status(400).json({ message: 'Invalid employee email or role' });
    }

    // Create a new task using the assigned user's _id
    const task = new Task({
      title,
      description,
      assignedTo,  // Use the _id of the assigned user
      assignedBy,  // You can keep this as it is or you can use req.user._id if `assignedBy` is the manager
    });

    // Save the task to the database
    await task.save();
    res.status(201).json({ message: 'Task created successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
}

exports.assignTask = async (req, res) => {
  try {
    const employeeRole = await Role.findOne({ name: 'employee' });

    if (!employeeRole) {
      return res.status(404).json({ message: 'Employee role not found' });
    }

    // Find employees and populate their roles
    const employees = await User.find({ roles: employeeRole._id })
      .populate('roles', 'name') // Populate role names
      .select('email username roles');

    if (employees.length === 0) {
      return res.status(404).json({ message: 'No employees found' });
    }

    res.status(200).json(employees);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
}

exports.getAllEmployeeEmails = async (req, res) => {
  try {
    const employees = await User.find({}, 'email'); // Only select the email field
    const emails = employees.map(employee => employee.email); // Extract the emails from the result
    res.status(200).json({ emails });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching emails' });
  }
};

// exports.getTaskStatus= async(req,res)=>{
//     const { email } = req.query; // Get email from query params (e.g., ?email=someemail@example.com)

//     try {
//       // If email is not provided in the query
//       if (!email) {
//         return res.status(400).json({ message: 'Email parameter is required' });
//       }

//       // Find the user by email
//       const user = await User.findOne({ email });
//       if (!user) {
//         return res.status(404).json({ message: 'User not found' });
//       }

//       // Fetch tasks assigned to the user (using the user's ID)
//       const tasks = await Task.find({ assignedTo: user._id })
//         .populate('assignedBy', 'name email') // Populating assignedBy with name and email
//         .populate('comments.commentBy', 'name email'); // Populating commentBy in comments with name and email

//       res.status(200).json(tasks); // Send the tasks in the response
//     } catch (err) {
//       console.error(err);
//       res.status(500).json({ message: 'Server error' });
//     }
// }


// Assuming you are using Express and have a controller function like this

exports.getTaskStatus = async (req, res) => {
  try {
    const { email } = req.query; // Get the email query parameter

    // Perform the task fetching logic based on the email
    const tasks = await Task.find({ employeeEmail: email }); // Example: Query your database for tasks

    if (!tasks) {
      return res.status(404).json({ message: 'No tasks found for this employee' });
    }

    return res.status(200).json(tasks);  // Send tasks in response
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};




// Assuming that you've already imported necessary modules

exports.getTasksByEmployeeEmail = async (req, res) => {
  const { email } = req.params;  // Get email from the request params
  const employeeRole = await Role.findOne({ name: 'employee' });

  try {
    // Find the user by email
    const assignedUser = await User.findOne({ email });

    if (!assignedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Find all tasks assigned to this user (filter by assignedTo)
    const tasks = await Task.find({ assignedTo: assignedUser._id }) // Assuming 'assignedTo' stores ObjectId of user
    // const tasks = await Task.find({ employeeEmail: email }); // Example: Query your database for tasks
    // .populate('assignedBy', 'username email')  // Optionally populate assignedBy for better info
    // .populate('comments.commentBy', 'username email')  // Optionally populate who commented (if needed)
    // .select('title description status comments'); // Select only needed fields

    if (tasks.length === 0) {
      return res.status(404).json({ message: 'No tasks found for this employee' });
    }

    // Return the tasks associated with the user
    res.status(200).json(tasks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};




exports.taskDetailsUpdate = async (req, res) => {

  const taskId = req.params.taskId;
  const { status, commentText, userId } = req.body;

  const validStatuses = ['Not-Started', 'In Progress', 'Completed', 'Query'];

  if (!validStatuses.includes(status)) {
    return res.status(400).json({ message: 'Invalid status' });
  }

  try {
    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Check if the user is authorized to update the task
    // You may want to use a more complete authorization check here (e.g., verify roles)

    // Add comment if provided
    if (commentText) {
      const newComment = {
        commentBy: userId,
        commentText: commentText,
        createdAt: Date.now(),
      };
      task.comments.push(newComment);
    }

    // Update the task status
    task.status = status;
    await task.save();

    res.status(200).json({ message: 'Task status and comment updated successfully', task });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};


exports.getAllTask = async (req, res) => {
  try {
    // Fetch all tasks with populated fields for 'assignedTo' and 'assignedBy' users, and 'commentBy' in comments
    const tasks = await Task.find({})
      .populate('assignedTo', 'username email')  // Populate assignedTo with username and email
      .populate('assignedBy', 'username email')  // Populate assignedBy with username and email
      .populate('comments.commentBy', 'username email')  // Populate commentBy with username and email
      .select('title description status assignedTo assignedBy createdAt updatedAt comments');  // Select relevant fields

    if (tasks.length === 0) {
      return res.status(404).json({ message: 'No tasks found' });
    }

    res.status(200).json(tasks);  // Send tasks as the response
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};


exports.listUsersByRole = async (req, res) => {
  try {
    // Fetch all users from the database
    const users = await User.find()
      .populate("roles", "name") // Populate the roles field to include the role name
      .exec();

    // Transform users to return roles as a string (e.g., "admin", "employee")
    const transformedUsers = users.map(user => {
      const roleNames = user.roles.map(role => role.name); // Extract role names
      return {
        _id: user._id,
        username: user.username,
        email: user.email,
        roles: roleNames, // Convert roles to an array of strings
      };
    });

    // Send the transformed users as the response
    return res.status(200).send(transformedUsers);
  } catch (err) {
    console.error("Error fetching users:", err);
    return res.status(500).send({ message: "Server error" });
  }
};


exports.updateUsers = async (req, res) => {
  const userId = req.params.id;
  const { roles } = req.body; // Roles passed in the request body  

  try {
    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Step 2: If roles are provided in the request body
    if (roles && roles.length > 0) {
      // Find the roles in the database
      const foundRoles = await Role.find({
        name: { $in: roles }  // Find roles matching the names provided
      });

      // Step 3: Update the user's roles array with the found roles
      user.roles = foundRoles.map(role => role._id);
    }

    // Step 4: Save the updated user
    await user.save();

    // Step 5: Populate the roles to show role names (not ObjectIds)
    const updatedUser = await User.findById(userId)
      .populate("roles", "name")  // Populate the 'roles' field with the 'name' property
      .exec();

    // Step 6: Respond with success and the updated user with populated roles
    res.status(200).json({
      message: "User roles updated successfully",
      user: updatedUser
    });

  } catch (err) {
    console.error(err);
    // Catch any error and send server error response
    return res.status(500).json({ message: 'Server error' });
  }
};
