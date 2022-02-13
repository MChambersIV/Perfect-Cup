const router = require("express").Router();
const { Coffee, Ingredient } = require("../../models");
const withAuth = require("../../utils/auth");

// GET all ingredient
router.get("/", withAuth, async (req, res) => {
    try{
        const ingredientData = await Ingredient.findAll({
            include: [
                {
                    model: Coffee,
                    attibutes: ["id", "title"]
                } 
            ],
        });
        res.status(200).json(ingredientData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// CREATE a ingredient
router.post("/", async(req, res) => {
    try{
        const ingredientData = await Ingredient.create({
            ingredient_text: req.body.ingredient_text,
            coffee_id: req.body.coffee_id,
        });
        res.status(200).json(ingredientData);
    } catch (err){
        res.status(400).json(err);
    }
});
// UPDATE a ingredient
router.put("/:id", async(req, res) => {
    Ingredient.update(req.body, {
        where: {
            id: req.params.id
        },
    }).then(ingredientData => {
        if(!ingredientData){
            res.status(404).json({ message: "No ingredient found with this id"});
            return;
        }
        res.status(200).json(ingredientData);
    })
    .catch(err => {
        res.status(500).json(err);
    });
});

// DELETE a ingredient
router.delete("/:id", async(req, res) => {
    try{
        const ingredientData = await Ingredient.destroy({
            where:{
                id: req.params.id
            }
        });
        if (!ingredientData) {
            res.status(404).json({ message: "No ingredient found with this id!"});
            return;
        }
        res.status(200).json(ingredientData);
    } catch(err){
        res.status(500).json(err);
    }
});

module.exports = router;
