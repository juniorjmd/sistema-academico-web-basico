import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-professor-main',
  imports: [],
  template: `<p>main works!</p>`,
  styleUrl: './main.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfessorMain { }