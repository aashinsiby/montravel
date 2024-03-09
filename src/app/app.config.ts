import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { AngularFireModule } from '@angular/fire/compat';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getDatabase, provideDatabase } from '@angular/fire/database';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideClientHydration(), provideAnimationsAsync(), importProvidersFrom(provideFirebaseApp(() => initializeApp({"projectId":"montravel-bd84c","appId":"1:56148997281:web:70c990ba6a85761bd66ce0","databaseURL":"https://montravel-bd84c-default-rtdb.asia-southeast1.firebasedatabase.app","storageBucket":"montravel-bd84c.appspot.com","apiKey":"AIzaSyBHelINPPdKMLpP9Fcqi8KyrjXcexj6qxg","authDomain":"montravel-bd84c.firebaseapp.com","messagingSenderId":"56148997281"}))), importProvidersFrom(provideAuth(() => getAuth())), importProvidersFrom(provideDatabase(() => getDatabase()), AngularFireModule.initializeApp({"projectId":"montravel-bd84c","appId":"1:56148997281:web:70c990ba6a85761bd66ce0","databaseURL":"https://montravel-bd84c-default-rtdb.asia-southeast1.firebasedatabase.app","storageBucket":"montravel-bd84c.appspot.com","apiKey":"AIzaSyBHelINPPdKMLpP9Fcqi8KyrjXcexj6qxg","authDomain":"montravel-bd84c.firebaseapp.com","messagingSenderId":"56148997281"}))]
};
