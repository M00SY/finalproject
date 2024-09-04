import { Component } from '@angular/core';
import { ProductsService } from '../../../shared/services/products.service';
import { Product } from '../../../shared/interfaces/product';
import { RouterLink } from '@angular/router';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from '../../../shared/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from '../../../shared/pipes/search/search.pipe';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterLink,
    CarouselModule,
    TranslateModule,
    FormsModule,
    SearchPipe,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  find: string = '';

  sliderImages: string[] = [
    'assets/images/slider-image-1.jpeg',
    'assets/images/slider-image-2.jpeg',
    'assets/images/slider-image-3.jpeg',
  ];

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    rtl: true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1,
      },
    },
    nav: true,
  };

  allProducts: Product[] = [];

  constructor(
    private _ToastrService: ToastrService,
    private _ProductsService: ProductsService,
    private _CartService: CartService
  ) {}

  ngOnInit(): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('currentPage', '/home');
    }

    this._ProductsService.getAllProductsAPI().subscribe({
      next: (res) => {
        this.allProducts = res.data;
      },
    });
  }

  addToCart(pId: string) {
    this._CartService.addToCartAPI(pId).subscribe({
      next: (res) => {
        this._ToastrService.success(res.message);
      },
    });
  }
}
