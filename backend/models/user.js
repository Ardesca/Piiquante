const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const bcrypt = require("bcrypt");
const { isEmail, isStrongPassword } = require("validator");

//schéma de donnée pour un utilisateur(User)
const userSchema = mongoose.Schema({
  email: {
    type: String,
    validate: [isEmail],
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    unique: true,
    validate: [isStrongPassword],
  },
});

//plugin de validation Mongoose pour garantir l'unicité de l'email
userSchema.plugin(uniqueValidator);

// on viens saler une fois le mot de passe

userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
});

module.exports = mongoose.model("User", userSchema);
