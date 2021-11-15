export const RoomType = [
    {key: 0, value: 'Loại phòng'},
    {key: 1, value: 'Nhà trọ'},
    {key: 2, value: 'Chung cư cao cấp'},
    {key: 3, value: 'Nhà riêng'},
    {key: 4, value: 'Khách sạn'}
]

export const RoomFacility = [
    {id: 1, facility: "Bể bơi ngoài trời", description: "Description here"},
    {id: 2, facility: "Sân cỏ", description: "Description here"},
    {id: 3, facility: "Bể bơi trong nhà", description: "Description here"},
    {id: 4, facility: "Gần bờ biển", description: "Description here"},
    {id: 5, facility: "Bể bơi vô cực", description: "Description here"},
]

export const genderOptions = [
    {key: 'male', value: 'Nam'},
    {key: 'female', value: 'Nữ'},
    {key: 'other', value: 'Khác'} 
]

export const RoomList = [{
    address: "",
    id: 4527,
    image: ["https://picsum.photos/id/237/600/600", "https://picsum.photos/id/238/600/600", "https://picsum.photos/id/239/600/600"],
    name: "Room 1",
    num_bed: 2,
    num_bedroom: 1,
    num_guest: 1,
    price: 1,
    room_facility: [1, 5],
    room_type: "1"
  },
  {
    address: "",
    id: 4528,
    image: ["https://picsum.photos/id/240/200/200", "https://picsum.photos/id/241/200/200", "https://picsum.photos/id/242/200/200"],
    name: "Room 2",
    num_bed: 2,
    num_bedroom: 1,
    num_guest: 1,
    price: 1,
    room_facility: [1, 4],
    room_type: "2"
  },
  {
    address: "",
    id: 4529,
    image: ["https://picsum.photos/id/237/200/200", "https://picsum.photos/id/238/200/200", "https://picsum.photos/id/239/200/200"],
    name: "Room 3",
    num_bed: 2,
    num_bedroom: 1,
    num_guest: 1,
    price: 1,
    room_facility: [1, 3],
    room_type: "3"
  },
  {
    address: "",
    id: 4530,
    image: ["https://picsum.photos/id/237/200/200", "https://picsum.photos/id/238/200/200", "https://picsum.photos/id/239/200/200"],
    name: "Room 4",
    num_bed: 2,
    num_bedroom: 1,
    num_guest: 1,
    price: 1,
    room_facility: [2, 3],
    room_type: "4"
  },
  {
    address: "",
    id: 4531,
    image: ["https://picsum.photos/id/237/200/200", "https://picsum.photos/id/238/200/200", "https://picsum.photos/id/239/200/200"],
    name: "Room 5",
    num_bed: 2,
    num_bedroom: 1,
    num_guest: 1,
    price: 1,
    room_facility: [4, 3],
    room_type: "3"
  },
  {
    address: "",
    id: 4532,
    image: ["https://picsum.photos/id/237/200/200", "https://picsum.photos/id/238/200/200", "https://picsum.photos/id/239/200/200"],
    name: "Room 6",
    num_bed: 2,
    num_bedroom: 1,
    num_guest: 1,
    price: 1,
    room_facility: [5, 2],
    room_type: "2"
  }]

export const idContainer = [];
for (let i = 0; i < 100000; i++)
  idContainer.push(i);
