
import { Component, OnDestroy,	ViewChild, TemplateRef, Input} from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { takeWhile } from 'rxjs/operators/takeWhile' ;
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';


interface CardSettings {
  title: string;
  iconClass: string;
  type: string;
}

@Component({
  selector: 'ngbd-modal-content',
  template: `
    <div class="modal-header">
      <h2 class="modal-title">New Release!</h2>
        <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
          <span aria-hidden="true">&times;</span>
        </button>
    </div>

    <div class="modal-body">
    <div markdown [src]="'http://ca782.org/changelog.md'"  (error)="onError($event)"></div>

    </div>
<div class="modal-footer">
  <button type="button" class="btn btn-outline-primary" (click)="activeModal.close('Close click')">Close</button>
</div>
  `
})
export class NgbdModalContent {
 // @Input() name;

  constructor(public activeModal: NgbActiveModal) {}
}

@Component({
  selector: 'ngx-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnDestroy {
  @ViewChild('modalContent') modalContent: TemplateRef<any>;
  modalData: {
    data : string
	}


  private alive = true;

  lightCard: CardSettings = {
    title: 'Light',
    iconClass: 'nb-lightbulb',
    type: 'primary',
  };
  rollerShadesCard: CardSettings = {
    title: 'Roller Shades',
    iconClass: 'nb-roller-shades',
    type: 'success',
  };
  wirelessAudioCard: CardSettings = {
    title: 'Wireless Audio',
    iconClass: 'nb-audio',
    type: 'info',
  };
  coffeeMakerCard: CardSettings = {
    title: 'Coffee Maker',
    iconClass: 'nb-coffee-maker',
    type: 'warning',
  };

  statusCards: string;

  commonStatusCardsSet: CardSettings[] = [
    this.lightCard,
    this.rollerShadesCard,
    this.wirelessAudioCard,
    this.coffeeMakerCard,
  ];

  statusCardsByThemes: {
    default: CardSettings[];
    cosmic: CardSettings[];
    corporate: CardSettings[];
  } = {
    default: this.commonStatusCardsSet,
    cosmic: this.commonStatusCardsSet,
    corporate: [
      {
        ...this.lightCard,
        type: 'warning',
      },
      {
        ...this.rollerShadesCard,
        type: 'primary',
      },
      {
        ...this.wirelessAudioCard,
        type: 'danger',
      },
      {
        ...this.coffeeMakerCard,
        type: 'secondary',
      },
    ],
  };

  constructor(private themeService: NbThemeService, private modalService: NgbModal) {
    this.themeService.getJsTheme()
      .pipe(takeWhile(() => this.alive))
      .subscribe(theme => {
        this.statusCards = this.statusCardsByThemes[theme.name];
    });

   const modalRef = this.modalService.open(NgbdModalContent);
    //modalRef.componentInstance.name = 'World';
  }

  onLoad(event){}
  onError(event){}

  ngOnDestroy() {
    this.alive = false;
  }
}
