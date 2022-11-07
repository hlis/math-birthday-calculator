import { Component } from '@angular/core';
import { DateTime, Duration, Interval } from 'luxon';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'math-birthday-calculator';
  currentDate: DateTime = DateTime.now();
  dateOfBirth!: DateTime;
  nextMathBirthdayDate!: DateTime;
	ageNextMathBirthdayInDays!: number;

  calculateMathBirthday(event: any) {
    this.dateOfBirth = DateTime.fromISO(event?.target?.value);
    let intervalUntilToday = Interval.fromDateTimes(
      this.dateOfBirth,
      this.currentDate
    );
    let daysFromDOB = Math.floor(intervalUntilToday.length('days'));
    let daysUntilNextMathBirthday = Duration.fromObject({
      days: this.nearestPowerOf10(daysFromDOB) - daysFromDOB,
    });
    this.nextMathBirthdayDate = this.currentDate.plus(
      daysUntilNextMathBirthday
    );
    this.ageNextMathBirthdayInDays = Math.floor(
      Interval.fromDateTimes(
        this.dateOfBirth,
        this.nextMathBirthdayDate
      ).toDuration('days').days
    );
    console.log(
      "Next math birthday on: " + this.nextMathBirthdayDate.toISODate()
    );
    console.log("Age in days on next MB: " + this.ageNextMathBirthdayInDays);
		let date = this.currentDate > this.dateOfBirth
  }

  nearestPowerOf10(days: number) {
    let lg = Math.floor(Math.log(days) / Math.log(10));
    let nearestPowerOf10 = Math.pow(10, lg + 1);

    return nearestPowerOf10;
  }
}
