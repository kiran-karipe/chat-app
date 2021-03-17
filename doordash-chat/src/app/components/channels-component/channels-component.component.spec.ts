import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChannelsComponentComponent } from './channels-component.component';

fdescribe('ChannelsComponentComponent', () => {
  let component: ChannelsComponentComponent;
  let fixture: ComponentFixture<ChannelsComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChannelsComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChannelsComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
