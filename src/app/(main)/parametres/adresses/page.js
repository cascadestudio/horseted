export default function UserAddresses() {
  // Add dynamic addresses
  const addresses = [
    {
      id: 1,
      createdAt: new Date(),
      fullName: "John Doe",
      street: "123 Main St",
      postalCode: "12345",
      city: "Anytown",
      country: "US",
      additionalInfos: "Apartment 4A",
      type: "delivery",
      latitude: 37.7749,
      longitude: -122.4194,
      isDefault: true,
    },
  ];
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {addresses.map((address) => (
        <div className="bg-white rounded-lg shadow p-4" key={address.id}>
          <h3 className="text-xl font-bold mb-2">{address.fullName}</h3>
          <p>{address.street}</p>
          <p>
            {address.postalCode} {address.city}
          </p>
          <p>{address.country}</p>
          <p>{address.additionalInfos}</p>
        </div>
      ))}
    </div>
  );
}
