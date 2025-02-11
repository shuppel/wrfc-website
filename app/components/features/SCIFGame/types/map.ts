export interface MapObject {
  id: number;
  name: string;
  type: string;
  x: number;
  y: number;
  width: number;
  height: number;
  properties?: {
    name: string;
    type: string;
    value: string | number | boolean;
  }[];
}

export interface TiledMap {
  layers: {
    name: string;
    data: number[][];
    objects?: MapObject[];
  }[];
  tilesets: {
    name: string;
    firstgid: number;
  }[];
} 