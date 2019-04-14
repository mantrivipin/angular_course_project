import { Recipe } from '../../recipes/recipe.model';
import { Injectable } from '@angular/core';
import { Ingredient } from '../ingredient.model';
import { ShoppingListService } from '../services/shopping-list.service';
import { Subject } from 'rxjs';

@Injectable()
export class RecipeService {
  recipesUpdated: Subject<Recipe[]> = new Subject();
  constructor(private shoppingListService: ShoppingListService) {}
	private recipes: Recipe[] = [
    new Recipe(1, 'Jalapeno Cheese Fingers', 
      'A delicious, cheesy snack recipe by Time Machine restaurant, Noida. Cheddar cheese and jalapeno mixed in a buttery batter of cornmeal, buttermilk, salt and sugar! Baked to perfection with corn and served warm. This is just the right snack recipe for a movie night with friends and family!',
      'https://c.ndtvimg.com/f9tjhjlg_cheese-fingers_625x300_31_August_18.jpg',
      [
        new Ingredient('Jalapenos', 200),
        new Ingredient('Baking Soda', 100),
        new Ingredient('Cornmeal', 50),
      ]
    ),
    new Recipe(2, 'Strawberry Quinoa Pancakes', 
      'Roasted quinoa bathed in milk, dipped in orange essence and finally loaded with strawberries on top. A healthy, delicious and complete breakfast meal.',
      'https://i.ndtvimg.com/i/2018-02/pancakes_620x350_81518173553.jpg',
      [
        new Ingredient('Quinoa', 2),
        new Ingredient('Egg', 2),
        new Ingredient('Milk', 2),
        new Ingredient('Strawberries', 100),
      ]
    ),
    new Recipe(3, 'Roast Turkey with Cranberry Sauce', 
      'A traditional Christmas recipe that is sure to be the star at your festive feast! A whole turkey, stuffed and basted with spices and pan juices perfectly roasted and simmered in an onion-cranberry gravy. This is the perfect whole meal to gorge on this festive season with the family.',
      'https://c.ndtvimg.com/2018-12/9c7qbvm_turkey_625x300_13_December_18.jpg',
      [
        new Ingredient('Turkey', 1),
        new Ingredient('Tomato', 20),
        new Ingredient('Onion', 20),
        new Ingredient('Cranberry', 100),
        new Ingredient('Garlic', 5)
      ]
    ),
    new Recipe(4, 'Eggless Coffee Cupcakes', 
      "Two most amazingly edible things in one is this recipe all about. Coffee and cupcakes! Coffee is everyone's favourite soul stirrer while cupcakes are small, muffin-like desserts that make our taste buds go mad. This cupcake recipe has both of these together! Made completely eggless, you can serve this along with some tea or as a post-dinner party dessert to guests. A great pick to bake this for kids at home as they'll absolutely love it.",
      'https://c.ndtvimg.com/2018-09/ebccjptg_cupcake_625x300_28_September_18.jpg',
      [
        new Ingredient('Flour/Maida', 2),
        new Ingredient('Baking Powder', 2),
        new Ingredient('Milk', 2),
        new Ingredient('Cocoa Powder', 2),
      ]
    ),
    new Recipe(5, 'Oreo Cookie Cheesecake', 
      "Made with crunchy oreo cookies, luscious cream cheese and melted chocolate, this cake is a sweet sweet blessing. A great pick to bake this for kids at home as they'll absolutely love it.",
      'https://www.ndtv.com/cooks/images/oreo.cookie.cheesecake.jpg',
      [
        new Ingredient('Oreo Cookies', 25),
        new Ingredient('Cream Cheese', 4),
        new Ingredient('Corn Floor', 2),
        new Ingredient('Vanilla Essence', 2),
      ]
    ),
  ];
    
  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(id) {
    const recipe = this.recipes.find((recipe) => {
      return recipe.id === id;
    });
    return recipe;
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesUpdated.next(this.recipes.slice());
  }

  updateRecipe(id: number, recipe: Recipe) {
    const index = this.recipes.findIndex(recipe => recipe.id === id);
    this.recipes[index] = recipe;
    this.recipesUpdated.next(this.recipes.slice());
  }

  deleteRecipe(id: number) {
    const index = this.recipes.findIndex(recipe => recipe.id === id);
    this.recipes.splice(index, 1);
    this.recipesUpdated.next(this.recipes.slice());
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }
}