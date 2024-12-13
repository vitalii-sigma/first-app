import {Component} from '@angular/core';
import {RouterModule} from '@angular/router';
import {HomeComponent} from './home/home.component';

@Component({
  selector: 'app-root',
  imports: [HomeComponent, RouterModule],
  template: `
    <main>
      <a href="/">
      <!--<a [routerLink]="['/']">-->
        <header class="brand-name">
          <p>HOME</p>
        </header>
      </a>
      <section class="content">
        <router-outlet></router-outlet>
      </section>
    </main>
  `,
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'homes';
}
