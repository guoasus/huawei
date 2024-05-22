import { Component } from '@angular/core';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';

interface Good{
  id: number;
  img: string;
  price: number;
  des: string;
  name: string
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NzCarouselModule, NzButtonModule, RouterModule, HeaderComponent, FooterComponent, NzIconModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(private http: HttpClient){}
  goodList: Good []= []; 
  phoneList: Good[] = [
    {
      price: 10999,
      id: 5,
      name: '华为畅享 70 Pro',
      img: '../../../assets/phone1.webp',
      des: '柔性OLED全面屏幕'
    },
    {
      price: 7499,
      id: 6,
      name: 'Pura 70',
      img: '../../../assets/phone2.webp',
      des: '全焦段XMAGE四摄'
    },
    {
      price: 3999,
      id: 7,
      name: 'Mate X5',
      img: '../../../assets/phone3.webp',
      des: '超轻薄四曲折叠'
    },
    {
      price: 3199,
      id: 8,
      name: 'nova 12 Ultra',
      img: '../../../assets/phone4.webp',
      des: '前置6000万人像追焦双摄'
    },
  ]; 
  tags: string[] = [];
  array = [1, 2, 3];
  effect = 'scrollx';
  hoverList = [
    [
      {
        img: '../../../assets/phone1.webp',
        name: 'meta 系列'
      },
      {
        img: '../../../assets/phone1.webp',
        name: 'meta 系列'
      },
      {
        img: '../../../assets/phone1.webp',
        name: 'meta 系列'
      },
      {
        img: '../../../assets/phone1.webp',
        name: 'meta 系列'
      },
      {
        img: '../../../assets/phone1.webp',
        name: 'meta 系列'
      },
      {
        img: '../../../assets/phone1.webp',
        name: 'meta 系列'
      },
    ],
    [
      {
        img: '../../../assets/watch.webp',
        name: 'WATCH Ultimate系列'
      },
      {
        img: '../../../assets/watch.webp',
        name: 'WATCH Ultimate系列'
      },
      {
        img: '../../../assets/watch.webp',
        name: 'WATCH Ultimate系列'
      },
      {
        img: '../../../assets/watch.webp',
        name: 'WATCH Ultimate系列'
      },
      {
        img: '../../../assets/watch.webp',
        name: 'WATCH Ultimate系列'
      },
      {
        img: '../../../assets/watch.webp',
        name: 'WATCH Ultimate系列'
      },
    ],
  ]
  addCart(e:any,good:any){
    e.stopPropagation()
    this.http.post('/api/cart', {
      carts: [
        {...good,count:1}
      ]
})
      .subscribe((res:any)=>{
        console.log(res);
        // this.goodList = res;
      })
    console.log(good)
  }
  ngOnInit(){
    this.http.get('/api/goodList')
      .subscribe((res:any)=>{
        this.goodList = res;
      })
    this.http.get('/api/tags')
      .subscribe((res:any)=>{
        this.tags = res;
      })
  }
}
