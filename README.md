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

- Inline comments are not supported

## License

MIT

**Free Software, Hell Yeah!**
