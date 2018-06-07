import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { MetaReducer, StoreModule } from '@ngrx/store';
import { NgModule } from '@angular/core';
import { storeFreeze } from 'ngrx-store-freeze';
import { environment } from '../../environments/environment';
import { RouterStateSerializer, StoreRouterConnectingModule } from '@ngrx/router-store';
import { reducers, effects, CustomSerializer } from './index';

export const metaReducers: MetaReducer<any>[] = !environment.production
    ? [storeFreeze]
    : [];

@NgModule({
    imports  : [
        StoreModule.forRoot(reducers, {metaReducers}),
        EffectsModule.forRoot(effects),
        !environment.production ? StoreDevtoolsModule.instrument() : [],
        StoreRouterConnectingModule
    ],
    providers: [
        {
            provide : RouterStateSerializer,
            useClass: CustomSerializer
        }
    ]
})

export class AppStoreModule
{
}
