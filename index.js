require("dotenv").config()
const express = require('express');
const { authenciateRequest, createAuthorizedUser, authorizeUser } = require("./utils/common/Authenciate");
const app = express();
app.use(express.json());  //to parse post request to json // previously use bodyparser
const excludeMiddleware = (middleware,...paths)=>{
    return (req,res,next)=>{
        if(paths.includes(req.path)) return next();
        else return middleware(req,res,next);
    }
}
// app.use(excludeMiddleware(authenciateRequest,"/user/signup","/user/login"));
// app.get("/user",(req,res)=>{
//     res.send(process.env.ACCESS_TOKEN);
// })
// 
// app.post("/user/signup",(req,res)=>{
//     createAuthorizedUser(req,res);
// });
// 
// app.post("/user/login",(req,res)=>{
//     authorizeUser(req,res);
// })

app.get("/hello",(req,res)=>{
	res.send("Hello");
})
app.listen(80)