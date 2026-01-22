// Mock data for the application

export const getServices = async () => {
  return [
    {
      id: 1,
      title: "Full Truckload",
      description: "Pan-India operations with 32ft MXL containers.",
      icon: "🚛",
      price: "From ₹40/km",
    },
    {
      id: 2,
      title: "Hyperlocal",
      description: "Instant delivery within city limits using EVs.",
      icon: "⚡",
      price: "From ₹150",
    },
    {
      id: 3,
      title: "Cold Chain",
      description: "Temperature controlled fleet for pharma & fresh produce.",
      icon: "❄️",
      price: "Custom Quote",
    },
    {
      id: 4,
      title: "Warehousing",
      description: "Tech-enabled fulfillment centers in top 10 cities.",
      icon: "🏭",
      price: "₹25/sqft",
    },
  ];
};

export const getHubs = async () => {
  return [
    {
      id: 1,
      city: "Mumbai",
      address: "Bhiwandi Logistics Park, Zone A",
      status: "Operational",
      capacity: "98%",
    },
    {
      id: 2,
      city: "Delhi NCR",
      address: "Gurgaon Industrial Estate, Sec 18",
      status: "Operational",
      capacity: "85%",
    },
    {
      id: 3,
      city: "Bangalore",
      address: "Peenya Industrial Area, Phase 2",
      status: "Operational",
      capacity: "92%",
    },
    {
      id: 4,
      city: "Hyderabad",
      address: "Jedimetla Industrial Park",
      status: "High Load",
      capacity: "99%",
    },
    {
      id: 5,
      city: "Chennai",
      address: "Sriperumbudur Hub",
      status: "Operational",
      capacity: "78%",
    },
    {
      id: 6,
      city: "Pune",
      address: "Chakan Auto Cluster",
      status: "Maintenance",
      capacity: "45%",
    },
  ];
};
