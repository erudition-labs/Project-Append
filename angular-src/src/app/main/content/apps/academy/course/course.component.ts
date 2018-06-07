import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit, QueryList, ViewChildren, ViewEncapsulation } from '@angular/core';
import { Subscription } from 'rxjs';

import { FusePerfectScrollbarDirective } from '@fuse/directives/fuse-perfect-scrollbar/fuse-perfect-scrollbar.directive';
import { fuseAnimations } from '@fuse/animations';

import { AcademyCourseService } from '../course.service';

@Component({
    selector     : 'fuse-academy-course',
    templateUrl  : './course.component.html',
    styleUrls    : ['./course.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class FuseAcademyCourseComponent implements OnInit, OnDestroy, AfterViewInit
{
    course: any;
    courseSubscription: Subscription;
    currentStep = 0;
    courseStepContent;
    animationDirection: 'left' | 'right' | 'none' = 'none';
    @ViewChildren(FusePerfectScrollbarDirective) fuseScrollbarDirectives: QueryList<FusePerfectScrollbarDirective>;

    constructor(
        private courseService: AcademyCourseService,
        private changeDetectorRef: ChangeDetectorRef
    )
    {

    }

    ngOnInit()
    {
        // Subscribe to courses
        this.courseSubscription =
            this.courseService.onCourseChanged
                .subscribe(course => {
                    this.course = course;
                });
    }

    ngAfterViewInit()
    {
        this.courseStepContent = this.fuseScrollbarDirectives.find((fuseScrollbarDirective) => {
            return fuseScrollbarDirective.element.nativeElement.id === 'course-step-content';
        });
    }

    ngOnDestroy()
    {
        this.courseSubscription.unsubscribe();
    }

    gotoStep(step)
    {
        // Decide the animation direction
        this.animationDirection = this.currentStep < step ? 'left' : 'right';

        // Run change detection so the change
        // in the animation direction registered
        this.changeDetectorRef.detectChanges();

        // Set the current step
        this.currentStep = step;
    }

    gotoNextStep()
    {
        if ( this.currentStep === this.course.totalSteps - 1 )
        {
            return;
        }

        // Set the animation direction
        this.animationDirection = 'left';

        // Run change detection so the change
        // in the animation direction registered
        this.changeDetectorRef.detectChanges();

        // Increase the current step
        this.currentStep++;
    }

    gotoPreviousStep()
    {
        if ( this.currentStep === 0 )
        {
            return;
        }

        // Set the animation direction
        this.animationDirection = 'right';

        // Run change detection so the change
        // in the animation direction registered
        this.changeDetectorRef.detectChanges();

        // Decrease the current step
        this.currentStep--;
    }
}
