import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './main.html';
import '../imports/api/ExportCollection.js';

import { ExportCollection } from '../imports/api/ExportCollection';
Template.app.onCreated(function helloOnCreated() {
  this.counter = new ReactiveVar(0);
  this.progression = new ReactiveVar(0);
});

const listUrl = [
  'https://www.lempire.com/',
  'https://www.lemlist.com/',
  'https://www.lemverse.com/',
  'https://www.lemstash.com/',
];

Template.app.helpers({
  exports() {
    return ExportCollection.find().fetch();
  },
  progression() {
    return Template.instance().progression.get();
  },
});

Template.app.events({
  'click #add'(event, instance) {
    const exportPage = { value: 0, finished: false, url: '' };
    const idExport = ExportCollection.insert(exportPage);

    const myInterval = setInterval(function () {
      ExportCollection.update({ _id: idExport }, { $set: exportPage });

      if (exportPage.value === 100) {
        //fin de l'export
        exportPage.finished = true;
        exportPage.url = listUrl[Math.floor(Math.random() * 3)];
        ExportCollection.update({ _id: idExport }, { $set: exportPage });

        clearInterval(myInterval);
      }

      exportPage.value = exportPage.value + 5;
    }, 1000);
  },
  'click #delete'(event, instance) {
    // increment the counter when button is clicked
    ExportCollection.find({})
      .fetch()
      .forEach((x) => {
        ExportCollection.remove({ _id: x._id });
      });
  },
});
