const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');

const User = require('../models/user');
const Smart = require('../models/smart');
const Rehearsal = require('../models/rehearsal');

// Register
router.post('/register', (req, res, next) => {
    let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    });

    User.addUser(newUser, (err, user) => {
        if (err){
            res.json({success: false, msg: 'Failed to register user'});
        } else {
            res.json({success: true, msg: 'user registered'})
        }
    })
});

// Authenticate
router.post('/authenticate', (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    User.getUserByUsername(username, (err, user) => {
        if(err) throw err;
        if(!user) {
            return res.json({success: false, msg: 'User not found'});
        }

        User.comparePassword(password, user.password, (err, isMatch) => {
            if(err) throw err;
            if(isMatch) {
                const token = jwt.sign({data: user}, config.secret, {
                    expiresIn: 604800 // 1 week
                });

                res.json({
                    success: true,
                    token: `Bearer ${token}` ,
                    user: {
                        id: user._id,
                        name: user.name,
                        username: user.username,
                        email: user.email
                    }
                });
            } else {
                return res.json({success: false, msg: 'Wrong password'})
            }
        })
    })
});

// Profile
router.get('/profile', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    // res.send('profile');
    res.json({user: req.user});
});

// Dashboard
// router.get('/dashboard', passport.authenticate('jwt', {session: false}), (req, res, next) => {
//     res.send('dashboard');
//     // res.json({user: req.user});
// });

// Smart Form
router.post('/dashboard/smart/add', (req, res, next) => {
    let newSmart = new Smart({
        subject: req.body.subject,
        speciafic: req.body.speciafic,
        measurable: req.body.measurable,
        achievable: req.body.achievable,
        relevant: req.body.relevant,
        timeBased: req.body.timeBased,
        ratio: req.body.ratio
    });


    Smart.addSmart(newSmart, (err, smart) => {
        if (err){
            res.json({success: false, msg: 'Failed to add SMART form'});
        } else {
            res.json({smart, success: true,  msg: 'SMART Created'});
        }
    })
});

router.post('/dashboard/smart/update', (req, res, next) => {
    const smartId = req.query.smartId;
    let newSmart = req.body
    console.log(smartId,newSmart);

    Smart.updateSmart(smartId,newSmart, (err, smart) => {
        if (err){
            res.json({success: false, msg: 'Failed to update SMART form'});
        } else {
            res.json({success: true, msg: 'SMART Updated'})
        }
    })
});

router.get('/dashboard/smart', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    const smartId = req.query.smartId;
    console.log(smartId);
    // res.json({smart: req.smart});
    Smart.getSmartById(smartId, (err, smart) => {
        if(err) throw err;
        if(!smart) {
            return res.json({success: false, msg: 'Smart Form not found'});
        } else {
            res.json({
                success: true,
                smart: {
                    id: smart._id,
                    subject: smart.subject,
                    speciafic: smart.speciafic,
                    measurable: smart.measurable,
                    achievable: smart.achievable,
                    relevant: smart.relevant,
                    timeBased: smart.timeBased,
                    ratio: smart.ratio
                }
            })
        }
    })
});

router.post('/dashboard/smart/remove', (req, res, next) => {
    const smartId = req.query.smartId;
    console.log(smartId);

    Smart.removeSmart(smartId, (err, smart) => {
        if (err){
            res.json({success: false, msg: 'Failed to remove SMART form'});
        } else {
            res.json({success: true, msg: 'SMART removed'})
        }
    })
});

// Rehearsal Form
router.post('/dashboard/rehearsal/add', (req, res, next) => {
    let newDoc = new Rehearsal({
        subject: req.body.subject,
        deadline: req.body.deadline,
        money: req.body.money,
        hp: req.body.hp,
        mp: req.body.mp,
        policy: req.body.policy,
        problem: req.body.problem,
        ratio: req.body.ratio
    });


    Rehearsal.addRehearsal(newDoc, (err, rehearsal) => {
        if (err){
            res.json({success: false, msg: 'Failed to add Rehearsal form'});
        } else {
            res.json({rehearsal, success: true,  msg: 'Rehearsal Form Created'});
        }
    })
});

router.post('/dashboard/rehearsal/update', (req, res, next) => {
    const Id = req.query.rehearsalId;
    let newDoc = req.body
    console.log(Id, newDoc);

    Rehearsal.updateRehearsal(Id, newDoc, (err, doc) => {
        if (err){
            res.json({success: false, msg: 'Failed to update Rehearsal form'});
        } else {
            res.json({success: true, msg: 'Rehearsal Form Updated'})
        }
    })
});

router.get('/dashboard/Rehearsal', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    const Id = req.query.rehearsalId;
    console.log(Id);
    // res.json({smart: req.smart});
    Rehearsal.getRehearsalById(Id, (err, doc) => {
        if(err) throw err;
        if(!doc) {
            return res.json({success: false, msg: 'Rehearsal Form not found'});
        } else {
            res.json({
                success: true,
                rehearsal: {
                    id: doc._id,
                    subject: doc.subject,
                    deadline: doc.deadline,
                    money: doc.money,
                    hp: doc.hp,
                    mp: doc.mp,
                    policy: doc.policy,
                    problem: doc.problem,
                    ratio: doc.ratio
                }
            })
        }
    })
});

router.post('/dashboard/rehearsal/remove', (req, res, next) => {
    const Id = req.query.rehearsalId;
    console.log(Id);

    Smart.removeSmart(Id, (err, doc) => {
        if (err){
            res.json({success: false, msg: 'Failed to remove Rehearsal form'});
        } else {
            res.json({success: true, msg: 'Rehearsal Form removed'})
        }
    })
});


module.exports = router;