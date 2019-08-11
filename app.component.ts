import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild('myDiv') myDiv: ElementRef;
  @ViewChild('myDiv2') myDiv2: ElementRef;
  @ViewChild('myhighlights') myhighlights: ElementRef;
  @ViewChild('mybackdrop') mybackdrop: ElementRef;
  public query: string;
  textareaValue: any;
  textareaValue2: any;
  theHtmlString: any;
  theHtmlString2: any;
  first: any;
  second: any;
  arrayTemp: any[] = [];
  linesCOunt: any[] = [];
  // Add ES6 polyfills.
  constructor() {
    // var diff = diff;
    this.first = { a: 10, b: 20, i: 60, c: [{ d: 30 }], g: { h: 0 } };
    this.second = { a: 20, c: [{ d: 30 }, { f: 11 }], e: 40, g: { h: 50 }, i: 60 };
    /* this.first = { a:10, b:15 };
    this.second = { a:20 , b: 30 }; */
    this.textareaValue = JSON.stringify(this.first, undefined, 4);
    this.textareaValue2 = JSON.stringify(this.second, undefined, 4);
    this.theHtmlString = JSON.stringify(this.first, undefined, 4);
    this.theHtmlString2 = JSON.stringify(this.second, undefined, 4);
    this.textareaValue2 = this.textareaValue2;
    this.linesCOunt = this.textareaValue.split('\n');
    console.log(this.linesCOunt.length);
    var a = {
      foo: {
        aa: 1,
        bb: 2
      }
    }
    var b = {
      foo: {
        bb: 3,
        dd: 4
      }
    }
  }

  getNumber(num) {
    return new Array(num);
  }




  // --- new
  applyHighlights(text, match) {
    var regex = new RegExp('"' + match + '.*?', 'g');
    text = text
      .replace(/\n$/g, '\n\n')
      .replace(regex, '<mark>$&</mark>');

    // if (isIE) {
    //   // IE wraps whitespace differently in a div vs textarea, this fixes it
    //   text = text.replace(/ /g, ' <wbr>');
    // }

    return text;
  }

  handleInput(key) {
    let text = '', text2 = '';
    if (this.theHtmlString) {
      text = this.theHtmlString;
    }
    const highlightingVal = (this.textareaValue.substring(this.textareaValue.indexOf(key), this.textareaValue.indexOf('\n', this.textareaValue.indexOf(key))));
    let highlightedText = this.applyHighlights(text, highlightingVal);
    this.theHtmlString = highlightedText;
    if (this.theHtmlString2) {
      text2 = this.theHtmlString2;
    }
    const highlightingVal2 = (this.textareaValue2.substring(this.textareaValue2.indexOf(key), this.textareaValue2.indexOf('\n', this.textareaValue2.indexOf(key))));
    let highlightedText2 = this.applyHighlights(text2, highlightingVal2);
    this.theHtmlString2 = highlightedText2;
    console.log(this.theHtmlString2.indexOf(key));
    // this.myhighlights.nativeElement.html(highlightedText);
  }


  //---- new

  iterate(obj) {
    Object.keys(obj).forEach(key => {
      // if(isNaN(+key) ){
      this.arrayTemp.push(key);
      // }
      //console.log('key: '+ key + ', value: '+obj[key]);
      if (typeof obj[key] === 'object' && (Object.keys(obj).length !== 0)) {
        this.iterate(obj[key])
      }
      else {
        if (isNaN(+key)) {
          // console.log('key: '+ key + ', value: '+obj[key]);
          this.handleInput(key)
        } else {
          // this.iterate(obj[this.arrayTemp[this.arrayTemp.length- (1+ (+key))]])
          if (this.first[this.arrayTemp[(this.arrayTemp.length - 1) - (1 + (+key))]][key]) {
            this.iterate(this.first[this.arrayTemp[(this.arrayTemp.length - 1) - (1 + (+key))]][key]);
          } else {
            this.iterate(this.second[this.arrayTemp[(this.arrayTemp.length - 1) - (1 + (+key))]][key]);
          }

        }


      }

    })
  }

  onCLick() {
    this.iterate(this.diffOld(this.first, this.second));
  }


  diffOld(obj1, obj2) {
    const result = {};
    if (Object.is(obj1, obj2)) {
      return undefined;
    }
    if (!obj2 || typeof obj2 !== 'object') {
      return obj2;
    }
    Object.keys(obj1 || {}).concat(Object.keys(obj2 || {})).forEach(key => {
      if (obj2[key] !== obj1[key] && !Object.is(obj1[key], obj2[key])) {
        result[key] = !obj2[key] ? 'Not present in second version' : 'Value changed';
      }
      if (typeof obj2[key] === 'object' && typeof obj1[key] === 'object') {
        const value = this.diffOld(obj1[key], obj2[key]);
        if (value !== undefined) {
          result[key] = value;
        }
      }
    });
    return result;
  }
}
