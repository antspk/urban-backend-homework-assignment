export interface ServiceAreaLookup {
  lookup(coordinates: Coordinates): string | null;
}

export interface Coordinates {
  readonly lat: number;
  readonly lng: number;
}
