const mongoose = require("mongoose");

//should match inputList from NewListPage
var listItemSchema = new mongoose.Schema({
  itemType: String,
  itemName: String,
  isChecked: Boolean,
});

const checklistSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  details: {
    type: String,
    required: true,
  },
  listItems: [listItemSchema], //List of listItemSchema from above
  //created, updated, id(?), etc
});

const Checklist = mongoose.model("Checklist", checklistSchema);

module.exports = Checklist;
