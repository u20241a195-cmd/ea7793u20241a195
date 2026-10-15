import {Component} from '@angular/core';
import {Layout} from '../shared/presentation/components/layout/layout';

/**
 * Root component of the application.
 *
 * @author Sofia Diaz Yurivilca
 */
@Component({
  imports: [Layout],
  selector: 'app-root',
  templateUrl: './app.html'
})
export class App {
}
