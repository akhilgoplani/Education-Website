const Note = require("../models/Note");
const shortid=require("shortid")

module.exports.list = (req, res) => {
  Note.find({ user: req.user.id }).populate("category")
    .then((note) => {
      res.json(note);
    })
    .catch((err) => {
      res.json(err);
    });
};

module.exports.show = (req, res) => {
  const id = req.params.id;
  Note.findById(id)
    .populate("category")
    .then((note) => {
      if (note) {
        res.json(note);
      } else {
        res.json({});
      }
    })
    .catch((err) => {
      res.json(err);
    });
};

module.exports.create = (req, res) => {
  console.log(req.user, "user");
  const body = req.body;
  const note = new Note({
    title: body.title,
    body: body.body,
    category: body.category,
    edit: body.edit,
    isPublic: body.isPublic, // Add the isPublic property based on the user's input
    shareableLink: null, // Initialize the shareableLink as null
    user: req.user.id
  });

  if (note.isPublic) {
    // Generate a unique shareable link if the note is public
    note.shareableLink = shortid.generate();
  }
  note
    .save()
    .then((note) => {
      res.json({
        notice: "successfully created a note",
        note
      });
    })
    .catch((err) => {
      res.json(err);
    });
};

module.exports.destroy = (req, res) => {
  const id = req.params.id;
  Note.findByIdAndDelete(id)
    .then((note) => {
      if (note) {
        res.json(note);
      } else {
        res.json({});
      }
    })
    .catch((err) => {
      res.json(err);
    });
};

module.exports.update = (req, res) => {
  const id = req.params.id;
  const body = req.body;
  Note.findById(id)
  .then((note) => {
    if (!note) {
      res.json({}); // Note not found
    } else {
      // Update the note properties
      note.title = body.title;
      note.body = body.body;
      note.category = body.category;
      note.edit = body.edit;
      note.isPublic = body.isPublic;

      if (note.isPublic && !note.shareableLink) {
        // Generate a unique shareable link if the note is public and doesn't have a link
        note.shareableLink = shortid.generate();
      } else if (!note.isPublic) {
        // Set shareableLink to null if the note is private
        note.shareableLink = null;
      }

      return note.save();
    }
  })
    .then((note) => {
      if (note) {
        res.json(note);
      } else {
        res.json({});
      }
    })
    .catch((err) => {
      res.json(err);
    });
};

module.exports.generatelink = async (req,res) => {
  try {
   
    // Retrieve all public notes for the user
    const userPublicNotes = await Note.find({ user: req.user.id, isPublic: true });

    if (userPublicNotes.length === 0) {
      return res.json({ error: 'No public notes found for the user' }); // No public notes found for the user
    }

    // Generate a unique sharable link
    const shareableLink = shortid.generate();

    // Update the shareableLink field for all the user's public notes
    await Note.updateMany(
      { user: req.user.id, isPublic: true },
      { shareableLink:shareableLink }
    );

    res.status(200).json(shareableLink);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  
  }
};


module.exports.getpublicnotes= async (req, res) => {
  const userId = req.user.id;
  const shareableLink = req.params.link; // Assuming you have authentication middleware and user ID is available in req.user

  try {
    // Retrieve public notes that belong to the user
    const publicNotes = await Note.find({ user: userId, isPublic: true,shareableLink });

    res.status(200).json(publicNotes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};