import Popsicle from "../entities/popsicle";

export default interface PopsiclesRepositoryInterface {
  create(popsicle: Popsicle): Promise<void>;
  update(popsicle: Popsicle): Promise<void>;
  find(id: string): Promise<Popsicle>;
  findAll(): Promise<Popsicle[]>;
}