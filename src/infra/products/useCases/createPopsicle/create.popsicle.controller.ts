import { Request, Response } from "express";
import { container } from "tsyringe";
import { InputCreatePopsicleDTO } from "./create.popsicle.dto";
import CreatePopsicleUseCase from "./create.popsicle.usecase";

export class CreatePopsicleController {
  async handle(request: Request, response: Response): Promise<Response> {
    const createPopsicleUseCase = container.resolve(CreatePopsicleUseCase);
    const { taste, category, cost, price, barcode }: InputCreatePopsicleDTO =
      request.body;

    const result = await createPopsicleUseCase.execute({
      taste,
      category,
      cost,
      price,
      barcode: BigInt(barcode),
    });

    return response.status(200).json(result);
  }
}
