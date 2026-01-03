# KYC Document Upload Guide

## What Was Wrong & What I Fixed

### ❌ Problems Found:

1. **No upload endpoint** - You had DTOs expecting URLs, but no way to upload files
2. **Service only had storage instance** - No actual upload methods
3. **Missing Cloudinary integration** - Config was there but not being used properly
4. **No file validation** - File type and size checks were missing
5. **Module not connected** - S3module wasn't imported in AccountModule

### ✅ What I Fixed:

1. ✅ Added `uploadFile()`, `uploadMultipleFiles()`, and `deleteFile()` methods to S3 service
2. ✅ Created `UploadController` with 3 endpoints for different file types
3. ✅ Added file validation (type, size, mime type)
4. ✅ Connected S3moduleModule to AccountModule
5. ✅ Created `.env.example` with Cloudinary credentials template

---

## Setup: Get Free Cloudinary Account

### Step 1: Sign Up (100% Free)

1. Go to [cloudinary.com/users/register/free](https://cloudinary.com/users/register/free)
2. Sign up with your email
3. Verify your email

### Step 2: Get Your Credentials

After signing in, go to your **Dashboard**:

1. **Cloud Name**: e.g., `djxyz123abc`
2. **API Key**: e.g., `123456789012345`
3. **API Secret**: e.g., `abcdefghijklmnopqrstuvwxyz`

### Step 3: Add to Your .env File

```bash
CLOUDINARY_CLOUD_NAME=djxyz123abc
CLOUDINARY_API_KEY=123456789012345
CLOUDINARY_API_SECRET=abcdefghijklmnopqrstuvwxyz
```

---

## How the Upload System Works

### Architecture

```
User uploads file
      │
      ▼
[Upload Controller]
      │
      ├─ Validate file type (JPEG, PNG, PDF)
      ├─ Validate file size (max 5MB)
      │
      ▼
[S3 Service]
      │
      ├─ Upload to Cloudinary
      ├─ Get secure URL
      │
      ▼
Return URL to user
      │
      ▼
User submits KYC with URL
      │
      ▼
[KYC Controller]
      │
      ▼
Save to database
```

### File Storage Structure

```
Cloudinary/
└── bidding-service/
    ├── kyc-documents/
    │   ├── 1704567890-passport.jpg
    │   ├── 1704567891-id-card.pdf
    │   └── ...
    ├── kyc-selfies/
    │   ├── 1704567892-selfie.jpg
    │   └── ...
    └── product-images/
        ├── 1704567893-product1.jpg
        └── ...
```

---

## API Endpoints

### 1. Upload KYC Document (ID Card, Passport, etc.)

**Endpoint**: `POST /upload/kyc-document`

**Accepts**:
- File types: JPEG, PNG, WEBP, PDF
- Max size: 5MB
- Form field name: `file`

**cURL Example:**
```bash
curl -X POST http://localhost:3000/upload/kyc-document \
  -F "file=@/path/to/your/id-card.jpg"
```

**Response:**
```json
{
  "success": true,
  "url": "https://res.cloudinary.com/djxyz123abc/image/upload/v1704567890/bidding-service/kyc-documents/1704567890-id-card.jpg",
  "publicId": "bidding-service/kyc-documents/1704567890-id-card",
  "format": "jpg",
  "size": 245678,
  "message": "KYC document uploaded successfully"
}
```

### 2. Upload KYC Selfie

**Endpoint**: `POST /upload/kyc-selfie`

**Accepts**:
- File types: JPEG, PNG, WEBP only (images)
- Max size: 3MB
- Form field name: `file`

**cURL Example:**
```bash
curl -X POST http://localhost:3000/upload/kyc-selfie \
  -F "file=@/path/to/your/selfie.jpg"
```

**Response:**
```json
{
  "success": true,
  "url": "https://res.cloudinary.com/djxyz123abc/image/upload/v1704567892/bidding-service/kyc-selfies/1704567892-selfie.jpg",
  "publicId": "bidding-service/kyc-selfies/1704567892-selfie",
  "format": "jpg",
  "size": 123456,
  "message": "Selfie uploaded successfully"
}
```

### 3. Upload Product Images (Multiple)

**Endpoint**: `POST /upload/product-images`

**Accepts**:
- File types: JPEG, PNG, WEBP
- Max size per image: 2MB
- Max images: 10
- Form field name: `files` (note: plural!)

**cURL Example:**
```bash
curl -X POST http://localhost:3000/upload/product-images \
  -F "files=@/path/to/image1.jpg" \
  -F "files=@/path/to/image2.jpg" \
  -F "files=@/path/to/image3.jpg"
```

**Response:**
```json
{
  "success": true,
  "count": 3,
  "urls": [
    "https://res.cloudinary.com/djxyz123abc/image/upload/.../image1.jpg",
    "https://res.cloudinary.com/djxyz123abc/image/upload/.../image2.jpg",
    "https://res.cloudinary.com/djxyz123abc/image/upload/.../image3.jpg"
  ],
  "files": [
    {
      "url": "https://..../image1.jpg",
      "publicId": "bidding-service/product-images/...",
      "format": "jpg",
      "size": 234567
    },
    // ... more files
  ],
  "message": "3 product images uploaded successfully"
}
```

---

## Complete KYC Submission Flow

### Step 1: Upload Documents

```bash
# Upload ID document
curl -X POST http://localhost:3000/upload/kyc-document \
  -F "file=@passport.jpg"

# Response: { "url": "https://cloudinary.com/.../passport.jpg" }
```

```bash
# Upload selfie
curl -X POST http://localhost:3000/upload/kyc-selfie \
  -F "file=@selfie.jpg"

# Response: { "url": "https://cloudinary.com/.../selfie.jpg" }
```

### Step 2: Submit KYC with URLs

```bash
curl -X POST http://localhost:3000/kyc \
  -H "Content-Type: application/json" \
  -d '{
    "accountId": "kinde-user-123",
    "fullName": "John Doe",
    "dateOfBirth": "1990-01-15",
    "alienIdNumber": "AB123456",
    "idDocumentUrl": "https://cloudinary.com/.../passport.jpg",
    "selfieUrl": "https://cloudinary.com/.../selfie.jpg"
  }'
```

**Response:**
```json
{
  "id": "kyc-uuid",
  "userId": "...",
  "accountId": "kinde-user-123",
  "fullName": "John Doe",
  "status": "PENDING",
  "idDocumentUrl": "https://cloudinary.com/.../passport.jpg",
  "selfieUrl": "https://cloudinary.com/.../selfie.jpg",
  "createdAt": "2026-01-03T..."
}
```

### Step 3: Admin Reviews KYC

```bash
# Admin approves KYC
curl -X PATCH http://localhost:3000/kyc/:id \
  -H "Content-Type: application/json" \
  -d '{
    "status": "VERIFIED",
    "reviewedBy": "admin-kinde-id"
  }'
```

**Response:**
```json
{
  "id": "kyc-uuid",
  "status": "VERIFIED",
  "verifiedAt": "2026-01-03T...",
  "reviewedBy": "admin-kinde-id"
}
```

---

## Frontend Example (React)

### Upload KYC Document

```typescript
import { useState } from 'react';

function KYCUpload() {
  const [idDocUrl, setIdDocUrl] = useState('');
  const [selfieUrl, setSelfieUrl] = useState('');
  const [uploading, setUploading] = useState(false);

  const handleIdUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
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
      alert('ID document uploaded successfully!');
    } catch (error) {
      alert('Upload failed');
    } finally {
      setUploading(false);
    }
  };

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
      alert('Selfie uploaded successfully!');
    } catch (error) {
      alert('Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const submitKYC = async () => {
    if (!idDocUrl || !selfieUrl) {
      alert('Please upload both documents');
      return;
    }

    const response = await fetch('http://localhost:3000/kyc', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        accountId: 'user-kinde-id',
        fullName: 'John Doe',
        dateOfBirth: '1990-01-15',
        idDocumentUrl: idDocUrl,
        selfieUrl: selfieUrl,
      }),
    });

    if (response.ok) {
      alert('KYC submitted successfully!');
    }
  };

  return (
    <div>
      <h2>KYC Verification</h2>

      <div>
        <label>Upload ID Document (Passport/ID Card):</label>
        <input
          type="file"
          accept="image/*,application/pdf"
          onChange={handleIdUpload}
          disabled={uploading}
        />
        {idDocUrl && <p>✅ Uploaded</p>}
      </div>

      <div>
        <label>Upload Selfie:</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleSelfieUpload}
          disabled={uploading}
        />
        {selfieUrl && <p>✅ Uploaded</p>}
      </div>

      <button onClick={submitKYC} disabled={!idDocUrl || !selfieUrl || uploading}>
        Submit KYC
      </button>
    </div>
  );
}
```

---

## Error Handling

### Common Errors:

1. **No file uploaded**
   ```json
   {
     "statusCode": 400,
     "message": "No file uploaded"
   }
   ```

2. **Invalid file type**
   ```json
   {
     "statusCode": 400,
     "message": "Invalid file type. Only JPEG, PNG, WEBP, and PDF are allowed"
   }
   ```

3. **File too large**
   ```json
   {
     "statusCode": 400,
     "message": "File size must be less than 5MB"
   }
   ```

4. **Cloudinary upload failed**
   ```json
   {
     "statusCode": 400,
     "message": "Failed to upload file"
   }
   ```

---

## Testing with Postman

### 1. Create a POST request
- URL: `http://localhost:3000/upload/kyc-document`
- Method: `POST`

### 2. Set Body
- Select `form-data`
- Add key: `file` (change type to `File`)
- Click "Select Files" and choose your image/PDF

### 3. Send
You should get back the Cloudinary URL!

---

## Cloudinary Free Tier Limits

✅ **25 credits/month** (more than enough for KYC)
✅ **Storage**: 25 GB
✅ **Bandwidth**: 25 GB/month
✅ **Transformations**: 25,000/month

For KYC documents, this is plenty! Even with 1000 users, you'll be fine.

---

## Security Best Practices

1. **Validate on server** - Never trust client-side validation
2. **Scan for malware** - Consider adding virus scanning (ClamAV)
3. **Limit file size** - Prevents DoS attacks
4. **Use secure URLs** - Cloudinary provides HTTPS by default
5. **Delete unused files** - Clean up rejected KYC documents

---

## Next Steps

1. **Sign up for Cloudinary** (free)
2. **Add credentials to .env**
3. **Test upload endpoint**
4. **Integrate with your frontend**
5. **Add KYC verification workflow**

All the code is ready to go! Just add your Cloudinary credentials and start testing. 🚀
