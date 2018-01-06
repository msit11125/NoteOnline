import { Component, OnInit, AfterViewInit, ElementRef } from '@angular/core';

//宣告可使用JQuery
//import $ from "jquery";
declare var $: any;
declare var CKEDITOR: any;

@Component({
  selector: 'notes-create',
  templateUrl: './notes-create.component.html',
  styleUrls: ['./notes-create.component.css']
})
export class NotesCreateComponent implements OnInit, AfterViewInit {


  constructor(private elementRef: ElementRef) {

  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    //產生ckEditor
    var config = {
      language: 'zh',
      uiColor: '#DDDDDD',
      toolbar: [
        ['Source', '-', 'NewPage', 'Save', 'Preview', '-', 'Templates'],
        ['Cut', 'Copy', 'Paste', 'PasteText', 'PasteFromWord', '-', 'Print', 'SpellChecker', 'Scayt'],
        ['Undo', 'Redo', '-', 'Find', 'Replace', '-', 'SelectAll', 'RemoveFormat'],
        '/',
        ['Bold', 'Italic', 'Underline', 'Strike', '-', 'Subscript', 'Superscript'],
        ['NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', 'Blockquote'],
        ['JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock'],
        ['Link', 'Unlink', 'Anchor'],
        ['Image', 'Table', 'HorizontalRule', 'Smiley', 'SpecialChar', 'PageBreak'],
        '/',
        ['Styles', 'Format', 'Font', 'FontSize'],
        ['TextColor', 'BGColor'],
        ['Maximize', 'ShowBlock']
      ]
    }
    CKEDITOR.replace('editor1', config);
    //ckeditor change事件
    for (var i in CKEDITOR.instances) {
      CKEDITOR.instances[i].on('change', function () {
        var htmlText = CKEDITOR.instances.editor1.getData();
        document.getElementsByName('displayCK')[0].innerHTML = htmlText;
      });
    }
  }

  private expand: boolean = false;
  public ExpandAndCollapse() {
    this.expand = !this.expand;
  }

  private step: number = 1;
  public GoToStep(stepNum:number) {
    this.step = stepNum;
  }

}
