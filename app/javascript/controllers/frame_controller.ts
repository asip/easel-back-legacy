import { Controller } from "stimulus"
import { Luminous } from 'luminous-lightbox'
import Tagify from '@yaireo/tagify'

export default class FrameController extends Controller {
  static targets = ['lm', 'te', 'tl'];
  teTarget!: HTMLElement
  tlTarget!: HTMLInputElement
  lmTarget!: HTMLElement

  image: Luminous;
  tag_list: HTMLInputElement;
  tag_editor: Tagify;

  connect() {
    var te_trigger: HTMLElement = null;
    try{
      te_trigger = this.teTarget;
    } catch(e) {}
    try{
      this.tag_list = this.tlTarget;
    } catch(e) {}
    var lm_trigger: HTMLElement = null;
    try{
      lm_trigger = this.lmTarget;
    } catch(e) {}

    if(te_trigger){
      this.tag_editor = new Tagify(te_trigger, {
        maxTags: 5,
        dropdown: {
          classname: "color-blue",
          enabled: 0,
          maxItems: 30,
          closeOnSelect: false,
          highlightFirst: true,
        }
      });

      this.tag_editor.on('add', e => this.saveTagList(e.detail.tagify));
      this.tag_editor.on('remove', e => this.saveTagList(e.detail.tagify));

      const tags: string = this.tag_list.value;
      this.tag_editor.removeAllTags();
      if (tags.length > 0) {
        this.tag_editor.addTags(tags.split(","));
      }
    }

    if(lm_trigger){
      const options = { showCloseButton: true };
      this.image = new Luminous(lm_trigger, options);
    }
  }

  saveTagList(tagify: Tagify) {
    this.tag_list.value = this.tag_editor.value.map(v => v.value).join(",");
    //console.log(this.tlTarget.value);
  }

  disconnect(){
    if(this.image){
      this.image.destroy();
      this.removeElementsByClassName('lum-lightbox')
    }

    if(this.tag_editor){
      this.tag_editor.removeAllTags()
      this.removeElementsByClassName('tagify')
    }
  }

  removeElementsByClassName(className){
    const elements: HTMLCollectionOf<Element> = this.element.getElementsByClassName(className);
    Array.from(elements).forEach(e => e.remove());
  }
}