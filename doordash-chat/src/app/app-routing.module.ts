import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JoinUserComponent } from './modules/join-user/join-user.component';
import { ChatContainerComponent } from './modules/chat-container/chat-container.component';

const routes: Routes = [
  { path: "", component: JoinUserComponent },
  { path: "doordash-chat", component: ChatContainerComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
