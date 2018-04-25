const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');

const User = require('../models/user');
const Smart = require('../models/smart');
const Rehearsal = require('../models/rehearsal');
const Post = require('../models/post');
const Operation = require('../models/operation');
const Resume = require('../models/resume');
const Deal = require('../models/deal');
const Logic = require('../models/logic');
const Emotion = require('../models/emotion');
const Ask = require('../models/ask');

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
            console.log('add Smart:', smart._id)
        }
    })
});

router.post('/dashboard/smart/update', (req, res, next) => {
    const smartId = req.query.smartId;
    let newSmart = req.body
    console.log('update smart: ',smartId,newSmart);

    Smart.updateSmart(smartId,newSmart, (err, smart) => {
        if (err){
            res.json({success: false, msg: 'Failed to update SMART form'});
        } else {
            res.json({smart, success: true, msg: 'SMART Updated'})
        }
    })
});

router.get('/dashboard/smart', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    const smartId = req.query.smartId;
    console.log('get smart: ',smartId);
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
    console.log('remove smart: ',smartId);

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
            console.log('add Post:', rehearsal._id)
        }
    })
});

router.post('/dashboard/rehearsal/update', (req, res, next) => {
    const Id = req.query.rehearsalId;
    let newDoc = req.body
    console.log('update rehearsal: ',Id, newDoc);

    Rehearsal.updateRehearsal(Id, newDoc, (err, rehearsal) => {
        if (err){
            res.json({success: false, msg: 'Failed to update Rehearsal form'});
        } else {
            res.json({rehearsal, success: true, msg: 'Rehearsal Form Updated'})
        }
    })
});

router.get('/dashboard/Rehearsal', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    const Id = req.query.rehearsalId;
    console.log('get rehearsal: ',Id);
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
    console.log('remove rehearsal: ',Id);

    Rehearsal.removeRehearsal(Id, (err, doc) => {
        if (err){
            res.json({success: false, msg: 'Failed to remove Rehearsal form'});
        } else {
            res.json({success: true, msg: 'Rehearsal Form removed'})
        }
    })
});

// Post Form
router.post('/dashboard/post/add', (req, res, next) => {
    let newDoc = new Post({
        subject: req.body.subject,
        userId: req.body.userId,
        smartId: req.body.smartId,
        rehearsalId: req.body.rehearsalId,
        operationId: req.body.operationId,
        result: req.body.result,
        resumeId: req.body.resumeId,
        askId: req.body.askId,
        other: req.body.other
    });


    Post.addPost(newDoc, (err, post) => {
        if (err){
            res.json({success: false, msg: 'Failed to add Post form'});
        } else {
            res.json({post, success: true,  msg: 'Post Form Created'});
            console.log('add Post:', post._id)
        }
    })
});

router.post('/dashboard/post/update', (req, res, next) => {
    const Id = req.query.postId;
    let newDoc = req.body
    console.log('update post: ',Id, newDoc);

    Post.updatePost(Id, newDoc, (err, doc) => {
        if (err){
            res.json({success: false, msg: 'Failed to update post form'});
        } else {
            res.json({success: true, msg: 'Post Form Updated'})
        }
    })
});

router.get('/dashboard/post', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    const Id = req.query.postId;
    console.log('get post: ',Id);
    // res.json({smart: req.smart});
    Post.getPostById(Id, (err, post) => {
        if(err) throw err;
        if(!doc) {
            return res.json({success: false, msg: 'Post Form not found'});
        } else {
            res.json({
                success: true,
                post
            })
        }
    })
});

router.post('/dashboard/post/remove', (req, res, next) => {
    const Id = req.query.postId;
    console.log(Id);

    Post.removePost(Id, (err, doc) => {
        if (err){
            res.json({success: false, msg: 'Failed to remove post form'});
        } else {
            res.json({success: true, msg: 'Post Form removed'})
        }
    })
});

// Operation Form
router.post('/dashboard/operation/add', (req, res, next) => {
    let newDoc = new Operation({
        subject: req.body.subject,
        parentId: req.body.parentId,
        step: req.body.step,
        done: req.body.done,
        result: req.body.result
    });


    Operation.addOperation(newDoc, (err, operation) => {
        if (err){
            res.json({success: false, msg: 'Failed to add Operation form'});
        } else {
            res.json({operation, success: true,  msg: 'Operation Form Created'});
            console.log('add Operation:', operation._id)
        }
    })
});

router.post('/dashboard/operation/update', (req, res, next) => {
    const Id = req.query.operationId;
    let newDoc = req.body
    console.log('update operation: ',Id, newDoc);

    Operation.updateOperation(Id, newDoc, (err, operation) => {
        if (err){
            res.json({success: false, msg: 'Failed to update operation form'});
        } else {
            res.json({operation, success: true, msg: 'Operation Form Updated'})
        }
    })
});

router.get('/dashboard/operation', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    const Id = req.query.operationId;
    console.log('getOperation: ',Id);
    // res.json({smart: req.smart});
    Operation.getOperationById(Id, (err, operation) => {
        if(err) throw err;
        if(!doc) {
            return res.json({success: false, msg: 'Operation Form not found'});
        } else {
            res.json({
                success: true,
                operation
            })
        }
    })
});

router.post('/dashboard/operation/remove', (req, res, next) => {
    const Id = req.query.operationId;
    console.log('remove operation: ',Id);

    Operation.removeOperation(Id, (err, doc) => {
        if (err){
            res.json({success: false, msg: 'Failed to remove operation form'});
        } else {
            res.json({success: true, msg: 'Operation Form removed'})
        }
    })
});

// Resume Form
router.post('/dashboard/resume/add', (req, res, next) => {
    let newDoc = new Resume({
        subject: req.body.subject,
        userId: req.body.userId,
        redefine: req.body.redefine,
        ego: req.body.ego,
        learn: req.body.learn,
        habit: req.body.habit,
        emotion: req.body.emotion,
        other: req.body.other
    });


    Resume.addResume(newDoc, (err, resume) => {
        if (err){
            res.json({success: false, msg: 'Failed to add Resume form'});
        } else {
            res.json({resume, success: true,  msg: 'Resume Form Created'});
            console.log('add Resume:', resume._id)
        }
    })
});

router.post('/dashboard/resume/update', (req, res, next) => {
    const Id = req.query.resumeId;
    let newDoc = req.body
    console.log('update resume: ',Id, newDoc);

    Resume.updateResume(Id, newDoc, (err, doc) => {
        if (err){
            res.json({success: false, msg: 'Failed to update resume form'});
        } else {
            res.json({success: true, msg: 'Resume Form Updated'})
        }
    })
});

router.get('/dashboard/resume', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    const Id = req.query.resumeId;
    console.log('getResume: ',Id);
    // res.json({smart: req.smart});
    Resume.getResumeById(Id, (err, resume) => {
        if(err) throw err;
        if(!doc) {
            return res.json({success: false, msg: 'Resume Form not found'});
        } else {
            res.json({
                success: true,
                resume
            })
        }
    })
});

router.post('/dashboard/resume/remove', (req, res, next) => {
    const Id = req.query.resumeId;
    console.log('remove resume: ',Id);

    Resume.removeResume(Id, (err, doc) => {
        if (err){
            res.json({success: false, msg: 'Failed to remove resume form'});
        } else {
            res.json({success: true, msg: 'Resume Form removed'})
        }
    })
});

// Deal Form
router.post('/dashboard/deal/add', (req, res, next) => {
    let newDoc = new Deal({
        compass: req.body.compass,
        importion: req.body.importion,
        dodont: req.body.dodont,
        dynamic: req.body.dynamic,
        imformation: req.body.imformation,
        result: req.body.result,
        ouput: req.body.ouput
    });


    Deal.addDeal(newDoc, (err, Deal) => {
        if (err){
            res.json({success: false, msg: 'Failed to add Deal form'});
        } else {
            res.json({Deal, success: true,  msg: 'Deal Form Created'});
            console.log('add Deal:', Deal._id)
        }
    })
});

router.post('/dashboard/deal/update', (req, res, next) => {
    const Id = req.query.DealId;
    let newDoc = req.body
    console.log('update Deal: ',Id, newDoc);

    Deal.updateDeal(Id, newDoc, (err, Deal) => {
        if (err){
            res.json({success: false, msg: 'Failed to update Deal form'});
        } else {
            res.json({Deal, success: true, msg: 'Deal Form Updated'})
        }
    })
});

router.get('/dashboard/deal', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    const Id = req.query.DealId;
    console.log('getDeal: ',Id);
    // res.json({smart: req.smart});
    Deal.getDealById(Id, (err, Deal) => {
        if(err) throw err;
        if(!doc) {
            return res.json({success: false, msg: 'Deal Form not found'});
        } else {
            res.json({
                success: true,
                Deal
            })
        }
    })
});

router.post('/dashboard/Deal/remove', (req, res, next) => {
    const Id = req.query.DealId;
    console.log('remove Deal: ',Id);

    Deal.removeDeal(Id, (err, doc) => {
        if (err){
            res.json({success: false, msg: 'Failed to remove Deal form'});
        } else {
            res.json({success: true, msg: 'Deal Form removed'})
        }
    })
});

// Emotion Form
router.post('/dashboard/emotion/add', (req, res, next) => {
    let newDoc = new Emotion({
        hp: req.body.hp,
        mp: req.body.mp,
        hpDeal: req.body.hpDeal,
        mpDeal: req.body.mpDeal,
        result: req.body.result
    });


    Emotion.addEmotion(newDoc, (err, Emotion) => {
        if (err){
            res.json({success: false, msg: 'Failed to add Emotion form'});
        } else {
            res.json({Emotion, success: true,  msg: 'Emotion Form Created'});
            console.log('add Emotion:', Emotion._id)
        }
    })
});

router.post('/dashboard/emotion/update', (req, res, next) => {
    const Id = req.query.EmotionId;
    let newDoc = req.body
    console.log('update Emotion: ',Id, newDoc);

    Emotion.updateEmotion(Id, newDoc, (err, doc) => {
        if (err){
            res.json({success: false, msg: 'Failed to update Emotion form'});
        } else {
            res.json({success: true, msg: 'Emotion Form Updated'})
        }
    })
});

router.get('/dashboard/emotion', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    const Id = req.query.EmotionId;
    console.log('getEmotion: ',Id);
    // res.json({smart: req.smart});
    Emotion.getEmotionById(Id, (err, Emotion) => {
        if(err) throw err;
        if(!doc) {
            return res.json({success: false, msg: 'Emotion Form not found'});
        } else {
            res.json({
                success: true,
                Emotion
            })
        }
    })
});

router.post('/dashboard/emotion/remove', (req, res, next) => {
    const Id = req.query.EmotionId;
    console.log('remove Emotion: ',Id);

    Emotion.removeEmotion(Id, (err, doc) => {
        if (err){
            res.json({success: false, msg: 'Failed to remove Emotion form'});
        } else {
            res.json({success: true, msg: 'Emotion Form removed'})
        }
    })
});

// Logic Form
router.post('/dashboard/logic/add', (req, res, next) => {
    let newDoc = new Logic({
        existState: req.body.existState,
        existCollect: req.body.existCollect,
        existPolicy: req.body.existPolicy,
        dexistResult: req.body.dexistResult,
        unknowDeal: req.body.unknowDeal,
        programRehearsal: req.body.programRehearsal,
        programDeal: req.body.programDeal,
        result: req.body.result
    });


    Logic.addLogic(newDoc, (err, Logic) => {
        if (err){
            res.json({success: false, msg: 'Failed to add Logic form'});
        } else {
            res.json({Logic, success: true,  msg: 'Logic Form Created'});
            console.log('add Logic:', Logic._id)
        }
    })
});

router.post('/dashboard/logic/update', (req, res, next) => {
    const Id = req.query.LogicId;
    let newDoc = req.body
    console.log('update Logic: ',Id, newDoc);

    Logic.updateLogic(Id, newDoc, (err, doc) => {
        if (err){
            res.json({success: false, msg: 'Failed to update Logic form'});
        } else {
            res.json({success: true, msg: 'Logic Form Updated'})
        }
    })
});

router.get('/dashboard/logic', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    const Id = req.query.LogicId;
    console.log('getLogic: ',Id);
    // res.json({smart: req.smart});
    Logic.getLogicById(Id, (err, Logic) => {
        if(err) throw err;
        if(!doc) {
            return res.json({success: false, msg: 'Logic Form not found'});
        } else {
            res.json({
                success: true,
                Logic
            })
        }
    })
});

router.post('/dashboard/logic/remove', (req, res, next) => {
    const Id = req.query.LogicId;
    console.log('remove Logic: ',Id);

    Logic.removeLogic(Id, (err, doc) => {
        if (err){
            res.json({success: false, msg: 'Failed to remove Logic form'});
        } else {
            res.json({success: true, msg: 'Logic Form removed'})
        }
    })
});

// Ask Form
router.post('/dashboard/ask/add', (req, res, next) => {
    let newDoc = new Ask({
        ration: req.body.ration,
        process: req.body.process,
        result: req.body.result
    });


    Ask.addAsk(newDoc, (err, Ask) => {
        if (err){
            res.json({success: false, msg: 'Failed to add Ask form'});
        } else {
            res.json({Ask, success: true,  msg: 'Ask Form Created'});
            console.log('add Ask:', Ask._id)
        }
    })
});

router.post('/dashboard/ask/update', (req, res, next) => {
    const Id = req.query.AskId;
    let newDoc = req.body
    console.log('update Ask: ',Id, newDoc);

    Ask.updateAsk(Id, newDoc, (err, doc) => {
        if (err){
            res.json({success: false, msg: 'Failed to update Ask form'});
        } else {
            res.json({success: true, msg: 'Ask Form Updated'})
        }
    })
});

router.get('/dashboard/ask', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    const Id = req.query.AskId;
    console.log('getAsk: ',Id);
    // res.json({smart: req.smart});
    Ask.getAskById(Id, (err, Ask) => {
        if(err) throw err;
        if(!doc) {
            return res.json({success: false, msg: 'Ask Form not found'});
        } else {
            res.json({
                success: true,
                Ask
            })
        }
    })
});

router.post('/dashboard/ask/remove', (req, res, next) => {
    const Id = req.query.AskId;
    console.log('remove Ask: ',Id);

    Ask.removeAsk(Id, (err, doc) => {
        if (err){
            res.json({success: false, msg: 'Failed to remove Ask form'});
        } else {
            res.json({success: true, msg: 'Ask Form removed'})
        }
    })
});


module.exports = router;