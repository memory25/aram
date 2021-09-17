import bosen from './imgs/bosen.png';
import dragon from './imgs/dragon.png';
import fat from './imgs/fat.png';
import roger from './imgs/roger.png';
import xia1 from './imgs/xia1.png';
import xia2 from './imgs/xia2.png';

const list = [ bosen, dragon, fat, roger, xia1, xia2 ];

export default function lottery() {
  return list.filter(() => Math.floor(Math.random() * 100 + 1) <= 15);
}
