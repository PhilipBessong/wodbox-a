import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-wodstyle',
  templateUrl: './wodstyle.page.html',
  styleUrls: ['./wodstyle.page.scss'],
})
export class WodstylePage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
  backtoWarmUp(){
    this.router.navigate(['/ahome']);
  }
  tointerval(){
    this.router.navigate(['/addwod']);
  }
  totabata(){
    this.router.navigate(['/tabata']);
  }
  toladder(){
    this.router.navigate(['/ladder']);
  }
  toemom(){
    this.router.navigate(['/ahome']);
  }
  toamrap(){
    this.router.navigate(['/ahome']);
  }

}
