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
    transition('* => *', animate('10ms')),
  ]),
];
export enum LogoFadeState {
  In = 'in',
  Out = 'out',
}
