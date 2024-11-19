import { nature } from "./nature.model";
import { Image } from "./Image.model";

export class Piece {
    idPiece!: number;
    nomPiece! : string;
    model! :string;
   prixPiece! : number;
    dateCreation! : Date ;
    nature! : nature;
    image! : Image
    imageStr!:string
    }