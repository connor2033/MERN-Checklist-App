const Checklist = require("../models/checklistModel");
const asyncHandler = require("express-async-handler");

const getChecklists = asyncHandler(async (req, res) => {
  const checklists = await Checklist.find();
  res.json(checklists);
});

function removeEmptyItems(listItems) {
  for (var i = 0; i < listItems.length; i++) {
    if (listItems[i].itemName === "") listItems.splice(i, 1);
  }
  return listItems;
}

const createChecklist = asyncHandler(async (req, res) => {
  var { title, details, listItems } = req.body;

  if (!title || !listItems) {
    res.status(400);
    throw new Error("Fill all the required fields");
  } else {
    listItems = removeEmptyItems(listItems);
    const checklist = new Checklist({
      title,
      details,
      listItems,
    });

    const createdChecklist = await checklist.save();

    res.status(200).json(createdChecklist);
  }
});

const getChecklistById = asyncHandler(async (req, res) => {
  const checklist = await Checklist.findById(req.params.id);

  if (checklist) {
    res.json(checklist);
  } else {
    res.status(404).json({ message: "Checklist not found" });
  }
});

const updateChecklist = asyncHandler(async (req, res) => {
  const { title, details, listItems } = req.body;

  const checklist = await Checklist.findById(req.params.id);

  if (checklist) {
    checklist.title = title;
    checklist.details = details;
    checklist.listItems = removeEmptyItems(listItems);

    const updatedChecklist = await checklist.save();
    res.json(updatedChecklist);
  } else {
    res.status(404).json({ message: "Checklist not found" });
  }
});

const deleteChecklist = asyncHandler(async (req, res) => {
  const checklist = await Checklist.findById(req.params.id);

  if (checklist) {
    await checklist.remove();
    res.json({ message: "Checklist Deleted: " + req.params.id });
  } else {
    res.status(404).json({ message: "Checklist not found" });
  }
});

const copyChecklist = asyncHandler(async (req, res) => {
  const checklist = await Checklist.findById(req.params.id);

  if (checklist) {
    const title = checklist.title;
    const details = checklist.details;
    const listItems = checklist.listItems;

    for (let i = 0; i < listItems.length; i++) {
      listItems[i].isChecked = false;
    }

    const newChecklist = new Checklist({
      title,
      details,
      listItems,
    });

    const createdChecklist = await newChecklist.save();

    res.status(200).json(createdChecklist);
  } else {
    res.status(404).json({ message: "Checklist not found" });
  }
});

module.exports = {
  getChecklists,
  createChecklist,
  getChecklistById,
  updateChecklist,
  deleteChecklist,
  copyChecklist,
};
