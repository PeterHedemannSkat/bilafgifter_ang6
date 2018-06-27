export const data = [
  {
    id: "car!van*ejerafgift*udligning",
    da: "ejerafgift*udligning*normale",
    group: "2",
    children: [
      {
        id: "2018",
        da:
          "5290, 5060, 4760, 4540, 4280, 4070, 3870, 3600,3390, 3200, 2950, 2740, 2520, 2280, 2180, 2070, 1950, 1830, 1710, 1580, 1480, 1370, 1270, 1160, 1060, 600, 130"
      },
      {
        id: "2017",
        da:
          "5270,5030,4740,4520,4260,4050,3850,3580,3370,3190,2940,2720,2510,2270,2160,2060,1940,1820,1700,1580,1480,1360,1260,1150,1060,590,130"
      },
      {
        id: "2016",
        da:
          "5240,5000,4710,4490,4240,4030,3830,3560,3350,3170,2920,2710,2490,2250,2150,2050,1930,1810,1690,1570,1470,1360,1250,1140,1050,590,130"
      }
    ]
  },
  {
    id: "car!van*ejerafgift*forbrugsafgift",
    da: "ejerafgift*udligning*forbrug",
    group: "2",
    children: [
      {
        id: "2018",
        da:
          "11430,10800,10190,9580,8970, 8330, 7720, 7110, 6480, 5870, 5260, 4650, 4010, 3410, 3100, 2790, 2480, 2180, 1870, 1570, 1260, 940, 640, 330, 0, 0, 0"
      },
      {
        id: "2017",
        da:
          "10830,10230,9650,9080,8500,7890,7310,6730,6140,5560,4980,4400,3800,3230,2930,2640,2350,2060,1770,1480,1190,890,600,310,0,0,0"
      },
      {
        id: "2016",
        da:
          "10830,10230,9650,9080,8500,7890,7310,6730,6140,5560,4980,4400,3800,3230,2930,2640,2350,2060,1770,1480,1190,890,600,310,0,0,0"
      }
    ]
  },
  {
    id: "car|van*nyeregler*ejerafgift*udligning",
    da: "ejerafgift*udligning*nye",
    group: "2",
    children: [
      {
        id: "2018",
        da:
          "5260,5060,4760,4540,4280,4070,3870,3600,3390,3200,2950,2740,2520,2280,2180,2070,1950,1830,1710,1580,1480,1370,1270,1160,1060,600,130,130,130,130,130,130"
      }
    ]
  },

  {
    id: "car*nyeregler*ejerafgift*forbrugsafgift",
    da: "ejerafgift*forbrug*nye",
    group: "2",
    children: [
      {
        id: "2018",
        da:
          "11070,10470,9890,9310,8730,8130,7550,6970,6380,5800,5220,4640,4030,3460,3170,2880,2580,2300,2005,1720,1430,1120,840,545,510,470,430,400,380,365,350,310"
      }
    ]
  },
  {
    id: "van*nyeregler*ejerafgift*forbrugsafgift*benzin",
    da: "ejerafgift*forbrug*nye",
    group: "2",
    children: [
      {
        id: "2018",
        da:
          "10830, 10230, 9650, 9080, 8500,7890,7310,6730,6140,5560,4980,4400,3800,3230,2930,2640,2350,2060,1770,1480,1190,890,600,310,310,310,310,310,310,310,310,310"
      }
    ]
  },
  {
    id: "van*nyeregler*ejerafgift*forbrugsafgift*diesel",
    da: "ejerafgift*forbrug*nye",
    group: "2",
    children: [
      {
        id: "2018",
        da:
          "10830, 10230, 9650, 9080, 8500,7890,7310,6730,6140,5560,4980,4400,3800,3230,2930,2640,2350,2060,1770,1480,1190,890,600,310,0,0,0,0,0,0,0,0"
      }
    ]
  },
  {
    /* diesel tillæg   */
    id: "car*vaegtafgift*udligning",
    da: "bil*vaegtafgift*forbrugsafgift",
    group: "2,2,2,2,4,4,4",
    children: [
      {
        id: "2018",
        da: "780, 960, 1270, 1620, 1030, 1380,*78/100"
      },
      {
        id: "2017",
        da: "780,960,1260,1610,1030,1370,*78/100"
      },
      {
        id: "2016",
        da: "770,950,1250,1600,1020,1370,*77/100"
      }
    ]
  },
  {
    id: "car*vaegtafgift*forbrugsafgift*kvartal",
    da: "bil*vaegtafgift*forbrugsafgift",
    en: "2017=2016,2015",
    group: "2,2,2,2,4,4,4",
    children: [
      {
        id: "2018",
        da: "1060, 1290, 1760, 2340, 1550, 2110,*120/100"
      },
      {
        id: "2017",
        da: "1000, 1220, 1660, 2210, 1460, 2000,*113/100"
      }
    ]
  } /* bruges som forbrugsafgift til dieselbil! */,
  {
    id: "taxi*vaegtafgift*udligning",
    da: "taxi",
    children: [
      {
        id: "2018",
        da: "2450,3030,3590,3940,4350,5210"
      },
      {
        id: "2017",
        da: "2440,3020,3570,3920,4320,5190"
      }
    ]
  },
  {
    id: "taxi*vaegtafgift*forbrugsafgift",
    da: "taxi",
    en: "2017=2016,2015",
    children: [
      {
        id: "2018",
        da: "0,0,0,0,0,0"
      },
      {
        id: "2017",
        da: "0,0,0,0,0,0"
      }
    ]
  } /* bruges som forbrugsafgift til dieselbil! */,
  {
    id: "car*vaegtafgift*forbrugsafgift*halvaar",
    da: "bil*vaegtafgift*forbrugsafgift",
    en: "2017=2016,2015",
    group: "2,2,2,2,2,2,4",
    children: [
      {
        id: "2018",
        da: "1060, 1290, 1760, 2340, 3050, 4200,*120/100"
      },
      {
        id: "2017",
        da: "1000, 1220, 1660, 2210, 2890, 3980,*113/100"
      }
    ]
  },
  {
    id: "van*vaegtafgift*forbrugsafgift",
    en: "2017=2016",
    da: "van*vaegtafgift*forbrugsafgift",
    children: [
      {
        id: "2018",
        da: "1060,1360,2250,3890,4660,4660"
      },
      {
        id: "2017",
        da: "1000,1280,2130,3680,4410,4410"
      }
    ]
  },
  {
    id: "van*vaegtafgift*udligning",
    en: "2018=2017,2016",
    da: "van*vaegtafgift*forbrugsafgift",
    children: [
      {
        id: "2018",
        da: "580,840,1150,1430,1630,1840"
      }
    ]
  },
  {
    id: "privatAnvendelsesAfgift",
    en: "2017=2016",
    da: "-",
    children: [
      {
        id: "2018",
        da: "1060,6250,18560"
      },
      {
        id: "2017",
        da: "1060,5920,17590"
      }
    ]
  },
  {
    id: "vejbenyttelsesafgift_",
    en: "2018=2017,2016",
    da: "-",
    children: [
      {
        id: "2018",
        da: "7156,6336,5591"
      }
    ]
  },
  {
    id: "partikelFilterAfgift",
    en: "2018=2017,2016",
    da: "-",
    children: [
      {
        id: "2018",
        da: "400,600,1000"
      }
    ]
  },
  {
    id: "vejbenyttelseAfgift",
    en: "2018=2017,2016",
    da: "-",
    children: [
      {
        id: "2018",
        da: "7156, 6336, 5591, 11555, 10437, 9318"
      }
    ]
  },
  {
    id: "largeTruck|regular*aksler_2",
    da: "truck_interval1",
    en: "2018=2017,2016",
    children: [
      {
        id: "2018",
        da: "0, 226, 627, 882, 2050"
      }
    ]
  },
  {
    id: "largeTruck|regular*aksler_3",
    da: "truck_interval2",
    en: "2018=2017,2016",
    children: [
      {
        id: "2018",
        da: "226, 394, 809, 1050, 1661, 2582"
      }
    ]
  },
  {
    id: "largeTruck|regular*aksler_4",
    da: "truck_interval8",
    en: "2018=2017,2016",
    children: [
      {
        id: "2018",
        da: "1050, 1065, 1706, 2709, 4019"
      }
    ]
  },
  {
    id: "largeTruck|vogntog*aksler_2*akslerVogntog_1",
    da: "truck_interval4",
    en: "2018=2017,2016",
    children: [
      {
        id: "2018",
        da: "0, 0, 102, 233, 547, 707, 1276, 2297"
      }
    ]
  },
  {
    id: "largeTruck|vogntog*aksler_2*akslerVogntog_2",
    da: "truck_interval5",
    en: "2018=2017,2016",
    children: [
      {
        id: "2018",
        da: "219, 510, 839, 1232, 1526, 2507, 3480, 5284"
      }
    ]
  },
  {
    id: "largeTruck|vogntog*aksler_2*akslerVogntog_3",
    da: "truck_interval6",
    en: "2018=2017,2016",
    children: [
      {
        id: "2018",
        da: "2769, 3854, 5239"
      }
    ]
  },
  {
    id: "largeTruck|vogntog*aksler_3*akslerVogntog_1",
    da: "truck_interval5",
    en: "2018=2017,2016",
    children: [
      {
        id: "2018",
        da: "219, 510, 839, 1232, 1526, 2507, 3480, 5284"
      }
    ]
  },
  {
    id: "largeTruck|vogntog*aksler_3*akslerVogntog_2",
    da: "truck_interval7",
    en: "2018=2017,2016",
    children: [
      {
        id: "2018",
        da: "2447, 3398, 4700, 6905"
      }
    ]
  },
  {
    id: "largeTruck|vogntog*aksler_3*akslerVogntog_3",
    da: "truck_interval7",
    en: "2018=2017,2016",
    children: [
      {
        id: "2018",
        da: "1356, 1684, 2514, 4004"
      }
    ]
  },
  {
    id: "smallTruck*vaegtafgift*type_motorkoeretoej*aksler_2",
    da: "smallTruck1",
    en: "2018=2017,2016",
    children: [
      {
        id: "2018",
        da:
          "2052, 2052, 2052, 2052, 2052, 2052, 2279, 2610, 3087, 3604, 4161,*60/200"
      }
    ]
  },
  {
    id: "smallTruck*udligning*type_motorkoeretoej*aksler_2",
    da: "smallTruck1",
    en: "2018=2017,2016",
    children: [
      {
        id: "2018",
        da:
          "1150, 1150, 1150, 1150, 1150, 1150, 1150, 1150, 1150, 1150, 1150, *16/200"
      }
    ]
  },
  {
    id: "smallTruck*vaegtafgift*type_paahaengskoeretoej*aksler_2",
    da: "smallTruck1",
    en: "2018=2017,2016",
    children: [
      {
        id: "2018",
        da:
          "552, 672, 825, 988, 1161, 1344, 1537, 1740, 1953, 2176, 2628,*40/200"
      }
    ]
  },
  {
    id: "smallTruck*udliging*type_paahaengskoeretoej*aksler_2",
    da: "smallTruck1",
    en: "2018=2017,2016",
    children: [
      {
        id: "2018",
        da: "200, 250, 300, 400, 450, 550, 650, 750, 850, 1000, 1100,*16/200"
      }
    ]
  },
  {
    id: "smallTruck*vaegtafgift*type_motorkoeretoej*aksler_3",
    da: "smallTruck2",
    en: "2018=2017,2016",
    children: [
      {
        id: "2018",
        da: "*32/200, 3069, 3332,*36/200"
      }
    ]
  },
  {
    id: "smallTruck*udligning*type_motorkoeretoej*aksler_3",
    da: "smallTruck2",
    en: "2018=2017,2016",
    children: [
      {
        id: "2018",
        da: "*11/200, 1150, 1150,*13/200"
      }
    ]
  },
  {
    id: "smallTruck*vaegtafgift*type_paahaengskoeretoej*aksler_3",
    da: "smallTruck2",
    en: "2018=2017,2016",
    children: [
      {
        id: "2018",
        da: "*12/200, 1100, 1200,*13/200"
      }
    ]
  },
  {
    id: "smallTruck*udliging*type_paahaengskoeretoej*aksler_3",
    da: "smallTruck2",
    en: "2018=2017,2016",
    children: [
      {
        id: "2018",
        da: "200, 250, 300, 400, 450, 550, 650, 750, 850, 1000, 1100, *16/200"
      }
    ]
  },
  {
    id: "mc*udligning",
    da: "infinite",
    en: "2018=2017,2016",
    children: [
      {
        id: "2018",
        da: "530"
      }
    ]
  },
  {
    id: "mc*vaegtafgift",
    da: "infinite",
    en: "2018=2017,2016",
    children: [
      {
        id: "2018",
        da: "730"
      }
    ]
  },
  {
    id: "trailer*benzin",
    da: "van*vaegtafgift*forbrugsafgift",
    en: "2018=2017,2016",
    children: [
      {
        id: "2018",
        da: "0,150,290,360,460,560"
      }
    ]
  },
  {
    id: "trailer*diesel",
    da: "van*vaegtafgift*forbrugsafgift",
    en: "2018=2017,2016",
    children: [
      {
        id: "2018",
        da: "0,150,290,360,460,820"
      }
    ]
  },
  {
    id: "simpleTable*camper",
    da: "camper",
    group: "2,2,2,2,2,2,4",
    en: "2018=2017,2016",
    children: [
      {
        id: "2018",
        da: "339,413,563,749,976,1344,*34/100"
      }
    ]
  },
  {
    id: "bus*vaegtafgift*aksler_2",
    da: "bus",
    en: "2018=2017,2016",
    children: [
      {
        id: "2018",
        da: "450,585,810,900,1440,1920,2400, 3120,3640,4160,*50/100"
      }
    ]
  },
  {
    id: "bus*udligning*aksler_2",
    da: "bus",
    en: "2018=2017,2016",
    children: [
      {
        id: "2018",
        da: "1130, 1160, 1230, 1230, 1230, 1230, 1230, 1230, 1230, 1230,*14/100"
      }
    ]
  },
  {
    id: "bus*vaegtafgift*aksler_3",
    da: "infinite",
    en: "2018=2017,2016",
    children: [
      {
        id: "2018",
        da: "*36/100"
      }
    ]
  },
  {
    id: "bus*udligning*aksler_3",
    da: "infinite",
    en: "2018=2017,2016",
    children: [
      {
        id: "2018",
        da: "*10/100"
      }
    ]
  }
];
