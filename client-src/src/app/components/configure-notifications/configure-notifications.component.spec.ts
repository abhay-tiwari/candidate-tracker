import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigureNotificationsComponent } from './configure-notifications.component';

describe('ConfigureNotificationsComponent', () => {
  let component: ConfigureNotificationsComponent;
  let fixture: ComponentFixture<ConfigureNotificationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigureNotificationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigureNotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
