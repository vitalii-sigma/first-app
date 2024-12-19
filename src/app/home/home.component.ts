import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HousingLocationComponent } from '../housing-location/housing-location.component';
import { HousingLocation } from '../housinglocation';
import { HousingService } from '../housing.service';
import { BehaviorSubject, debounceTime, distinctUntilChanged, map, switchMap } from 'rxjs';

@Component({
  selector: 'app-home',
  imports: [CommonModule, HousingLocationComponent],
  template: `
    <section>
      <form>
        <input type="text" placeholder="Filter by city" #filter
          (input)="search.next(filter.value)" />
      </form>
    </section>
    <section class="results">
      <app-housing-location
        *ngFor="let housingLocation of filteredLocationList | async"
        [housingLocation]="housingLocation">
      </app-housing-location>
    </section>
  `,
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  housingService: HousingService = inject(HousingService);

  search = new BehaviorSubject<string>('');

  filteredLocationList = this.search.pipe(
    debounceTime(300),
    distinctUntilChanged(),
    switchMap((searchText) =>
      this.housingService.getAllHousingLocations().then((housingLocationList: HousingLocation[]) =>
        housingLocationList.filter((housingLocation) =>
          housingLocation?.city?.toLowerCase().includes(searchText.toLowerCase())
        )
      )
    )
  );
}
