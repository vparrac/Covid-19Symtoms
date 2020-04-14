//Juan Camilo:genera errores por las comillas en eslint
require('dotenv').config();
const { MongoClient, ObjectId } = require('mongodb');

const MongoUtils = () => {
  const MyMongoLib = this || {};
  const url = 'mongodb://localhost:27017' || process.env.MONGODB_URI;
  let db;
  const dbName = 'covidDB';
  MongoClient.connect(url, { useUnifiedTopology: true }).then((client) => {
    db = client.db(dbName);
  });

  MyMongoLib.insertOneDoc = (doc, dbCollection) => {
    const collection = db.collection(dbCollection);
    return collection.insertOne(doc);
  };

  MyMongoLib.insertManyDocs = (docs, dbCollection) => {
    const collection = db.collection(dbCollection);
    return collection.insertMany(docs);
  };

  MyMongoLib.getDocs = (dbCollection) => {
    const collection = db.collection(dbCollection);
    return collection.find({}).toArray();
  };

  MyMongoLib.updateDoc = (id, object, dbCollection) => {
    const collection = db.collection(dbCollection);
    return collection.replaceOne(
      {
        _id: ObjectId(id),
      },
      object
    );
  };

  MyMongoLib.getDocById = (id, dbCollection) => {
    const collection = db.collection(dbCollection);
    return collection
      .find({
        _id: ObjectId(id),
      })
      .toArray();
  };
  MyMongoLib.getLoginByUsername = (username) => {
    const collection = db.collection('login');
    return collection
      .find({
        username: username,
      })
      .toArray();
  };

  MyMongoLib.reporte = (fechas, usuario) => {
    return db
      .collection('fatiga')
      .aggregate([
        {
          $match: {
            user: usuario,
            fecha: { $gte: fechas[0], $lte: fechas[1] },
          },
        },
        {
          $lookup: {
            from: 'congestion',
            let: { user: usuario },
            as: 'congestion',
            pipeline: [
              {
                $match: {
                  user: usuario,
                  fecha: { $gte: fechas[0], $lte: fechas[1] },
                },
              },
            ],
          },
        },
        {
          $lookup: {
            from: 'dolor',
            let: { user: usuario },
            as: 'dolor',
            pipeline: [
              {
                $match: {
                  user: usuario,
                  fecha: { $gte: fechas[0], $lte: fechas[1] },
                },
              },
            ],
          },
        },
        {
          $lookup: {
            from: 'dificultadRespirar',
            let: { user: usuario },
            as: 'dificultadRespirar',
            pipeline: [
              {
                $match: {
                  user: usuario,
                  fecha: { $gte: fechas[0], $lte: fechas[1] },
                },
              },
            ],
          },
        },
        {
          $lookup: {
            from: 'fiebre',
            let: { user: usuario },
            as: 'fiebre',
            pipeline: [
              {
                $match: {
                  user: usuario,
                  fecha: { $gte: fechas[0], $lte: fechas[1] },
                },
              },
            ],
          },
        },
        {
          $lookup: {
            from: 'tos',
            let: { user: usuario },
            as: 'tos',
            pipeline: [
              {
                $match: {
                  user: usuario,
                  fecha: { $gte: fechas[0], $lte: fechas[1] },
                },
              },
            ],
          },
        },
        {
          $lookup: {
            from: 'dolorCabeza',
            let: { user: usuario },
            as: 'dolorCabeza',
            pipeline: [
              {
                $match: {
                  user: usuario,
                  fecha: { $gte: fechas[0], $lte: fechas[1] },
                },
              },
            ],
          },
        },
        {
          $lookup: {
            from: 'diarrea',
            let: { user: usuario },
            as: 'diarrea',
            pipeline: [
              {
                $match: {
                  user: usuario,
                  fecha: { $gte: fechas[0], $lte: fechas[1] },
                },
              },
            ],
          },
        },
        {
          $lookup: {
            from: 'medicina',
            let: { user: usuario },
            as: 'medicina',
            pipeline: [
              {
                $match: {
                  user: usuario,
                  fecha: { $gte: fechas[0], $lte: fechas[1] },
                },
              },
            ],
          },
        },
      ])
      .toArray();
  };

  MyMongoLib.getWithJoin = (
    dbcollection,
    fromCollection,
    localField,
    foreingField,
    asName,
    id
  ) => {
    const collection = db.collection(dbcollection);
    return collection
      .aggregate([
        { $match: { _id: ObjectId(id) } },
        { $unwind: '$' + localField },
        {
          $lookup: {
            from: fromCollection,
            localField: localField,
            foreignField: foreingField,
            as: asName,
          },
        },
        { $unwind: '$' + asName },
        {
          $group: {
            _id: '$_id',
            revisiones_id: { $push: '$' + localField },
            revisiones: { $push: '$' + asName },
          },
        },
      ])
      .toArray();
  };
  return MyMongoLib;
};

module.exports = MongoUtils();
