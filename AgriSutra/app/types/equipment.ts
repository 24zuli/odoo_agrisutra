

export interface Category {
    category_id: number;
    name: string;
  }
  
  interface Equipment {
    equipment_id: number;
    category_id: number;
    owner_id: number;
    no_of_units: number;
    location_lat: number;
    location_lng: number;
    name: string;
    description: string; // assuming description exists
    price: number; // assuming price exists
  }
  