import { Route, RouterModule } from '@angular/router';
import { StorageComponent } from './storage.component';

const storageRoutes: Route[] = [
	{ 
		path: '', component: StorageComponent,
		children: [
			{ path: 'home', loadChildren: 'app/storage/home/home.module' },
			{ path: 'inbox', loadChildren: 'app/storage/inbox/inbox.module' }
		]
	}
];

export default RouterModule.forChild(storageRoutes)