import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Recipe } from '../recipe.model';
import { RecipeService } from 'src/app/shared/services/recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit { 
  recipe: Recipe;
  id: number;
  editMode: boolean = false;
  recipeForm: FormGroup;
  constructor(private route: ActivatedRoute, 
    private router: Router, private recipeService: RecipeService) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] != null;
        this.initForm();
      }
    );
  }

  onSubmit() {
    console.log(this.recipeForm);
    if(this.editMode) {
      let idHash = {id: this.id}
      this.recipeService.updateRecipe(this.id, Object.assign(this.recipeForm.value, idHash));
    } else {
      let idHash = {id: this.recipeService.getRecipes()[this.recipeService.getRecipes().length - 1].id + 1}
      this.recipeService.addRecipe(Object.assign(this.recipeForm.value, idHash));
    }
    this.navigateToIndex();
  }

  onCancel() {
    this. navigateToIndex();
  }

  onAddIngredient() {
    const control = new FormGroup({
      'name': new FormControl(null, Validators.required),
      'amount': new FormControl(null, [Validators.required, Validators.pattern(/^[0-9]*[1-9][0-9]*$/)])
    });
    (<FormArray>this.recipeForm.get('ingredients')).push(control);
  }

  onDeleteIngredient(index: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

  private initForm() {
    let recipeName: string = '';
    let recipeDescription: string = '';
    let recipeImagePath: string = '';
    let recipeIngredients = new FormArray([]);
    if(this.editMode) {
      this.recipe = this.recipeService.getRecipe(this.id); 
      recipeName = this.recipe.name;
      recipeDescription = this.recipe.description;
      recipeImagePath = this.recipe.imagePath;
      if(this.recipe.ingredients) {
        for(let ingredient of this.recipe.ingredients) {
          recipeIngredients.push(
            new FormGroup({
              'name': new FormControl(ingredient.name, Validators.required),
              'amount': new FormControl(ingredient.amount, [Validators.required, Validators.pattern(/^[0-9]*[1-9][0-9]*$/)]) 
            })
          )
        }
      }
    }
    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'imagePath': new FormControl(recipeImagePath, Validators.required),
      'description': new FormControl(recipeDescription, Validators.required),
      'ingredients': recipeIngredients
    });
  }

  private navigateToIndex() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
