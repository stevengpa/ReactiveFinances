const path = require('path');
const low = require('lowdb');

const dbPath = path.resolve(__dirname, '../../../data/rft.json');
const db = low(dbPath, { storage: require('lowdb/lib/file-async') });

module.exports = {
	table(schema) {
		return db.get(schema);
	},
	init(schema) {
		if (!db.has(schema).value()) {
			db.set(schema, []).value();
		}
	}
};
