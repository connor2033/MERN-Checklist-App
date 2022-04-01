const mongoose = require("mongoose");

//should match inputList from NewListPage
var listItemSchema = new mongoose.Schema({
  itemType: {
    type: String,
    required: true,
  },
  itemName: {
    type: String,
    required: false,
  },
  isChecked: {
    type: String,
    required: true,
  },
});

const checklistSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    details: {
      type: String,
      required: false,
    },
    listItems: [listItemSchema],
  },
  {
    timestamps: true,
  }
);

const Checklist = mongoose.model("Checklist", checklistSchema);

module.exports = Checklist;
