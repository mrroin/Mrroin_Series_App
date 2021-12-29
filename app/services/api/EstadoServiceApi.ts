import { ajax } from "rxjs/ajax";
import { Observable } from "rxjs";
import { map, catchError } from "rxjs/operators";

export interface ISepomexService {
  url: string;
  getStates: (id: string) => Observable<any>;
}

export class EstadoServiceApi implements ISepomexService {
  url = "https://api-sepomex.hckdrk.mx/query";
  getStates(user: string) {
    // console.log(JSON.stringify(user));
    return ajax.get(this.url + "/get_estados").pipe(
      map((response) => {
        //subscriber.next(response);
        // console.log("tengo respuesta del servicio:::");
        const estados: any = [];
        if (
          response &&
          response.response &&
          response.response.response &&
          response.response.response.estado
        ) {
          response.response.response.estado.map((es: any) => {
            // console.log(es);
            estados.push(es);
          });
        }
        return estados;
      }),
      catchError((er) => {
        // console.log("entra al error");
        // console.log("error: ", er.response);
        throw er.response.data;
      }),
    );
  }
}
