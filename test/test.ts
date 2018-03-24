import test from "ava";
import { pidb } from "../index";
// open new database
pidb.init(".cache");

test("db.collections()", (t) => {
	console.info("Starting to test: db.collections()");
	const collections = pidb.collections();
	t.is(collections.length, 0);
});

test("db.collection()", (t) => {
	console.info("Starting to test: db.collection()");
	const collection = pidb.collection("test.json");
	const collections = pidb.collections();
	t.is(collections.length, 1);
	t.is(collection.documents().length, 0);

});

test("db.collection.push()", (t) => {
	console.info("Starting to test: db.collection.push()");
	const collection = pidb.collection("test.json");
	collection.push({ hello: "world" });
	t.is(collection.documents().length, 1);
});

test("db.collection.findOne()", (t) => {
	console.info("Starting to test: db.collection.findOne()");
	const collection = pidb.collection("test.json");
	collection.push({ hello: "world" });
	const document = collection.findOne({ hello: "world" });
	t.is(document.hello, "world");
});

test("db.collection.find()", (t) => {
	console.info("Starting to test: db.collection.find()");
	const collection = pidb.collection("test.json");
	collection.push({ hello: "world" });
	collection.push({ hello: "world" });
	collection.push({ hello: "not world" });
	const worlds = collection.find({ hello: "World" });
	const not_world = collection.find({ hello: "not world" });

	t.is(worlds.length, 2);
	t.is(not_world.length, 1);
});

test("db.collection.update()", (t) => {
	console.info("Starting to test: db.collection.update()");
	const collection = pidb.collection("test.json");
	collection.push({ hello: "world" });
	collection.push({ hello: "world" });
	collection.push({ hello: "not world" });
	const documents = collection.find({ hello: "World" });
	t.is(documents.length, 2);

	const document = collection.findOne({ hello: "not world" });
	collection.update(document.id, { hello: "world" });
	const updated_documents = collection.find({ hello: "World" });
	t.is(updated_documents.length, 3);

});

test("db.collection.remove()", (t) => {
	console.info("Starting to test: db.collection.remove()");
	const collection = pidb.collection("test.json");
	collection.push({ hello: "world" });
	collection.push({ hello: "world" });
	collection.push({ hello: "not world" });

	t.is(collection.documents().length, 3);
	const document = collection.findOne({ hello: "not world" });
	collection.remove(document.id);
	t.is(collection.documents().length, 2);
});
