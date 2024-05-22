import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { FormsModule } from '@angular/forms';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzMessageService } from 'ng-zorro-antd/message';
interface Good{
  id: number;
  count: number;
  img: string;
  name: string,
  price: number
}
@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, NzTableModule, NzButtonModule, FormsModule, NzMessageModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  constructor(private http: HttpClient, private message: NzMessageService) { }
  carts: Good[] = [];
  ngOnInit() {
    this.http.get('/api/carts')
      .subscribe((res: any) => {
        console.log(res.carts);
        this.carts = res.carts
      })
  }
  money = 0;
  address = '';
  showAddress = '请添加地址';
  phone = '';
  showPhone = '请添加手机号';
  username = '';
  showUsername = '请添加收货人';
  checked = false;
  loading = false;
  indeterminate = false;
  listOfCurrentPageData = [];
  setOfCheckedId = new Set<number>();
  addAddress(){
    this.showAddress = this.address;
    this.showPhone = this.phone;
    this.showUsername = this.username;
  }
  countChange(e:any,data:any){
    const cart = this.carts.find(cart => cart.name == data.name);
    if (cart) {
      cart.count = e.target.value;
    } 
    this.refreshCheckedStatus();
  }
  post(){
    this.http.post('/api/delete', { ids: [...this.setOfCheckedId] })
      .subscribe((res: any) => {
        this.message.success('结算成功');
        setTimeout(()=>{
          this.carts = this.carts.filter(item => !this.setOfCheckedId.has(item.id))
        }, 3000)
      })
  }
  updateCheckedSet(id: number, checked: boolean): void {
    if (checked) {
      this.setOfCheckedId.add(id);
    } else {
      this.setOfCheckedId.delete(id);
    }
  }

  refreshCheckedStatus(): void {
    this.money = 0;
    this.carts.forEach(item=>{
      if(this.setOfCheckedId.has(item.id)){
        this.money += item.count*item.price
      }
    })
    const listOfEnabledData = [...this.carts];
    this.checked = listOfEnabledData.every(({ id }) => this.setOfCheckedId.has(id));
    this.indeterminate = listOfEnabledData.some(({ id }) => this.setOfCheckedId.has(id)) && !this.checked;
  }

  onItemChecked(id: number, checked: boolean): void {
    this.updateCheckedSet(id, checked);
    this.refreshCheckedStatus();
  }

  onAllChecked(checked: boolean): void {
    this.carts
      .forEach(({ id }) => this.updateCheckedSet(id, checked));
    this.refreshCheckedStatus();
  }

}
