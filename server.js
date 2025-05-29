import express from "express";
import dotenv from "dotenv";
import jwt from "jsonwebtoken"; 

dotenv.config()
const app = express()
app.use(express.json()); // same as bodyParser.json()
app.use(express.urlencoded({ extended: true }));
const PORT = process.env.PORT || 3000;


app.get("/",(req, res)=>{
    res.send("Hello on the / starting endpoint")
})



app.post("/generate-token", (req, res) => {
    const jwtSecretKey = process.env.JWT_SECRET_KEY;
    const data = {
        userId: 19,
    };
    const token = jwt.sign(data, jwtSecretKey);
    res.send({ token });
});


app.post("/verify-user", (req, res) => {
    const authHeader = req.header(process.env.TOKEN_HEADER_KEY); // e.g., "Authorization"
    const token = authHeader.split(" ")[1];
    const jwtSecretKey = process.env.JWT_SECRET_KEY;

    try {
        const verified = jwt.verify(token, jwtSecretKey);        
        res.send({login:true, decode:verified});
    } catch (error) {
        res.status(401).send("Invalid Token");
    }
});


app.listen(PORT,()=>{
    console.log(`Server Running on port ${PORT}.`);
})
