import fs from 'fs';
import path from 'path';

const urls = [
  "https://images.unsplash.com/photo-1611651338412-8403fa6e3599?w=800&q=80",
  "https://images.unsplash.com/photo-1634673970798-a15ae56f6c65?w=800&q=80",
  "https://images.unsplash.com/photo-1632154939368-1a92207d8af3?w=800&q=80",
  "https://images.unsplash.com/photo-1580274455191-1c62238fa333?w=800&q=80",
  "https://images.unsplash.com/photo-1593353798398-6024b7444bb6?w=800&q=80",
  "https://images.unsplash.com/photo-1598814165187-ed79437d7490?w=800&q=80",
  "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?w=800&q=80",
  "https://images.unsplash.com/photo-1613921568536-555645be4032?w=800&q=80",
  "https://images.unsplash.com/photo-1611651186486-415f04eb78e4?w=800&q=80",
  "https://images.unsplash.com/photo-1611651336487-802fe164d3e5?w=800&q=80",
  "https://images.unsplash.com/photo-1615125468484-088e3dfcabb6?w=800&q=80",
  "https://images.unsplash.com/photo-1576621097105-6b7e62b188e5?w=800&q=80",
  "https://images.unsplash.com/photo-1597858520171-563a8e8b9925?w=800&q=80",
  "https://images.unsplash.com/photo-1699325524552-555bd48866b6?w=800&q=80",
  "https://images.unsplash.com/photo-1722850312872-52ebbd041a90?w=800&q=80",
  "https://images.unsplash.com/photo-1619844175408-c05947985e2d?w=800&q=80",
  "https://images.unsplash.com/photo-1722445716692-99fcdf65c541?w=800&q=80",
  "https://images.unsplash.com/photo-1680530943604-39ea7d8cafd7?w=800&q=80"
];

const dir = path.join(process.cwd(), 'public', 'gallery');
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

async function download() {
  for (let i = 0; i < urls.length; i++) {
    const p = path.join(dir, `${i + 1}.jpg`);
    try {
      const res = await fetch(urls[i]);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const arrayBuffer = await res.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      fs.writeFileSync(p, buffer);
      console.log(`Downloaded ${i + 1}.jpg (${buffer.length} bytes)`);
    } catch (e) {
      console.error(`Failed to download ${i+1}.jpg:`, e.message);
    }
  }
}
download();
