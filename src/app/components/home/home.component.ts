import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CONSTANTS } from '../../constant';
import { sticky } from './homeInterface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  MENU_OPTIONS = CONSTANTS.MENU_OPTIONS;
  PLACEHOLDER = CONSTANTS.LABEL_PLACEHOLDER;
  TRANSFORM_CONFIG = CONSTANTS.TRANSFORM_CONFIG;

  @ViewChild('edit') editRef : ElementRef | any;
  stickiesArr: sticky[] = [{
    name: CONSTANTS.LABEL_NAME,
    id: 0,
    likes: 0,
    transform: `translate3d(${this.TRANSFORM_CONFIG.X}px,${this.TRANSFORM_CONFIG.Y}px,0px)`
  }];
  idCounter: number = 0;
  editableId: number | undefined;
  noteLabel: string = "";


  constructor() { }

  /*
    function : To add new note and add new object in stickies array
    args : note id 
  */
  makeNewNote(id: number) {
    var transform;
    let element: any = document.getElementById(id + 'note');
    let pos = element.getBoundingClientRect();

    transform = `translate3d(${pos.x + this.TRANSFORM_CONFIG.NEW_X}px,${pos.y - this.TRANSFORM_CONFIG.Y}px,0px)`

    this.idCounter = this.idCounter + 1;
    let newSticky = {
      name: CONSTANTS.LABEL_NAME,
      id: this.idCounter,
      likes: 0,
      transform: transform
    }
    this.stickiesArr.push(newSticky);
  }


  /*
    function : To edit note label and update when out of focus
    args : note id ,updated name string
  */
  editLabel(id: number, name: string) {
    if (name.trim().length > 0) {
      this.stickiesArr.find(obj => {
        if (obj.id == id) {
          obj.name = name
        }
      });  
    }
    this.editableId = undefined;
    this.noteLabel = "";
  }

  /*
   function : To delete note
   args : note id
 */
  removeNote(id: number) {
    this.stickiesArr = this.stickiesArr.filter((obj) => obj.id != id)
  }

  /*
    function : To maintain the likes count
    args : note id
  */
  addLikes(id: number) {
    this.stickiesArr.find(obj => {
      if (obj.id == id) {
        obj.likes += 1;
      }
    });
  }

  /*
    function : To set autofocus on edit label input field
  */
  setFocus(){
    setTimeout(()=> {
      this.editRef.nativeElement.focus();
    },0)
  }

  ngOnInit(): void {
  }

}
