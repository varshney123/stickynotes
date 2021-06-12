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
import {MatMenuHarness} from '@angular/material/menu/testing';

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

  it('should have button for contextual menus',() => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('button')).toBeTruthy()
  })

  it('should have contextual menu options',() => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('mat-menu')).toBeTruthy()
  })

  it('by default likes should have 0 value',() => {
    const compiled = fixture.debugElement.nativeElement;
    expect(parseInt(compiled.querySelector('.likes').textContent)).toEqual(0)
  })

  it('contextual menu options should have 4 options',async() => {
    const menu = await loader.getHarness(MatMenuHarness.with({selector: '.menuOptions'}));
    await menu.open();
    expect((await menu.getItems()).length).toBe(4);
  })

  it('click on add option should add new note',async() => {
    const menu = await loader.getHarness(MatMenuHarness.with({selector: '.mat-menu-trigger'}));
    await menu.open();
    const menuItems = await menu.getItems()
    await menuItems[0].click()
    expect(component.stickiesArr.length).toBe(2);
  })

  it('click on like option should update counter',async() => {
    const compiled = fixture.debugElement.nativeElement;
    const menu = await loader.getHarness(MatMenuHarness.with({selector: '.mat-menu-trigger'}));
    await menu.open();
    const menuItems = await menu.getItems()
    await menuItems[3].click()
    expect(parseInt(compiled.querySelector('.likes').textContent)).toEqual(1);
  })

  it('click on delete option should delete note',async() => {
    const compiled = fixture.debugElement.nativeElement;
    const menu = await loader.getHarness(MatMenuHarness.with({selector: '.mat-menu-trigger'}));
    await menu.open();
    const menuItems = await menu.getItems()
    await menuItems[0].click()
    await menuItems[0].click()
    await menuItems[2].click()
    expect(component.stickiesArr.length).toEqual(2);
  })

  it('click on edit option should show input',async() => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.editInput')).toBeDefined();
  })

});
