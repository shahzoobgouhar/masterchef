import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  @Output() adddedIngredient = new EventEmitter<Ingredient>()
  @ViewChild('nameInput') name: ElementRef
  @ViewChild('amountInput') amount: ElementRef
  constructor() { }

  ngOnInit(): void {
  }

  addIngredient() {
    const newIngredient = new Ingredient(this.name.nativeElement.value, this.amount.nativeElement.value)
    this.adddedIngredient.emit(newIngredient)
  }
}
