import { ChangeDetectionStrategy, Component } from '@angular/core'; 

@Component({
  selector: 'app-main-layout',
  imports: [],
  templateUrl: './main.html',
 
  styleUrl: './main.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Main { }
