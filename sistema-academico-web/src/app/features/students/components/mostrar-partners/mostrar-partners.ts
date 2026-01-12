import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { StudentPartnersStore } from '@core/services/student-partners-store';

@Component({
  selector: 'app-mostrar-partners',
  imports: [],
  templateUrl: './mostrar-partners.html',
  styleUrl: './mostrar-partners.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MostrarPartners implements OnInit {

  stStore = inject( StudentPartnersStore);

  partners =  this.stStore.partners;
  loading = this.stStore.loading;
  error =  this.stStore.error;
  
  ngOnInit(): void {
        this.stStore.loadCurrentStudentParners();  
  } 
}
