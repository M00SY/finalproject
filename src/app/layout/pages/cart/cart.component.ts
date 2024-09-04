import { Component } from '@angular/core';
import { CartService } from '../../../shared/services/cart/cart.service';
import { Product } from '../../../shared/interfaces/product';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [RouterLink, TranslateModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent {
  allCart: any[] = [];

  cartId!: string;

  constructor(
    private _CartService: CartService,
    private _ToastrService: ToastrService
  ) {}

  ngOnInit(): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('currentPage', '/cart');
    }

    this._CartService.getCartAPI().subscribe({
      next: (res) => {
        this.allCart = res.data.products;
        this.cartId = res.data._id;
      },
      error: (err) => {
        err.message;
      },
    });
  }

  changeCount(pId: string, count: number) {
    this._CartService.updateCartAPI(pId, count).subscribe({
      next: (res) => {
        this.allCart = res.data.products;
        this._ToastrService.success('Cart Updated Successfully');
      },
    });
  }

  deleteItem(pId: string) {
    this._CartService.removeItemCartAPI(pId).subscribe({
      next: (res) => {
        this._ToastrService.success('Removed Successfully !');
        this.allCart = res.data.products;
      },
    });
  }
}
