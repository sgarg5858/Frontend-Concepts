import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';

class ShowMyContentAfterDelayContext{
  shown:boolean=false;
  counter:number=0;
  showMyContentAfterDelay:boolean=false;
}

@Directive({
  selector: '[showMyContentAfterDelay]'
})
export class ShowMyContentAfterDelayDirective implements OnInit {

  _showContent:boolean=false;
  _delay:number=0;
  _countdownTemplate!:TemplateRef<any>;

  @Input() set showMyContentAfterDelay(data:{showContent:boolean,delay:number,countdownTemplate:TemplateRef<any>})
  {
    this._showContent=data.showContent;
    this._delay=data.delay;
    this._countdownTemplate=data.countdownTemplate;
    this.updateView();
  }
  @Input('showMyContentAfterDelayElse') placeholder:TemplateRef<ShowMyContentAfterDelayContext>|null = null;

   context = new ShowMyContentAfterDelayContext();
  updateView()
  {
    this.viewContainerRef.clear(); 


//Show timer only for the first time
    if(this._showContent){

    this.viewContainerRef.createEmbeddedView(this._countdownTemplate,this.context);


    //We have to show timer for the first time only
      // if(!this.context.shown)
      // {
        this.context.counter=this._delay;

        let timer = setInterval(()=>{
          this.context.counter = this.context.counter - 1000;
        },999);
  
        setTimeout(()=>{
          this.context.shown=true;
          clearInterval(timer);

          this.viewContainerRef.clear();
          this.viewContainerRef.createEmbeddedView(this.templateRef,this.context);
          
        },this._delay)
      // }
    }
    else
    {
     if(this.placeholder)
     {
      this.viewContainerRef.createEmbeddedView(this.placeholder,this.context);
     }
    }
  }

  constructor(private templateRef:TemplateRef<ShowMyContentAfterDelayContext>, private viewContainerRef:ViewContainerRef) { }

  ngOnInit(): void {
  }
  static ngTemplateContextGuard(dir:ShowMyContentAfterDelayDirective,ctx:unknown):ctx is ShowMyContentAfterDelayContext{
    return true;
  }

}
