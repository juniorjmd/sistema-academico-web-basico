import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink, RouterLinkActive } from "@angular/router";

@Component({
  selector: 'app-layout-auth', 
  templateUrl: './auth.html',
  styleUrl: './auth.css',
  imports: [RouterLink, RouterLinkActive],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Auth { 
  
  noShowSelectLogin =  input<boolean>(false);
}
