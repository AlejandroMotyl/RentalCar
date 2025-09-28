import axios from "axios";
import type Car from "../types/Car";
import type GetCarsQuery from "../types/CarsQuery";

const api = axios.create({
  baseURL: "https://car-rental-api.goit.global",
});

interface GetCarsReply {
  cars: Car[];
  totalCars: number;
  page: number;
  totalPages: number;
}

export const getCars = async (query?: GetCarsQuery): Promise<GetCarsReply> => {
  const getCarReply = await api.get<GetCarsReply>("/cars", { params: query });

  return getCarReply.data;
};

export const getCarById = async (id: string): Promise<Car> => {
  const getCarByIdReply = await api.get<Car>(`/cars/${id}`);

  return getCarByIdReply.data;
};

export const getBrands = async (): Promise<string[]> => {
  const getBrandsReply = await api.get<string[]>("/brands");

  return getBrandsReply.data;
};
