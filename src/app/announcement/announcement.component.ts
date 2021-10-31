import { Component, Input } from '@angular/core';
import { Announcement } from '../interfaces/Annouccement-interface';

@Component({
	selector: 'app-announcement',
	templateUrl: './announcement.component.html',
	styleUrls: ['./announcement.component.scss'],
})
export class AnnouncementComponent {
	announcements = [{ title: 'title', content: 'content' }];
	@Input() announcement!: Announcement;
}
