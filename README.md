# SDC-Product-Overview

*Installation*
brew services start postgresql
psql -U postgres -h localhost

Quit:
 \q
brew services stop postgresql

Install postgres using `brew install postgres`.

Start service by using `brew services start postgresql`.

Run command
>psql postgres -f `file path of overview.sql`


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