-- Create a new database called 'marker'
-- Connect to the 'master' database to run this snippet
USE master
GO
-- Create the new database if it does not exist already
IF NOT EXISTS (
  SELECT name
FROM sys.databases
WHERE name = N'marker'
)
CREATE DATABASE marker
GO

USE marker

-- Create a new table called 'marker' in schema 'dbo'
-- Drop the table if it already exists
IF OBJECT_ID('dbo.marker', 'U') IS NOT NULL
DROP TABLE dbo.marker
GO
-- Create the table in the specified schema
CREATE TABLE dbo.marker
(
  id INT NOT NULL IDENTITY(1,1) PRIMARY KEY,
  lat INT NOT NULL,
  long INT NOT NULL,
  text NVARCHAR(15) NOT NULL,
);
GO

CREATE PROCEDURE dbo.merge_bulk_data
AS
INSERT INTO dbo.marker
  (lat, long, text)
SELECT lat, long, text
FROM #temp_data
GO;
