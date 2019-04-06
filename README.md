# Map Markers

Application for display markers on a map.

Every third time the **READ**-button is clicked, the markers will form a mathematical pattern.

## Get started

### Prerequisites

This project is built with docker and docker-compose, so you will need to have those installed to get it running.

### Installation

Begin with cloning the repo, then do

```bash
cd map-markers
docker-compose up
```

When everyting has started the client application should be available on `localhost` (`localhost:80`);

The API is available at `localhost:4000`

The `DB_DATABASE` variable specified in `.env` have to match the database name in `db/create-db.sql`.

## Good to know

The database is seeded at server start, see `prestart` in `server/package.json`.

The data is created inside the file `seed-db.js`. There you can specify how many markers you want to seed the database with.

## Built with

- SQL Server (Database)
- Node.js (Backend)
- React & Leaflet (Frontend)
- Docker
