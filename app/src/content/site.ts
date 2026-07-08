// Структурированные данные сайта: реальные цифры со старого rtrain.ru.
export const PHONE = "+7 (495) 943-61-69";
export const PHONE_HREF = "tel:+74959436169";
export const WHATSAPP = "+7 (901) 593-61-69";
export const WHATSAPP_HREF = "https://api.whatsapp.com/send?phone=79015936169";
export const EMAIL = "info@rtrain.ru";
export const ADDRESS = "111024, Москва, ш. Энтузиастов, д. 5, метро Римская";

export type Price = { city: string; p20: string; p40: string; sea?: boolean };
export const PRICES: Price[] = [
  { city: "Новосибирск", p20: "54 200", p40: "79 500" },
  { city: "Красноярск", p20: "56 500", p40: "101 000" },
  { city: "Иркутск (Батарейная)", p20: "74 500", p40: "123 500" },
  { city: "Улан-Удэ (Тальцы)", p20: "81 900", p40: "169 500" },
  { city: "Чита", p20: "86 200", p40: "165 500" },
  { city: "Благовещенск", p20: "86 500", p40: "166 400" },
  { city: "Хабаровск", p20: "92 000", p40: "141 000" },
  { city: "Владивосток", p20: "85 000", p40: "139 000" },
  { city: "Беркакит", p20: "94 000", p40: "198 000" },
  { city: "Якутск", p20: "161 300", p40: "283 500", sea: true },
  { city: "Южно-Сахалинск", p20: "127 000", p40: "217 000", sea: true },
  { city: "Петропавловск-Камчатский", p20: "140 500", p40: "231 000", sea: true },
  { city: "Магадан", p20: "146 500", p40: "249 000", sea: true },
];

// Пять главных услуг: полосы-плакаты на главной. Фото документальные, из галереи.
export const SERVICES = [
  {
    href: "/container",
    title: "Контейнерные перевозки",
    photo: "/gallery/pogruzka-avto-v-kontejnerakh/IMG-20211130-WA0012.jpg",
    note: "20 и 40 футов, ускоренные контейнерные поезда, морское плечо до Сахалина и Камчатки",
  },
  {
    href: "/oversized",
    title: "Негабаритные грузы",
    photo: "/gallery/pogruzka-oborudovaniya/DSCF3400.jpg",
    note: "Крупногабаритное оборудование на платформах: схемы погрузки, крепление, согласования",
  },
  {
    href: "/vagonnnie-perevozki",
    title: "Вагонные перевозки",
    photo: "/gallery/pogruzka-v-vagony-tsmgv/IMG_1424.jpg",
    note: "Крытые вагоны и ЦМГВ для сборных грузов, бытовок и трансформаторов",
  },
  {
    href: "/cars",
    title: "Перевозка автомобилей",
    photo: "/gallery/pogruzka-na-avtomobili/IMG_0924.jpg",
    note: "Легковые, грузовики и спецтехника в вагонах-сетках и контейнерах",
  },
  {
    href: "/proektnaya-logistika",
    title: "Проектная логистика",
    photo: "/gallery/pogruzka-spetstekhniki/IMG_0174.jpg",
    note: "Комплексные проекты: маршрут, подвижной состав, график подач, сопровождение",
  },
] as const;

// Города: жд-плечо и сроки (реальные данные со старого сайта; км по Транссибу).
export const CITY_PAGES: Record<string, { city: string; days?: string; km?: string; sea?: boolean }> = {
  "/zhd-otpravki-v-novosibirsk": { city: "Новосибирск", days: "5 суток", km: "3 335 км" },
  "/zhd-otpravki-v-krasnoyarsk": { city: "Красноярск", days: "6 суток", km: "4 098 км" },
  "/zhd-otpravki-v-irkutsk": { city: "Иркутск", days: "6 суток", km: "5 185 км" },
  "/zhd-otpravki-v-ulan-ude": { city: "Улан-Удэ", days: "7 суток", km: "5 640 км" },
  "/zhd-otpravki-v-chitu": { city: "Чита", days: "8 суток", km: "6 199 км" },
  "/zhd-otpravki-v-habarovsk": { city: "Хабаровск", days: "9 суток", km: "8 521 км" },
  "/zhd-otpravki-vo-vladivostok": { city: "Владивосток", days: "10 суток", km: "9 288 км" },
  "/zhd-perevozki-v-blagoveschensk": { city: "Благовещенск", days: "9 суток", km: "7 985 км" },
  "/zhd-perevozki-v-birobidzhan": { city: "Биробиджан", km: "8 351 км" },
  "/zhd-perevozki-v-komsomolsk-na-amure": { city: "Комсомольск-на-Амуре", km: "8 900 км" },
  "/zhd-perevozki-v-ussurijsk": { city: "Уссурийск", km: "9 177 км" },
  "/zhd-perevozki-v-neryungri-berkakit-berkakit": { city: "Нерюнгри (Беркакит)", km: "7 306 км" },
  "/zhd-perevozki-tommot": { city: "Томмот", km: "8 000 км" },
  "/zhd-perevozki-v-yakutsk": { city: "Якутск", days: "по запросу", sea: false },
  "/zhd-perevozki-v-magadan": { city: "Магадан", days: "21-35 суток", sea: true },
  "/zhd-perevozki-v-petropavlovsk-kamchatskij": { city: "Петропавловск-Камчатский", days: "18-35 суток", sea: true },
  "/zhd-perevozki-v-yuzhno-sahalinsk": { city: "Южно-Сахалинск", days: "15-25 суток", sea: true },
  "/zhd-perevozki-v-pevek": { city: "Певек, Билибино, Зелёный Мыс", days: "в навигацию", sea: true },
};

// Полное меню услуг (внутренняя перелинковка как на старом сайте, важно для SEO)
export const SERVICE_LINKS: Array<{ href: string; label: string }> = [
  { href: "/container", label: "Контейнерные перевозки" },
  { href: "/container/multimodalnye-perevozki", label: "Мультимодальные перевозки" },
  { href: "/container-9", label: "Перевозки в 40-футовых контейнерах" },
  { href: "/container-1", label: "Типы контейнеров" },
  { href: "/oversized", label: "Негабаритные перевозки" },
  { href: "/krupnogobarit", label: "Крупногабаритное оборудование" },
  { href: "/vagonnnie-perevozki", label: "Вагонные перевозки" },
  { href: "/tipi-vagonov", label: "Перевозка в крытых вагонах" },
  { href: "/platforma", label: "Перевозка вагонами-платформами" },
  { href: "/vagon-setka", label: "Вагон-сетка" },
  { href: "/perevozki-oborudovaniya", label: "Перевозка сельхозтехники" },
  { href: "/perevozki-oborudovaniya/zhd-perevozki-bytovok-i-blok-modulej", label: "Бытовки и блок-модули" },
  { href: "/vagonnnie-perevozki/zhd-perevozka-transformatorov", label: "Перевозка трансформаторов" },
  { href: "/cars", label: "Перевозка автомобилей" },
  { href: "/cars/perevozki-gruzovikov", label: "Перевозка грузовиков" },
  { href: "/cars/zheleznodorozhnye-perevozki-avtomobilej-spetsialnogo-naznacheniya", label: "Строительная спецтехника" },
  { href: "/cars/zheleznodorozhnye-perevozki-avtobusov-i-mikroavtobusov", label: "Автобусы и микроавтобусы" },
  { href: "/cars/perevozka-kitajskikh-avtomobilej-po-zhd", label: "Китайские автомобили" },
  { href: "/cars/perevozka-mashin-v-magadan", label: "Машины в Магадан" },
  { href: "/cars/perevozka-avtomobilej-v-petropavlovsk-kamchatskij", label: "Машины в Петропавловск-Камчатский" },
  { href: "/perevozka-traktorov", label: "Перевозка тракторов" },
  { href: "/perevozka-voennoy-tehniki", label: "Перевозка военной техники" },
  { href: "/perevozka-yaht-i-katerov", label: "Яхты и катера" },
  { href: "/proektnaya-logistika", label: "Проектная логистика" },
];

export const CITY_LINKS: Array<{ href: string; label: string }> = Object.entries(CITY_PAGES).map(
  ([href, v]) => ({ href, label: v.city }),
);
