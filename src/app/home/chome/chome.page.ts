import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-chome',
  templateUrl: './chome.page.html',
  styleUrls: ['./chome.page.scss'],
})
export class ChomePage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
  logout() {
    this.router.navigate(['/login'])
    }
    //async
     toWarmup() {
     
     this.router.navigate(['/warmup']);
    }

}
