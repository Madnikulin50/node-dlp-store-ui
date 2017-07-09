import {Component, OnInit} from '@angular/core';
declare var $:any;

@Component({
	selector: 'todo-cmp',
	templateUrl: './todo.component.html'
})

export class TodoComponent implements OnInit {
	newName: string;
	nameList: any = [
		'Meeting with Nabindar Singh.',
		'Exercise at 6:pm with Nicholas.',
		'Avengers Age of Ultron.',
		'Henna birthday at Mezbaan.'
	];
	addName(): boolean {
		this.nameList.unshift(this.newName);
		this.newName = '';
		return true;
	}
	ngOnInit() {
		var todoListWraper: any = $('.todo-list-wrap');
		todoListWraper.perfectScrollbar({});
	}
}
