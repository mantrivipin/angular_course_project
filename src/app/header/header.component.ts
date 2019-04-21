import { Component } from '@angular/core';
import { DataStorageService } from '../shared/services/data-storage.service';
import { Response } from '@angular/http';
import { Recipe } from '../recipes/recipe.model';
@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: []
}) 
export class HeaderComponent {
  constructor(private dataStorageService: DataStorageService) {}

  onSaveData() {
    this.dataStorageService.storeRecipes().subscribe(
      (response: Response) => {},
      error => console.log(error)
    );
  }

  onGetData() {
    this.dataStorageService.getRecipes();
  }
}