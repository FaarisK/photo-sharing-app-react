// eslint-disable-next-line import/no-extraneous-dependencies
import mongoose from 'mongoose';

/**
 * Create a Mongoose Schema for SchemaInfo.
 */
const schemaInfo = new mongoose.Schema({
    load_date_time: { type: String },
    loaded_from: { type: String }
});

/**
 * Create a Mongoose Model for SchemaInfo.
 */
const SchemaInfo = mongoose.model('SchemaInfo', schemaInfo);

/**
 * Make this available to our application.
 */
export default SchemaInfo;
