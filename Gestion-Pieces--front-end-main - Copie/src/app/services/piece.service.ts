import { Injectable } from '@angular/core';
import { Piece } from '../model/piece.model';
import { nature } from '../model/nature.model';
import { Image } from "../model/Image.model";

import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';

const httpOptions = {headers: new HttpHeaders( {'Content-Type': 'application/json'} )
};


@Injectable({
  providedIn: 'root'
})
export class PieceService {


  apiURL: string = 'http://localhost:8081/pieces/api';
  apiURLNat: string = 'http://localhost:8081/pieces/nat';

 // pieces! : Piece[];
  piece!: Piece;

  constructor(private http : HttpClient , private authService: AuthService) {
    /*  this.natures = [ {idNat : 1, nomPieceNat : "Derection"},
 {idNat : 2, nomPieceNat : "Accessoires"},
 {idNat : 3, nomPieceNat : "batterie"}]; 
    this.pieces = [{ idPiece: 1, nomPiece: "CRÉMAILLÈRE DE DIRECTION", model: "Volkswagen serie Golf",prixPiece: 1500, dateCreation: new Date("01/14/2011"), nature: { idNat: 1, nomPieceNat: "Derection" } },
    { idPiece: 2, nomPiece: "RÉTROVISEUR", model: "BMW serie M",prixPiece: 800, dateCreation: new Date("12/17/2010"), nature: { idNat: 2, nomPieceNat: "Accessoires" } },
    { idPiece: 3, nomPiece: "DISQUE DE FREIN", model: "MerCedes Benz",prixPiece: 220, dateCreation: new Date("02/20/2020"), nature: { idNat: 1, nomPieceNat: "Derection" } }
    ];*/

  }

  


    

 /*  trierPieces() {
    this.pieces = this.pieces.sort((n1, n2) => {
      if (n1.idPiece! > n2.idPiece!) {
        return 1;
      }
      if (n1.idPiece! < n2.idPiece!) {
        return -1;
      }
      return 0;
    });
  }
 */
 
  listenatures():Observable<nature[]>{
    return this.http.get<nature[]>(this.apiURL+"/nat");
    }

    

      listePieces(): Observable<Piece[]>{
        let jwt = this.authService.getToken();
        jwt = "Bearer "+jwt;
        let httpHeaders = new HttpHeaders({"Authorization":jwt})
        return this.http.get<Piece[]>(this.apiURL+"/all",{headers:httpHeaders});
        }
        ajouterPiece( piec: Piece):Observable<Piece>{
        let jwt = this.authService.getToken();
        jwt = "Bearer "+jwt;
        let httpHeaders = new HttpHeaders({"Authorization":jwt})
        return this.http.post<Piece>(this.apiURL+"/addpiec", piec, {headers:httpHeaders});
        }
        supprimerPiece(id : number) {
        const url = `${this.apiURL}/delpiec/${id}`;
        let jwt = this.authService.getToken();
        jwt = "Bearer "+jwt;
        let httpHeaders = new HttpHeaders({"Authorization":jwt})
        return this.http.delete(url, {headers:httpHeaders});
        }
        consulterPiece(id: number): Observable<Piece> {
        const url = `${this.apiURL}/getbyid/${id}`;
        let jwt = this.authService.getToken();
        jwt = "Bearer "+jwt;
        let httpHeaders = new HttpHeaders({"Authorization":jwt})
        return this.http.get<Piece>(url,{headers:httpHeaders});
        }
        updatePiece(piec :Piece) : Observable<Piece> {
        let jwt = this.authService.getToken();
        jwt = "Bearer "+jwt;
        let httpHeaders = new HttpHeaders({"Authorization":jwt})
        return this.http.put<Piece>(this.apiURL+"/updatepiec", piec, {headers:httpHeaders});
        }
      /*  listeNatures():Observable<NatureWrapper>{
          let jwt = this.authService.getToken();
          jwt = "Bearer "+jwt;
          let httpHeaders = new HttpHeaders({"Authorization":jwt})
          return this.http.get<NatureWrapper>(this.apiURLNat,{headers:httpHeaders}
          );
          }*/
          rechercherParNature(idCat: number): Observable<Piece[]> {
          const url = `${this.apiURL}/piecscat/${idCat}`;
          return this.http.get<Piece[]>(url);
          }
          rechercherParNom(nom: string):Observable< Piece[]> {
          const url = `${this.apiURL}/piecsByName/${nom}`;
          return this.http.get<Piece[]>(url);
          }
          //ajouterNature( nat: Nature):Observable<Nature>{
         // return this.http.post<Nature>(this.apiURLNat, nat, httpOptions);
         // }

         uploadImage(file: File, filename: string): Observable<Image>{
          const imageFormData = new FormData();
          imageFormData.append('image', file, filename);
          const url = `${this.apiURL + '/image/upload'}`;
          return this.http.post<Image>(url, imageFormData);
          }
          loadImage(id: number): Observable<Image> {
          const url = `${this.apiURL + '/image/get/info'}/${id}`;
          return this.http.get<Image>(url);

          }
}
