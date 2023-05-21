const db =require('./db')
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken");



const login =async (acno,pswd) =>{
  
const user = await db.admin.findOne({ username:acno })
  // console.log('user: ', user);
try{


  const cmp = await bcrypt.compare(pswd, user.password);
  console.log('cmp: ', cmp);
  if( cmp){

    return db.admin.findOne({username:acno}).then( user =>{
      
      
      // console.log('pswd: ', pswd);
      // console.log(acno)
      // console.log(userDetails)
      
      if(user){
        
        // console.log('user: ',);
        
        // console.log(acno);
        // // console.log(acno)
        // if(pswd==userDetails[acno]['password'])
        //  currentUser=userDetails[acno]['username']
        //  currentAcno=userDetails[acno].acno
        // key=require('crypto').randomBytes(32).toString('hex')
        // const token = jwt.sign(acno,key)
        const token = jwt.sign(acno,'shajmil')
        console.log('token: ', token);

         return {
         currentuser: user.username,
          statuscode:200,
          status: 'success',
          message:' account login sucess',
          acno,
        token,
        instituteId:user.instituteId
        }
         
        
        }
        else{
          return {
            statuscode:401,
            status: 'fail',
            message:'  password incorrect'
          }
        }
        
      })
    }
        else{
            return {
                statuscode:401,
                status: 'fail',
                message:' user not found'
              
            
            }
            
          }
        }
      catch(e){
        return {
          statuscode:401,
          status: 'fail',
          message:' user not found'
        
      
      }
    }}
const signUp = async (username,password)=>{
  console.log('username: ', username);
// var hash;

  return db.admin.findOne({username}).then(users=>{
 
    if(users){
      // alert('already exist')
      return {
        statuscode:401,
        status: 'fail',
        message:' account already exist'
      }
    }else{

      // console.log('hash: ', hash);
     const newUser= new db.admin( {
       
        username,
        password,

      } )  

      newUser.save()
      // console.log(userDetails);
    // console.log(details);
      return {
        statuscode:200,
        status: 'success',
        message:' account created'
      }
    }
  
  }
  ) 

}
const add = (firstname,lastname,email,password,address,gender,final_img,course,instituteId)=>{
  // console.log('final_img: ', final_img);
    // console.log('gender: ', gender);
    // console.log('address: ', address);
    // console.log('password: ', password);
    // console.log('email: ', email);
    // console.log('lastname: ', lastname);
    // console.log('firstname: ', firstname);

    
 
    return db.user.findOne({email}).then(users=>{
  
   
      if(users){
        console.log('users: ', users);
        // alert('already exist')
        return {
          statuscode:401,
          status: 'fail',
          message:' Teacher already taken'
        }
      }else{
       const newUser= new db.user( {
           firstname,
           lastname,
           email,
           password,address,gender,img:final_img,course,instituteId
           
        }, )  
        // console.log('newUser: ', newUser);
  
        newUser.save()
        // console.log(userDetails);
      // console.log(details);
        return {
          statuscode:200,
          status: 'success',
          message:' Teacher created'
        }
      }
    
    }
    ) }
const addClass = (fees,className,description,instituteId)=>{
  console.log('className: ', className);
  // console.log('final_img: ', final_img);
    // console.log('gender: ', gender);
    // console.log('address: ', address);
    // console.log('password: ', password);
    // console.log('email: ', email);
    // console.log('lastname: ', lastname);
    // console.log('firstname: ', firstname);

    
 
    return db.classes.findOne({className,instituteId}).then(users=>{
      console.log('users: ', users);
  
   
      if(users){
        console.log('users: ', users);
        // alert('already exist')
        return {
          statuscode:401,
          status: 'fail',
          message:' class already exist'
        }
      }else{
       const newUser= new db.classes( {
           fees,
           className,
           description,
           instituteId
           
        }, )  
        // console.log('newUser: ', newUser);
  
        newUser.save()
        // console.log(userDetails);
      // console.log(details);
        return {
          statuscode:200,
          status: 'success',
          message:' class created'
        }
      }
    
    }
    ) }
const update = (id,firstname,lastname,email,password,address,gender,SelectedCourse)=>{
    // console.log('gender: ', gender);
    // console.log('address: ', address);
    // console.log('password: ', password);
    // console.log('email: ', email);
    // console.log('lastname: ', lastname);
    // console.log('firstname: ', firstname);

    
 
    return db.user.updateOne( { _id: id },
    {
      $set: {    firstname,
        lastname,
        email,
        password,address,gender ,course:SelectedCourse},
    
    }).then(users=>{
      // console.log('users: ', users);
  
   
      if(users){
        // alert('already exist')
        return {
          statuscode:200,
          status: 'success',
          message:' Customer updated'
        }
      }else{
      
        // console.log(userDetails);
      // console.log(details);
        return {
          statuscode:401,
          status: 'fail',
          message:' email already'
        }
      }
    
    }
    ).catch(err=>{
      // console.log('err: ', err);
      return {
        statuscode:401,
        status: 'fail',
        message:' email already'
      }

    }) }
    const showcust=(instituteId)=>{
        return db.user.find({ "instituteId": instituteId }).then(users=>{
            // console.log('users: ', users);
            if(users){

         
            // var b = Buffer.from(users[0].img.data).toString('base64')
          // console.log('b: ', b);
          // users[0].img=b;
// var s = b.toString();
// console.log('s: ', s);
            return {
                statuscode:200,
                status: 'success',
                message:users
              }
            }

    })}
    const getcourse=(instituteId)=>{
        return db.classes.find({ "instituteId": instituteId }).then(users=>{
            // console.log('users: ', users);
            if(users){

         
            // var b = Buffer.from(users[0].img.data).toString('base64')
          // console.log('b: ', b);
          // users[0].img=b;
// var s = b.toString();
// console.log('s: ', s);
            return {
                statuscode:200,
                status: 'success',
                message:users
              }
            }

    })}
    const deleteCus=(email,instituteId)=>{
     
    
        return db.user.deleteOne({ email: email,instituteId }).then(users=>{
          
            // console.log('users: ', users);
            return {
                statuscode:200,
                status: 'success',
                message:users
              }
    }
    )
  }
    const deleteClass=(className,instituteId)=>{
      console.log('instituteId: ', instituteId);
     
    
      console.log('className: ', className);
        return db.classes.deleteOne({ className,instituteId}).then(users=>{
          
            // console.log('users: ', users);
            return {
                statuscode:200,
                status: 'success',
                message:users
              }
    }
    )
  }
    module.exports = {
      add,showcust
    ,deleteCus,update,signUp,login,addClass,getcourse,deleteClass
      }