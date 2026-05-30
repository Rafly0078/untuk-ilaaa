export interface Chapter {
  id: string;
  type: "intro" | "story" | "funny" | "romantic" | "ending" | "lock" | "quiz";
  title?: string;
  text: string;
  subtext?: string;
  imageSrc?: string;
  imageAlt?: string;
  layout?: "left" | "right" | "center";
}

export const PERSON_NAME = "Ila";

// Instagram DM link — replace with the actual username
export const CHAT_LINK = "https://ig.me/m/YOUR_INSTAGRAM_USERNAME";

export const chapters: Chapter[] = [
  {
    id: "opening",
    type: "intro",
    text: "Aku bikin sesuatu kecil buat kamu.",
    subtext: "Ga seberapa sihh, but i hope you like it ilaaa!",
  },
  {
    id: "lock-screen",
    type: "lock",
    title: "apanyakkk",
    text: "Eitsss, sebelum lanjut, masukin password dulu dong!",
    subtext: "formatnya gini yaa (DDMMYY)",
  },
  {
    id: "first-impression",
    type: "story",
    title: "Pertama kali",
    text: `Pertama kali liat ${PERSON_NAME}, aku langsung mikir...`,
    subtext: `"Wahh, ini orang kok bisa secute inii? kamu mam apaann sih??"`,
    imageSrc: "/images/1000212400.jpg",
    imageAlt: `Foto ${PERSON_NAME}`,
    layout: "right",
  },
  {
    id: "little-things",
    type: "story",
    title: "Hal kecil",
    text: "Yang bikin aku suka? Hal kecil.",
    subtext:
      "caramu cerita, caramu bikin aku senyum, salting, gemes, dan dikirimim pap imutt sama voice note kith kith.",
    imageSrc: "/images/1000212379.jpg",
    imageAlt: `Foto ${PERSON_NAME}`,
    layout: "left",
  },
  {
    id: "quiz-time",
    type: "quiz",
    title: "Mini Quiz!",
    text: "Waktunya ngetes seberapa kenal kamu sama kita berdua 😜",
  },
  {
    id: "funny",
    type: "funny",
    title: "Psst...",
    text: "Aku mau bilang sesuatu...",
    subtext: "Tapi coba pencet tombol ini dulu.",
    imageSrc: "/images/1000211042.jpg",
    imageAlt: `Foto ${PERSON_NAME}`,
    layout: "center",
  },
  {
    id: "romantic",
    type: "romantic",
    title: "Jujur aja ya",
    text: `Aku nggak tau ini bakal jadi apa. Tapi aku pengen kamu tauu hal ini ilaaa.`,
    subtext: "Aku seneng banget bisa kenal kamu dan disayang sayangin sama kamuu. dan aku harap kita berdua bisa lewatin hari hari yang berat bareng barengg. AND REMEMBERRRR I ALWAYS PROUD OF YOUUUU! ❤️",
    imageSrc: "/images/1000213180.jpg",
    imageAlt: `Foto ${PERSON_NAME}`,
    layout: "right",
  },
  {
    id: "ending",
    type: "ending",
    title: "Terima Kasih",
    text: `Terima kasih banyakk ya Ilaaaa udah mau baca sampai akhirr.`,
    subtext: "Semoga kamu happy terus tiap hariii! 💗",
  },
];
