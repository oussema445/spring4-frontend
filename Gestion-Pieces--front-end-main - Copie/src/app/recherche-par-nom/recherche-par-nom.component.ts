import { Component, OnInit } from '@angular/core';
import { Piece } from '../model/piece.model';
import { PieceService } from '../services/piece.service';

@Component({
  selector: 'app-recherche-par-nom',
  templateUrl: './recherche-par-nom.component.html',
  styles: [
  ]
})
export class RechercheParNomComponent implements OnInit {

   nomPiece!:string;
   pieces!:Piece[];
   allPieces! : Piece[];
   searchTerm!:string;
  constructor(private pieceService: PieceService) { }

  ngOnInit(): void {
    this.pieceService.listePieces().subscribe(piecs => {
    console.log(piecs);
    this.pieces = piecs;
    });
    }


  rechercherPiecs(){
    this.pieceService.rechercherParNom(this.nomPiece).
subscribe(piecs => {
this.pieces = piecs;
console.log(piecs)});
  }
}
