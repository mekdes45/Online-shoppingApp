import { UserService } from 'src/app/services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-prducts',
  templateUrl: './prducts.component.html',
  styleUrls: ['./prducts.component.scss']
})
export class PrductsComponent implements OnInit {
  public productList: any;
  constructor(private userService:UserService) { }

  ngOnInit(): void {
    this.userService.getProduct().subscribe((res: any) => {
      this.productList = res;
    })
  }

}
