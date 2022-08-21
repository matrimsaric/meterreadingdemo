
import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { HdrNavComponent } from './hdr-nav.component';

describe('HdrNavComponent', () => {
  let component: HdrNavComponent;
  let fixture: ComponentFixture<HdrNavComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ HdrNavComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HdrNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
