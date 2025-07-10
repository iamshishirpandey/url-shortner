import { prisma } from "./prisma";

const ALPHABET = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
const BASE = ALPHABET.length;

function encode(id: string): string {

  const num = parseInt(id.slice(-6), 16);
  if (num === 0) return ALPHABET[0];
  let shortCode = '';
  let tempNum = num;

  while (tempNum > 0) {
    const remainder = tempNum % BASE;
    shortCode = ALPHABET[remainder] + shortCode;
    tempNum = Math.floor(tempNum / BASE);
  }
  return shortCode;
}

export async function shortenUrl(original: string): Promise<{ original: string; shortened: string } | null>{
    const existing = await prisma.url.findUnique({
    where: { original: original },
  })

  if (existing) {
    return {original:existing.original, shortened:existing.shortened};
  }
   const newUrlEntry = await prisma.url.create({
    data: {
      original: original,
      shortened: ''
    },
  });
    const shortCode = encode(newUrlEntry.id);
  const updatedUrl = await prisma.url.update({
    where: { id: newUrlEntry.id },
    data: { shortened: shortCode },
  });
  return {
    original: updatedUrl.original,
    shortened: updatedUrl.shortened,
  }

}
