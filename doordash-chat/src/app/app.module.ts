import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { JoinUserComponent } from './modules/join-user/join-user.component';
import { ChatContainerComponent } from './modules/chat-container/chat-container.component';
import { SideMenuContainerComponent } from './components/side-menu-container/side-menu-container.component';
import { ChatBoxContainerComponent } from './components/chat-box-container/chat-box-container.component';
import { UserComponentComponent } from './components/user-component/user-component.component';
import { ChannelsComponentComponent } from './components/channels-component/channels-component.component';
import { StoreModule, Store } from '@ngrx/store';
import { appReducer } from './app.reducer';
import { ChannelsMock } from './mock/channels-mock';
import { UserSessionComponent } from './components/user-session/user-session.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    JoinUserComponent,
    ChatContainerComponent,
    SideMenuContainerComponent,
    ChatBoxContainerComponent,
    UserComponentComponent,
    ChannelsComponentComponent,
    UserSessionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    StoreModule.forRoot({app: appReducer})
  ],
  providers: [ChannelsMock],
  bootstrap: [AppComponent]
})
export class AppModule { }
