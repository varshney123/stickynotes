import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { HomeComponent } from './home.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {HarnessLoader} from '@angular/cdk/testing';
import {TestbedHarnessEnvironment} from '@angular/cdk/testing/testbed';

import { By } from '@angular/platform-browser';

let loader: HarnessLoader;

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeComponent ],
      imports: [MatMenuModule,
                MatCardModule,
                BrowserAnimationsModule,
                MatButtonModule,
                MatIconModule],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    loader = TestbedHarnessEnvironment.loader(fixture);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have one note by default',() => {
    expect(component.stickiesArr.length).toBe(1);
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('mat-card')).toBeTruthy()
  })

  it('should have default label on the note',() => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.noteName').textContent).toEqual('Sticky Default Label')
  })

  it('should open contextual menus on right click',async() => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.query(By.css('mat-card'));
    const context = new MouseEvent('contextmenu');
    compiled.nativeElement.dispatchEvent(context);
    fixture.detectChanges()
    expect(fixture.debugElement.nativeElement.querySelector('mat-menu')).toBeDefined()
  })

  it('by default likes should have 0 value',() => {
    const compiled = fixture.debugElement.nativeElement;
    expect(parseInt(compiled.querySelector('.likes').textContent)).toEqual(0)
  }) 
 
  it('click on edit option should show input',async() => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.editInput')).toBeDefined();
  })

});
