import { Recipe } from '../../recipes/recipe.model';
import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../ingredient.model';
import { ShoppingListService } from '../services/shopping-list.service';

@Injectable()
export class RecipeService {
  constructor(private shoppingListService: ShoppingListService) {}
  recipeSelected = new EventEmitter<Recipe>();
	private recipes: Recipe[] = [
    new Recipe('A Test Recipe', 
      'This is simply a recipe',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxn6j9bkumPpcloqw8D7LkGWObCfDZFpznKa8fWxKMp1xwK_gy',
      [
        new Ingredient('Meat', 1),
        new Ingredient("French Fries", 20)
      ]
    ),
    new Recipe('A New Test Recipe', 
      'This is simply a recipe',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxn6j9bkumPpcloqw8D7LkGWObCfDZFpznKa8fWxKMp1xwK_gy',
      [
        new Ingredient('Bread', 2),
        new Ingredient("Tomato", 20)
      ]
    )
  ];
    
  getRecipes() {
    return this.recipes.slice();
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }
}