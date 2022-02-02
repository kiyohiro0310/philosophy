const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('db.ps.db');


/* GET home page. */
router.get('/', function(req, res, next) {
  const name = req.session.name;
  const pass = req.session.pass;
  db.serialize(()=>{
    db.get('select * from user where username=? and password=?', name,pass,(err,row)=>{
      if(row){
        db.serialize(()=>{
          db.all('select * from sea', (err, contents_sea)=>{
            db.all('select * from forest', (err, contents_forest)=>{
              let data = {
                account_name: name,
                content_sea: contents_sea,
                content_forest: contents_forest,
                result:''
              }
              res.render('home/index', data);
            })
          });
        });
      }else{
        db.serialize(()=>{
          db.all('select * from sea', (err, contents_sea)=>{
            db.all('select * from forest', (err, contents_forest)=>{
              let data = {
                account_name: '',
                content_sea: contents_sea,
                content_forest: contents_forest,
                result:''
              }
              res.render('home/index', data);
            })
          });
        });
      }
    });
  })
});

router.get('/signup', (req, res, next)=>{
  res.render('home/signup', {
    title: 'アカウント作成',
    result: '',
  });
});

router.post('/signup', (req, res, next)=>{
  const name = req.body.su_name;
  const mail = req.body.su_mail;
  const password = req.body.su_pass;
  const pass_confirm = req.body.su_confirm;
  const check = req.body.su_check;
  if(password === pass_confirm && check != undefined){
    db.serialize(()=>{
      db.run('insert into user(username,password,email) values(?,?,?)', name, password, mail);
      db.all('select * from sea', (err, sea_contents)=>{
        let data = {
          content_sea: sea_contents,
          result: 'アカウントを作成しました',
          account_name: req.session.name
        }
        res.render('home', data);
      })
    });
  }else{
    res.render('home/signup', {
      title: 'アカウント作成',
      result: 'アカウント作成できませんでした',
      account_name: ''
    });
  }
});

router.get('/check', (req, res, next)=>{
  res.render('home/check', {
    title: 'アカウント情報の取得',
    result:''
  });
});

router.post('/check', (req, res, next)=>{
  const mail = req.body.su_mail;
  if(mail == ''){
    res.render('home/check', {
      title: 'アカウント情報の取得',
      result:'<p style="color:red">Emailアドレスを入力して下さい</p>'
    });
  }else{
    res.render('home/check', {
      title: 'アカウント情報の取得',
      result: '<p>' + mail + 'にパスワード再設定用のメールを送信しました</p>'
    });
  }
});
router.post('/login', (req, res, next)=>{
  req.session.name = req.body.name;
  req.session.pass = req.body.pass;
  res.redirect('/home');
});
router.get('/logout', (req, res, next)=>{
  req.session.name = '';
  req.session.pass = '';
  req.session.email = '';
  res.redirect('/home');
});
router.get('/account/:account_name', (req, res, next)=>{
  const name = req.params.account_name;
  const pass = req.session.pass;
  db.serialize(()=>{
    db.get('select * from user where username=? and password=?', name, pass, (err, row)=>{
      db.all('select * from sea where username=? and email=?', name, row.email, (err, datas)=>{
        let data = {
          name: name,
          pass: pass,
          mail: row.email,
          title: 'アカウント情報',
          content: datas
        }
        res.render('home/account', data);
      });
    });
  });
});
router.get('/info/:account_name', (req, res, next)=>{
  const name = req.params.account_name;
  db.serialize(()=>{
    db.get('select * from user where username=?', name, (err, row)=>{
      db.all('select * from sea where username=?', name, (err, datas)=>{
        let data = {
          name: name,
          intro: row.intro,
          title: 'アカウント情報',
          content: datas
        }
        res.render('home/info', data);
      });
    });
  });
});

router.get('/faq', (req, res, next)=>{
  res.render('home/faq', {});
});
router.post('/faq', (req, res, next)=>{

});

module.exports = router;