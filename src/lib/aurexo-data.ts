import carSilver from "@/assets/car-silver.jpg";
import carBlack from "@/assets/car-black.jpg";
import carBlue from "@/assets/car-blue.jpg";
import carRed from "@/assets/car-red.jpg";
import carTruck from "@/assets/car-truck.jpg";
import carGreen from "@/assets/car-green.jpg";
import fordGT from "@/assets/ford-gt-white.jpg";

export type Vehicle = {
  id: string;
  title: string;
  price: string;
  km: string;
  year: number;
  fuel: string;
  transmission: string;
  body: string;
  brand: string;
  tag?: "Great Price" | "Low Mileage" | "New Arrival";
  img: string;
};

export const vehicles: Vehicle[] = [
  {
    id: "2022-ford-gt-white",
    title: "2022 Ford GT White",
    price: "$425,000",
    km: "2",
    year: 2022,
    fuel: "Gasoline",
    transmission: "Automatic",
    body: "Coupe",
    brand: "Ford",
    tag: "New Arrival",
    img: fordGT,
  },
  {
    id: "2026-bmw-5-series",
    title: "2026 BMW 5 Series",
    price: "$32,600",
    km: "2",
    year: 2026,
    fuel: "Gasoline",
    transmission: "Automatic",
    body: "Sedan",
    brand: "BMW",
    tag: "Great Price",
    img: carSilver,
  },
  {
    id: "2025-toyota-gt86",
    title: "2025 Toyota GT 86 Coupe",
    price: "$28,900",
    km: "5",
    year: 2025,
    fuel: "Gasoline",
    transmission: "Manual",
    body: "Coupe",
    brand: "Toyota",
    tag: "Great Price",
    img: carBlack,
  },
  {
    id: "2026-hyundai-tucson",
    title: "2026 Hyundai Tucson SUV",
    price: "$36,400",
    km: "1",
    year: 2026,
    fuel: "Hybrid",
    transmission: "Automatic",
    body: "SUV",
    brand: "Hyundai",
    tag: "Low Mileage",
    img: carBlue,
  },
  {
    id: "2025-honda-civic",
    title: "2025 Honda Civic Sport",
    price: "$24,800",
    km: "10",
    year: 2025,
    fuel: "Gasoline",
    transmission: "Automatic",
    body: "Hatchback",
    brand: "Honda",
    tag: "Great Price",
    img: carRed,
  },
  {
    id: "2026-chevy-silverado",
    title: "2026 Chevrolet Silverado",
    price: "$48,200",
    km: "3",
    year: 2026,
    fuel: "Diesel",
    transmission: "Automatic",
    body: "Truck",
    brand: "Chevrolet",
    img: carTruck,
  },
  {
    id: "2026-rivian-r1",
    title: "2026 Rivian R1 Electric",
    price: "$72,500",
    km: "0",
    year: 2026,
    fuel: "Electric",
    transmission: "Automatic",
    body: "SUV",
    brand: "Rivian",
    tag: "New Arrival",
    img: carGreen,
  },
];

export const brands = [
  "Ford",
  "BMW",
  "Toyota",
  "Hyundai",
  "Honda",
  "Chevrolet",
  "Rivian",
  "Mercedes",
  "Audi",
  "Tesla",
];

export const bodyTypes = [
  { label: "Sedan", count: 124 },
  { label: "SUV", count: 98 },
  { label: "Coupe", count: 42 },
  { label: "Hatchback", count: 36 },
  { label: "Truck", count: 28 },
  { label: "Convertible", count: 14 },
];
