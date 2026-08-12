import kevinPhoto from "@/assets/kevin-working.jpg.asset.json";

export type TeamMember = {
  name: string;
  role: string;
  photo: string;
  linkedin: string;
  twitter: string;
  email: string;
};

export const team: TeamMember[] = [
  {
    name: "Kevin Hines",
    role: "Owner & Founder",
    photo: kevinPhoto.url,
    linkedin: "https://www.linkedin.com/",
    twitter: "https://x.com/",
    email: "prestige101shine@gmail.com",
  },
];
