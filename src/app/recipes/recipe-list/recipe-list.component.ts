import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  @Output() loadRecipe = new EventEmitter<Recipe>()
  recipes: Recipe[] = [
    new Recipe('A test Recipe', 'This is test', 'https://tmbidigitalassetsazure.blob.core.windows.net/rms3-prod/attachments/37/1200x1200/Crispy-Fried-Chicken_EXPS_FRBZ19_6445_C01_31_3b.jpg'),
    new Recipe('Another test Recipe', 'This is test', 'https://tmbidigitalassetsazure.blob.core.windows.net/rms3-prod/attachments/37/1200x1200/Crispy-Fried-Chicken_EXPS_FRBZ19_6445_C01_31_3b.jpg')
  ];

  constructor() { }

  ngOnInit(): void {
  }

  loadSelectedRecipe(recipe: Recipe) {
    this.loadRecipe.emit(recipe);
  }

}
