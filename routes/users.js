const router = require('express').Router();
const User = require('../models/user.model');
const UserSession = require('../models/usersession.model');

router.route('/add').post((req, res)=>{
    console.log(req.body);
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const email = req.body.email.toLowerCase();
    const password = req.body.password;
    const category = req.body.category;
    const date = new Date();

    const newUser =  new User({
        firstname, lastname, email, password, category, date
    });
    newUser.password = newUser.generateHash(newUser.password);

    newUser.save()
    .then(()=>res.json('new user added: '+ firstname +', you may now sign in'))
    .catch(err => res.status(400).json('Error: '+err))
});

router.route('/').get((req, res)=>{
    User.find()
    .then(users=>res.json(users))
    .catch(err => res.status(400).json('Error: '+ err))
});

router.route('/:id').get((req, res)=>{
    User.findById(req.params.id)
    .then(user=>res.json(user))
    .catch(err => res.status(400).json('Error: '+ err))
});

router.route('/:id').delete((req, res)=>{
    newUser.findByIdAndDelete(req.params.id)
    .then(()=>res.json('user deleted succesfully'))
    .catch(err => res.status(400).json('Error: '+ err))
});

router.route('/update/:id').post((req, res)=>{

    newUser.findById(req.params.id)
    .then(user => {
        user.firstname = req.body.firstname;
        user.lastname = req.body.lastname;
        user.email = req.body.email.toLowerCase();
        user.password = req.body.password.generateHash(password);
        user.category = req.body.category;
        user.date = new Date();

        user.save()
        .then(()=>res.json(`user${firstname} updated`))
        .catch(err => res.status(400).json('Error: '+err))
    })
    .catch(err => res.status(400).json('Error: '+err))
});

router.route('/update_profile/:id').post((req, res)=>{

    newUser.findById(req.params.id)
    .then(user => {
        const pass = req.body.oldpassword;
        // const user = users[0];
        if(!user.validPassword(pass)){
            res.json({success: false, message: 'Invalid Password'});
        }
        user.firstname = req.body.firstname;
        user.lastname = req.body.lastname;
        user.email = req.body.email.toLowerCase();
        user.password = req.body.password.generateHash(password);
        // user.category = req.body.category;
        // user.date = new Date();

        user.save()
        .then(()=>res.json(`user${firstname} updated`))
        .catch(err => res.status(400).json('Error: '+err))
    })
    .catch(err => res.status(400).json('Error: '+err))
});

router.route('/signin').post((req, res, next)=>{
    const pass = req.body.password;
    User.find({email: req.body.email})
    .then(users=>{
        // console.log(users.length);
        if(users.length !== 1){
            res.json({success: false, message: 'Invalid User'});
        }
        const user = users[0];
        if(!user.validPassword(pass)){
            res.json({success: false, message: 'Invalid Password'});
        }
        UserSession.find({'userId': user._id})
        .then(sessions=>{
            // console.log(sessions.length);
            if(sessions.length == 0){
                console.log('no session set before');
                const userSession = new UserSession();
                userSession.userId = user._id;
                console.log(userSession);
                userSession.save()
                .then(()=>{res.json({success: true, message: 'Valid sign in2', token: user._id, user: user.firstname+" "+user.lastname});console.log(userSession.userId);})
                .catch((err)=>{res.status(400).json('Error: '+ err);console.log(err);})
            } else {
                const session = sessions[0];
                session.isDeleted = false;
                console.log(session.isDeleted);
                console.log(session.userId);
                // console.log('this might');
                session.save()
                    .then(()=>{res.json({success: true, message: 'Valid sign in', token: user._id, user: user.firstname+" "+user.lastname});})
                    .catch((err)=>{res.status(400).json('Error: '+ err);console.log(err);})
            }
            
        })
        .catch(err => res.status(400).json('Error: '+ err))
    })
    .catch(err => res.status(400).json('Error: '+ err))
});

router.route('/verify/:token').get((req, res)=>{
    console.log(req.params.token);
    UserSession.find({userId: req.params.token, isDeleted: false})
    .then(users=>{
        console.log(users.length);
        if(users.length !== 1){
            res.json('Invalid user');
        } else {
            User.find({_id: req.params.token})
            .then(persons=>{
                const person = persons[0];
            const user = users[0];
            res.json({success: true, message: 'not deleted', token: user.token, mail: person.email, user: person.firstname+" "+person.lastname});
        })
        .catch(err => res.status(400).json('Error: '+ err))
        }
    })
    .catch(err => res.status(400).json('Error: '+ err))
    // {success: true, message: err, token: user.token}
});

//logout
router.route('/logout/:token').get((req, res, next)=>{
    UserSession.find({userId: req.params.token, isDeleted: false})
    .then(users=>{
        if(users.length !== 1){
            res.json('Invalid user');
        }
        const user = users[0];
        user.isDeleted = true;
        user.save()
        .then(()=>res.json('session is deleted'))
        .catch(err => res.status(400).json('Error: '+err))
    })
    .catch(err => res.status(400).json('Error: '+ err))
});

module.exports = router;