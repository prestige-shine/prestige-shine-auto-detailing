import carSilver from "@/assets/car-silver.jpg";
import carBlack from "@/assets/car-black.jpg";
import carBlue from "@/assets/car-blue.jpg";
import carRed from "@/assets/car-red.jpg";
import carTruck from "@/assets/car-truck.jpg";
import carGreen from "@/assets/car-green.jpg";
import fordGT from "@/assets/ford-gt-white.jpg";

export type Condition = "New Car" | "Used Car" | "Certified Pre-Owned";

export type Vehicle = {
  id: string;
  title: string;
  price: string;
  priceNum: number;
  km: string;
  kmNum: number;
  year: number;
  fuel: "Gasoline" | "Diesel" | "Electric" | "Hybrid";
  transmission: "Automatic" | "Manual";
  body: string;
  brand: string;
  condition: Condition;
  featured?: boolean;
  tag?: "Great Price" | "Low Mileage" | "New Arrival" | "Staff Pick";
  img: string;
};

const v = (
  id: string,
  title: string,
  priceNum: number,
  kmNum: number,
  year: number,
  fuel: Vehicle["fuel"],
  transmission: Vehicle["transmission"],
  body: string,
  brand: string,
  condition: Condition,
  img: string,
  extra: Partial<Vehicle> = {},
): Vehicle => ({
  id,
  title,
  price: `$${priceNum.toLocaleString()}`,
  priceNum,
  km: kmNum.toLocaleString(),
  kmNum,
  year,
  fuel,
  transmission,
  body,
  brand,
  condition,
  img,
  ...extra,
});

export const vehicles: Vehicle[] = [
  v("2022-ford-gt-white", "2022 Ford GT White", 425000, 2400, 2022, "Gasoline", "Automatic", "Coupe", "Ford", "Used Car", fordGT, { tag: "Staff Pick", featured: true }),
  v("2026-bmw-5-series", "2026 BMW 5 Series", 32600, 50, 2026, "Gasoline", "Automatic", "Sedan", "BMW", "New Car", carSilver, { tag: "New Arrival", featured: true }),
  v("2025-toyota-gt86", "2025 Toyota GT 86 Coupe", 28900, 5200, 2025, "Gasoline", "Manual", "Coupe", "Toyota", "Used Car", carBlack, { tag: "Great Price" }),
  v("2026-hyundai-tucson", "2026 Hyundai Tucson SUV", 36400, 100, 2026, "Hybrid", "Automatic", "SUV", "Hyundai", "New Car", carBlue, { tag: "Low Mileage", featured: true }),
  v("2025-honda-civic", "2025 Honda Civic Sport", 24800, 10500, 2025, "Gasoline", "Automatic", "Hatchback", "Honda", "Used Car", carRed, { tag: "Great Price" }),
  v("2026-chevy-silverado", "2026 Chevrolet Silverado", 48200, 30, 2026, "Diesel", "Automatic", "Truck", "Chevrolet", "New Car", carTruck),
  v("2026-rivian-r1", "2026 Rivian R1 Electric", 72500, 0, 2026, "Electric", "Automatic", "SUV", "Rivian", "New Car", carGreen, { tag: "New Arrival", featured: true }),
  v("2024-tesla-model-3", "2024 Tesla Model 3 Long Range", 41900, 18500, 2024, "Electric", "Automatic", "Sedan", "Tesla", "Used Car", carBlue),
  v("2026-tesla-model-y", "2026 Tesla Model Y Performance", 56400, 0, 2026, "Electric", "Automatic", "SUV", "Tesla", "New Car", carRed, { tag: "New Arrival" }),
  v("2023-audi-a4", "2023 Audi A4 Premium", 33500, 22300, 2023, "Gasoline", "Automatic", "Sedan", "Audi", "Certified Pre-Owned", carSilver),
  v("2024-mercedes-c300", "2024 Mercedes-Benz C300", 46800, 14200, 2024, "Gasoline", "Automatic", "Sedan", "Mercedes", "Used Car", carBlack, { featured: true }),
  v("2026-bmw-x5", "2026 BMW X5 xDrive40i", 71200, 0, 2026, "Gasoline", "Automatic", "SUV", "BMW", "New Car", carBlue, { tag: "New Arrival" }),
  v("2025-toyota-rav4", "2025 Toyota RAV4 Hybrid", 34900, 8400, 2025, "Hybrid", "Automatic", "SUV", "Toyota", "Used Car", carGreen, { tag: "Low Mileage" }),
  v("2026-ford-f150", "2026 Ford F-150 Lariat", 58300, 12, 2026, "Gasoline", "Automatic", "Truck", "Ford", "New Car", carTruck),
  v("2024-honda-cr-v", "2024 Honda CR-V EX-L", 32800, 19800, 2024, "Gasoline", "Automatic", "SUV", "Honda", "Used Car", carRed),
  v("2025-audi-q5", "2025 Audi Q5 Quattro", 47900, 6300, 2025, "Gasoline", "Automatic", "SUV", "Audi", "Certified Pre-Owned", carSilver, { featured: true }),
  v("2026-mercedes-glc", "2026 Mercedes GLC 300", 52400, 0, 2026, "Hybrid", "Automatic", "SUV", "Mercedes", "New Car", carBlack, { tag: "New Arrival" }),
  v("2023-chevy-camaro", "2023 Chevrolet Camaro SS", 38600, 26100, 2023, "Gasoline", "Manual", "Coupe", "Chevrolet", "Used Car", carRed, { tag: "Great Price" }),
  v("2026-hyundai-ioniq5", "2026 Hyundai Ioniq 5", 44800, 0, 2026, "Electric", "Automatic", "SUV", "Hyundai", "New Car", carBlue, { tag: "New Arrival" }),
  v("2025-rivian-r1t", "2025 Rivian R1T Adventure", 79900, 1200, 2025, "Electric", "Automatic", "Truck", "Rivian", "Used Car", carTruck, { featured: true }),
  v("2024-toyota-camry", "2024 Toyota Camry XSE", 31200, 16400, 2024, "Hybrid", "Automatic", "Sedan", "Toyota", "Used Car", carBlack),
  v("2026-honda-accord", "2026 Honda Accord Touring", 37500, 0, 2026, "Hybrid", "Automatic", "Sedan", "Honda", "New Car", carSilver, { tag: "New Arrival" }),
];

export const brands = [
  "Ford", "BMW", "Toyota", "Hyundai", "Honda", "Chevrolet", "Rivian", "Mercedes", "Audi", "Tesla",
];

export const bodyTypes = [
  { label: "Sedan", count: vehicles.filter(x => x.body === "Sedan").length },
  { label: "SUV", count: vehicles.filter(x => x.body === "SUV").length },
  { label: "Coupe", count: vehicles.filter(x => x.body === "Coupe").length },
  { label: "Hatchback", count: vehicles.filter(x => x.body === "Hatchback").length },
  { label: "Truck", count: vehicles.filter(x => x.body === "Truck").length },
  { label: "Convertible", count: 0 },
];

export const fuelTypes: Vehicle["fuel"][] = ["Gasoline", "Diesel", "Electric", "Hybrid"];
export const transmissions: Vehicle["transmission"][] = ["Automatic", "Manual"];
export const conditions: Condition[] = ["New Car", "Used Car", "Certified Pre-Owned"];

export const priceMin = 0;
export const priceMax = 500000;
