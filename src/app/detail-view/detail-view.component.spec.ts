import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailViewComponent } from './detail-view.component';
import { provideMockStore } from '@ngrx/store/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';
import { ReactiveComponentModule } from '@ngrx/component';
import { selectTicketById, selectTicketListLoading } from '../data-access/ticket';
import { usersSelector } from '../data-access/user';

fdescribe('DetailViewComponent', () => {
  let component: DetailViewComponent;
  let fixture: ComponentFixture<DetailViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailViewComponent ],
      imports: [
        ReactiveComponentModule,
      ],
      providers: [
        provideMockStore({
          selectors: [
            {
              selector: selectTicketListLoading,
              value: false,
            },
            {
              selector: usersSelector.selectAll,
              value: [],
            },
            {
              selector: selectTicketById(1),
              value: 1,
            }
          ]
        }),
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of(convertToParamMap({ id: '1' }))
          }
        }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
