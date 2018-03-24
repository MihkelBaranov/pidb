declare class Pidb {
    collection_cache: any[];
    storage: any;
    private file;
    private data;
    /**
     * Inti database
     * @param storage path to doc storage
     */
    init(storage: string): void;
    /**
     * Read collections
     */
    collections(): string[];
    /**
     * Select collectition
     * if collection does not exists one will be created in memory
     * @param name collection name
     */
    collection(name: string): {
        documents: any;
        drop: any;
        find: any;
        push: any;
        remove: any;
        update: any;
    };
    /**
     * Write cache to disk
     */
    sync(): void;
    /**
     * Add new document
     * @param document json object to save
     */
    private push(document);
    /**
     * Delete selected collection
     */
    private drop();
    /**
     * Remove document(s) if document id is not specified all documents are cleared
     * @param id document id
     */
    private remove(id);
    /**
     * Return json data
     */
    private documents(options?);
    /**
     * Find document
     * @param query object to search for
     * @param find whether to use find or filter methods
     */
    private find(query, find?);
    /**
     * Update document
     * @param id document iddb.collection("tracks.json").find({plays: 0}, true)
     * @param data data to replace
     */
    private update(id, data);
    /**
     * Generate a random id for documents
     */
    private generate_id();
}
declare const pidb: Pidb;
export { Pidb, pidb };
