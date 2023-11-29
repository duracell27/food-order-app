import { Schema, model, models } from "mongoose";

const ExtraSizesAndIngredients = new Schema({
    name: {type: String},
    price: {type: Number},
})

const MenuItemSchema = new Schema({
    image: {type: String},
    name: {type: String},
    description: {type: String},
    basePrice: {type: Number},
    sizes: {type: [ExtraSizesAndIngredients]},
    ingredients: {type: [ExtraSizesAndIngredients]}
}, {timestamps: true})

export const MenuItem = models?.MenuItem || model('MenuItem', MenuItemSchema)