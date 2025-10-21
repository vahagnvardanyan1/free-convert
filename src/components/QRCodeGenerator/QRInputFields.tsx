import { Card } from '../Card';

import type { QRType, QRData } from '@/hooks/useQRCode';

interface QRInputFieldsProps {
  qrType: QRType;
  qrData: QRData;
  onUpdate: (field: string, value: string | { [key: string]: string }) => void;
}

export const QRInputFields = ({ qrType, qrData, onUpdate }: QRInputFieldsProps) => {
  const inputClass = 'w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent';

  return (
    <Card className="p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Enter Content</h2>

      {qrType === 'url' && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Website URL</label>
          <input type="url" value={qrData.url || ''} onChange={e => onUpdate('url', e.target.value)} placeholder="https://example.com" className={inputClass} />
        </div>
      )}

      {qrType === 'text' && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Text Content</label>
          <textarea value={qrData.text || ''} onChange={e => onUpdate('text', e.target.value)} placeholder="Enter your text here..." rows={4} className={inputClass} />
        </div>
      )}

      {qrType === 'email' && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
          <input type="email" value={qrData.email || ''} onChange={e => onUpdate('email', e.target.value)} placeholder="example@email.com" className={inputClass} />
        </div>
      )}

      {qrType === 'phone' && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
          <input type="tel" value={qrData.phone || ''} onChange={e => onUpdate('phone', e.target.value)} placeholder="+1234567890" className={inputClass} />
        </div>
      )}

      {qrType === 'sms' && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
            <input type="tel" value={qrData.sms?.phone || ''} onChange={e => onUpdate('sms', { ...qrData.sms, phone: e.target.value })} placeholder="+1234567890" className={inputClass} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Message (Optional)</label>
            <textarea
              value={qrData.sms?.message || ''}
              onChange={e => onUpdate('sms', { ...qrData.sms, message: e.target.value })}
              placeholder="Pre-filled message..."
              rows={3}
              className={inputClass}
            />
          </div>
        </div>
      )}

      {qrType === 'wifi' && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Network Name (SSID)</label>
            <input type="text" value={qrData.wifi?.ssid || ''} onChange={e => onUpdate('wifi', { ...qrData.wifi, ssid: e.target.value })} placeholder="MyNetwork" className={inputClass} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <input type="text" value={qrData.wifi?.password || ''} onChange={e => onUpdate('wifi', { ...qrData.wifi, password: e.target.value })} placeholder="password123" className={inputClass} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Encryption</label>
            <select value={qrData.wifi?.encryption || 'WPA'} onChange={e => onUpdate('wifi', { ...qrData.wifi, encryption: e.target.value })} className={inputClass}>
              <option value="WPA">WPA/WPA2</option>
              <option value="WEP">WEP</option>
              <option value="nopass">None</option>
            </select>
          </div>
        </div>
      )}

      {qrType === 'location' && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Latitude</label>
            <input type="text" value={qrData.location?.lat || ''} onChange={e => onUpdate('location', { ...qrData.location, lat: e.target.value })} placeholder="40.7128" className={inputClass} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Longitude</label>
            <input type="text" value={qrData.location?.lng || ''} onChange={e => onUpdate('location', { ...qrData.location, lng: e.target.value })} placeholder="-74.0060" className={inputClass} />
          </div>
        </div>
      )}

      {qrType === 'vcard' && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
            <input type="text" value={qrData.vcard?.name || ''} onChange={e => onUpdate('vcard', { ...qrData.vcard, name: e.target.value })} placeholder="John Doe" className={inputClass} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
            <input type="tel" value={qrData.vcard?.phone || ''} onChange={e => onUpdate('vcard', { ...qrData.vcard, phone: e.target.value })} placeholder="+1234567890" className={inputClass} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input type="email" value={qrData.vcard?.email || ''} onChange={e => onUpdate('vcard', { ...qrData.vcard, email: e.target.value })} placeholder="john@example.com" className={inputClass} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Organization</label>
            <input
              type="text"
              value={qrData.vcard?.organization || ''}
              onChange={e => onUpdate('vcard', { ...qrData.vcard, organization: e.target.value })}
              placeholder="Company Inc."
              className={inputClass}
            />
          </div>
        </div>
      )}
    </Card>
  );
};
