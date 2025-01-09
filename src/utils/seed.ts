import connection from "../config/connection.js";
import User from "../models/User.js";
import { Thought } from "../models/Thought.js";
import {
  getRandomUsername,
  getRandomEmail,
  getRandomArrItem,
} from "./data.js";

connection.on("error", (err) => console.error(err));

connection.once("open", async () => {
  console.log("connected");

  try {
    if (connection.db) {
      await connection.db.dropDatabase();
      console.log("Database cleared!");
    } else {
      console.error("Database connection not initialized.");
      process.exit(1);
    }

    const users = Array.from({ length: 10 }, () => ({
      username: getRandomUsername(),
      email: getRandomEmail(),
      friends: [],
      thoughts: [],
    }));

    const thoughtsArray = [
    'Writing clean code is an art.',
    'TypeScript makes JavaScript more robust.',
    'Debugging is like solving a mystery.',
    'Version control with Git is essential.',
    'Code reviews improve team collaboration.',
    'Front-end development is both design and logic.',
    'Back-end development powers the web.',
    'Every bug teaches you something new.',
    'Coding challenges improve problem-solving skills.',
    'Automating tasks saves time and effort.',
    'Readable code is better than clever code.',
    'Unit tests make refactoring easier.',
    'Frameworks simplify complex applications.',
    'Learning new programming languages is rewarding.',
    'Documentation is the key to maintainability.',
    'Breaking problems into smaller pieces is the way to go.',
    'Pair programming enhances learning.',
    'A well-named variable can save hours.',
    'Practice makes debugging faster.',
    `There's always more to learn in coding!`,
    ];
    
    const insertedUsers = await User.insertMany(users);

    const thoughts = insertedUsers.map((user: typeof insertedUsers[0]) => ({
      thoughtText: getRandomArrItem(thoughtsArray),
      username: user.username,
      userId: user._id,
      createdAt: new Date(),
      reactions: [],
    }));

    const insertedThoughts = await Thought.insertMany(thoughts);

    for (let thought of insertedThoughts) {
      await User.findByIdAndUpdate(
        thought.userId,
        { $push: { thoughts: thought._id } },
        { new: true }
      );
    }

    console.table(insertedUsers);
    console.table(thoughts);

    console.log("Seeding complete! 🌱");
    process.exit(0);
  } catch (err) {
    console.error("Error during seeding:", err);
    process.exit(1);
  }
});