const express = require("express");
const ejs = require("ejs");
const mongoose = require("mongoose");
const fileUpload = require("express-fileupload");
const expressSession = require("express-session");
const flash = require("connect-flash");
const customValidate = require("./middlewares/customValidate");
const newPostController = require("./controllers/newPost");
const homeController = require("./controllers/home");
const getPostController = require("./controllers/getPost");
const storePostController = require("./controllers/storePost");
const newUserController = require("./controllers/newUser");
const registerUserController = require("./controllers/registerUser");
const loginController = require("./controllers/loginController");
const loginUserController = require("./controllers/loginUser");
const signOutController = require("./controllers/signOut");
const authentication = require("./middlewares/authentication");
const redirectIfAuth = require("./middlewares/redirectIfAuth");
const loggedIn = require("./middlewares/loggedIn");

const app = new express();
app.use(fileUpload());
app.use(express.static("public"));
app.use(express.json());
global.isLoggedIn = false;
app.use(flash());
app.use(
  expressSession({
    secret: "testing",
    resave: false,
    saveUninitialized: true,
  })
);
app.use("*", loggedIn);
app.use(express.urlencoded({ extended: true }));
app.use("/post/save", customValidate);
app.set("view engine", "ejs");
mongoose.connect(
  "mongodb+srv://ayushdatt001:JkkxBikoCWQqoc51@cluster0.4f1jk4u.mongodb.net/?retryWrites=true&w=majority",
  { useNewUrlParser: true }
);

app.get("/", homeController);

app.get("/post/new", authentication, newPostController);

app.get("/post/:id", getPostController);

app.post("/post/save", authentication, storePostController);

app.get("/auth/register", redirectIfAuth, registerUserController);
app.post("/user/save", newUserController);

app.get("/auth/login", redirectIfAuth, loginController);
app.post("/user/login", loginUserController);

app.get("/signout", signOutController);

const PORT = 4000;

app.listen(PORT, () => {
  console.log(`Server Running at port ${PORT}`);
});
