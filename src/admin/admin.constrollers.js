const { generateAccessToken } = require("../common/jwt.js");
const logger = require("../common/logger.js");
const Recipe = require("../model/receipe.model.js");

exports.auth = (req, res, next) => {
  const { username, password } = req.body;
  // Handle authentication logic here
  console.log("Username:", username);
  console.log("Password:", password);

  // Respond to the client
  if (username === process.env.USER_NAME && password === process.env.PASSWORD) {
    // '120s'
    const token = generateAccessToken({}, process.env.TOKEN_SECRET, "1d");
    res.json({ message: "Login successful", token: token });
  } else {
    res.status(401).json({ message: "Login failed" });
  }
};

//  Image Title Calories Carbs Fat Protein
exports.recipies = async (req, res, next) => {
  const receipes = await Recipe.find(
    {},
    { images: 1, food_name: 1, calories: 1, fats: 1, proteins: 1, _id: 1 }
  ).limit(100);
  res.status(200).json(receipes);
};

exports.getRecipe = async (req, res, next) => {
  const recipieID = req.params.recipeID;
  try {
    const reciepe = await Recipe.findById(recipieID);
    res.status(200).send(reciepe);
  } catch (err) {
    res.status(404).send({ error: "reciep not found" });
  }
};

exports.createview = (req, res, next) => {
  const recipieID = req.params.recipeID;
  res.send(`
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <div class="recipeID" style="display: none">${recipieID}</div>
  </body>
  <script src="/js/recipe.js"></script>
</html>
`);
};

("https://images.eatthismuch.com/img/343641_simmyras_0e578df1-000f-43b9-8f46-3d822371ca00.png");
("https://images.eatthismuch.com/img/343641_simmyras_0e57…9-8f46-3d822371ca00.png");
