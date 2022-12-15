import { Meteor } from 'meteor/meteor';
import { TaskCollection } from '/imports/api/TaskCollection';

function insertTask(taskText) {
  return TaskCollection.insert({ text: taskText });
}

Meteor.startup(() => {
  //TaskCollection.remove({});
  /*if (TaskCollection.find().count() === 0) {
    ['test1', 'test2', 'test3', 'test4', 'test5'].forEach(insertTask);
  }*/
  //  console.log(TaskCollection.find().fetch());
  // code to run on server at startup
});
