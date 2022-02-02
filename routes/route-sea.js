const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('db.ps.db');

//when access sea
router.get('/', (req,res,next)=>{
    db.serialize(()=>{
        db.all('select * from sea', (err, contents)=>{
            if(!err){
                var data = {
                    content: contents,
                    flg:true
                }
                res.render('sea', data);

            }else{
                res.render('sea', {
                    content:'',
                    flg:true
                });
            }
        });
    })
});

router.post('/', (req, res, next)=>{
    const name = req.session.name;
    const d = new Date();
    const date = d.getFullYear() + '/' + (d.getMonth() + 1) + '/' + d.getDate();
    const time = d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
    const title = req.body.text;
    const text = req.body.textcontent;
    const imgurl = '22299638';
    if(name){
        db.serialize(()=>{
            db.run('insert into sea(username,date,time,title,text,imgurl) values(?,?,?,?,?,?)', name, date, time, title, text, imgurl);
        });
        res.redirect('/sea');
    }else{
        db.serialize(()=>{
            db.all('select * from sea', (err, contents)=>{
                if(!err){
                    var data = {
                        content: contents,
                        flg:false
                    }
                    res.render('sea', data);

                }else{
                    res.render('sea', {
                        content:'',
                        flg:true
                    });
                }
            });
        })
    }
});

router.post('/search', (req, res, next)=>{
    const word = '"%' + req.body.search_word + '%"';
    db.serialize(()=>{
        if(word){
            db.all('select * from sea where title like ' + word + ' or text like ' + word, (err, rows)=>{
                let date = {
                    content: rows
                };
                res.render('sea', date);
            });
        }else{
            db.all('select * from sea', (err, contents)=>{
                if(!err){
                    var data = {
                        content: contents
                    }
                    res.render('sea', data);

                }else{
                    res.render('sea', {
                        content:''
                    });
                }
            });
        }
    })
});
module.exports = router;