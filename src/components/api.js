import axios from "axios";

export async function fetchMemesAPI(signal, url = "https://api.imgflip.com/get_memes") {
  const res = await axios.get(url, { signal });
  // Expected shape: { success: true, data: { memes: [...] } }
  const memes = res?.data?.data?.memes ?? [];
  // Normalize to the shape used by components
  return memes.map((m) => ({
    id: m.id,
    name: m.name,
    image: m.url,
    width: m.width,
    height: m.height,
    box_count: m.box_count,
    captions: m.captions,
  }));
}
