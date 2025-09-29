const adventures = [
  {
    "name": "00153",
    "fname": "00153TW0204",
    "category": "Teen Walk",
    "colors": "Black | Blue | Pink | Beidge",
    "sizes": "4 5 6 7 8",
    "forthe": "Women",
    "image": "source/Teenwalk/153.jpg",
    "link": "template.html",
    "status": "View Image",
    "Stock": "Stock Available",
    "New_item": "yes",   // ✅ new item
    "Date": "2025-09-29",
    "price": "LKR 740",
    "extraimage1": "source/Teenwalk/153.jpg"
  },
  {
    "name": "00152",
    "fname": "00152TW0204",
    "category": "Teen Walk",
    "colors": "Black | Pink | Gray",
    "sizes": "4 5 6 7 8",
    "forthe": "Women",
    "image": "source/Teenwalk/152.jpg",
    "link": "template.html",
    "status": "View Image",
    "Stock": "Stock Available",
    "New_item": "yes",   // ✅ new item
    "Date": "2025-09-29",
    "price": "LKR 690",
    "extraimage1": "source/Teenwalk/152.jpg"
  },
  {
    "name": "00150",
    "fname": "00150TW0204",
    "category": "Teen Walk",
    "colors": "Black | Pink | Beidge",
    "sizes": "4 5 6 7 8",
    "forthe": "Women",
    "image": "source/Teenwalk/150.jpg",
    "link": "template.html",
    "status": "View Image",
    "Stock": "Stock Available",
    "New_item": "yes",   // ✅ new item
    "Date": "2025-09-29",
    "price": "LKR 720",
    "extraimage1": "source/Teenwalk/150.jpg"
  },
  {
    "name": "00149",
    "fname": "00149TW0204",
    "category": "Teen Walk",
    "colors": "Black | Pink | Beidge",
    "sizes": "4 5 6 7 8",
    "forthe": "Women",
    "image": "source/Teenwalk/149.jpg",
    "link": "template.html",
    "status": "View Image",
    "Stock": "Stock Available",
    "New_item": "yes",   // ✅ new item
    "Date": "2025-09-29",
    "price": "N/A",
    "extraimage1": "source/Teenwalk/149.jpg"
  },

  // 🔽 Auto-generated items
  ...[
    "00148","00147","00146","00145","00144","00143","00141",
    "00139","00138","00137","00136","00135","00134","00133","00132","00131",
    "00129","00128","00124","00122","00119","00118","00108","00107",
    "016","0014","0013"
  ].map(num => {
    const numVal = parseInt(num);
    return {
      "name": num,
      "fname": `${num}TW0204`,
      "category": "Teen Walk",
      "colors": "Black | Pink | Beidge", // placeholder
      "sizes": "4 5 6 7 8",              // placeholder
      "forthe": "Women",
      "image": `source/Teenwalk/${numVal}.jpg`,
      "link": "template.html",
      "status": "View Image",
      "Stock": "Stock Available",
      "New_item": (numVal >= 141 && numVal <= 153) ? "yes" : "old",  // ✅ rule applied
      "Date": "2025-09-29",
      "price": "N/A", // placeholder
      "extraimage1": `source/Teenwalk/${numVal}.jpg`
    }
  })
];
