import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div class="container">
      <ng-container *ngFor="let tile of tiles; index as i; trackBy:trackById">
        <div class="card" (click)="clickInside(i)" (ngxOutsideClick)="clickOutside(i)">
          <ul>
            <li>{{ tile.id }}</li>
            <li>Inside click: {{ tile.inside }}</li>
            <li>Outside click: {{ tile.outside }}</li>
          </ul>
        </div>
      </ng-container>
    </div>
  `,
  styles: [`
  .container {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 10px;
    grid-auto-rows: minmax(100px, auto);
    padding: 3rem;
  }
  .card {
    padding: 2rem;
    background-color: white;
    border: 1px lightgray solid;
    -webkit-box-shadow: 1px 1px 5px 0px rgba(0,0,0,0.75);
    -moz-box-shadow: 1px 1px 5px 0px rgba(0,0,0,0.75);
    box-shadow: 1px 1px 5px 0px rgba(0,0,0,0.75);
  }
  .card ul {
    list-style-type: none;
    padding: 0;
  }
  `]
})
export class AppComponent {
  tiles = new Array(500).fill(0).map((_, index) => ({ id: index, inside: 0, outside: 0 }));

  clickInside(index: number): void {
    this.tiles[index].inside++;
  }

  clickOutside(index: number): void {
    this.tiles[index].outside++;
  }

  trackById({ id }: { id: number}): number {
    return id;
  }
}
