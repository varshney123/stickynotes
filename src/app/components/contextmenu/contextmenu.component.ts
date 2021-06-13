import { Component, OnInit, Output,EventEmitter, Input, ViewChild, ElementRef, OnChanges } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { CONSTANTS } from 'src/app/constant';

@Component({
  selector: 'app-contextmenu',
  templateUrl: './contextmenu.component.html',
  styleUrls: ['./contextmenu.component.css']
})
export class ContextmenuComponent implements OnInit,OnChanges {

  MENU_OPTIONS = CONSTANTS.MENU_OPTIONS;
  menuTopLeftPosition =  {x: '0px', y: '0px'};
  editableId: number | undefined;

  @ViewChild(MatMenuTrigger) matMenuTrigger!: MatMenuTrigger;

  //Creating event emitters to emit data to parent home component
  @Output() addNote = new EventEmitter()
  @Output() removeNote = new EventEmitter()
  @Output() addLike = new EventEmitter()
  @Output() editNote = new EventEmitter()

  @Input() sticky = { id : 0};
  @Input() arrLength = 1

  constructor() { }

  makeNewNote(id:any){
    this.addNote.emit(id)
  }

  remNote(id:any){
    this.removeNote.emit(id)
  }

  addLikes(id:any){
    this.addLike.emit(id)
  }

  ngOnChanges(obj:any){
    this.sticky = this.sticky;
  }

  //aligning menu as per clicked note
  alignMenu(e:MouseEvent){
    let x = e.clientX - 24;
    let y = e.clientY- 24;
    this.menuTopLeftPosition.x = e.view?.pageXOffset  ? e.view?.pageXOffset + x + 'px' : x + 'px';
    this.menuTopLeftPosition.y = e.view?.pageYOffset ? e.view?.pageYOffset+ y + 'px' : y + 'px';
  }

  setMenuOptions(e:MouseEvent,item:any){
    this.alignMenu(e)
    this.matMenuTrigger.menuData = { item: item }
    this.matMenuTrigger.openMenu();
  }

  setFocus(id:any){
    this.editNote.emit(id)
  }

  ngOnInit(): void {
  }

}
