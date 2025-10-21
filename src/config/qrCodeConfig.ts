import { Link as LinkIcon, Type, Mail, Phone, MessageSquare, Wifi, MapPin, Calendar } from 'lucide-react';

import type { QRType } from '@/hooks/useQRCode';

export const QR_CODE_TYPES = [
  { type: 'url' as QRType, label: 'Website URL', icon: LinkIcon },
  { type: 'text' as QRType, label: 'Plain Text', icon: Type },
  { type: 'email' as QRType, label: 'Email', icon: Mail },
  { type: 'phone' as QRType, label: 'Phone', icon: Phone },
  { type: 'sms' as QRType, label: 'SMS', icon: MessageSquare },
  { type: 'wifi' as QRType, label: 'WiFi', icon: Wifi },
  { type: 'location' as QRType, label: 'Location', icon: MapPin },
  { type: 'vcard' as QRType, label: 'Contact Card', icon: Calendar },
] as const;
