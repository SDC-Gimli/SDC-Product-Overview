CREATE DATABASE overview;

\c overview;

CREATE TABLE products (
  id INT PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  slogan TEXT NOT NULL,
  description TEXT NOT NULL,
  category VARCHAR(30) NOT NULL,
  default_price VARCHAR(20) NOT NULL
);

\COPY products(id, name, slogan, description, category, default_price) FROM 'filepath/product.csv' DELIMITER ',' CSV HEADER;

CREATE TABLE features (
  id INT PRIMARY KEY,
  product_id INT NOT NULL,
  feature VARCHAR(50) NOT NULL,
  value VARCHAR(50) NOT NULL,
  FOREIGN KEY(product_id)
	REFERENCES products(id)
);

\COPY features(id, product_id, feature, value) FROM 'filepath/features.csv' DELIMITER ',' CSV HEADER;

CREATE TABLE styles (
  style_id INT PRIMARY KEY,
  product_id INT NOT NULL,
  name VARCHAR(50) NOT NULL,
  sale_price VARCHAR(15) NOT NULL,
  original_price VARCHAR(15) NOT NULL,
  default_style boolean,
  FOREIGN KEY(product_id)
	REFERENCES products(id)
);

\COPY styles(style_id, product_id, name, sale_price, original_price, default_style) FROM 'filepath/styles.csv' DELIMITER ',' CSV HEADER;

CREATE TABLE skus (
  id INT PRIMARY KEY,
  style_id INT NOT NULL,
  size VARCHAR(10) NOT NULL,
  quantity INT NOT NULL,
  FOREIGN KEY(style_id)
	REFERENCES styles(style_id)
);

\COPY skus(id, style_id, size, quantity) FROM 'filepath/skus.csv' DELIMITER ',' CSV HEADER;

CREATE TABLE photos (
  id INT PRIMARY KEY,
  style_id INT NOT NULL,
  url TEXT NOT NULL,
  thumbnail_url TEXT NOT NULL,
  FOREIGN KEY(style_id)
	REFERENCES styles(style_id)
);

\COPY photos(id, style_id, url, thumbnail_url) FROM 'filepath/photos_fixed.csv' DELIMITER ',' CSV HEADER;

CREATE TABLE related_products (
  id INT PRIMARY KEY,
  current_product_id INT NOT NULL,
  related_product_id INT NOT NULL,
  FOREIGN KEY(current_product_id)
	REFERENCES products(id),
  FOREIGN KEY(related_product_id)
	REFERENCES products(id)
);

\COPY related_products(id, current_product_id, related_product_id) FROM 'filepath/related.csv' DELIMITER ',' CSV HEADER;

CREATE INDEX features_index ON features using btree(product_id);

CREATE INDEX related_index ON related_products using btree(current_product_id);

CREATE INDEX styles_index ON styles using btree(product_id);

CREATE INDEX photos_index ON photos using btree(style_id);

CREATE INDEX skus_index ON skus using btree(style_id);