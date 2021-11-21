const overview = require('./data/overview.js');
const { performance } = require('perf_hooks');
const product_id = 4;

const getInfo_t0 = performance.now();
let getInfoResult = overview.getInfo(product_id);
const getInfo_t1 = performance.now();
console.log(`getStyles API Call took ${getInfo_t1 - getInfo_t0} milliseconds.`);

const getStyles_t0 = performance.now();
let getStylesResult = overview.getStyles(product_id);
const getStyles_t1 = performance.now();
console.log(`getStyles API Call took ${getStyles_t1 - getStyles_t0} milliseconds.`);

const getRelated_t0 = performance.now();
let getRelatedResult = overview.getRelated(product_id);
const getRelated_t1 = performance.now();
console.log(`getStyles API Call took ${getRelated_t1 - getRelated_t1} milliseconds.`);