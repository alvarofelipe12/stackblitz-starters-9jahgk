import { Component, OnInit } from '@angular/core';
import { JsonPipe, AsyncPipe } from '@angular/common';
import { bootstrapApplication } from '@angular/platform-browser';
import { merge, Observable, of, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [JsonPipe, AsyncPipe, FormsModule],
  template: `
    <h1>Hello from {{ name }}!</h1>
    <a target="_blank" href="https://angular.dev/overview">
      Learn more about Angular
    </a>

    <p>{{ users | json }}</p>
    <p>{{ getUsersOverAge(25) | async | json }}</p>
    <p>{{ user.name }}</p>
    <input [(ngModel)]="user1.email" /> 
    <p>Your email is (updated in real time): {{ user1.email }}</p>

    <button (click)="toggle()">Toggle</button>
    <p>State: {{ toggleState }}</p>
  `,
})
export class App implements OnInit {
  name = 'Angular';
  users = [
    { name: 'Alice', age: 30 },
    { name: 'Bob', age: 20 },
    { name: 'Charlie', age: 25 },
  ];
  user = { name: 'John Doe' };
  //user1 = {};
  user1 = { email: '' }; // fixed

  private toggleSubject = new Subject<boolean>();
  toggleState: boolean = false;

  ngOnInit() {
    this.user.name = 'Jane Smith';
    /*async function getFavoriteColor(): Promise<string> {
      let color;
      setTimeout(() => {
        color = 'blue';
      }, 1000);
      return color;
    }
    getFavoriteColor().then(console.log);*/
    this.getFavoriteColor().then(console.log);
    this.toggleSubject.subscribe((state) => (this.toggleState = state));

    const stream1 = of(1, 2, 3);
    const stream2 = of(4, 5, 6);

    merge(stream1, stream2).subscribe(console.log);
  }

  /*getUsersOverAge(age: number): Observable<any[]> {
    return of(this.users).pipe(
      filter(user => user.age > age) // Issue here
    );
  }*/
  getUsersOverAge(age: number): Observable<any[]> {
    return of(this.users).pipe(
      map((users) => users.filter((user) => user.age > age)) //solved
    );
  }

  async getFavoriteColor(): Promise<string> {
    return new Promise((resolve) => {
      let color = 'red';
      setTimeout(() => {
        color = 'blue';
        return resolve(color);
      }, 1000);
    });
  }

  toggle() {
    this.toggleSubject.next(!this.toggleState); // Issue here
  }
}

bootstrapApplication(App);
