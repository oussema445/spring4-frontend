import { Component, OnInit } from '@angular/core';
import { Piece } from '../model/piece.model';
import { PieceService } from '../services/piece.service';
import { AuthService } from '../services/auth.service';
import { Image } from '../model/Image.model'; 
@Component({
  selector: 'app-pieces',
  templateUrl: './pieces.component.html'
})
export class PiecesComponent implements OnInit {

    pieces ? : Piece[]; 

    constructor(private pieceService : PieceService,
      public authService: AuthService) { }
      ngOnInit(): void {
        this.chargerPieces();
        }
        chargerPieces(){
        this.pieceService.listePieces().subscribe(piecs => {
        console.log(piecs);
        this.pieces = piecs;

        this.pieces.forEach((piec) => {
          this.pieceService
          .loadImage(piec.image.idImage)
          .subscribe((img: Image) => {
          piec.imageStr = 'data:' + img.type + ';base64,' + img.image;
          });
          });

        });
        }

        supprimerPiece(p: Piece)
        {
        let conf = confirm("Etes-vous sûr ?");
        if (conf)
        this.pieceService.supprimerPiece(p.idPiece).subscribe(() => {
        console.log("produit supprimé");
        this.chargerPieces();
        });
        } 
}
