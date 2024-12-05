import { Component, OnInit } from '@angular/core';
import { MessengerService } from 'src/app/services/messenger.service';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart.service';
import { CartItem } from 'src/app/models/cart-item';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  //cartItems = [];
  cartItems: { productId: number; productName: string; qty: number; price: number }[] = [];


  
  cartTotal = 0

  constructor(private msg:MessengerService,
    private cartService: CartService
  ) { }

  ngOnInit() {
    this.handleSubscription();
    this.loadCartItems();
  }

  handleSubscription(){
    this.msg.getMsg().subscribe((product: Product) => {
      this.loadCartItems();
     })
  }

  loadCartItems(){
    this.cartService.getCartItems().subscribe((items:CartItem[]) =>{
      //console.log(items)
      this.cartItems = items;
      this.calcCartTotal();
    })
  }

  calcCartTotal(){
    this.cartTotal = 0
    this.cartItems.forEach(item =>{
      this.cartTotal += (item.qty * item.price);
    });


  // addProductToCart(product: Product){

  //   let productExists = false

  //   for(let i in this.cartItems){
  //     if(this.cartItems[i].productId === product.id){
  //     this.cartItems[i].qty++
  //     productExists = true
  //     break;
  //     }
  //   }


  //   if(!productExists){
  //     this.cartItems.push({
  //       productId:product.id,
  //       productName: product.name,
  //       qty:1,
  //       price:product.price
  //     })
  //   }

  //   // if(this.cartItems.length === 0){
  //   //   this.cartItems.push({
  //   //     productId:product.id,
  //   //     productName: product.name,
  //   //     qty:1,
  //   //     price:product.price
  //   //   })
  //   // } else {
  //   //   for(let i in this.cartItems){
  //   //     if(this.cartItems[i].productId === product.id){
  //   //       this.cartItems[i].qty++
  //   //     }else{
  //   //       this.cartItems.push({
  //   //         productId:product.id,
  //   //         productName: product.name,
  //   //         qty:1,
  //   //         price:product.price
  //   //       })
  //   //     }
  //   //   }
  //   // }

  //   this.calcCartTotal();


  // }

  
  }

}
