const express = require('express');
const app = express();
const mongoose = require('./db/mongoose');
//load the models:
const {list,task,User} = require('./db/Models');
//const { log } = require('console');
const jwt = require('jsonwebtoken');
const cors = require('cors');

//MiddleWare
app.use(express.json());
app.use(cors());
//CORSE HEADER Middleware
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Methods","GET , POST , HEAD , OPTIONS , PUT , PATCH , DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept , x-access-token, x-refresh-token");

    res.header(
        'Access-Control-Expose-Headers',
        'x-access-token, x-refresh-token'
    );

    next();
  });

//verify refresh token middleware
let verifySession = (req,res,next) => {
    let refreshToken = req.header('x-refresh-token');
    
    //grab the _id from the request header
    let _id = req.header('_id');

    User.findByIdAndToken(_id,refreshToken)
    .then((user)=>{
        if(!user){
            // user couldn't be found
            return Promise.reject({
                'error': 'User not found. Make sure that the refresh token and user id are correct'
            });
        }

        //if code reaches here  -  the user was found
        //therfore the refresh token is exist in database but we still have to check if it is expired or not

        req.user_id = user._id;
        req.userObject = user;
        req.refreshToken = refreshToken;

        let isSessionValid = false;

        user.sessions.forEach((session)=>{
           if(session.token === refreshToken){
            //check if the session has expired
            if(User.hasRefreshTokenExpired(session.expiresAt) === false){
                //refresh token has not expired
                isSessionValid = true;
            }
           }
        });
        
    if(isSessionValid){
        next();
    }else{
        //the session is not valid
        return Promise.reject({
            'error': 'Refresh token has expired or the session is invalid'
        })
    }
}).catch((e)=>{
    res.status(401).send(e);
})

}

//end middleware

//ROUTERS

//List Routes
/**
 * .GET / lists
 * purpose : get all lists
 */
app.get('/ShowLists',async(req,res)=>{
    //we want to return an array of all lists in database
    try {
        const showList =await list.find();
        res.send(showList);   
    } catch (error) {
        console.log(error);
    }
});

/**
 * .Post/ createlist
 * purpose:to create a new list
 */
app.post('/createList',(req,res)=>{
    //we want create a new list and return the new list to the user (which includes id)
    //list information will be passed in json request body
    let newList = new list({
        title:req.body.title
    })

    try {
        newList.save().then((result) => {
            res.send(result);
        })
    } catch (error) {
        console.log("something went wrong");
    }
});

/**
 * .Post/lists/:id
 * purpose:to update the list
 */
app.patch('/update',async(req,res)=>{
    //we want to update the list (by pass id in URL) with the new values specified in JSON request body
    let id = req.body.id;
    try {
        const updateData = await list.findOneAndUpdate(id,req.body);
        res.send(updateData);
    } catch (error) {
        console.log(error);
    }
});

/**
 * .Post/lists/:id
 * purpose:to delete a list
 */
app.delete('/delete/:id',async(req,res)=>{
    //we want to delete the specified list (by pass id in URL)
    // let _id = req.query._id;
    // try {
    //     const removedList = await list.findByIdAndDelete(_id);
    //     res.send("Data deleted Successfully!");
    // } catch (error) {
    //     console.log(error);
    // }
    const id = (req.params.id);
    await list.findOneAndDelete({
        _id:id
    }).then((result)=>{
        res.send(result);
    })
});
/**
 * purpose: to show all the tasks
 */
app.get('/CreateTask/:listid/showTask',async(req,res)=>{
    //we want to return an array of all tasks in database
    try {
        const showTask =await task.find({_listid :req.params.listid});
        res.send(showTask);   
    } catch (error) {
        console.log(error);
    }
});

app.post('/createList/:listid/createTask',(req,res)=>{
    //we want create a new Task and return the new Task to the user (which includes id)
    //Task information will be passed in json request body
    let newTask = new task({
        title:req.body.title,
        _listid :req.params.listid
    })

    try {
        newTask.save().then((result) => {
            res.send(result);
        })
    } catch (error) {
        console.log("something went wrong");
    }
});



// Update Task API
app.put('/updateList/:listid/updateTask/:taskid', async (req, res) => {
    const listId = req.params.listid;
    const taskId = req.params.taskid;

    // Validate input data if needed

    try {
        // Find the task to update by taskid and listid
        const updatedTask = await task.findOneAndUpdate(
            { _id: taskId, _listid: listId },
            { $set: { title: req.body.title } }, // Update the title as an example; you can add more fields to update
            { new: true } // Return the updated task
        );

        if (!updatedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }

        res.status(200).json(updatedTask);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
});

app.patch('/createdList/:listid/createdTask/:Taskid',async(req,res)=>{
    let _id = req.params.Taskid;
    let _listid = req.params.listid;
    try {
        const updateData = await task.findOneAndUpdate({_listid,_id},req.body);
        res.send(updateData);
    } catch (error) {
        console.log(error);
    }
});

app.delete('/createdList/:listid/createdTask/:Taskid',async(req,res)=>{
    let _id = req.params.Taskid;
    let _listid = req.params.listid;
    try {
        const removedTask = await task.findOneAndRemove({_listid,_id},req.body);
        res.send(removedTask);
    } catch (error) {
        console.log(error);
    }
});  

/*USER ROOTS*/

/*
POST/Users
Purpose:Sign up
*/ 

app.post('/users',(req,res)=>{
    //User sign up
    let body = req.body;
    let newUser = new User(body);

    newUser.save().then(()=>{
        return newUser.createSession();
    }).then((refreshToken)=>{
        //session created successfully - refresh token returned.
        //now we generate an access auth token for the user

        return newUser.generateAccessAuthToken().then((accessToken)=>{
            //access auth token generated successfully,now we return an object containing the  auth tokens
            return {accessToken,refreshToken}
        });
    }).then((authTokens)=>{
        //Now we construct and used the response to the user with their auth tokens in the header and the user ovject in the body
        res
           .header('x-refresh-token',authTokens.refreshToken)
           .header('x-access-token',authTokens.accessToken)
           .send(newUser);
    }).catch((e)=>{
      res.status(400).send(e);
    })  
})

/*
POST/users/login
Purpose:Login
*/
app.post('/users/login',(req,res)=>{
    let email = req.body.email;
    let password = req.body.password;

    User.findByCredentials(email,password).then((user)=>{
       return user.createSession().then((refreshToken)=>{
        //session created successfully

        return user.generateAccessAuthToken().then((accessToken)=>{
            return {accessToken , refreshToken} 
        });
       }).then((authTokens)=>{
          //Now we construct and used the response to the user with their auth tokens in the header and the user ovject in the body
        res
        .header('x-refresh-token',authTokens.refreshToken)
        .header('x-access-token',authTokens.accessToken)
        .send(user);
       })
    }).catch((e)=>{
        res.status(400).send(e);
      });
})
/**
 * /users/me/access-token
 * purpose: generate and returns an access token
 */
app.get('/users/me/access-token',verifySession,(req,res)=>{
     //we know that the user is authenticated and the user id available to us

     req.userObject.generateAccessAuthToken().then((accessToken)=>{
        res.header('x-access-token', accessToken).send({ accessToken });
     }).catch((e) => {
        res.status(400).send(e);
    });
})

app.listen(4000,()=>{
    console.log("server is listening to port 4000");
})