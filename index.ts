import * as crypto from "crypto";
import * as fs from "fs";
import * as path from "path";

class Pidb {
	public collection_cache = [];
	public storage;
	private file;
	private data = {};

	/**
	 * Inti database
	 * @param storage path to doc storage
	 */
	public init(storage: string, options?: { autosync: boolean }) {
		if (!storage) {
			throw new Error("No storage path required! init(path)");
		}

		if (!fs.existsSync(storage)) {
			fs.mkdirSync(storage);
		}

		this.storage = storage;
	}

	/**
	 * Read collections
	 */
	public collections() {
		return fs.readdirSync(this.storage).concat(this.collection_cache);
	}

	/**
	 * Select collectition
	 * if collection does not exists one will be created in memory
	 * @param name collection name
	 */
	public collection(name: string) {
		if (!name.endsWith(".json")) {
			throw new Error("Collection must end with .json");
		}

		/**
		 * Assing collection file path on disk
		 */
		this.file = path.join(this.storage, name);

		/**
		 * Check if collection exists
		 */
		if (fs.existsSync(this.file)) {

			/**
			 * Parse existing collection
			 */
			this.data = Object.assign({}, JSON.parse(fs.readFileSync(this.file, "utf-8")));
		} else {
			/**
			 * Create a new empty collection and push it to memory
			 */
			this.collection_cache.push(name);

			this.data = {};
		}

		return {
			documents: this.documents.bind(this),
			drop: this.drop.bind(this),
			find: this.find.bind(this),
			findOne: this.findOne.bind(this),
			push: this.push.bind(this),
			remove: this.remove.bind(this),
			update: this.update.bind(this),
		};
	}

	/**
	 * Write cache to disk
	 */
	public sync() {
		const data = JSON.stringify(this.data);
		fs.writeFileSync(this.file, data, "utf8");
	}

	/**
	 * Add new document
	 * @param document json object to save
	 */
	private push(document) {
		const id = document.id ? document.id : this.generate_id();
		return this.data[id] = Object.assign({ id }, document, this.data[id]);
	}

	/**
	 * Delete selected collection
	 */
	private drop() {
		if (!this.file) {
			throw new Error("Collection not selected!");
		}
		fs.unlinkSync(this.file);
	}

	/**
	 * Remove document(s) if document id is not specified all documents are cleared
	 * @param id document id
	 */
	private remove(id: string) {
		if (!id) {
			throw new Error("Document id missing, use drop() instead to clear all documents");
		}
		return delete this.data[id];
	}

	/**
	 * Return json data
	 */
	private documents(options?: { skip: number, limit: number }) {
		const documents = Object.values(this.data);
		return options ? documents.splice(options.skip, options.limit + options.skip) : documents;
	}

	/**
	 * Find one document
	 * @param query object to search for
	 */
	private findOne(query) {
		return this.documents().find(this._build(query)) || {};
	}

	/**
	 * Find documents
	 * @param query object to search for
	 */
	private find(query, options?: { skip: number, limit: number }) {
		return Object.keys(query).length === 0 ?
			this.documents(options) :
			this.documents(options).filter(this._build(query)) || [];
	}

	/**
	 * Update document
	 * @param id document iddb.collection("tracks.json").find({plays: 0}, true)
	 * @param data data to replace
	 */
	private update(id: string, data) {
		delete data.id;
		const document = this.data[id];
		return this.data[id] = Object.assign({}, document, data);
	}

	/**
	 * Generate a random id for documents
	 */
	private generate_id() {
		return crypto.randomBytes(16).toString("hex");
	}

	/**
	 * Build query
	 * @param query object
	 */
	private _build(query) {
		return (item) => Object.keys(query).filter((key) => {
			return query[key] !== undefined && item[key] !== undefined;
		}).some((key) => {
			return item[key].toLowerCase().includes(query[key].toLowerCase());
		});
	}
}

const pidb = new Pidb();

export {
	Pidb,
	pidb,
};
