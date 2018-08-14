import { BrowserModule                      } from '@angular/platform-browser';
import { NgModule                           } from '@angular/core';
import { FormsModule, ReactiveFormsModule   } from '@angular/forms';
import { HttpClientModule                   } from '@angular/common/http';
import { RouterModule, Routes               } from '@angular/router';
import { AppRoutingModule, routes           } from './app.routing';
import { ComponentsModule                   } from './components/components.module';
import { FlashMessagesModule                } from 'angular2-flash-messages';
import { HttpModule                         } from '@angular/http';


//services
import { AuthService            } from './services/auth.service';
import { AuthGuard              } from './guards/auth.guard';


//tabs are below
import { AppComponent                                               } from './app.component';
import { EventsComponent                                            } from './components/events/events.component';

import { MatAutocompleteModule, MatInputModule   } from '@angular/material';
import { BrowserAnimationsModule                 } from '@angular/platform-browser/animations';
import { MatSelectModule                         } from '@angular/material/select';
import { MatCardModule                           } from '@angular/material/card';
import { MatExpansionModule                      } from '@angular/material/expansion';
import { MatChipsModule                          } from '@angular/material/chips';
import { MatListModule                           } from '@angular/material/list';
import { MatDialogModule                         } from '@angular/material/dialog';
import { MatButtonModule                         } from '@angular/material/button';
import { MatFormFieldModule                      } from '@angular/material/form-field';
import { MatStepperModule                        } from '@angular/material/stepper';
import { MatGridListModule                       } from '@angular/material/grid-list';
import { MatDividerModule                        } from '@angular/material/divider';





import { DragulaModule } from 'ng2-dragula';
import { PopoverModule } from 'ngx-popover';

@NgModule({
    declarations: [
        AppComponent,
        EventsComponent,
    ],

    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        HttpClientModule,
        ReactiveFormsModule,
        ComponentsModule,
        RouterModule,
        AppRoutingModule,
        MatAutocompleteModule,
        MatInputModule,
        MatSelectModule,
        MatExpansionModule,
        MatCardModule,
        MatChipsModule,
        MatListModule,
        MatDialogModule,
        MatButtonModule,
        MatFormFieldModule,
        MatStepperModule,
        MatGridListModule,
        MatDividerModule,
        DragulaModule,
        PopoverModule,
        FlashMessagesModule.forRoot(),
        HttpModule,
        RouterModule.forRoot(routes)
    ],
    providers: [
        AuthService,
        AuthGuard,
    ],

    entryComponents: [
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
