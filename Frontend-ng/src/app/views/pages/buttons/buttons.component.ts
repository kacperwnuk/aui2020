import { Component, OnInit } from '@angular/core';
import { DummyTestService } from '../../../shared/services/dummy-test.service';

@Component({
    selector: 'app-user-profile',
    templateUrl: './buttons.component.html',
    styleUrls: ['./buttons.component.scss']
})
export class ButtonsComponent implements OnInit {

    constructor(private dummyService: DummyTestService) {
    }

    ngOnInit() {

    }

    test() {
        this.dummyService.hello().subscribe(() => {
        }, () => {
        });
    }
}
