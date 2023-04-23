const mongoose = require('mongoose');
const redis = require('redis');
const util = require('util');

const redisUrl = 'redis://127.0.0.1:6379';
const client = redis.createClient(redisUrl);
client.get = util.promisify(client.get);

const exec = mongoose.Query.prototype.exec;

mongoose.Query.prototype.exec = async function () {
    console.log("I'm about to run a query");

    // See if we have a value for 'key' in redis
    const key = JSON.stringify(
        Object.assign({}, this.getQuery(), {
            collection: this.mongooseCollection.name,
        })
    );

    const cacheValue = await client.get(key)

    // if we do, return that
    if (cacheValue) {
        // get an instance of the model
        const doc = new this.model(JSON.parse(cacheValue));

        return doc;
    }

    // otherwise, issue the query and store the result in redis
    const result = await exec.apply(this, arguments);

    client.set(key, JSON.stringify(result));

    return result;
}