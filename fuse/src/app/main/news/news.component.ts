import { Component, OnInit} from '@angular/core';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import { UpdatesService } from '../../../@core/updates/updates.service';
import { Update } from '../../../@core/updates/update.model';
import { AuthService } from '../../../@core/auth/auth.service';
import { UserService } from '../../../@core/user/user.service';
import { TuiService } from 'ngx-tui-editor';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms'
import { MatDialog } from '@angular/material';
import { locale as english } from './i18n/en';
import { locale as turkish } from './i18n/tr';
import { NewsDialogComponent } from './news-dialog/news-dialog.component';
import { fuseAnimations } from '@fuse/animations';

@Component({
    selector   : 'news',
    templateUrl: './news.component.html',
    styleUrls  : ['./news.component.scss'],
    animations : fuseAnimations
})
export class NewsComponent implements OnInit {
    /**
     * Constructor
     *
     * @param {FuseTranslationLoaderService} _fuseTranslationLoaderService
     * @param {FuseSidebarService} _fuseSidebarService
     */
    constructor(
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private _fuseSidebarService: FuseSidebarService,
        private updatesService : UpdatesService, 
        public authService : AuthService, 
        private toast : ToastrService, 
        private formBuilder : FormBuilder,
        private userService : UserService,
        private editorService: TuiService,
        private dialog  : MatDialog


    ) {
        this._fuseTranslationLoaderService.loadTranslations(english, turkish);
    }

    /**
     * Toggle sidebar
     *
     * @param name
     */
    toggleSidebar(name): void
    {
        this._fuseSidebarService.getSidebar(name).toggleOpen();
    }

    updates : Update[] = [];
    updateFilled : Boolean = false;
    update : Update;
    newestUpdate : Update;
    edittedUpdate : Update;
    closeResult: string;
    updateForm: FormGroup;
    editForm: FormGroup;
    markdown : any = "";
    options : any = {
      initialValue: `# Title of Project` ,
      initialEditType: 'markdown',
      previewStyle: 'vertical',
      height: 'auto',
      minHeight: '498px' 
    };
    expression : any = /[>|#*_]/gi;

    ngOnInit() {
        this.updatesService.getUpdates().subscribe((result) => {
          this.updates = result.result;
          for(let update of this.updates) {
            update.date = new Date(update.date);
          }
          this.newestUpdate = this.updates[0];
          console.log(this.newestUpdate);
          
          this.markdown = this.updates[0].content;
        });
        this.createForm();
      }
    
      private createForm() : void {
        this.editForm = this.formBuilder.group({
                title 		: new FormControl('', {}),
          content 	: new FormControl('', {}),
          author    : new FormControl('', {}),
          date      : new FormControl('', {}),
            });
      }
    
      public onClickEdit() : void {
        this.updateFilled = true;
            this.editForm.controls.title.markAsDirty();
            this.editForm.controls.content.markAsDirty();
    
            const { title, content, author, date } = this.editForm.value;
            const edittedUpdate : Update = {
                title,
          content,
          author,
          date
        };
    
        edittedUpdate.author = this.update.author;
        edittedUpdate.date = this.update.date;
        edittedUpdate._id = this.update._id;

        this.updatesService.editUpdate(edittedUpdate).subscribe((result) => {
          this.success(result.message)
          this.update = result.result;
          this.update.date = new Date(result.result.date);
          
    
          const index = this.updates.findIndex(update => result.result._id === update._id);
    
          this.updates[index] = result.result;
          this.updates[index].date = new Date(result.result.date);
          
        });
      }
    
      private populateForm() : void {
            this.createForm();
    
            //get data from currently opened section
            let data = this.update;
    
            //populate formControls
            this.editForm.get('title').setValue(data.title);
            this.editForm.get('content').setValue(data.content);
    
        }
    
    
      private updateFill(update : Update) {
        this.updateFilled = true;
        this.update = update;
        this.markdown = this.update.content;
      }

      public createUpdate(): void {
        this.createForm();
          if(this.authService.isAuthenticated() && this.authService.isAdmin()) {
            this.updateFilled = false;
          } else {
            //tell them they no have access
            this.error('You are not authorized');
          }
      }
    
      private edit() {
        if(this.authService.isAuthenticated() && this.authService.isAdmin()) {
          this.populateForm();
        }
      }
    
      delete(update) : void {
        if (window.confirm('Are you sure you want to delete?')) {
          this.updatesService.deleteUpdate(update._id).subscribe((result) => {
            if(result.success) {
              this.updateFilled = false;
              this.success('Post Deleted');
    
              const index = this.updates.findIndex(update => update._id === result.result._id);
              this.updates.splice(index, 1);
              this.newestUpdate = this.updates[0];
              this.markdown = this.newestUpdate.content;
            } else {
              this.error("Did not delete post :(");
            }
          });
          
        } else {
          this.error("Did not delete post :(");
        }
      }
      
      private openDialog() : void {
        let dialogRef = this.dialog.open(NewsDialogComponent, {

        });

        dialogRef.afterClosed().subscribe(result => {
         if(result != null || result != undefined) {
          this.updateFilled = false;
          this.updates.splice(0, 0, result);
          this.newestUpdate = this.updates[0];
          this.markdown = this.newestUpdate.content;
         } else {
           //do nothing 
         }
        });
      }

      private error(msg : string) : void {
            this.toast.error(msg, 'Error!', {
                timeOut: 5000,
                closeButton: true,
                progressBar: true,
                progressAnimation: 'decreasing',
                positionClass: 'toast-top-right',
              });
      }
    
      private success(msg: string) : void {
            this.toast.success(msg, 'Success!', {
                timeOut: 5000,
                closeButton: true,
                progressBar: true,
                progressAnimation: 'decreasing',
                positionClass: 'toast-top-right',
              });
      }
    
}
