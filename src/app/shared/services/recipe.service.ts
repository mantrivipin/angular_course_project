import { Recipe } from '../../recipes/recipe.model';
import { EventEmitter } from '@angular/core';

export class RecipeService {
    recipeSelected = new EventEmitter<Recipe>();
	private recipes: Recipe[] = [
      new Recipe('A Test Recipe', 'This is simply a recipe',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxn6j9bkumPpcloqw8D7LkGWObCfDZFpznKa8fWxKMp1xwK_gy'),
      new Recipe('A New Test Recipe', 'This is simply a recipe',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxn6j9bkumPpcloqw8D7LkGWObCfDZFpznKa8fWxKMp1xwK_gy')
    ];
    
    getRecipes() {
      return this.recipes.slice();
    }
}