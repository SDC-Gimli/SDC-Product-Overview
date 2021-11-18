const express = require('express');
const db = require('../data/db.js');
const path = require('path');
const axios = require('axios');
const app = express();
const port = 3000;
// console.log(__dirname);
// console.log(path.join(__dirname, '../auth.js'));
// console.log(path.join(__dirname, '../client/dist/'));
const apiUrl = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/';
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//app.use(express.static(path.join(__dirname, '../client/dist/')));
app.get('/api/products/*', (req, res) => {
  console.log('get products url: ', req.originalUrl);
  const p_id = req.originalUrl.replace('/api/products/','');
  console.log(p_id, 'product id');
  // db.connect().then(obj => {
  //   sco = obj;
  //   return sco.any('select * from products');
  // }).then(data => {
  //   console.log(data)
  // })
  // db.each('select url, thumbnail_url from photos where product where style_id = 2', [], row => {

  // }).then(data => {
  //   console.log(data);
  // }).catch(err => {
  //   console.log(err,'err');
  // })

  var response = {};
  // db.any(`select products.id, products.name, products.slogan, products.description, products.category, products.default_price, features.feature, features.value from products inner join features on products.id = features.product_id and products.id = ${p_id}`).then(data => {
  //   console.log(data);
  // });

  // db.query(`select * from products where product_id = ${p_id}`).then(data => {
  //   response = data;
  // }).then(db.query(`select feature, value from features where product_id = ${p_id}`)).then(result => {
  //   console.log(result,'features');
  //   response.features = result;
  //   console.log(response,' here');
  // })

  // // map features into array
  // db.any(`select products.id, products.name, products.slogan, products.description, products.category, products.default_price, features.feature, features.value from products, features where products.id = features.product_id and features.product_id = ${p_id}`).then(data => {
  //   console.log(data);
  //   console.log('finish');
  // }).catch( err => {
  //   console.log(err,'err');
  // })

  //styles
  db.any(`select styles.style_id, styles.product_name, styles.original_price, styles.sale_price, styles.default_style, photos.url, photos.thumbnail_url, skus.id, skus.quantity, skus.size from styles, skus, photos where styles.product_id = ${p_id} and styles.style_id = skus.style_id and styles.style_id = photos.style_id`).then(data => {
    console.log(data);
    console.log('rgg');
  })

  // //related
  // db.any(`select related_product_id from related_products where current_product_id = ${p_id}`).then(data => {
  //   console.log(data);
  //   let related_array = data.map(obj => {
  //     //console.log(obj['related_product_id']);
  //     return obj['related_product_id']
  //   })
  //   console.log(related_array,'new')
  // })



  // db.any(`select * from products where product_id = ${p_id}`).then(data => {
  //   console.log(data);
  //   console.log(data[0]['product_name']);
  //   res.send(data);
  // })
  // db.any(`select url, thumbnail_url from photos where style_id = ${p_id}`).then(data => {
  //   console.log(data);
  //   res.send(JSON.stringify(data));
  // })
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});


// app.get('/api/*', (req, res) => {
//   console.log('get api: ');
//   console.log(req.originalUrl);
//   const postfix = req.originalUrl.replace('/api/', '');
//   axios({
//     method: 'get',
//     url: apiUrl + postfix,
//     headers: {'Authorization': key, 'Accept-encoding': 'gzip, deflate'},
//     data: req.body,
//   }).then((results) => {
//     //console.log(results.data);
//     res.json((results.data));
//   }).catch((error) => {
//     res.status(error.response.status);
//     // console.log(error.response.data);
//     res.json(error.response.data);
//   });
// });