import { Component, OnDestroy, OnInit } from '@angular/core';
import { DummyTestService } from '../../../shared/services/dummy-test.service';
import { DataCollectionService } from '../../../shared/services/data-collection.service';
import { Timer } from 'src/app/shared/components/timer/timer';
import { NavigationStart, Router } from '@angular/router';

@Component({
    selector: 'app-user-profile',
    templateUrl: './buttons.component.html',
    styleUrls: ['./buttons.component.scss']
})
export class ButtonsComponent implements OnInit, OnDestroy {

    private timer: Timer;
    private routeSub: any;

    constructor(private dummyService: DummyTestService,
                private dataCollectionService: DataCollectionService,
                private router: Router) {
    }

    ngOnInit() {
        this.timer = new Timer(this.dataCollectionService, 'symulacja/przyciski');
        this.timer.start();

        this.routeSub = this.router.events.subscribe((event) => {
            if (event instanceof NavigationStart) {
                this.timer.stop();
            }
        });
    }

    ngOnDestroy(): void {
        this.routeSub.unsubscribe();
    }

    test() {
        this.dummyService.hello().subscribe(() => {
        }, () => {
        });
    }

    simulateResponseCode(code: string) {
        this.dataCollectionService.simulateCode(code).subscribe(() => {
        });
    }
}
