import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div class="toolbar">
      <div>Tiles count (updated on blur): <input type="number" value="2" (blur)="generateTiles($event.target.value)"/></div>
      <button (click)="enableAllOutsideClick()">Enable all outside click</button>
      <button (click)="disableAllOutsideClick()">Disable all outside click</button>
    </div>
    <div class="container">
      <ng-container *ngFor="let tile of tiles; index as i; trackBy:trackById">
        <div class="card" (click)="clickInside(i)" (ngxOutsideClick)="clickOutside(i)" [ngxOutsideClickEnabled]="tile.enabled">
          <ul>
            <li>{{ tile.id }}</li>
            <li>Inside click: {{ tile.inside }}</li>
            <li>Left outside click: {{ tile.outside }}</li>
            <li>Enable outside click: <input type="checkbox" [(ngModel)]="tile.enabled" /></li>
          </ul>
        </div>
      </ng-container>
    </div>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  allEnabled = true;
  tiles = [];

  ngOnInit(): void {
    this.generateTiles(2);
  }

  enableAllOutsideClick(): void {
    this.tiles.forEach(tile => tile.enabled = true);
    this.allEnabled = true;
  }
  
  disableAllOutsideClick(): void {
    this.tiles.forEach(tile => tile.enabled = false);
    this.allEnabled = false;
  }

  clickInside(index: number): void {
    this.tiles[index].inside++;
  }

  clickOutside(index: number): void {
    this.tiles[index].outside++;
  }

  generateTiles(tilesCount: number): void {
    this.tiles = Array.from({length: tilesCount}, (_, index) => ({ id: index+1, inside: 0, outside: 0, enabled: this.allEnabled }));
  }

  trackById({ id }: { id: number}): number {
    return id;
  }
}
