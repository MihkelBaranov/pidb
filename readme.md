# pidb

Simple JSON database

## API
|                |Description                    |
|----------------|-------------------------------|
|`init(storage: string)`|Storage path to init the database|
|`collections()`|List all collections in storage|
|`collection(name)`| If collection exists documents are read in memory. Otherwise a new empty collection is created |
|`sync()`|Write data on disk |

## Collection API

|                |Description                    |
|----------------|-------------------------------|
|`documents()` |List all documents in collection|
|`find(query)` |Find documents|
|`findOne(query)` |Find one document|
|`push(document)` |Creates a new document in collection|
|`update(id, data)` |Update document|
|`remove(id)` |Remove document|
|`drop()` |Delete the collection|
