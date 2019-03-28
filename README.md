# Seed Generator

This is a simple utility to generate sequalize seeds form set of insert statements. Currently it supports Postgres style only.

i.e

below

```
INSERT INTO public."Programs"("id", "Name", "createdAt", "updatedAt") VALUES ('Test Automation', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
```

will create

```
'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Programs',
      [{ id: 2, Name: 'Test Automation', createdAt: new Date(), updatedAt: new Date() }],
      {}
    );
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Programs', null, {});
  }
};

```

It handles windows/ux line feed styles

- Inline comments are not supported (well .... not tested try n see if you want)

## How To

- install Node
- run **npm install** from project root
- execute **node generate.js [file_path]]**  
  i.e. **node .\generate.js .\sql\Masterdata.sql**
- seed files will be availbale in seeders folder
- modify **config\config.json** to suite your settings
- execute **sequelize db:seed:all**

## License

MIT

**Free Software, Hell Yeah!**
