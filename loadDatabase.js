/**
 * Loads the Project 2 demo data into MongoDB using Mongoose.
 * Run: node loadDatabase.js (MongoDB must be running locally)
 *
 * Loads into the MongoDB database named 'project2'.
 * Collections affected: User, Photo, SchemaInfo. Existing data is cleared.
 *
 * Uses Promises for async DB calls.
 */

import mongoose from "mongoose";
import bluebird from "bluebird";
import models from "./modelData/photoApp.js";

import User from "./schema/user.js";
import Photo from "./schema/photo.js";
import SchemaInfo from "./schema/schemaInfo.js";

mongoose.Promise = bluebird;
mongoose.set("strictQuery", false);
mongoose.connect("mongodb://127.0.0.1/project2");

// We start by removing anything that exists in the collections.
const removePromises = [
  User.deleteMany({}),
  Photo.deleteMany({}),
  SchemaInfo.deleteMany({}),
];

Promise.all(removePromises)
  .then(function () {
    const userModels = models.userListModel();
    const mapFakeId2RealId = {};

    const userPromises = userModels.map(function (user) {
      return User.create({
        first_name: user.first_name,
        last_name: user.last_name,
        location: user.location,
        description: user.description,
        occupation: user.occupation,
      })
        .then(function (userObj) {
          mapFakeId2RealId[user._id] = userObj._id;
          user.objectID = userObj._id;
          console.log(
            "Adding user:",
            `${user.first_name} ${user.last_name}`,
            " with ID ",
            user.objectID
          );
        })
        .catch(function (err) {
          console.error("Error creating user", err);
        });
    });

    const allPromises = Promise.all(userPromises).then(function () {
      const photoModels = [];
      const userIDs = Object.keys(mapFakeId2RealId);

      userIDs.forEach(function (id) {
        photoModels.push(...models.photoOfUserModel(id));
      });

      const photoPromises = photoModels.map(function (photo) {
        return Photo.create({
          file_name: photo.file_name,
          date_time: photo.date_time,
          user_id: mapFakeId2RealId[photo.user_id],
          comments: [],
        })
          .then(function (photoObj) {
            photo.objectID = photoObj._id;

            if (photo.comments) {
              photo.comments.forEach(function (comment) {
                photoObj.comments = photoObj.comments.concat([
                  {
                    comment: comment.comment,
                    date_time: comment.date_time,
                    user_id: comment.user.objectID,
                  },
                ]);

                console.log(
                  "Adding comment of length %d by user %s to photo %s",
                  comment.comment.length,
                  comment.user.objectID,
                  photo.file_name
                );
              });
            }

            return photoObj.save().then(function () {
              console.log(
                "Adding photo:",
                photo.file_name,
                " of user ID ",
                photoObj.user_id
              );
            });
          })
          .catch(function (err) {
            console.error("Error creating photo", err);
          });
      });

      return Promise.all(photoPromises).then(function () {
        return SchemaInfo.create(models.schemaInfo2())
          .then(function () {
            console.log("SchemaInfo object created");
          })
          .catch(function (err) {
            console.error("Error creating schemaInfo", err);
          });
      });
    });

    allPromises.then(function () {
      console.log("Database loaded successfully");
      mongoose.disconnect();
    });
  })
  .catch(function (err) {
    console.error("Error loading database", err);
    mongoose.disconnect();
  });