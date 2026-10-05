/**
 * Utility for formatting Nigerian phone numbers to WhatsApp international format
 * and generating pre-filled WhatsApp inquiry links.
 */

export function formatNigerianPhoneForWhatsApp(phone: string): string {
  if (!phone) return '2348069382393';
  
  // Remove non-digit characters
  let cleaned = phone.replace(/\D/g, '');

  // Handle standard Nigerian numbers
  if (cleaned.startsWith('0') && cleaned.length === 11) {
    cleaned = '234' + cleaned.slice(1);
  } else if (cleaned.startsWith('234') && cleaned.length === 13) {
    // already 234 format
  } else if (cleaned.length === 10) {
    cleaned = '234' + cleaned;
  }

  return cleaned || '2348069382393';
}

export interface WhatsAppInquiryItem {
  name: string;
  quantity: number;
}

export interface CartInquiryDetails {
  items: WhatsAppInquiryItem[];
  customerName?: string;
  customerPhone?: string;
  customerLocation?: string;
}

export function generateCartWhatsAppMessage(details: CartInquiryDetails): string {
  const itemsList = details.items
    .map((item, idx) => `${idx + 1}. ${item.name} x ${item.quantity}`)
    .join('\n');

  const nameStr = details.customerName ? `\nName: ${details.customerName}` : '\nName: ';
  const phoneStr = details.customerPhone ? `\nPhone: ${details.customerPhone}` : '\nPhone: ';
  const locationStr = details.customerLocation ? `\nLocation: ${details.customerLocation}` : '\nLocation: ';

  return (
    `Hello Bright Okeyson Nigeria Enterprises,\n\n` +
    `I would like to inquire about the following products:\n\n` +
    `${itemsList}\n\n` +
    `Please provide the current prices and availability.` +
    `${nameStr}${phoneStr}${locationStr}\n\n` +
    `Thank you.`
  );
}

export function generateProductWhatsAppMessage(
  productName: string,
  brand?: string,
  sku?: string
): string {
  const brandInfo = brand ? ` (Brand: ${brand})` : '';
  const skuInfo = sku ? ` [SKU: ${sku}]` : '';

  return (
    `Hello Bright Okeyson Nigeria Enterprises,\n\n` +
    `I would like to inquire about the following product:\n` +
    `• ${productName}${brandInfo}${skuInfo}\n\n` +
    `Please provide the current price, warranty/condition, and availability.\n\n` +
    `Thank you.`
  );
}

export function getWhatsAppUrl(rawPhone: string, message: string): string {
  const formattedPhone = formatNigerianPhoneForWhatsApp(rawPhone);
  const encoded = encodeURIComponent(message.trim());
  return `https://wa.me/${formattedPhone}?text=${encoded}`;
}
