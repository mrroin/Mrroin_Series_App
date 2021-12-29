import { ISepomexService } from "../../services/api/EstadoServiceApi";
import { IFirebaseApiService } from "../../services/firebase/Api";
import { INativeApiService } from "../../services/native";
export class HistoryFactory {
  private estadoApi: ISepomexService | null = null;
  private firebaseApi: IFirebaseApiService | null = null;
  private nativeApi: INativeApiService | null = null;
  create(
    estadoApi: ISepomexService,
    firebaseApi: IFirebaseApiService,
    nativeApi: INativeApiService,
  ): any {
    if (!this.estadoApi) {
      this.estadoApi = estadoApi;
    }
    if (!this.firebaseApi) {
      this.firebaseApi = firebaseApi;
    }
    if (!this.nativeApi) {
      this.nativeApi = nativeApi;
    }

    return this;
  }
}
