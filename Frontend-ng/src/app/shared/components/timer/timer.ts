import { Component, OnInit } from '@angular/core';
import { DataCollectionService } from '../../services/data-collection.service';

export class Timer {

    pageName = '';
    time = 0;
    interval;

    constructor(private dataCollectionService: DataCollectionService,
                pageName: string) {
        this.pageName = pageName;
    }

    public start() {
        this.interval = setInterval(() => {
            this.time++;
        }, 1000);
    }

    public stop() {
        if (this.pageName !== '') {
            // this.dataCollectionService.countTime(this.time).subscribe(() => {
            // });
        }

        clearInterval(this.interval);
    }

}
