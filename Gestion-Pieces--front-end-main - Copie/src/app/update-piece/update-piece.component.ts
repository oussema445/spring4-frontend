import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PieceService } from '../services/piece.service';
import { Piece } from '../model/piece.model';
import { nature } from '../model/nature.model';
import { Image } from "../model/Image.model";

@Component({
selector: 'app-update-piece',
templateUrl: './update-piece.component.html',
styleUrls: ['./update-piece.component.css']
})
export class UpdatePieceComponent implements OnInit {
currentPiece = new Piece();
natures!: nature[] ;
updatedNatId! : number;
myImage! : string;
uploadedImage!: File;
isImageUpdated: Boolean=false;
constructor(private activatedRoute: ActivatedRoute,
  private router :Router,
private pieceService: PieceService) { }
ngOnInit(): void {
  this.pieceService.listenatures().subscribe(nats => {
    this.natures = nats;
    console.log(nats);
  });

  this.pieceService.consulterPiece(this.activatedRoute.snapshot.params['id']).subscribe(piec => {
    this.currentPiece = piec;
    this.currentPiece = piec;
    this.updatedNatId =
    this.currentPiece.nature.idNat!;
    this.pieceService
.loadImage(this.currentPiece.image.idImage)
.subscribe((img: Image) => {
this.myImage = 'data:' + img.type + ';base64,' + img.image;
});
  });
}

  updatePiece() {
    this.currentPiece.nature = this.natures.find(nat => nat.idNat ==
      this.updatedNatId)!;
      //tester si l'image du produit a été modifiée
      if (this.isImageUpdated)
      {
      this.pieceService
      .uploadImage(this.uploadedImage, this.uploadedImage.name)
      .subscribe((img: Image) => {
      this.currentPiece.image = img;
      this.pieceService
      .updatePiece(this.currentPiece)
      .subscribe((piec) => {
      this.router.navigate(['pieces']);
      });
      });
      }
      else{
      this.pieceService
      .updatePiece(this.currentPiece)
      .subscribe((piec) => {
      this.router.navigate(['pieces']);
      });
      }
  }

  onImageUpload(event: any) {
    if(event.target.files && event.target.files.length) {
    this.uploadedImage = event.target.files[0];
    this.isImageUpdated =true;
    const reader = new FileReader();
    reader.readAsDataURL(this.uploadedImage);
    reader.onload = () => { this.myImage = reader.result as string; };
    }
    }




}
