import {
  Directive,
  DoCheck,
  EmbeddedViewRef,
  inject,
  Input,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[ngFor]',
  standalone: true,
})
class NgForEmptyDirective<T> implements DoCheck {
  private _viewContainer = inject(ViewContainerRef);
  private _emptyRef?: EmbeddedViewRef<unknown>;
  @Input() ngForOf?: T[] = undefined;
  @Input() ngForEmptyTemplate!: TemplateRef<unknown>;
  ngDoCheck(): void {
    this._emptyRef?.destroy();
    if (!this.ngForOf || this.ngForOf.length === 0) {
      this._emptyRef = this._viewContainer.createEmbeddedView(
        this.ngForEmptyTemplate
      );
    }
  }
}

export { NgForEmptyDirective as NgForEmpty };
