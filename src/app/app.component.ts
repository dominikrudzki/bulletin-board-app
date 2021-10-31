import { Component, OnInit } from '@angular/core';
import { Announcement } from './interfaces/Annouccement-interface';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
	private apiUrl: string = 'http://localhost:3000/api/announcements';
	announcements: Announcement[] = [];

	form: FormGroup = new FormGroup({
		title: new FormControl('', [
			Validators.required,
			Validators.maxLength(24),
		]),
		content: new FormControl('', [
			Validators.required,
			Validators.maxLength(256),
		]),
	});

	constructor(private http: HttpClient, private snackBar: MatSnackBar) {}

	ngOnInit(): void {
		this.fetchAnnouncements();
	}

	fetchAnnouncements(): void {
		this.http.get<Announcement[]>(this.apiUrl).subscribe(
			(data: Announcement[]) => {
				this.announcements = data.reverse();
			},
			() => {
				this.snackBar.open(
					'Server connection error, try again later ❌'
				);
			}
		);
	}

	validateForm() {
		let valid = false;

		if (this.form.status === 'VALID') {
			valid = true;
		}

		return valid;
	}

	addAnnouncement() {
		if (this.validateForm()) {
			const title = this.form.value.title;
			const content = this.form.value.content;

			this.http
				.post(this.apiUrl, {
					title: title,
					content: content,
				})
				.subscribe((res: any) => {
					if (res.success) {
						this.snackBar.open('Announcement added ✅', '', {
							duration: 4000,
						});
						this.announcements.unshift({
							title: title,
							content: content,
						});
					} else {
						this.snackBar.open('Announcement add failed ❌', '', {
							duration: 4000,
						});
					}
				});

			this.form.reset();
		} else {
			this.snackBar.open('Form is not valid ❌', '', {
				duration: 4000,
			});
		}
	}
}
