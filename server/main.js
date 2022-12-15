import { Meteor } from 'meteor/meteor';
import { ExportCollection } from '../imports/api/ExportCollection';

Meteor.startup(() => {
  //init mongoDB si la collection n'existe pas pour créer la structure
  if (ExportCollection.find().count() === 0) {
    let id = ExportCollection.insert({ value: 0 });
    ExportCollection.remove({ _id: id });
  }
});
