import { Component, OnDestroy, OnInit } from '@angular/core';
import { DummyTestService } from '../../../shared/services/dummy-test.service';
import { DataCollectionService } from '../../../shared/services/data-collection.service';
import { NavigationStart, Router } from '@angular/router';

@Component({
    selector: 'app-user-profile',
    templateUrl: './buttons.component.html',
    styleUrls: ['./buttons.component.scss']
})
export class ButtonsComponent implements OnInit, OnDestroy {

    private eventId: number = null;

    constructor(private dummyService: DummyTestService,
                private dataCollectionService: DataCollectionService,
                private router: Router) {
    }

    ngOnInit() {
        this.dataCollectionService.startEvent('symulacja/przyciski').subscribe(
            response => this.eventId = response.event_id
        );
    }

    ngOnDestroy(): void {
        if (this.eventId) {
            this.dataCollectionService.finishEvent(this.eventId).subscribe(
                () => {}
            );
        }
    }

    test() {
        this.dummyService.hello().subscribe(() => {
        }, () => {
        });
    }

    simulateResponseCode(code: number) {
        this.dataCollectionService.simulateCode(code).subscribe(() => {
        }, () => {
        });
    }
}
