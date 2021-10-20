import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CustomLayoutComponent } from '@qad-nx/eqms-feature-shell';

describe('CustomLayoutComponent', () => {
  let component: CustomLayoutComponent;
  let fixture: ComponentFixture<CustomLayoutComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [CustomLayoutComponent],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
