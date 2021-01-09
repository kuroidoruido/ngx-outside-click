import { Component, Renderer2 } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OutsideClickDirective } from './outside-click.directive';

interface TestComponent {
  ngxOutsideClickInstance: OutsideClickDirective | undefined;
  insideClick(): void;
  outsideClick(): void;
}

describe('OutsideClickDirective', () => {
  
  describe('default config (without ngxOutsideClickEnabled)', () => {
    @Component({
      template: `
          <div id="out"></div>
          <div
            id="self"
            (click)="insideClick($event)"
            (ngxOutsideClickInstance)="ngxOutsideClickInstance = $event"
            (ngxOutsideClick)="outsideClick($event)"
          >
            <div id="in"></div>
          </div>
      `
    })
    class DefaultTestComponent implements TestComponent {
      ngxOutsideClickInstance: OutsideClickDirective | undefined;
      insideClick() {}
      outsideClick() {}
    }
    let fixture: ComponentFixture<DefaultTestComponent>;
    let component: DefaultTestComponent;
    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [
          OutsideClickDirective,
          DefaultTestComponent,
        ]
      });
  
      fixture = TestBed.createComponent(DefaultTestComponent);
      component = fixture.componentInstance;
      fixture.autoDetectChanges(true);
    });
  
    it('should not emit ngxOutsideClick event when clicking on element inside host', () => {
      const { inside, insideSpy, outsideSpy } = setup(fixture, component);
      
      inside.click();
  
      expect(insideSpy).toHaveBeenCalledTimes(1);
      expect(outsideSpy).not.toHaveBeenCalled();
    });
    it('should not emit ngxOutsideClick event when clicking on host', () => {
      const { self, insideSpy, outsideSpy } = setup(fixture, component);
      
      self.click();
  
      expect(insideSpy).toHaveBeenCalledTimes(1);
      expect(outsideSpy).not.toHaveBeenCalled();
    });
    it('should emit ngxOutsideClick event when clicking outside host', () => {
      const { outside, insideSpy, outsideSpy } = setup(fixture, component);
      
      outside.click();
  
      expect(insideSpy).not.toHaveBeenCalled();
      expect(outsideSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('ngxOutsideClickEnabled = true', () => {
    @Component({
      template: `
          <div id="out"></div>
          <div
            id="self"
            (click)="insideClick($event)"
            (ngxOutsideClick)="outsideClick($event)"
            (ngxOutsideClickInstance)="ngxOutsideClickInstance = $event"
            [ngxOutsideClickEnabled]="clickOutsideEnabled"
          >
            <div id="in"></div>
          </div>
      `
    })
    class EnabledTestComponent implements TestComponent {
      clickOutsideEnabled = true;
      ngxOutsideClickInstance: OutsideClickDirective | undefined;
      insideClick() {}
      outsideClick() {}
    }

    let fixture: ComponentFixture<EnabledTestComponent>;
    let component: EnabledTestComponent;
    let renderer: Renderer2;
    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [
          OutsideClickDirective,
          EnabledTestComponent,
        ]
      });
  
      fixture = TestBed.createComponent(EnabledTestComponent);
      component = fixture.componentInstance;
      renderer = fixture.componentRef.injector.get(Renderer2);
      fixture.autoDetectChanges(true);
    });
  
    it('should not emit ngxOutsideClick event when clicking on element inside host', () => {
      const { inside, insideSpy, outsideSpy } = setup(fixture, component);
      
      inside.click();
  
      expect(insideSpy).toHaveBeenCalledTimes(1);
      expect(outsideSpy).not.toHaveBeenCalled();
    });
    it('should not emit ngxOutsideClick event when clicking on host', () => {
      const { self, insideSpy, outsideSpy } = setup(fixture, component);
      
      self.click();
  
      expect(insideSpy).toHaveBeenCalledTimes(1);
      expect(outsideSpy).not.toHaveBeenCalled();
    });
    it('should emit ngxOutsideClick event when clicking outside host', () => {
      const { outside, insideSpy, outsideSpy } = setup(fixture, component);
      
      outside.click();
  
      expect(insideSpy).not.toHaveBeenCalled();
      expect(outsideSpy).toHaveBeenCalledTimes(1);
    });
    it('should no more emit ngxOutsideClick event when change ngxOutsideClickEnabled to false', () => {
      const { outside, insideSpy, outsideSpy } = setup(fixture, component);
      
      outside.click();
  
      expect(insideSpy).not.toHaveBeenCalled();
      expect(outsideSpy).toHaveBeenCalledTimes(1);

      component.clickOutsideEnabled = false;
      outsideSpy.calls.reset();
      fixture.detectChanges();

      outside.click();
  
      expect(insideSpy).not.toHaveBeenCalled();
      expect(outsideSpy).not.toHaveBeenCalled();
    });
    it('should add one listener to document click on init', () => {
      const listenSpy = spyOn(renderer, 'listen');

      setup(fixture, component);

      expect(listenSpy).toHaveBeenCalledTimes(1);
    });
    it('should cancel listener to document click when change ngxOutsideClickEnabled to false', () => {
      const cancelSpy = jasmine.createSpy('cancelListener');
      const listenSpy = spyOn(renderer, 'listen').and.returnValues(cancelSpy);

      setup(fixture, component);
      
      expect(listenSpy).toHaveBeenCalledTimes(1);

      component.clickOutsideEnabled = false;
      listenSpy.calls.reset();
      cancelSpy.calls.reset();
      fixture.detectChanges();
  
      expect(listenSpy).not.toHaveBeenCalled();
      expect(cancelSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('ngxOutsideClickEnabled = false', () => {
    @Component({
      template: `
          <div id="out"></div>
          <div
            id="self"
            (click)="insideClick($event)"
            (ngxOutsideClick)="outsideClick($event)"
            (ngxOutsideClickInstance)="ngxOutsideClickInstance = $event"
            [ngxOutsideClickEnabled]="clickOutsideEnabled"
          >
            <div id="in"></div>
          </div>
      `
    })
    class DisabledTestComponent implements TestComponent {
      clickOutsideEnabled = false;
      ngxOutsideClickInstance: OutsideClickDirective | undefined;
      insideClick() {}
      outsideClick() {}
    }

    let fixture: ComponentFixture<DisabledTestComponent>;
    let component: DisabledTestComponent;
    let renderer: Renderer2;
    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [
          OutsideClickDirective,
          DisabledTestComponent,
        ]
      });
  
      fixture = TestBed.createComponent(DisabledTestComponent);
      component = fixture.componentInstance;
      component.clickOutsideEnabled = false;
      renderer = fixture.componentRef.injector.get(Renderer2);
      fixture.detectChanges();
    });
  
    it('should not emit ngxOutsideClick event when clicking on element inside host', () => {
      const { inside, insideSpy, outsideSpy } = setup(fixture, component);
      
      inside.click();
  
      expect(insideSpy).toHaveBeenCalledTimes(1);
      expect(outsideSpy).not.toHaveBeenCalled();
    });
    it('should not emit ngxOutsideClick event when clicking on host', () => {
      const { self, insideSpy, outsideSpy } = setup(fixture, component);
      
      self.click();
  
      expect(insideSpy).toHaveBeenCalledTimes(1);
      expect(outsideSpy).not.toHaveBeenCalled();
    });
    it('should emit ngxOutsideClick event when clicking outside host', () => {
      const { outside, insideSpy, outsideSpy } = setup(fixture, component);
      
      outside.click();
  
      expect(insideSpy).not.toHaveBeenCalled();
      expect(outsideSpy).not.toHaveBeenCalled();
    });
    it('should emit ngxOutsideClick event again when change ngxOutsideClickEnabled to true', () => {
      const { outside, insideSpy, outsideSpy } = setup(fixture, component);

      outside.click();
  
      expect(insideSpy).not.toHaveBeenCalled();
      expect(outsideSpy).not.toHaveBeenCalled();

      component.clickOutsideEnabled = true;
      outsideSpy.calls.reset();
      fixture.detectChanges();
      
      outside.click();
      fixture.detectChanges();
  
      expect(insideSpy).not.toHaveBeenCalled();
      expect(outsideSpy).toHaveBeenCalledTimes(1);
    });
    it('should not add any listener to document click', () => {
      const listenSpy = spyOn(renderer, 'listen');

      setup(fixture, component);

      expect(listenSpy).not.toHaveBeenCalled();
    });
    it('should add one listener to document click when change ngxOutsideClickEnabled to true', () => {
      const listenSpy = spyOn(renderer, 'listen');
      
      setup(fixture, component);
      expect(listenSpy).not.toHaveBeenCalled();

      component.clickOutsideEnabled = true;
      listenSpy.calls.reset();
      fixture.detectChanges();
      expect(listenSpy).toHaveBeenCalledTimes(1);
    });
  });
  
  function setup(fixture: ComponentFixture<TestComponent>, component: TestComponent) {
    const debugElement: HTMLElement = fixture.debugElement.nativeElement;
    const self: HTMLElement = debugElement.querySelector('div#self') as HTMLElement;
    const inside: HTMLElement = debugElement.querySelector('div#in') as HTMLElement;
    const outside: HTMLElement = debugElement.querySelector('div#out') as HTMLElement;

    const insideSpy = spyOn(component, 'insideClick');
    const outsideSpy = spyOn(component, 'outsideClick');

    component.ngxOutsideClickInstance?.cancelListening();
    component.ngxOutsideClickInstance?.ngOnInit();

    return { self, inside, outside, insideSpy, outsideSpy } as const;
  }
});
