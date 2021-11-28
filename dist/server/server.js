import { CartModel } from "./schemas/cart.schema.js";
import express from "express";
import bcrypt from "bcrypt";
import cors from "cors";
import { PostModel } from "./schemas/post.schema.js";
import { UserModel } from "./schemas/user.schema.js";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import 'stripe';
import http from "http";
import dotenv from "dotenv";
import { authHandler } from "./middleware/auth.middleware.js";
import { ProductModel } from "./schemas/product.schema.js";
dotenv.config();
const access_secret = process.env.ACCESS_TOKEN_SECRET;
console.log(access_secret);
const app = express();
const server = http.createServer(app);
import path from "path";
console.log(process.env.MONGO_URL);
const __dirname = path.resolve();
const saltRounds = 10;
const PORT = process.env.PORT || 3000;
mongoose
    .connect(`${process.env.MONGO_URL}`)
    .then(() => {
    console.log("Connected to DB Successfully");
})
    .catch((err) => console.log("Failed to Connect to DB", err));
app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: [
        "http://localhost:3000",
        "http://localhost:4200",
        "http://localhost:3501",
        "http://localhost:8080",
    ],
}));
app.use(express.json());
// app.get("/", function (req, res) {
//   res.json({ message: "test" });
// });
const clientPath = path.join(__dirname, "/dist/client");
app.use(express.static(clientPath));
app.post("/api/create-product", function (req, res) {
    const { title, price, description, imageurl, quantity } = req.body;
    const product = new ProductModel({
        title,
        price,
        description,
        imageurl,
        quantity,
    });
    product
        .save()
        .then((data) => {
        console.log(data);
        res.json({ data });
    })
        .catch((err) => {
        res.status(501);
        res.json({ errors: err });
    });
});
app.get("/api/products", authHandler, function (req, res) {
    ProductModel.find()
        .then((data) => res.json({
        data,
    }))
        .catch((err) => {
        res.status(501);
        res.json({ errors: err });
    });
});
app.get("/api/posts", function (req, res) {
    PostModel.find()
        .then((data) => res.json({ data }))
        .catch((err) => {
        res.status(501);
        res.json({ errors: err });
    });
});
app.get("/api/users", authHandler, function (req, res) {
    UserModel.find({ email: req.user.email }, "-password")
        .then((data) => res.json({ data }))
        .catch((err) => {
        res.status(501);
        res.json({ errors: err });
    });
});
app.post("/api/create-user", function (req, res) {
    const { name, email, username, password } = req.body;
    bcrypt.genSalt(saltRounds, function (err, salt) {
        bcrypt.hash(password, salt, function (err, hash) {
            const user = new UserModel({
                name,
                username,
                email,
                password: hash,
            });
            user
                .save()
                .then((data) => {
                res.json({ data });
            }).then(() => {
                const cart = new CartModel({
                    user: user._id,
                });
                cart.save();
            })
                .catch((err) => {
                res.status(501);
                res.json({ errors: err });
            });
        });
    });
});
app.post("/api/create-post", function (req, res) {
    const { title, body } = req.body;
    const post = new PostModel({
        title,
        body,
    });
    post
        .save()
        .then((data) => {
        res.json({ data });
    })
        .catch((err) => {
        res.status(501);
        res.json({ errors: err });
    });
});
app.delete("/api/delete-user/:id", function (req, res) {
    const _id = req.params.id;
    UserModel.findByIdAndDelete(_id).then((data) => {
        console.log(data);
        res.json({ data });
    });
});
app.put("/api/update-user/:id", function (req, res) {
    console.log("Update user");
    UserModel.findByIdAndUpdate(req.params.id, {
        $set: { name: req.body.name, email: req.body.email },
    }, {
        new: true,
    }, function (err, updateUser) {
        if (err) {
            res.send("Error updating user");
        }
        else {
            res.json(updateUser);
        }
    });
});
app.get("/api/cart", authHandler, function (req, res) {
    CartModel.findOne({ user: req.user._id }).populate('user items.product')
        .then((data) => res.json({ data }))
        .catch((err) => {
        res.status(501);
        res.json({ errors: err });
    });
});
app.put("/api/update-cart", authHandler, function (req, res) {
    CartModel.findOne({ user: req.user._id }).populate('items.product').then(cart => {
        console.log(cart, "Cart");
        if (cart) {
            console.log(req.body, req.body._id, cart.items[0]);
            const item = cart.items.find(item => item.product._id == req.body._id);
            console.log(item, "item");
            if (item) {
                item.quantity++;
            }
            else {
                cart.items.push({ product: req.body._id, quantity: 1 });
            }
            cart.save()
                .then(updatedCart => res.json(cart));
        }
    });
});
app.put("/api/remove-cart-item", authHandler, function (req, res) {
    console.log("remove from cart Cart", req.user);
    CartModel.findOne({ user: req.user._id }).then(cart => {
        if (cart) {
            const item = cart.items.find(item => item.product == req.body._id);
            if (item) {
                item.quantity--;
                if (item.quantity < 1) {
                    cart.items.splice(cart.items.findIndex(ii => ii == item), 1);
                }
            }
            cart?.save().then((updatedCart) => {
                CartModel.populate(updatedCart, "items.product").then((populatedCart) => {
                    res.json(populatedCart);
                });
            });
        }
    });
});
app.put("/api/delete-cart/:id", authHandler, function (req, res) {
    console.log('delete product from');
    CartModel.findOneAndUpdate({ user: req.user._id }, {
        $pull: { items: req.params.id },
    }, {
        new: true,
    }, function (err, deleteItemFromCart) {
        if (err) {
            res.send("Error delete Items from cart");
        }
        else {
            res.json(deleteItemFromCart);
        }
    }).populate('items');
});
app.put("/api/empty-cart", authHandler, function (req, res) {
    console.log("empty product from cart");
    CartModel.findOneAndUpdate({ user: req.user._id }, {
        $set: { items: { product: [] } },
    }, {
        new: true,
    }, function (err, emptyCart) {
        if (err) {
            res.send("Error rmpty product from cart");
        }
        else {
            res.json(emptyCart);
            console.log("empth product", emptyCart);
        }
    });
});
app.post("/api/login", function (req, res) {
    const { email, password } = req.body;
    console.log("Login Information", req.body);
    UserModel.findOne({ email })
        .then((user) => {
        console.log("LOGIN USER", user);
        bcrypt.compare(password, `${user?.password}`, function (err, result) {
            if (result) {
                console.log("It matches!");
                const accessToken = jwt.sign({ user }, access_secret);
                console.log("Token", accessToken);
                res.cookie('jwt', accessToken, {
                    httpOnly: true,
                    maxAge: 60 * 60 * 1000,
                });
                // res.json({message: 'Successfully Logged In', user})
                res.json({ data: user });
            }
            else {
                res.sendStatus(403);
            }
        });
    })
        .catch((err) => {
        return res.sendStatus(404);
    });
});
app.get("logout", function (req, res) {
    res.cookie("jwt", "", {
        httpOnly: true,
        maxAge: 0,
    });
    res.json({ message: "Successfully Logged Out" });
});
app.get("/api/check-login", authHandler, (req, res) => {
    res.json({ message: "yes" });
});
// app.post('/charge', function(req, res) {
//   var stripeToken = req.body.stripeToken;
//   var amount = 1000;
//   stripe.charges.create({
//       card: stripeToken,
//       currency: 'usd',
//       amount: amount
//   },
//   function(err, charge) {
//       console.log(req.user);
//       if (err) {
//           res.send(500, err);
//       } else {
//           res.send(204);
//       }
//   });
// });
server.listen(PORT, function () {
    console.log(`starting at localhost http://localhost:${PORT}`);
});
app.all("/api/*", function (req, res) {
    res.sendStatus(404);
});
app.get("*", function (req, res) {
    const filePath = path.join(__dirname, "/dist/client/index.html");
    console.log(filePath);
    res.sendFile(filePath);
});
// io.on('connection', function(socket){
//   console.log('a user connected');
//   socket.emit('message', 'work')
//   socket.on('disconnect', function(){
//     console.log('user disconnected');
//   });
// });
//# sourceMappingURL=server.js.map