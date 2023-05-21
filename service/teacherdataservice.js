const db =require('./db')
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken");


  const login =async (acno,pswd) =>{
    const user = await db.user.findOne({ email:acno })

      if(user){
      return db.user.findOne({email:acno ,password:pswd}).then( user =>{

        if(user){
          const token = jwt.sign(acno,'shajmil')
          
          return {
          currentuser: user.email,
          statuscode:200,
          status: 'success',
          message:' account login sucess',
          acno,
          course:user.course,
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
         const showstudent=(teacher,instituteId)=>{
          console.log('teacher: ', teacher);
          return db.student.find({ "teacher": teacher ,instituteId} ).then(users=>{
              // console.log('users: ', users);
              if(users){
  
           
              return {
                  statuscode:200,
                  status: 'success',
                  message:users
                }
              }
  
      })}
     
      const add = (firstname,lastname,email,password,address,gender,final_img,course,teacher,fees,instituteId)=>{
        console.log('teacher: ', teacher);
        // console.log('final_img: ', final_img);
        //   console.log('gender: ', gender);
        //   console.log('address: ', address);
        //   console.log('password: ', password);
        //   console.log('email: ', email);
        //   console.log('lastname: ', lastname);
        //   console.log('firstname: ', firstname);
      
       
          return db.student.findOne({email}).then(users=>{
        
         
            if(users){
              console.log('users: ', users);
              // alert('already exist')
              return {
                statuscode:401,
                status: 'fail',
                message:' student already exist'
              }
            }else{
              if(fees!="undefined"){
                console.log('fees: ', fees);
             const newUser= new db.student( {
                 firstname,
                 lastname,
                 email,
                 password,address,gender,img:final_img,course,teacher,fees,instituteId
                 
              }, )  
               newUser.save()
              return {
                statuscode:200,
                status: 'success',
                message:' student created'
              }}  else{
                console.log('fees: ', fees.length);
            
     
           
                return {
                      statuscode:401,
                       status: 'failure',
                       message:' Class has been Removed by admin'
                    }   }
            }
          
          }
          )
       

        
        }
        
          const deletestudent=(student,instituteId)=>{
            console.log('instituteId: ', instituteId);
     
    
            return db.student.deleteOne({ email:student,instituteId}).then(users=>{
              
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
            add,login,showstudent,deletestudent
            }