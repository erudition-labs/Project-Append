import { Component } from '@angular/core';

@Component({
  selector: 'ngx-footer',
  styleUrls: ['./footer.component.scss'],
  template: `
    <span class="created-by">Created by <b><a href="https://www.linkedin.com/company/eruditionlabs/" target="_blank">Erudition Labs</a></b> 2018</span>

    <div class="socials">
      <a href="#" target="_blank" class="ion ion-clipboard"></a>
      <a href="https://www.linkedin.com/company/eruditionlabs/" target="_blank" class="ion ion-social-linkedin"></a>
    </div>
  `,
})
export class FooterComponent {
}
