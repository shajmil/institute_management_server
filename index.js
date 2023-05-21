const express = require('express')
const app = express()
const ds =require('./service/dataservice')
const sds =require('./service/studentservice')
const tds =require('./service/teacherdataservice')
const db =require('./service/db')
const cors = require('cors')
const fs = require("fs")
const multer = require("multer")
app.use(express.json())
const bcrypt = require("bcryptjs")
const corsAllowedDomains = process.env.CORS_ALLOWED_DOMAINS;
const jwt = require("jsonwebtoken");
require('dotenv').config()
const verify=(req,res,next)=>{
  try{
  let token=req.headers['token']
  console.log('token:', token);
  console.log('sads');
  data = jwt.verify(token,'shajmil')
  console.log('data: ', data);
  // key=require('crypto').randomBytes(32).toString('hex')
// console.log()
next();
  }
  catch{
      res.status(401).json({
          statuscode:401,
          status:false,
          message:"please login first"
      })
  }
}
app.use(cors({
  origin: ['http://localhost:4200','https://institute-management-front.vercel.app']
}));
    // app.use(function(req, res, next) {
    //     res.header("Access-Control-Allow-Origin", "*");
    //     res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
    //     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    //     next();
    //   });

    app.listen(process.env.PORT || 3000,()=>{
        console.log('sucess');
        })
   

        
        var storage = multer.diskStorage({
            destination: function (req, file, cb) {
              cb(null, 'uploads')
            },
            filename: function (req, file, cb) {
              cb(null, file.fieldname + '-' + Date.now())
              console.log('file.fieldname: ', file.fieldname);
            }
          })
          var upload = multer({ storage: storage })
          

//admin

        app.post('/login',async (req,res)=>{
          
            try {
        
                ds.login(req.body.acno,req.body.pswd).then(result=>{
                    // res.json(result)
                    
                    res.status(result.statuscode).json(result)})
              } catch (error) {
                // console.log(error);
                res.status(500).send("Internal Server error Occured");
              }
            })    
             
        app.post('/register',async (req,res)=>{
            try {
                const hashedPwd = await bcrypt.hash(req.body.password, 10);
                console.log('(req.body.password: ', (req.body.password));
                console.log('hashedPwd: ', hashedPwd);
                ds.signUp(req.body.username,hashedPwd).then(result=>{res.status(result.statuscode).json(result)})
        
              } catch (error) {
                console.log(error);
                res.status(500).send("Internal Server error Occured");
              }
            })

        app.post('/add',verify,upload.single('file'),(req,res)=>{
            console.log('  req.body: ',   req.body);    
            var img = fs.readFileSync(req.file.path);
             var encode_img = img.toString('base64');
            var final_img = {
                data:new Buffer.from(encode_img,'base64'),
                contentType:req.file.mimetype,
            };
            console.log('req.body.instituteId: ', req.body.instituteId);
            ds.add(req.body.firstname,req.body.lastname,req.body.email,req.body.password,req.body.address,req.body.gender,final_img,req.body.course, req.body.instituteId)
            .then(result=>{
             res.status(result.statuscode).json(result)}) })

        app.post('/addclass',verify,(req,res)=>{
            ds.addClass(req.body.fees,req.body.className,req.body.description,req.body.instituteId)
            .then(result=>{
                res.status(result.statuscode).json(result)})  })

        app.patch('/update',verify,(req,res)=>{
            ds.update(req.body.id,req.body.firstname,req.body.lastname,req.body.email,req.body.password,req.body.address,req.body.gender,req.body.SelectedCourse)
            .then(result=>{ console.log('req.body.password: ', req.body.password);
            res.status(result.statuscode).json(result)}) })


        app.get('/showcust/:instituteId',(req,res)=>{
          console.log('req: ', req.params);
          
          ds.showcust(req.params.instituteId)
            .then(result=>{ res.status(result.statuscode).json(result)  })  })


        app.get('/getcourse/:instituteId',(req,res)=>{
          console.log('req: ', req.params);
            ds.getcourse(req.params.instituteId)
            .then(result=>{
               
                  res.status(result.statuscode).json(result) })})

        app.delete('/deleteClass/:className',(req,res)=>{
          console.log('req.headers: ', req.headers);
          let instituteId=req.headers['instituteId']
          console.log('instituteId: ', instituteId);

            ds.deleteClass(req.params.className,instituteId ).then(result =>{
                res.status(result.statuscode).json(result) })})

        app.delete('/deleteCus',verify,(req,res)=>{
            let email=req.headers['email']
            let instituteId=req.headers['instituteId']
            console.log('email: ', email);
            console.log('res: ', req.body);
           ds.deleteCus(email,instituteId).then(result=>{
            res.status(result.statuscode).json(result)}) })


//teacher 


      app.post('/Teacherlogin',async (req,res)=>{
      try {

        tds.login(req.body.acno,req.body.pswd).then(result=>{
            // res.json(result)
            
            res.status(result.statuscode).json(result)})
          } catch (error) {
        // console.log(error);
        res.status(500).send("Internal Server error Occured");
          }
        })   
    
    app.post('/showstudent',(req,res)=>{
      
      console.log('req.body: ', req.body);
      tds.showstudent(req.body.teacher,req.body.instituteId)
      .then(result=>{ res.status(result.statuscode).json(result)  })  })

      app.post('/addstudent',verify,upload.single('file'),(req,res)=>{
        // console.log('  req.body: ',   req.body);    
        var img = fs.readFileSync(req.file.path);
         var encode_img = img.toString('base64');
        var final_img = {
            data:new Buffer.from(encode_img,'base64'),
            contentType:req.file.mimetype,
        };
        console.log('req.body: ', req.body);
        tds.add(req.body.firstname,req.body.lastname,req.body.email,req.body.password,req.body.address,req.body.gender,final_img,req.body.course,req.body.teacher,req.body.fees,req.body.instituteId)
        .then(result=>{
         res.status(result.statuscode).json(result)
        
        //  console.log(' res.status(result.statuscode).json(result): ',  res.status(result.statuscode).json(result));
        })  })
 
         app.delete('/deletestudent/:student',verify,(req,res)=>{
           console.log('req.headers: ', req.headers);
          tds.deletestudent(req.params.student,req.headers['instituteid'] ).then(result =>{
              res.status(result.statuscode).json(result) })})
//student



app.post('/studentlogin',(req,res)=>{

  sds.login(req.body.acno,req.body.pswd).then(result=>{
  // res.json(result)
  
  res.status(result.statuscode).json(result)})
  // if(result){
  //     res.send('success')
  
  // }
  // else{
  //     req.send('fail')
  // }
  })
         
    app.post('/getstudent',(req,res)=>{
      
      console.log('req.body: ', req.body);
      console.log('req.body.instituteId: qqqqqqqqqqqqqqqq', req.body.instituteId);
      sds.showstudent(req.body.mail,req.body.instituteId)
      .then(result=>{ res.status(result.statuscode).json(result)  })  })

      

      app.post('/withdraw',verify,(req,res)=>{
        sds.withdraw(req.body.user,req.body.amnt).then(result=>{
        
            res.status(result.statuscode).json(result) 
        })
      })