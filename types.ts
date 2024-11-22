
export type RootStackParamList = {
  Home: { newItem?: { dishName: string; description: string; course: string; price: number }; menuItems: { dishName: string; description: string; course: string; price: number }[] };
  AddMenu: { menuItems: { dishName: string; description: string; course: string; price: number }[] } | undefined;
  FilterMenu: { menuItems: { dishName: string; description: string; course: string; price: number }[] };
};