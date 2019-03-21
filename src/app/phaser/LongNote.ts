import { GameScene } from './GameScene';
import { Note } from './Note';

export class LongNote extends Note{
    length: number;
    constructor(scene: GameScene,x,x2,height,notes){
        super(scene,x,200,'note',notes);
    }
}