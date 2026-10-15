/**
 * Localized footer content component.
 *
 * @author Sofia Diaz Yurivilca
 */
import {Component} from '@angular/core';
import {TranslatePipe} from '@ngx-translate/core';

/**
 * Displays localized footer text.
 */
@Component({
  selector: 'app-footer-content',
  imports: [
    TranslatePipe
  ],
  templateUrl: './footer-content.html',
  styleUrl: './footer-content.css'
})
export class FooterContent {

}
