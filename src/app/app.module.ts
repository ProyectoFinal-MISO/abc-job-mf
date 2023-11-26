import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SharedModule } from './shared/shared.module';
import { HomeModule } from './home/home.module';
import { HomeRoutingModule } from './home/home-routing.module';
import { InterceptorService } from './interceptors/interceptor.service';
import { ToastrModule } from 'ngx-toastr';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UserModule } from './user/user.module';
import { EvaluationListCompanyComponent } from './evaluations/evaluations-list-company/evaluations-list-company.component';
import { EvaluationCreateCompanyComponent } from './evaluations/evaluations-create-company/evaluations-create-company.component';
import { EvaluationListTechnicalResourceComponent } from './evaluations/evaluations-list-technical-resource/evaluations-list-technical-resource.component';
import { EvaluationViewTechnicalResourceComponent } from './evaluations/evaluations-view-technical-resource/evaluations-view-technical-resource.component';


@NgModule({
  declarations: [
    AppComponent,
    EvaluationListCompanyComponent,
    EvaluationCreateCompanyComponent,
    EvaluationListTechnicalResourceComponent,
    EvaluationViewTechnicalResourceComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule,
    HomeModule,
    HomeRoutingModule,
    BrowserAnimationsModule,
    NgbModule,
    UserModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    })
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
