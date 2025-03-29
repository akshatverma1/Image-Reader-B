const express = require("express");
const app = express();
const port = 3000;
const fs = require("fs");
const bodyParser = require('body-parser');
const path = require("path");
const cors = require('cors')

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));


app.listen(port,()=>{
    console.log("Server Is Running On Port = "+port);
})

app.get("/",(req,res)=>{
    res.send("Hello My Name is Akku");    
})

// Corrected import
const { GoogleGenerativeAI } = require("@google/generative-ai");

// Initialize with your API key
const genAI = new GoogleGenerativeAI("AIzaSyDwp56xlfDqoRMm6Cs9GSp9hjvq7UyKn-w");

// Example usage
// async function run() {
//     const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

//     const prompt = "Does this image look like,give anwer in more than 200 words";
//     // const image = {
//     //     inlineData: {
//     //         data: Buffer.from(fs.readFileSync("1.png")).toString("base64"),
//     //         mimeType: "image/png",
//     //     },
//     const image = "https://i.pinimg.com/736x/c3/89/72/c389727463b0bb82a68cf739a79494fc.jpg";

//     const result = await model.generateContent([prompt,image]);
//     console.log("answer"+" "+"="+" "+result.response.text());

// }

// run();
let ress= "Loading....  ";

app.post("/request",async(req,res)=>{
    // ress= "Loading....  ";
    let {userName,question} = await req.body;
    console.log(userName);
    console.log(question);
    async function run() {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        // const prompt = "Does this image look like,give anwer in more than 200 words";
        const prompt = question+"Answer in more than 200 Words";
        const image = userName;
        const result = await model.generateContent([prompt,image]);
        // console.log("answer"+" "+"="+" "+result.response.text());
        ress = result.response.text();
        // res.redirect("http://localhost:5173/");
        setTimeout(()=>{
            res.redirect("http://localhost:5173/show");
        },2000);
    }
    run();
   
})

app.get("/getResult",(req,res)=>{
    
    setTimeout(()=>{
        console.log(ress);
        res.json(ress);
    },1000) 
})