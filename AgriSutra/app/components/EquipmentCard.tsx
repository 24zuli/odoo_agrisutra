interface Equipment {
  equipment_id: number;
  name: string;
  no_of_units: number;
  price?: number;
  category_id: number;
  owner_id: number;
  location_lat: number;
  location_lng: number;
  owner_name: string;
  availability: string;
}

export default function EquipmentCard({ equipment }: { equipment: Equipment }) {
  return (
    <div key={equipment.equipment_id} className="p-4 border rounded-lg shadow-md bg-white">
      <h3 className="text-xl font-semibold">{equipment.name}</h3>
      <p className="text-gray-600">Units Available: {equipment.no_of_units}</p>
      <p className="text-gray-600">Owner Name: {equipment.owner_name}</p>
      {equipment.price && <p className="text-green-600 font-semibold">Price per unit: {equipment.price}</p>}
      <p className="text-gray-500">Location: {equipment.location_lat}, {equipment.location_lng}</p>
      

    </div>
  );
}
