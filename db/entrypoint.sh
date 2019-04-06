
#!/bin/bash

# Wait for database to start
sleep 10
echo initializing database...
/opt/mssql-tools/bin/sqlcmd -S localhost -U $1 -P $2 -i ./create-db.sql