import {Component, Input, OnInit} from '@angular/core';
import {Crisis} from '../crisis';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {CrisisService} from '../crisis.service';
import {switchMap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {DialogService} from '../../dialog.service';

@Component({
  selector: 'app-crisis-detail',
  templateUrl: './crisis-detail.component.html',
  styleUrls: ['./crisis-detail.component.css']
})
export class CrisisDetailComponent implements OnInit {
  crisis$: Observable<Crisis>;
  selectedId: number;
  crisis: Crisis;
  editName: string;

  canDeactivate(): Observable<boolean> | boolean {
    // Allow synchronous navigation (`true`) if no crisis or the crisis is unchanged
    if (!this.crisis || this.crisis.name === this.editName) {
      return true;
    }
    // Otherwise ask the user with the dialog service and return its
    // observable which resolves to true or false when the user decides
    return this.dialogService.confirm('Discard changes?');
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: CrisisService,
    private dialogService: DialogService
  ) { }

  ngOnInit() {
    // this.crisis$ = this.route.paramMap.pipe(
    //   switchMap((params: ParamMap) =>
    //     this.service.getCrisis(params.get('id')))
    // );

    this.route.data
      .subscribe((data: { crisis: Crisis }) => {
        this.editName = data.crisis.name;
        this.crisis = data.crisis;
      });
  }

  gotoCrises(crisis: Crisis) {
    const crisisId = crisis ? crisis.id : null;
    // Relative navigation back to the crises
    this.router.navigate(['../', { id: crisisId, foo: 'foo' }], { relativeTo: this.route });
  }

  cancel() {
    this.gotoCrises(null);
  }

  save() {
    this.crisis.name = this.editName;
    this.gotoCrises(this.crisis);
  }

}
