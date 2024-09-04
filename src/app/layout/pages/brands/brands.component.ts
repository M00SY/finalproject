import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Environment } from '../../../Base/Environment';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss',
})
export class BrandsComponent implements OnInit {
  brands: any[] = [];

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: object
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('currentpage', '/brands');
    }

    this.http
      .get(`${Environment.baseURL}/api/v1/brands`)
      .subscribe((response: any) => {
        console.log(response);
        this.brands = response.data;
      });
  }
}
