export interface InputCreatePopsicleDTO {
  taste: string;
  category: string;
  cost: number;
  price: number;
  barcode: bigint;
}

export interface OutputCreatePopsicleDTO {
  id: string;
  taste: string;
  category: string;
  cost: number;
  price: number;
  barcode: bigint;
  Product: {
    id: string;
    name: string;
    product: string;
  };
}
