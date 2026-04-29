export interface Vehicle {
  id: string
  title: string
  subtitle?: string
  img: string
  price: string
  capacity: string
}

export interface FleetCategory {
  id: string
  label: string
  vehicles: Vehicle[]
}

export const fleetCategories: FleetCategory[] = [
  {
    id: 'minivan-standard',
    label: 'Минивэн стандарт',
    vehicles: [
      { id: 'mv01', title: 'Volkswagen Caravelle', img: '/images/minivan-caravelle.jpg', price: 'от2 000 руб/час', capacity: 'до 7 чел.' },
      { id: 'mv02', title: 'Hyundai Staria', img: '/images/minivan-staria.jpg', price: 'от 2 000 руб/час', capacity: 'до 7 чел.' },
      { id: 'mv03', title: 'Honda Stepwgn', img: '/images/minivan-stepwgn.jpg', price: 'от 1 700 руб/час', capacity: 'до 6 чел.' },
      { id: 'mv04', title: 'Mercedes Vito', img: '/images/minivan-vito.jpg', price: 'от 2 500 руб/час', capacity: 'до 7 чел.' },
      { id: 'mv05', title: 'Opel Zafira Life', img: '/images/minivan-zafira.jpg', price: 'от 2 000 руб/час', capacity: 'до 6 чел.' },
    ],
  },
  {
    id: 'minivan-business',
    label: 'Минивэн бизнес',
    vehicles: [
      { id: 'mb01', title: 'Mercedes V Class Maybach', img: '/images/biz-vclass-maybach.jpg', price: 'от 15 000 руб/час', capacity: 'до 4 чел.' },
      { id: 'mb02', title: 'Mercedes Sprinter VIP', subtitle: '8 мест', img: '/images/biz-sprinter-vip.jpg', price: 'от 4 500 руб/час', capacity: '8 чел.' },
      { id: 'mb03', title: 'Zeekr 009', subtitle: '5 человек', img: '/images/biz-zeekr.jpg', price: 'от 3 500 руб/час', capacity: '5 чел.' },
      { id: 'mb04', title: 'Mercedes V Class', subtitle: 'белый, 5 человек', img: '/images/biz-vclass-white.jpg', price: 'от 3 500 руб/час', capacity: '5 чел.' },
      { id: 'mb05', title: 'Mercedes V Class', subtitle: 'белый салон, 5 мест', img: '/images/biz-vclass-black.jpg', price: 'от 3 500 руб/час', capacity: '5 чел.' },
      { id: 'mb06', title: 'Mercedes V Class', img: '/images/biz-vclass.jpg', price: 'от 3 500 руб/час', capacity: 'до 6 чел.' },
      { id: 'mb07', title: 'GAC M8', img: '/images/biz-gacm8.jpg', price: 'от 3 000 руб/час', capacity: 'до 6 чел.' },
      { id: 'mb08', title: 'Voyah Dream', img: '/images/biz-voyah.jpg', price: 'от 3 000 руб/час', capacity: 'до 5 чел.' },
    ],
  },
  {
    id: 'bus-19',
    label: 'Автобус до 19 мест',
    vehicles: [
      { id: 'b1901', title: 'Mercedes Sprinter пассажирский', img: '/images/bus19-sprinter1.jpg', price: 'от 2 800 руб/час', capacity: 'до 20 чел.' },
      { id: 'b1902', title: 'Mercedes Sprinter пассажирский', subtitle: 'белый', img: '/images/bus19-sprinter2.jpg', price: 'от 2 500 руб/час', capacity: 'до 19 чел.' },
      { id: 'b1903', title: 'Mercedes Sprinter в кузове 907', img: '/images/bus19-sprinter3.jpg', price: 'от 3 500 руб/час', capacity: 'до 19 чел.' },
    ],
  },
  {
    id: 'bus-49',
    label: 'Автобус до 49 мест',
    vehicles: [
      { id: 'b4901', title: 'Yutong 50 мест', img: '/images/bus-youtong.jpg', price: 'от 3 700 руб/час', capacity: 'до 49 чел.' },
      { id: 'b4902', title: 'Higer 50 мест', img: '/images/bus-higer.jpg', price: 'от 3 700 руб/час', capacity: 'до 49 чел.' },
      { id: 'b4903', title: 'Higer 50 мест', subtitle: 'зеленый', img: '/images/bus-higer-green.jpg', price: 'от 3 700 руб/час', capacity: 'до 49 чел.' },
      { id: 'b4904', title: 'MAN 55 мест', img: '/images/bus-man.jpg', price: 'от 4 500 руб/час', capacity: 'до 55 чел.' },
      { id: 'b4905', title: 'Zontong 50 мест', img: '/images/bus-zontong.jpg', price: 'от 3 700 руб/час', capacity: 'до 49 чел.' },
      { id: 'b4906', title: 'Mercedes-Benz 50 мест', img: '/images/bus-mercedes.jpg', price: 'от 3 700 руб/час', capacity: 'до 49 чел.' },
    ],
  },
]

// Flat list for compatibility with existing BusDetail
export const allVehicles: Vehicle[] = fleetCategories.flatMap((c) => c.vehicles)
