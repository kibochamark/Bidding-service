# Updated KYC Verification System

## Overview

The KYC (Know Your Customer) system has been updated to support multiple document types and additional verification requirements.

## Changes Summary

### ✅ New Features

1. **Multiple Document Types**:
   - National ID
   - Passport
   - Driver's License

2. **Additional Required Fields**:
   - Full Name (as on ID)
   - Date of Birth
   - Nationality
   - Document Number (ID/Passport/License number)
   - Proof of Address

3. **Optional Fields**:
   - Selfie (for enhanced verification)

### 🗄️ Database Schema Changes

**New/Updated Fields in `KycProfile`**:
```prisma
model KycProfile {
  id                String       @id @default(uuid())
  userId            String       @unique
  status            KycStatus    @default(PENDING)
  fullName          String       // Full name as on ID ✨ NEW
  dateOfBirth       DateTime
  nationality       String       // ✨ NEW
  documentType      DocumentType // ✨ NEW (NATIONAL_ID, PASSPORT, DRIVERS_LICENSE)
  idDocumentNumber  String       // ✨ NEW (ID/Passport/License number)
  idDocumentUrl     String
  proofOfAddressUrl String       // ✨ NEW
  selfieUrl         String?      // Now optional
  rejectionReason   String?
  reviewedBy        String?
  verifiedAt        DateTime?
  accountId         String       @unique
  createdAt         DateTime     @default(now())
  updatedAt         DateTime     @updatedAt
}
```

**New Enum**:
```prisma
enum DocumentType {
  NATIONAL_ID
  PASSPORT
  DRIVERS_LICENSE
}
```

---

## API Endpoints

### 1. Upload KYC Documents

You need to upload 3 files separately, then submit the KYC with the URLs.

#### a. Upload ID Document (Passport/National ID/Driver's License)

**Endpoint**: `POST /upload/kyc-document`

**Accepts**:
- File types: JPEG, PNG, WEBP, PDF
- Max size: 5MB
- Form field: `file`

**Example**:
```bash
curl -X POST http://localhost:3000/upload/kyc-document \
  -F "file=@passport.jpg"
```

**Response**:
```json
{
  "success": true,
  "url": "https://res.cloudinary.com/.../passport.jpg",
  "publicId": "bidding-service/kyc-documents/1234567890-passport",
  "format": "jpg",
  "size": 245678,
  "message": "KYC document uploaded successfully"
}
```

#### b. Upload Proof of Address

**Endpoint**: `POST /upload/proof-of-address`

**Accepts**:
- File types: JPEG, PNG, WEBP, PDF
- Max size: 5MB
- Form field: `file`
- Acceptable documents: Utility bill, bank statement, rental agreement

**Example**:
```bash
curl -X POST http://localhost:3000/upload/proof-of-address \
  -F "file=@utility-bill.pdf"
```

**Response**:
```json
{
  "success": true,
  "url": "https://res.cloudinary.com/.../utility-bill.pdf",
  "publicId": "bidding-service/proof-of-address/1234567890-utility-bill",
  "format": "pdf",
  "size": 345678,
  "message": "Proof of address uploaded successfully"
}
```

#### c. Upload Selfie (Optional)

**Endpoint**: `POST /upload/kyc-selfie`

**Accepts**:
- File types: JPEG, PNG, WEBP (images only)
- Max size: 3MB
- Form field: `file`

**Example**:
```bash
curl -X POST http://localhost:3000/upload/kyc-selfie \
  -F "file=@selfie.jpg"
```

**Response**:
```json
{
  "success": true,
  "url": "https://res.cloudinary.com/.../selfie.jpg",
  "publicId": "bidding-service/kyc-selfies/1234567890-selfie",
  "format": "jpg",
  "size": 123456,
  "message": "Selfie uploaded successfully"
}
```

### 2. Submit KYC for Verification

**Endpoint**: `POST /kyc`

**Request Body**:
```json
{
  "accountId": "kinde-user-123",
  "fullName": "John Michael Doe",
  "dateOfBirth": "1990-01-15",
  "nationality": "United States",
  "documentType": "PASSPORT",
  "idDocumentNumber": "P1234567",
  "idDocumentUrl": "https://cloudinary.com/.../passport.jpg",
  "proofOfAddressUrl": "https://cloudinary.com/.../utility-bill.pdf",
  "selfieUrl": "https://cloudinary.com/.../selfie.jpg"
}
```

**Field Descriptions**:
- `fullName`: Full name as it appears on the ID document
- `dateOfBirth`: Format: YYYY-MM-DD
- `nationality`: Country name
- `documentType`: One of: `NATIONAL_ID`, `PASSPORT`, `DRIVERS_LICENSE`
- `idDocumentNumber`: The document number (e.g., passport number, ID number, license number)
- `idDocumentUrl`: URL from upload step
- `proofOfAddressUrl`: URL from upload step
- `selfieUrl`: Optional - URL from upload step

**Response**:
```json
{
  "id": "kyc-uuid-123",
  "userId": "user-uuid",
  "accountId": "kinde-user-123",
  "fullName": "John Michael Doe",
  "dateOfBirth": "1990-01-15T00:00:00.000Z",
  "nationality": "United States",
  "documentType": "PASSPORT",
  "idDocumentNumber": "P1234567",
  "idDocumentUrl": "https://cloudinary.com/.../passport.jpg",
  "proofOfAddressUrl": "https://cloudinary.com/.../utility-bill.pdf",
  "selfieUrl": "https://cloudinary.com/.../selfie.jpg",
  "status": "PENDING",
  "createdAt": "2026-01-03T...",
  "updatedAt": "2026-01-03T..."
}
```

### 3. Check KYC Status

**Endpoint**: `GET /kyc/status?accountId=kinde-user-123`

**Response**:
```json
{
  "id": "kyc-uuid-123",
  "status": "PENDING",
  "fullName": "John Michael Doe",
  "nationality": "United States",
  "documentType": "PASSPORT",
  "verifiedAt": null,
  "rejectionReason": null
}
```

**Possible Statuses**:
- `PENDING`: Under review
- `VERIFIED`: Approved ✅
- `REJECTED`: Not approved ❌
- `NEEDS_MORE_INFO`: Additional information required

### 4. Admin: Update KYC Status

**Endpoint**: `PATCH /kyc/:id`

**Request Body (Approve)**:
```json
{
  "status": "VERIFIED",
  "reviewedBy": "admin-kinde-id"
}
```

**Request Body (Reject)**:
```json
{
  "status": "REJECTED",
  "rejectionReason": "Document is expired. Please submit a valid document.",
  "reviewedBy": "admin-kinde-id"
}
```

---

## Complete Flow Example

### Frontend Implementation (React/Next.js)

```typescript
import { useState } from 'react';

interface KYCFormData {
  fullName: string;
  dateOfBirth: string;
  nationality: string;
  documentType: 'NATIONAL_ID' | 'PASSPORT' | 'DRIVERS_LICENSE';
  idDocumentNumber: string;
}

function KYCVerification() {
  const [formData, setFormData] = useState<KYCFormData>({
    fullName: '',
    dateOfBirth: '',
    nationality: '',
    documentType: 'NATIONAL_ID',
    idDocumentNumber: '',
  });

  const [idDocUrl, setIdDocUrl] = useState('');
  const [proofOfAddressUrl, setProofOfAddressUrl] = useState('');
  const [selfieUrl, setSelfieUrl] = useState('');
  const [uploading, setUploading] = useState(false);

  // Step 1: Upload ID Document
  const handleIdDocUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://localhost:3000/upload/kyc-document', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      setIdDocUrl(data.url);
      alert('ID document uploaded!');
    } catch (error) {
      alert('Upload failed');
    } finally {
      setUploading(false);
    }
  };

  // Step 2: Upload Proof of Address
  const handleProofUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://localhost:3000/upload/proof-of-address', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      setProofOfAddressUrl(data.url);
      alert('Proof of address uploaded!');
    } catch (error) {
      alert('Upload failed');
    } finally {
      setUploading(false);
    }
  };

  // Step 3: Upload Selfie (Optional)
  const handleSelfieUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://localhost:3000/upload/kyc-selfie', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      setSelfieUrl(data.url);
      alert('Selfie uploaded!');
    } catch (error) {
      alert('Upload failed');
    } finally {
      setUploading(false);
    }
  };

  // Step 4: Submit KYC
  const submitKYC = async () => {
    if (!idDocUrl || !proofOfAddressUrl) {
      alert('Please upload required documents');
      return;
    }

    const response = await fetch('http://localhost:3000/kyc', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        accountId: 'user-kinde-id', // Get from auth context
        fullName: formData.fullName,
        dateOfBirth: formData.dateOfBirth,
        nationality: formData.nationality,
        documentType: formData.documentType,
        idDocumentNumber: formData.idDocumentNumber,
        idDocumentUrl: idDocUrl,
        proofOfAddressUrl: proofOfAddressUrl,
        selfieUrl: selfieUrl || undefined,
      }),
    });

    if (response.ok) {
      alert('KYC submitted successfully!');
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">KYC Verification</h2>

      {/* Personal Information */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3">Personal Information</h3>

        <input
          type="text"
          placeholder="Full Name (as on ID)"
          value={formData.fullName}
          onChange={(e) => setFormData({...formData, fullName: e.target.value})}
          className="w-full p-2 border rounded mb-3"
        />

        <input
          type="date"
          placeholder="Date of Birth"
          value={formData.dateOfBirth}
          onChange={(e) => setFormData({...formData, dateOfBirth: e.target.value})}
          className="w-full p-2 border rounded mb-3"
        />

        <input
          type="text"
          placeholder="Nationality"
          value={formData.nationality}
          onChange={(e) => setFormData({...formData, nationality: e.target.value})}
          className="w-full p-2 border rounded mb-3"
        />
      </div>

      {/* Document Type Selection */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3">Document Type</h3>

        <select
          value={formData.documentType}
          onChange={(e) => setFormData({...formData, documentType: e.target.value as any})}
          className="w-full p-2 border rounded mb-3"
        >
          <option value="NATIONAL_ID">National ID</option>
          <option value="PASSPORT">Passport</option>
          <option value="DRIVERS_LICENSE">Driver's License</option>
        </select>

        <input
          type="text"
          placeholder="Document Number"
          value={formData.idDocumentNumber}
          onChange={(e) => setFormData({...formData, idDocumentNumber: e.target.value})}
          className="w-full p-2 border rounded"
        />
      </div>

      {/* File Uploads */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3">Documents</h3>

        <div className="mb-3">
          <label className="block mb-2">
            ID Document * (Passport/ID/License)
          </label>
          <input
            type="file"
            accept="image/*,application/pdf"
            onChange={handleIdDocUpload}
            disabled={uploading}
            className="w-full"
          />
          {idDocUrl && <p className="text-green-600 mt-1">✅ Uploaded</p>}
        </div>

        <div className="mb-3">
          <label className="block mb-2">
            Proof of Address * (Utility bill/Bank statement)
          </label>
          <input
            type="file"
            accept="image/*,application/pdf"
            onChange={handleProofUpload}
            disabled={uploading}
            className="w-full"
          />
          {proofOfAddressUrl && <p className="text-green-600 mt-1">✅ Uploaded</p>}
        </div>

        <div className="mb-3">
          <label className="block mb-2">
            Selfie (Optional - for enhanced verification)
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleSelfieUpload}
            disabled={uploading}
            className="w-full"
          />
          {selfieUrl && <p className="text-green-600 mt-1">✅ Uploaded</p>}
        </div>
      </div>

      <button
        onClick={submitKYC}
        disabled={!idDocUrl || !proofOfAddressUrl || uploading}
        className="w-full bg-blue-600 text-white py-3 rounded disabled:bg-gray-400"
      >
        Submit KYC Verification
      </button>
    </div>
  );
}
```

---

## Validation Rules

### Required Fields
- ✅ Full Name
- ✅ Date of Birth
- ✅ Nationality
- ✅ Document Type
- ✅ Document Number
- ✅ ID Document Upload
- ✅ Proof of Address Upload

### Optional Fields
- Selfie (recommended for enhanced security)

### File Requirements
| Document Type | Allowed Formats | Max Size |
|--------------|----------------|----------|
| ID Document | JPEG, PNG, WEBP, PDF | 5MB |
| Proof of Address | JPEG, PNG, WEBP, PDF | 5MB |
| Selfie | JPEG, PNG, WEBP | 3MB |

---

## Error Handling

### Common Errors

**Missing Required Fields**:
```json
{
  "statusCode": 400,
  "message": "ID document is required"
}
```

**Invalid Document Type**:
```json
{
  "statusCode": 400,
  "message": "documentType must be one of: NATIONAL_ID, PASSPORT, DRIVERS_LICENSE"
}
```

**File Too Large**:
```json
{
  "statusCode": 400,
  "message": "File size must be less than 5MB"
}
```

**Invalid File Type**:
```json
{
  "statusCode": 400,
  "message": "Invalid file type. Only JPEG, PNG, WEBP, and PDF are allowed"
}
```

---

## Security Features

### ✅ Automatic File Cleanup
- If KYC creation fails, uploaded files are automatically deleted from Cloudinary
- When KYC is updated, old files are replaced and deleted
- When KYC is deleted, all associated files are removed

### ✅ Transaction Safety
- Database operations use Prisma transactions for atomicity
- File uploads are handled separately with manual cleanup on failure

### ✅ Validation
- Server-side validation of all fields
- File type and size validation
- Document type enum validation

---

## Next Steps

1. **Run migration**:
   ```bash
   npx prisma migrate dev --name update_kyc_fields
   npx prisma generate
   ```

2. **Test the flow**:
   ```bash
   # Upload documents
   curl -X POST http://localhost:3000/upload/kyc-document -F "file=@id.jpg"
   curl -X POST http://localhost:3000/upload/proof-of-address -F "file=@bill.pdf"

   # Submit KYC
   curl -X POST http://localhost:3000/kyc \
     -H "Content-Type: application/json" \
     -d '{"accountId":"...","fullName":"...","dateOfBirth":"...","nationality":"...","documentType":"PASSPORT","idDocumentNumber":"...","idDocumentUrl":"...","proofOfAddressUrl":"..."}'
   ```

3. **Verify in database**:
   ```sql
   SELECT * FROM "KycProfile" WHERE "accountId" = 'your-kinde-id';
   ```

---

All set! Your KYC system now supports multiple document types with comprehensive validation and automatic cleanup. 🎉
