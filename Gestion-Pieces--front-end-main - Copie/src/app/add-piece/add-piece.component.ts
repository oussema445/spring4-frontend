import { Component, OnInit } from '@angular/core';
import { Piece } from '../model/piece.model';
import { PieceService } from '../services/piece.service';
import { Router } from '@angular/router';
import { nature } from '../model/nature.model';
import { Image } from '../model/Image.model'; // Exemple d'import

@Component({
  selector: 'app-add-piece',
  templateUrl: './add-piece.component.html',
  styleUrls: ['./add-piece.component.css']
})
export class AddPieceComponent implements OnInit {
  uploadedImage!: File;
  imagePath: any
  onImageUpload(event: any) {
    this.uploadedImage = event.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(this.uploadedImage);
    reader.onload = (_event) => { this.imagePath = reader.result; }
    }
  natures! : nature[];
  newIdNat! : number;
  newnature! : nature;
  newPiece = new Piece();
  constructor(private pieceService: PieceService,private router :Router) { }

  ngOnInit(): void {
    this.pieceService.listenatures().
    subscribe(nats => {this.natures = nats;
    console.log(nats);
    });
    }
  
    addPiece(){
      this.pieceService
      .uploadImage(this.uploadedImage, this.uploadedImage.name)
      .subscribe((img: Image) => {
      this.newPiece.image=img;
      this.newPiece.nature = this.natures.find(nat => nat.idNat
      == this.newIdNat)!;
      this.pieceService
      .ajouterPiece(this.newPiece)
      .subscribe(() => {
      this.router.navigate(['pieces']);
      });
      });
      }
  

}
