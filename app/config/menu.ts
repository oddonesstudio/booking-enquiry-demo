import type { StaticImageData } from "next/image";

import MenuItemImage from "@/ui/_assets/spicy-sweet.png";

type MenuItem = {
  title: string;
  description?: string;
  imageSrc: StaticImageData;
};

export const menuItems: MenuItem[] = [
  {
    title: "The Margherita",
    description: "San Marzano tomato, Fior Di Latte mozzarella, basil & oregano.",
    imageSrc: MenuItemImage,
  },
  {
    title: "The Pepperoni",
    description: "Pepperoni, Pepperoni, Pepperoni.",
    imageSrc: MenuItemImage,
  },
  {
    title: "The Spicy Sweet",
    description: "Pepperoni, piquante peppers, chilli flakes, honey.",
    imageSrc: MenuItemImage,
  },
  {
    title: "The Hawaiian Shuffle",
    description: "Prosciutto, Pineapple, Basil. ",
    imageSrc: MenuItemImage,
  },
  {
    title: "The Goat",
    description: "Goats Cheese, Caramelised Onion, Rocket.",
    imageSrc: MenuItemImage,
  },
];
