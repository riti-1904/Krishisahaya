const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");

const app = express();
app.use(express.static("public"));
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Krishna@1904", // Ensure this is your correct MySQL password
    database: "krishisahaya"
});

db.connect(err => {
    if (err) {
        console.error("MySQL Connection Error:", err);
        process.exit(1); // Exit the process if DB connection fails
    }
    console.log("✅ MySQL Connected...");
});


// 🔹 **Signup API**
app.post("/signup", async (req, res) => {
    const { name, email, password, location } = req.body;

    console.log("📩 Received Signup Data:", { name, email, location }); // Debugging

    // Check if email is already registered
    const checkUserQuery = "SELECT * FROM users WHERE email = ?";
    db.query(checkUserQuery, [email], async (err, results) => {
        if (err) {
            console.error("❌ Error checking user:", err);
            return res.status(500).json({ success: false, message: "Database error!" });
        }

        if (results.length > 0) {
            console.log("⚠️ Email already exists!");
            return res.json({ success: false, message: "Email already registered!" });
        }

        try {
            const hashedPassword = await bcrypt.hash(password, 10);

            // Insert new user into database
            const sql = "INSERT INTO users (name, email, password, location) VALUES (?, ?, ?, ?)";
            db.query(sql, [name, email, hashedPassword, location], (err, result) => {
                if (err) {
                    console.error("❌ Database Insert Error:", err);
                    return res.json({ success: false, message: "Error saving data!" });
                }
                console.log("✅ Signup Successful! User added to DB.");
                res.json({ success: true, message: "Signup successful! Please login." });
            });
        } catch (error) {
            console.error("❌ Error hashing password:", error);
            res.status(500).json({ success: false, message: "Error processing request!" });
        }
    });
});

// 🔹 **Login API**
app.post("/login", (req, res) => {
    const { email, password } = req.body;

    console.log("🔑 Login Attempt:", email); // Debugging

    const sql = "SELECT * FROM users WHERE email = ?";
    db.query(sql, [email], async (err, results) => {
        if (err) {
            console.error("❌ Login Query Error:", err);
            return res.status(500).json({ success: false, message: "Database error!" });
        }

        if (results.length === 0) {
            console.log("⚠️ User not found:", email);
            return res.json({ success: false, message: "User not found!" });
        }

        try {
            const isMatch = await bcrypt.compare(password, results[0].password);
            if (!isMatch) {
                console.log("⚠️ Incorrect password for:", email);
                return res.json({ success: false, message: "Invalid credentials!" });
            }

            console.log("✅ Login successful:", email);
            res.json({ success: true, message: "Login successful!" });
        } catch (error) {
            console.error("❌ Error comparing passwords:", error);
            res.status(500).json({ success: false, message: "Error processing request!" });
        }
    });
});

// 🔹 **Start Server**
// app.listen(3000, () => console.log("🚀 Server running on port 3000"));
const PORT = 4000; // Change port here

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));











// ______________PREVIOUS CODE_____________
// const express = require("express");
// const mysql = require("mysql2");
// const bodyParser = require("body-parser");
// const bcrypt = require("bcrypt");

// const app = express();
// app.use(express.static("public"));
// app.use(bodyParser.json());

// const db = mysql.createConnection({
//     host: "localhost",
//     user: "root",  // Change if using a different MySQL user
//     password: "Krishna@1904",  // If no password, leave empty
//     database: "krishisahaya"
// });

// db.connect(err => {
//     if (err) throw err;
//     console.log("MySQL Connected...");
// });

// // Signup API
// app.post("/signup", async (req, res) => {
//     const { name, email, password, location } = req.body;

//     // Check if email already exists
//     const checkUserQuery = "SELECT * FROM users WHERE email = ?";
//     db.query(checkUserQuery, [email], async (err, results) => {
//         if (results.length > 0) {
//             return res.json({ success: false, message: "Email already registered!" });
//         }

//         // Hash password before saving
//         const hashedPassword = await bcrypt.hash(password, 10);

//         // Insert new user
//         const sql = "INSERT INTO users (name, email, password, location) VALUES (?, ?, ?, ?)";
//         db.query(sql, [name, email, hashedPassword, location], (err) => {
//             if (err) return res.json({ success: false, message: "Error saving data!" });
//             res.json({ success: true, message: "Signup successful! Please login." });
//         });
//     });
// });

// // Login API
// app.post("/login", (req, res) => {
//     const { email, password } = req.body;
//     const sql = "SELECT * FROM users WHERE email = ?";

//     db.query(sql, [email], async (err, results) => {
//         if (err || results.length === 0) return res.json({ success: false, message: "User not found!" });

//         const isMatch = await bcrypt.compare(password, results[0].password);
//         if (!isMatch) return res.json({ success: false, message: "Invalid credentials!" });

//         res.json({ success: true, message: "Login successful!" });
//     });
// });

// // Start Server
// app.listen(3000, () => console.log("Server running on port 3000"));


// // ______later modification_____________

// app.post("/signup", async (req, res) => {
//     const { name, email, password, location } = req.body;

//     console.log("Received Signup Data:", { name, email, password, location }); // Debugging

//     // Check if email already exists
//     const checkUserQuery = "SELECT * FROM users WHERE email = ?";
//     db.query(checkUserQuery, [email], async (err, results) => {
//         if (results.length > 0) {
//             console.log("Email already exists!"); // Debugging
//             return res.json({ success: false, message: "Email already registered!" });
//         }

//         // Hash password before saving
//         const hashedPassword = await bcrypt.hash(password, 10);

//         // Insert new user
//         const sql = "INSERT INTO users (name, email, password, location) VALUES (?, ?, ?, ?)";
//         db.query(sql, [name, email, hashedPassword, location], (err, result) => {
//             if (err) {
//                 console.error("Database Insert Error:", err); // Debugging
//                 return res.json({ success: false, message: "Error saving data!" });
//             }
//             console.log("Signup Successful! User added to DB."); // Debugging
//             res.json({ success: true, message: "Signup successful! Please login." });
//         });
//     });
// });
