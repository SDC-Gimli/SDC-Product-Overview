# SDC-Product-Overview

# Installation

## MacOS or *Linux*

Install data by downloading files from [Google drive](https://drive.google.com/drive/folders/1Gqxt7Tw0I50OG2dn4LncHAJ_x_BnWuRX)

*Install data by running the following commands in terminal.  file_id can be found from `https://drive.google.com/file/d/<file_id>/view?usp=sharing` when clicking `Get Link` on a file*
```
sudo apt-get update
sudo apt install python3-pip
pip3 install gdown
python3 download.py <file_id> <output_file_name>
  e.g. "python3 download.py <exampleFileId> <example.csv>"
```

**Install repo**
```
sudo apt-get install nodejs
git clone https://github.com/SDC-Gimli/SDC-Product-Overview.git
cd SDC-Product-Overview
npm install
g++ dbfixer.cc
./a.out <file_path_to_photos.csv> photos_fixed.csv
```

**Clean data and edit file paths:**
>1. Add a placeholder product in the product.csv file for id = 0 (due to foreign key constraints)
> * e.g. "0,"TestName","TestSlogan","TestDescription","TestCategory",TestPriceInt
>2. Change file paths within `overview.sql` to respective locations of that file

Install postgres :
```
brew install postgres
brew services start postgresql
psql -U postgres -h localhost
```

*Install postgres :*
```
sudo apt install postgresql postgresql-contrib
sudo -u postgres psql to connect to database
\password
```

[Create a user and give the user superuser and a password](https://medium.com/coding-blocks/creating-user-database-and-adding-access-on-postgresql-8bfcd2f4a91e)

ALTER USER myuser WITH SUPERUSER;

Navigate to /SDC-Product-Overview/data

alter db.js with postgres info and pw

`psql postgres -h 127.0.0.1 -f overview.sql`

**Run command to move data into database:**
>psql postgres -f `file path of overview.sql`

**Run server :**

`npm run server`


## Testing

`brew install k6`

or

```
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys C5AD17C747E3415A3642D57D77C6C491D6AC1D69
echo "deb https://dl.k6.io/deb stable main" | sudo tee /etc/apt/sources.list.d/k6.list
sudo apt-get update
sudo apt-get install k6
```

Past testing results using product_id = 4:

| Table | Time (ms) |
| ------|:---------:|
| Styles | 300 |
| Styles with btree index for photos/styles | 1|
| Styles API Call| 6000 |
| Styles API Call with btree index for photos/styles | 3350
| Styles API Call with btree index for photos/styles/skux | 15

TIME FOR STYLES (id = 4) = approx 3500 ms; (depends on photos)
  approaches 250 ms after a couple of queries (cache?)
>add index for photos and styles
TIME FOR STYLES (id = 4) = approx 1 ms;

TIME FOR STYLES API CALL: (6s)
>add index for photos and styles
TIME FOR STYLES API CALL: (3.35s)
>add index for skux
TIME FOR STYLES API CALL: (15 ms)