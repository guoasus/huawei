import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [RouterModule, NzInputModule, NzButtonModule, FormsModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {
  price = null;
  goodList = [
    {
      price: 10999,
      name: 'MateBook X Pro 酷睿 Ultra 微绒典藏版',
      img: '../../../assets/good1.webp'
    },
    {
      price: 7499,
      name: 'HUAWEI Pocket 2',
      img: '../../../assets/good2.webp'
    },
    {
      price: 3999,
      name: 'HUAWEI MatePad Pro 11英寸 2024款',
      img: '../../../assets/good3.webp'
    },
    {
      price: 3199,
      name: 'HUAWEI WATCH 4 Pro',
      img: '../../../assets/good4.webp'
    },
  ]
  search(){
    this.goodList = this.goodList.filter(item=>item.price==this.price)
  }
}
