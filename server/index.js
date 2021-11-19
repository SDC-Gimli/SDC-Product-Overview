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
app.use(express.urlencoded({ extended: true }));

app.get('/api/products/*', async (req, res) => {
  console.log('url: ', req.originalUrl);
  let prod_id = req.originalUrl.replace('/api/products/', '');
  console.log(prod_id, 'product id');
  let response = {};
  if (req.originalUrl.includes('styles')) {
    prod_id = prod_id.replace('/styles', '');
    response.product_id = prod_id;
    console.log(prod_id);
    let info = await db.query(`select s.style_id, s.name, s.original_price, s.sale_price, s.default_style as "default?", json_agg(json_build_object('thumbnail_url', p.thumbnail_url, 'url', p.url)) photos from styles as s inner join photos as p on s.style_id = p.style_id and s.product_id = ${prod_id} group by s.style_id`);
    for (let obj of info) {
      obj.skus = await db.query(`select json_object_agg(id, json_build_object('quantity', quantity, 'size', size)) skus from skus where style_id = ${obj['style_id']}`);
    };
    // let info = await db.query(`select styles.style_id as style_id, styles.product_name as name, styles.original_price, styles.sale_price, styles.default_style as "default?", json_agg(json_build_object('url', photos.url, 'thumbnail_url', photos.thumbnail_url)) photos, json_object_agg(skus.id, json_build_object('quantity', skus.quantity, 'size', skus.size)) skus from photos inner join styles on styles.product_id = ${prod_id} and styles.style_id = photos.style_id inner join skus on styles.style_id = skus.style_id group by styles.style_id`);
    // let skus = await db.query(`select json_object_agg(id, json_build_object('quantity', quantity, 'size', size)) skus from skus where style_id = products.style_id`);
    // console.log(skus, 'test');
    console.log(info,'what')
    response.results = info;
    res.send(response);
  } else if (req.originalUrl.includes('related')) {
    prod_id = prod_id.replace('/related', '');
    let info = await db.query(`select related_product_id from related_products where current_product_id = ${prod_id}`);
    let related_arr = info.map(obj => {
      return obj['related_product_id'];
    });
    console.log(related_arr);
    res.send(related_arr);
  } else {
  let info = await db.query(`select products.id, products.name, products.slogan, products.description, products.category, products.default_price, json_agg (json_build_object ('feature', features.feature, 'value', features.value)) as features from products inner join features on products.id = features.product_id and products.id = ${prod_id} group by products.id`);
  response = info;
  res.send(response);
  }
});
// app.get('/api/products/*', (req, res) => {
//   console.log('get products url: ', req.originalUrl);
//   const p_id = req.originalUrl.replace('/api/products/', '');
//   console.log(p_id, 'product id');
//   // db.connect().then(obj => {
//   //   sco = obj;
//   //   return sco.any('select * from products');
//   // }).then(data => {
//   //   console.log(data)
//   // })
//   // db.each('select url, thumbnail_url from photos where product where style_id = 2', [], row => {

//   // }).then(data => {
//   //   console.log(data);
//   // }).catch(err => {
//   //   console.log(err,'err');
//   // })

//   var response = {};
//   // db.any(`select products.id, products.name, products.slogan, products.description, products.category, products.default_price, features.feature, features.value from products inner join features on products.id = features.product_id and products.id = ${p_id}`).then(data => {
//   //   console.log(data);
//   // });

//   // db.query(`select * from products where product_id = ${p_id}`).then(data => {
//   //   response = data;
//   // }).then(db.query(`select feature, value from features where product_id = ${p_id}`)).then(result => {
//   //   console.log(result,'features');
//   //   response.features = result;
//   //   console.log(response,' here');
//   // })

//   //get by product_id
//   // db.query(`select products.product_id, products.product_name, products.slogan, products.description, products.category, products.default_price, json_agg (json_build_object ('feature', features.feature, 'value', features.value)) as features from products inner join features on products.product_id = features.product_id and products.product_id = ${p_id} group by products.product_id`).then(data => {
//   //   console.log(data);
//   //   console.log(data[0].features);
//   //   console.log('fin')
//   // })

//   //styles
//   var style;
//   // db.query(`select json_build_object('results', json_agg(json_build_object('style_id', styles.style_id, 'name', styles.product_name, 'original_price', styles.original_price, 'sale_price', styles.sale_price, 'default?', styles.default_style, 'photos', photos, 'skus', sku))) styles from styles s inner join (select style.id, json_agg(json_build_object('thumbnail_url', photos.thumbnail_url, 'url', photos.url)) photos from photos p inner join (select style_id, json_agg (json_build_object('quantity', skus.quantity, 'size', skus.size)) sku from skus sk group by styles.style_id) sk on s.style_id = sk.style_id group by styles.style_id) p on s.styles_id = p.styles_id and s.product_id = ${p_id}`).then(data => {
//   //   console.log(data);
//   // })
//   // db.query(`(select json_object_agg(id, json_build_object('quantity', quantity, 'size', size)) skus from skus where style_id = products.style_id) UNION (select json_build_object('product_id',${p_id},'results', json_agg(json_build_object('style_id', styles.style_id, 'name', styles.name, 'original_price', styles.original_price, 'sale_price', styles.sale_price, 'default?', styles.default_style, json_agg(json_build_object('thumbnail_url', photos.thumbnail_url, 'url', photos.url)))) from styles, photos where styles_product_id = ${p_id}`).then(data => {
//   //   console.log(data);
//   //   console.log('done')
//   // })
//   // db.query(`with skus_table as (select skus.id, json_agg(json_build_object('quantity', skus.quantity, 'size', skus.size)) from skus s group by 1), skus as json_build_object('skus', skus_table), photos as (select styles_id, json_agg(json_build_object('url', photos.url, 'thumbnail_url', photos.thumbnail_url))photos from photos p)select json_build_object('results', json_agg(json_build_object('style_id', styles.style_id))) styles from styles s inner join photos p on p_style_id = s.style_id and s.style_id = ${p_id}`).then(data => {
//   //   console.log(data)
//   // })
//   // db.query(`select styles.style_id, styles.product_name, styles.original_price, styles.sale_price, styles.default_style, json_agg
//   //                         (json_build_object
//   //                           ('thumbnail_url', photos.thumbnail_url, 'url', photos.url)) as photos, json_build_object(skus.id, json_agg(json_build_object('quantity', skus.quantity, 'size', skus.size))) as sku
//   //                                       from styles inner join photos on styles.style_id = photos.style_id and styles.product_id = ${p_id} inner join skus on styles.style_id = skus.style_id and styles.product_id = ${p_id} group by styles.style_id, skus.id`).then(data => {
//   //   console.log(data);
//   //   style = data;
//   //   res.send(style);
//   // })
//   // db.query(`select styles.style_id, styles.product_name, styles.original_price, styles.sale_price, styles.default_style, json_agg
//   // (json_build_object
//   //   ('thumbnail_url', photos.thumbnail_url, 'url', photos.url)) as photos from styles inner join photos on styles.style_id = photos.style_id and styles.product_id = ${p_id} group by styles.style_id`).then(data => {
//   //     console.log(data);
//   //     console.log(data.photos);
//   //     res.send(data);
//   //     console.log('fin')
//   //   });
//   // db.any(`select styles.style_id, styles.product_name, styles.original_price, styles.sale_price, styles.default_style, photos.url, photos.thumbnail_url, skus.id, skus.quantity, skus.size from styles, skus, photos where styles.product_id = ${p_id} and styles.style_id = skus.style_id and styles.style_id = photos.style_id`).then(data => {
//   //   console.log(data);
//   //   console.log('rgg');
//   // })

//   // //related
//   // db.any(`select related_product_id from related_products where current_product_id = ${p_id}`).then(data => {
//   //   console.log(data);
//   //   let related_array = data.map(obj => {
//   //     //console.log(obj['related_product_id']);
//   //     return obj['related_product_id']
//   //   })
//   //   console.log(related_array,'new')
//   // })



//   // db.any(`select * from products where product_id = ${p_id}`).then(data => {
//   //   console.log(data);
//   //   console.log(data[0]['product_name']);
//   //   res.send(data);
//   // })
//   // db.any(`select url, thumbnail_url from photos where style_id = ${p_id}`).then(data => {
//   //   console.log(data);
//   //   res.send(JSON.stringify(data));
//   // })
// });

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