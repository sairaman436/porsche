import fs from 'fs';
import path from 'path';
import https from 'https';

const urls = [
  "https://upload.wikimedia.org/wikipedia/commons/a/ae/1991_Porsche_928_S4_LC24.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/1/13/1986_944_Turbo.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/6/61/1994_Porsche_968.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/0/07/2007-07-08_Porsche_356_C_%2801_kl_ret%29.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/9/97/Porsche_914_%281970%29_-_9579225634.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/f/fb/Porsche_Cayenne_%28III%2C_Facelift%29_%E2%80%93_f_01012025.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/b/b2/Porsche_959_%E2%80%93_Frontansicht_%282%29%2C_21._M%C3%A4rz_2013%2C_D%C3%BCsseldorf.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/6/65/Porsche_Carrera_GT_-_Goodwood_Breakfast_Club_%28July_2008%29.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/0/00/Porsche_972_Turbo_E-Hybrid_IMG_0445.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/c/c1/Porsche_992_GT3_1X7A0323.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/f/f9/Porsche_991_GT2_RS_%2841654760692%29.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/9/91/Porsche_918_Spyder_IAA_2013.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/3/3a/Porsche_Macan_4_IMG_2153.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/a/a2/Porsche_911_No_1000000%2C_70_Years_Porsche_Sports_Car%2C_Berlin_%281X7A3888%29.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/d/dc/2020_Porsche_Taycan_4S_79kWh_Front.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/8/8c/Porsche_911_GT1-96_front-left_Porsche_Museum.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/2/23/Porsche_956_Rothmans.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/c/c1/Porsche_992_GT3_1X7A0323.jpg"
];

const dir = path.join(process.cwd(), 'public', 'gallery');
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

async function download() {
  for (let i = 0; i < urls.length; i++) {
    const p = path.join(dir, `${i + 1}.jpg`);
    await new Promise((resolve, reject) => {
      https.get(urls[i], (res) => {
        const file = fs.createWriteStream(p);
        res.pipe(file);
        file.on('finish', () => { file.close(); resolve(); });
      }).on('error', reject);
    });
    console.log(`Downloaded ${i + 1}.jpg`);
  }
}
download();
