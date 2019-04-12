import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../../shared/services/shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('ingredientForm') ingredientForm: NgForm;
  editMode: Boolean = false;
  ingredients: Ingredient[];
  ingredientIndex: number;
  subscription: Subscription;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
    this.ingredients = this.shoppingListService.getIngredients(); 
    this.subscription = this.shoppingListService.startedEditing.subscribe(
      (index: number) => {
        this.ingredientIndex = index;
        this.editMode = true;
        let ingredient = this.shoppingListService.getIngredient(index);
        this.ingredientForm.setValue({
          ingredientName: ingredient.name,
          amount: ingredient.amount
        });
      }
    );
  }

  onSubmitItem() {
    // console.log(this.ingredientForm);
    const value = this.ingredientForm.value;
    const newIngredient = new Ingredient(value.ingredientName, value.amount);
    if(this.editMode) {
      this.shoppingListService.updateIngredient(this.ingredientIndex, newIngredient);
    } else {
      this.shoppingListService.addIngredient(newIngredient);
    }
    this.clearForm();
    this.editMode = false;
  }

  clearForm() {
    this.ingredientForm.reset();
    this.editMode = false;
  }

  onDeleteItem() {
    this.shoppingListService.deleteIngredient(this.ingredientIndex);
    this.clearForm();
    this.editMode = false;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
