import {
    trigger,
    style,
    animate,
    transition,
    state,
  } from '@angular/animations';

  export const logoFadeAnimation = [
    trigger('fade', [
      state('in', style({ opacity: 1 })),
      state('out', style({ opacity: 0 })),
      transition('* => out', animate('10ms')),
      transition('* => in', animate('500ms ease-out')),
    ]),
  ];
  export enum LogoFadeState {
    In = 'in',
    Out = 'out',
  }