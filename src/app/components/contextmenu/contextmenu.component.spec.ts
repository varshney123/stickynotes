import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatMenuHarness } from '@angular/material/menu/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { ContextmenuComponent } from './contextmenu.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';

let loader: HarnessLoader;

describe('ContextmenuComponent', () => {
  let component: ContextmenuComponent;
  let fixture: ComponentFixture<ContextmenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContextmenuComponent ],
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
    fixture = TestBed.createComponent(ContextmenuComponent);
    component = fixture.componentInstance;
    loader = TestbedHarnessEnvironment.loader(fixture);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  

  it('contextual menu options should have 4 options',async() => {
    const menu = await loader.getHarness(MatMenuHarness);
    await menu.open();
    const items = await menu.getItems()
    expect(items.length).toBe(4);
  })
});
