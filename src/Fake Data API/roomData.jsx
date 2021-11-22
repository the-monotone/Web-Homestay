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
    rating: 5.0,
    room_facility: [1, 5],
    room_type: "1",
    rule: "Được mang chó mèo, không ở quá số người quy định, k đổi pass wifi"
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
    rating: 4.9,
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
    rating: 5.0,
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
    rating: 5.0,
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
    rating: 5.0,
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
    rating: 5.0,
    room_facility: [5, 2],
    room_type: "2"
  }]

export const RoomFeedback = [
  {
    id: 1,
    roomId: 4527,
    username: "Linh Vy",
    description: "Phòng hơi nhỏ nhưng cực kỳ ấm cúng và sạch sẽ\nĐiều thích nhất của căn phòng này là chăn ga đc xả cực kỳ thơm, cảm giác như ở nhà vậy\nTv có đủ các ứng dụng đang hot: netflix, youtube, vie on, xịn nhất trong số những chỗ từng ở qua\nHighly recommend!",
    createdDate: "01/10/2021"
  },
  {
    id: 2,
    roomId: 4527,
    userId: 2,
    username: "Ngoc",
    description: "Căn hộ rất sạch sẽ, có view đẹp nhìn ra hồ, Host hỗ trợ rất nhanh khi mình có thắc mắc",
    createdDate: "01/07/2020"
  },
  {
    id: 3,
    roomId: 4527,
    userId: 3,
    username: "Phuc",
    description: "Very nice",
    createdDate: "01/02/2021"
  },
  {
    id: 4,
    roomId: 4527,
    userId: 4,
    username: "Quản Trọng",
    description: "The apartment is clean, morden and well-equipped. The host is quick to respond and helpful. Will definitely come back again if I have a chance.",
    createdDate: "06/09/2021"
  }
]

export const idContainer = [];
for (let i = 0; i < 100000; i++)
  idContainer.push(i);
