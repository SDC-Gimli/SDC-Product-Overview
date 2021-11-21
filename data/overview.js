const db = require('./db.js');

async function getAllStyles(page, count) {
  if (page < 1 || count < 1) {
    return 0;
  }
  let queryPage = page || 1;
  let queryCount = count || 5;
  queryPage = (queryPage - 1) * queryCount;
  let result = await db.query(`select * from products order by id offset ${queryPage} limit ${queryCount}`);
  return result;
}

async function getStyles(product_id) {
  let result = await db.query(`select s.style_id, s.name, s.original_price, s.sale_price, s.default_style as "default?", json_agg(json_build_object('thumbnail_url', p.thumbnail_url, 'url', p.url)) photos from styles as s inner join photos as p on s.style_id = p.style_id and s.product_id = ${product_id} group by s.style_id`);
  for (let obj of result) {
    obj.skus = await db.one(`select json_object_agg(id, json_build_object('quantity', quantity, 'size', size)) skus from skus where style_id = ${obj['style_id']}`);
    obj.skus = obj.skus['skus'];
  }
  return result;
};

async function getInfo(product_id) {
  let result = await db.query(`select products.id, products.name, products.slogan, products.description, products.category, products.default_price, json_agg (json_build_object ('feature', features.feature, 'value', features.value)) as features from products inner join features on products.id = features.product_id and products.id = ${product_id} group by products.id`);
  return result;
};

async function getRelated(product_id) {
  let info = await db.query(`select related_product_id from related_products where current_product_id = ${product_id}`);
  let related_arr = info.map(obj => {
    return obj['related_product_id'];
   });
   const zeroIndex = related_arr.indexOf(0);
   related_arr.splice(zeroIndex, 1);
   return related_arr;
};

module.exports = {
  getAllStyles,
  getStyles,
  getInfo,
  getRelated,
}