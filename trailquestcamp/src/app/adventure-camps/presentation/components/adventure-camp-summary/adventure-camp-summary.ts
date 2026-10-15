import {Component, input} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {TranslatePipe} from '@ngx-translate/core';
import {AdventureCampOverview} from '../../../application/adventure-camps.store';

/**
 * card that summarizes an adventure camp:
 * reservations, Total Participants and Available Capacity.
 *
 * @author Sofia Diaz Yurivilca
 */
@Component({
  selector: 'app-adventure-camp-summary',
  imports: [MatCardModule, TranslatePipe],
  templateUrl: './adventure-camp-summary.html',
  styleUrl: './adventure-camp-summary.css'
})
export class AdventureCampSummary {
  readonly summary = input.required<AdventureCampOverview>();
}
