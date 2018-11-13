import { Component, OnInit } from '@angular/core';
import {Crisis} from '../crisis';
import {CrisisService} from '../crisis.service';
import {Observable} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-crisis-list',
  templateUrl: './crisis-list.component.html',
  styleUrls: ['./crisis-list.component.css']
})
export class CrisisListComponent implements OnInit {

  crises$: Observable<Crisis[]>;
  selectedId: number;

  constructor(
    private service: CrisisService,

    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.getCrises();
  }


  getCrises(): void {
    this.crises$ = this.route.paramMap.pipe(
      switchMap(params => {
        // (+) before `params.get()` turns the string into a number
        this.selectedId = +params.get('id');
        return this.service.getCrises();
      })
    );
  }

}
