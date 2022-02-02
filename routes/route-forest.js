const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('db.ps.db');

router.get('/', (req, res, next)=>{
    db.serialize(()=>{
        db.all('select * from forest', (err, rows)=>{
            let data = {
                content: rows,
                findout: '',
                search: ''
            };
            res.render('forest/index', data);
        });
    });
});
router.post('/', (req, res, next)=>{
    const find = '"%' + req.body.find + '%"';
    const category = "'"+req.body.category+"'";
    db.serialize(()=>{
        db.all('select * from forest where name like '+find+' and category = '+category,(err, datas)=>{
            let data = {
                content: '',
                findout: datas,
                search: ''
            }
            res.render('forest/index', data);
        });
    });
});
router.get('/:char', (req, res, next)=>{
    var char = '"' + req.params.char + '%"';
    db.serialize(()=>{
        db.all('select * from forest where name like ' + char, (err, datas)=>{
            let data = {
                content: '',
                findout: '',
                search: datas
            };
            res.render('forest/index', data);
        });
    });
});

router.get('/person/:name', (req, res, next)=>{
    const person = req.params.name;
    db.serialize(()=>{
        db.all('select * from forest where person=?', person, (err, datas)=>{
            let data = {
                person:person,
                content: datas
            }
            res.render('forest/person', data);
        });
    });
});

module.exports = router;