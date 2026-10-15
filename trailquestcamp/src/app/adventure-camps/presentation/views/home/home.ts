import {Component, inject} from '@angular/core';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {TranslatePipe} from '@ngx-translate/core';
import {AdventureCampsStore} from '../../../application/adventure-camps.store';
import {AdventureCampSummary} from '../../components/adventure-camp-summary/adventure-camp-summary';

/**
 * Home view: welcome text and the "My Adventure Camps" section.
 *
 * @author Sofia Diaz Yurivilca
 */
@Component({
  selector: 'app-home',
  imports: [MatGridListModule, MatProgressSpinner, TranslatePipe, AdventureCampSummary],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  readonly store = inject(AdventureCampsStore);
}
