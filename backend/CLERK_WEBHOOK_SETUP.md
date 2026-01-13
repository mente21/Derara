# 🔗 Clerk Webhook Setup for Derara Coffee

To enable automatic role assignment (Admin/Customer), you need to configure a webhook in your Clerk Dashboard.

## 🚀 Steps to Setup

1. **Go to Clerk Dashboard**: Navigate to **Webhooks** in the sidebar.
2. **Add Endpoint**:
   - **URL**: `https://YOUR_TUNNEL_URL/api/webhooks/clerk` (If testing locally, use a tool like **ngrok** or **Localtunnel** to get a public URL).
   - **Events**: Select `user.created`.
3. **Copy Secret**: Once created, copy the **Webhook Secret** (starts with `whsec_`).
4. **Update Backend**: Add the secret to your `backend/.env` file:
   ```env
   CLERK_WEBHOOK_SECRET=whsec_your_secret_here
   ```

## 🏗️ How it works
- The **first user** who signs up will automatically be assigned the `admin` role in their metadata.
- All **subsequent users** will be assigned the `customer` role.
- You can manually change roles in the **Admin Dashboard** once you are logged in as an admin.

## 🛠️ Local Testing with ngrok
1. Install ngrok: `npm install -g ngrok` (or download from ngrok.com).
2. Start it: `ngrok http 5055` (assuming your server runs on 5055).
3. Use the `https://xxxx.ngrok.io` URL in the Clerk Webhook settings.
