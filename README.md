# SDC-Product-Overview

*Installation*

Install data:
  download files from google drive
  https://drive.google.com/drive/folders/1Gqxt7Tw0I50OG2dn4LncHAJ_x_BnWuRX

Install data linux:
  sudo apt install python3-pip
  pip install gdown
  get the file_id from the link
  https://drive.google.com/file/d/<file_id>/view?usp=sharing
  call the download.py function with args
  python3 download.py <file_id> <output_file_name>
  "python3 download.py <exampleFileId> <example.csv>"

Clean data:
  add a placeholder product in the product.csv file for id = 0 (due to foreign key constraints)

  run the c++ cleanup code on photos.csv to fix formatting issues within the csv which outputs a photos_fixed.csv


brew services start postgresql
psql -U postgres -h localhost

Install repo:
  npm install
  g++ dbfixer.cc
  python3 download.py <file_id> <output_file_name>
  move files if you wish
  change the directory for where the csv files are located within overview.sql
  


Quit:
 \q
brew services stop postgresql

Install postgres using `brew install postgres`.

Start service by using `brew services start postgresql`.

Run command
>psql postgres -f `file path of overview.sql`

linux:
sudo apt install postgresql postgresql-contrib
sudo -u postgres psql to connect to database
\q to leave
Create a user and give the user superuser and a password
https://medium.com/coding-blocks/creating-user-database-and-adding-access-on-postgresql-8bfcd2f4a91e
ALTER USER myuser WITH SUPERUSER;
Navigate to /SDC-Product-Overview/data
psql postgres -h 127.0.0.1 -f overview.sql



*Testing*

brew install k6

TIME FOR STYLES (id = 4) = approx 3500 ms; (depends on photos)
  approaches 250 ms after a couple of queries (cache?)
>add index for photos and styles
TIME FOR STYLES (id = 4) = approx 1 ms;

TIME FOR STYLES API CALL: (6s)
>add index for photos and styles
TIME FOR STYLES API CALL: (3.35s)
>add index for skux
TIME FOR STYLES API CALL: (15 ms)

*export database*