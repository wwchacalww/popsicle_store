export interface InputCreatePopsicleDTO {
  taste: string;
  category: string;
  cost: number;
  price: number;
  barcode: string;
}

export interface OutputCreatePopsicleDTO {
  id: string;
  taste: string;
  category: string;
  cost: number;
  price: number;
  barcode: string;
  Product: {
    id: string;
    name: string;
    product: string;
  };
}
