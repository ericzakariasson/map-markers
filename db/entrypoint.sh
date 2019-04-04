
#!/bin/bash

sleep 10
echo initializing database...
/opt/mssql-tools/bin/sqlcmd -S localhost -U SA -P SuperSecret111 -i ./create-db.sql